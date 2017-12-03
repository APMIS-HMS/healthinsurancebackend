'use strict';
var Client = require('node-rest-client').Client;

module.exports = function(app) {
    return function(req, res, next) {
        console.log(req.body);
        if (!!req.body.claims) {
            let claims = req.body.claims;
            let ref = req.body.reference;
            const claimLength = claims.length;
            let createdClaims = [];
            let counter = 0;
            if (claimLength > 0) {
                var url = process.env.FLUTTERWAVEVERIFICATIONURL;
                var client = new Client();
                var args = {
                    data: {
                        "SECKEY": process.env.FLUTTERWAVESECRETKEY, //use the secret key from the paybutton generated on the rave dashboard
                        "flw_ref": ref.flwRef, //use the reference of the payment from the rave checkout after payment
                        "normalize": 1
                    },
                    headers: { "Content-Type": "application/json" }
                };
                client.post(url, args, function(data, response) {
                    // parsed response body as js object
                    console.log('---------- Raw data--------');
                    console.log(data);
                    console.log('---------- End Raw data--------');
                    if (data.status === 'success') {
                        claims.forEach(function(claim, i) {
                            // Uncheck all items from claims service first
                            app.service('claims').get(claim).then(claimRes => {
                                console.log("---------- claimRes --------");
                                console.log(claimRes);
                                console.log("---------- End claimRes --------");
                                claimRes.isPaid = true;
                                app.service('claims').update(claimRes._id, claimRes).then(claimUpdate => {
                                    console.log("---------- claimUpdate --------");
                                    console.log(claimUpdate);
                                    console.log("---------- End claimUpdate --------");

                                    counter++;
                                    if (counter === claimLength) {
                                        res.jsend.success(req.body);
                                        next;
                                    }
                                }).catch(err => {
                                    res.jsend.error(err);
                                    next
                                });
                            }).catch(err => {
                                res.jsend.error(err);
                                next;
                            });
                        });
                    } else {
                        res.jsend.error(data.message);
                        next;
                    }
                }).on('error', function(err) {
                    console.log('request error', err);
                });
            } else {
                res.jsend.error("Claims array is empty");
                next;
            }
        } else {
            res.jsend.error("Attach claims property to the array");
            next;
        }
    };
};