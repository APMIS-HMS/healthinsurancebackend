'use strict';
var Client = require('node-rest-client').Client;

function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

module.exports = function(app) {
    return function(req, res, next) {
        console.log(req.body);
        if (req.body.amountPaid !== undefined) {
            let premium = req.body;
            app.service('premium-payments').create(premium).then(premium => {
                const premiumCounter = premium.policies.length;
                premium.policies.forEach(function(paidPolicy, i) {
                    i++;
                    // Get Policy
                    app.service('policies').get(paidPolicy.policyCollectionId, {}).then(returnPolicy => {
                        console.log('Found Policy');
                        // Updated policy.
                        if (returnPolicy.validityPeriods.length > 0) {
                            returnPolicy.validityPeriods[returnPolicy.validityPeriods.length - 1].isActive = false;
                        }
                        returnPolicy.isPaid = true;
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
                            if (premiumCounter === i) {
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
        }
    };
};