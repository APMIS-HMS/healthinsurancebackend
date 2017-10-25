'use strict';
var Client = require('node-rest-client').Client;

module.exports = function(app) {
    return function(req, res, next) {
        if (req.body.reference !== undefined) {
            let ref = req.body.reference.reference;
            let premiumPolicyId = req.body.premiumPolicyId;

            let url = "https://api.paystack.co/transaction/verify/" + ref;
            var client = new Client();
            var args = {
                headers: { "Authorization": "Bearer sk_test_4abd1bb16878d813b87391105f6975aa72a9bb3c" }
            };
            client.get(url, args, function(data, raw) {
                if (data.status) {
                    // Get premium-payment
                    app.service('premium-payments').get(premiumPolicyId).then(returnPremium => {
                        console.log('Found Premium');
                        // Update premium payment
                        returnPremium.isActive = true;
                        app.service('premium-payments').update(returnPremium._id, returnPremium).then(updatedPremium => {
                            console.log('Updated Premium');
                            // Get Policy
                            app.service('policies').get(updatedPremium.policy._id).then(returnPolicy => {
                                console.log('Found Policy');
                                // Updated policy.
                                returnPolicy.isActive = true;
                                app.service('policies').update(returnPolicy._id, returnPolicy).then(updatedPolicy => {
                                    console.log('Updated Policy');
                                    res.send(updatedPolicy);
                                }).catch(err => {
                                    res.send(err);
                                    next;
                                });
                            }).catch(err => {
                                console.log(err);
                                res.send(err);
                                next;
                            });
                        }).catch(err => {
                            console.log(err);
                            res.send(err);
                            next;
                        });
                    }).catch(err => {
                        res.send(err);
                        next;
                    });
                } else {
                    res.send(data);
                }
            });
        }
    };
};