'use strict';
var Client = require('node-rest-client').Client;

module.exports = function(app) {
    return function(req, res, next) {
        console.log('---------- Req body--------');
        console.log(req.body);
        if (!!req.body.claimIds) {
            let otp = '928783'; // req.body.otp;
            let claims = req.body.claimIds;
            let paidBy = req.body.paidBy;
            let paidByType = req.body.paidByType;
            let platformOwnerId = req.body.platformOwnerId;
            let hiaId = req.body.hiaId;
            let providerId = req.body.providerId;
            const claimLength = claims.length;
            let counter = 0;
            if (claimLength > 0) {
                // Get the recipient details
                app.service('provider-recipients').find({
                    query: { providerId: providerId, platformOwnerId: platformOwnerId, isRecipientConfirmed: true }
                }).then(result => {
                    console.log('---------- Raw result--------');
                    console.log(result);
                    console.log('---------- End Raw result--------');
                    if (result.data.length > 0) {
                        let transferCode = 'TRF_vsyqdmlzble3uii'; // result.data[0].details.transfer_code;
                        let url = `${process.env.PAYSTACKBASEURL}transfer/finalize_transfer`;
                        let secretKey = `Bearer ${process.env.PAYSTACKSECRETKEY}`;
                        let client = new Client();
                        let args = {
                            data: {
                                "transfer_code": transferCode,
                                "otp": otp
                            },
                            headers: { "Content-Type": "application/json", "Authorization": secretKey }
                        };
                        // pay
                        client.post(url, args, function(data, response) {
                            // parsed response body as js object
                            console.log('---------- Raw data--------');
                            console.log(data);
                            console.log('---------- End Raw data--------');
                            // if (data.status) {
                            //     let payload = {
                            //         platformOwnerId: platformOwnerId,
                            //         providerId: providerId,
                            //         hiaId: hiaId,
                            //         reference: data.data,
                            //         claims: claims,
                            //         paidBy: paidBy,
                            //         paidByType: paidByType,
                            //         amount: amount,
                            //         isActive: true
                            //     };
                            //     // Create claims-payment
                            //     app.service('claim-payments').create(payload).then(createdRes => {
                            //         if (createdRes._id !== undefined) {
                            //             claims.forEach(function(claim, i) {
                            //                 counter++;

                            //                 // Uncheck all items from claims service first
                            //                 app.service('claims').get(claim).then(claimRes => {
                            //                     console.log("---------- claimRes --------");
                            //                     console.log(claimRes);
                            //                     console.log("---------- End claimRes --------");
                            //                     claimRes.isPaid = true;
                            //                     app.service('claims').update(claimRes._id, claimRes).then(claimUpdate => {
                            //                         console.log("---------- claimUpdate --------");
                            //                         console.log(claimUpdate);
                            //                         console.log("---------- End claimUpdate --------");

                            //                         counter++;
                            //                         if (counter === claimLength) {
                            //                             res.jsend.success(req.body);
                            //                             next;
                            //                         }
                            //                     }).catch(err => {
                            //                         res.jsend.error(err);
                            //                         next
                            //                     });
                            //                 }).catch(err => {
                            //                     res.jsend.error(err);
                            //                     next;
                            //                 });
                            //             });
                            //         }
                            //     }).catch(err => {
                            //         res.send(err);
                            //         next
                            //     });
                            // } else {
                            //     res.jsend.error(data.message);
                            //     next;
                            // }
                        }).on('error', function(err) {
                            console.log('request error', err);
                        });
                    }
                }).catch(err => {
                    console.log('---------- Raw err--------');
                    console.log(err);
                    console.log('---------- End Raw err--------');
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