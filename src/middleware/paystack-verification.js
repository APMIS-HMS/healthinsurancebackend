'use strict';
var Client = require('node-rest-client').Client;

module.exports = function(app) {
    return function(req, res, next) {
        if (req.body.reference !== undefined) {
            let ref = req.body.reference.reference;
            let premiumId = req.body.premiumId;
            console.log(premiumId);

            let url = "https://api.paystack.co/transaction/verify/" + ref;
            var client = new Client();
            var args = {
                headers: { "Authorization": "Bearer sk_test_4abd1bb16878d813b87391105f6975aa72a9bb3c" }
            };
            client.get(url, args, function(data, raw) {
                if (data.status) {
                    // Get premium-payment
                    app.service('premium-payments').get(premiumId).then(returnPremium => {
                        console.log('Found Premium');
                        // Update premium payment
                        returnPremium.isActive = true;
                        returnPremium.paystackResponse = data;
                        app.service('premium-payments').update(returnPremium._id, returnPremium).then(updatedPremium => {
                            const policyCounter = updatedPremium.policies.length;
                            updatedPremium.policies.forEach(function(paidPolicy, i) {
                                console.log(i);
                                i++;
                                // Get Policy
                                app.service('policies').get(paidPolicy.policyCollectionId).then(returnPolicy => {
                                    console.log('Found Policy');
                                    // Updated policy.
                                    returnPolicy.isPaid = true;
                                    app.service('policies').update(returnPolicy._id, returnPolicy).then(updatedPolicy => {
                                        if (policyCounter === i) {
                                            console.log('Updated Policy');
                                            res.send(updatedPolicy);
                                        }
                                    }).catch(err => {
                                        res.send(err);
                                        next;
                                    });
                                }).catch(err => {
                                    console.log(err);
                                    res.send(err);
                                    next;
                                });
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