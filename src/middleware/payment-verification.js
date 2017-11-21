'use strict';
var Client = require('node-rest-client').Client;

function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

function getAndUpdatePremium(app, req, res, next, premiumId, data) {
    // Get premium-payment
    app.service('premium-payments').get(premiumId).then(returnPremium => {
        console.log('---------- Found Premium --------');
        console.log(returnPremium);
        console.log('---------- End Found Premium --------');
        // Update premium payment
        console.log('Call updated');
        returnPremium.isActive = true;
        returnPremium.paymentResponse = data;
        console.log('Call Update');
        app.service('premium-payments').update(returnPremium._id, returnPremium).then(updatedPremium => {
            const policyCounter = updatedPremium.policies.length;
            console.log('---------- Updated updatedPremium --------');
            console.log(updatedPremium);
            console.log('---------- End Updated updatedPremium --------');
            updatedPremium.policies.forEach(function(paidPolicy, i) {
                i++;
                // Get Policy
                app.service('policies').get(paidPolicy.policyCollectionId, {}).then(returnPolicy => {
                    console.log('Found Policy');
                    // Updated policy.
                    if (returnPolicy.validityPeriods.length > 0) {
                        returnPolicy.validityPeriods[returnPolicy.validityPeriods.length - 1].isActive = false;
                    }
                    returnPolicy.isPaid = true;
                    returnPolicy.premiumPaymentRef = updatedPremium._id;
                    // Find the last index and change isActive to false

                    returnPolicy.validityPeriods.push({
                        duration: returnPolicy.premiumPackageId.duration,
                        category: returnPolicy.premiumCategoryId.name,
                        unit: returnPolicy.premiumPackageId.unit.name,
                        isActive: true,
                        startDate: new Date(),
                        createdAt: new Date(),
                        validTill: addDays(new Date(), returnPolicy.premiumPackageId.unit.days)
                    });
                    // Change principalBeneficiary
                    returnPolicy.principalBeneficiary == returnPolicy.principalBeneficiary._id;

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
}

module.exports = function(app) {
    return function(req, res, next) {
        console.log('Got here');
        if (req.body.reference !== undefined) {
            let payment = req.body.payment;
            let ref = req.body.reference;
            let premiumId = req.body.premiumId;
            console.log('---------- Body --------');
            console.log(req.body);
            console.log('---------- End Body --------');

            if (payment === 'flutterwave') {
                console.log('Make a request');
                var url = "http://flw-pms-dev.eu-west-1.elasticbeanstalk.com/flwv3-pug/getpaidx/api/verify";
                var client = new Client();
                var args = {
                    data: {
                        "SECKEY": process.env.FLUTTERWAVESECRETKEY, //use the secret key from the paybutton generated on the rave dashboard
                        "flw_ref": ref.txRef //use the reference of the payment from the rave checkout after payment
                    },
                    headers: { "Content-Type": "application/json" }
                };
                client.post(url, args, function(data, response) {
                    // parsed response body as js object
                    console.log('---------- Raw data--------');
                    console.log(data);
                    console.log('---------- End Raw data--------');
                    //if (data.status === 'success') {
                    getAndUpdatePremium(app, req, res, next, premiumId, data);
                    // } else {
                    //     resObject = json({
                    //         data: { item1: "item1val", item2: "item2val" },
                    //         anArray: ["item1", "item2"],
                    //         another: "item"
                    //     });
                    //     res.json();
                    //     next;
                    // }
                }).on('error', function(err) {
                    console.log('request error', err);
                });
            } else {
                let url = "https://api.paystack.co/transaction/verify/" + ref;
                var client = new Client();
                var args = {
                    headers: { "Authorization": "Bearer " + process.env.PAYSTACKSECRETKEY }
                };
                console.log(req.body);
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
                                    i++;
                                    // Get Policy
                                    app.service('policies').get(paidPolicy.policyCollectionId, {}).then(returnPolicy => {
                                        console.log('Found Policy');
                                        // Updated policy.
                                        if (returnPolicy.validityPeriods.length > 0) {
                                            returnPolicy.validityPeriods[returnPolicy.validityPeriods.length - 1].isActive = false;
                                        }
                                        returnPolicy.isPaid = true;
                                        returnPolicy.premiumPaymentRef = updatedPremium._id;
                                        // Find the last index and change isActive to false

                                        returnPolicy.validityPeriods.push({
                                            duration: returnPolicy.premiumPackageId.duration,
                                            category: returnPolicy.premiumCategoryId.name,
                                            unit: returnPolicy.premiumPackageId.unit.name,
                                            isActive: true,
                                            startDate: new Date(),
                                            createdAt: new Date(),
                                            validTill: addDays(new Date(), returnPolicy.premiumPackageId.unit.days)
                                        });
                                        // Change principalBeneficiary
                                        returnPolicy.principalBeneficiary == returnPolicy.principalBeneficiary._id;

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
        }
    };
};