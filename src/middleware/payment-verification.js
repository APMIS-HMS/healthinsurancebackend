'use strict';
var Client = require('node-rest-client').Client;

function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

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
                console.log(ref);
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
                    // if (response.body.status === "success") {
                    //     //check if the amount is same as amount you wanted to charge just to be very sure
                    //     if (response.body.data.amount === amount_to_charge) {
                    //         console.log("Payment successful");
                    //         //then give value for the payment
                    //     }
                    // }
                    if (data.status === 'success') {
                        // put params in an object so that you don't bother about order.
                        // var fnObj = { app: app, req: req, next: next, premiumId: premiumId, data: data };
                        // getAndUpdatePremium(fnObj);
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
                                                res.jsend.success(updatedPolicy);
                                            }
                                        }).catch(err => {
                                            res.jsend.error(err);
                                            next;
                                        });
                                    }).catch(err => {
                                        console.log(err);
                                        res.jsend.error(err);
                                        next;
                                    });
                                });
                            }).catch(err => {
                                console.log(err);
                                res.jsend.error(err);
                                next;
                            });
                        }).catch(err => {
                            res.jsend.error(err);
                            next;
                        });
                    } else {
                        res.jsend.error(data.message);
                        next;
                    }
                }).on('error', function(err) {
                    console.log('request error', err);
                });
            } else {
                let url = process.env.PAYSTACKVERIFICATIONURL + ref;
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
                                                // res.send(updatedPolicy);
                                                res.jsend.success(updatedPolicy);
                                            }
                                        }).catch(err => {
                                            res.jsend.error(err);
                                            next;
                                        });
                                    }).catch(err => {
                                        console.log(err);
                                        res.jsend.error(err);
                                        next;
                                    });
                                });
                            }).catch(err => {
                                console.log(err);
                                res.jsend.error(err);
                                next;
                            });
                        }).catch(err => {
                            res.jsend.error(err);
                            next;
                        });
                    } else {
                        res.jsend.error(data);
                    }
                });
            }
        } else {
            res.jsend.error('reference property not found');
        }
    };
};