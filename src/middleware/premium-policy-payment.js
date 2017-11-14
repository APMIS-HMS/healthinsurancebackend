'use strict';
var Client = require('node-rest-client').Client;

function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

function getAndUpdatePolicy(app, i, premiumCounter, policy) {
    // Get Policy
    app.service('policies').get(policy.policyCollectionId, {}).then(returnPolicy => {
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
}

module.exports = function(app) {
    return function(req, res, next) {
        console.log(req.protocol);
        console.log(req.get('host'));
        console.log(req.originalUrl);
        console.log(req.headers.host);
        let premium = req.body.premiumPaymentId;
        let ref = req.body.ref;
        let action = req.body.action;
        if (action === 'create') {
            console.log('Create');
            app.service('premium-payments').create(premium).then(premium => {
                const premiumCounter = premium.policies.length;
                premium.policies.forEach(function(paidPolicy, i) {
                    i++;
                    console.log('________Before Recursive Method_______');
                    getAndUpdatePolicy(app, i, premiumCounter, paidPolicy);
                    console.log(i);
                });
            }).catch(err => {
                console.log(err);
                res.send(err);
                next;
            });
        } else if (action === 'update') {
            // This is for batch payment after payment has been done on paystack.
            // Get premium payment
            console.log('Updated');
            app.service('premium-payments').get(premium, {}).then(foundPremium => {
                console.log('Found');
                console.log('_____Premium______');
                console.log(foundPremium);
                console.log('_____End Premium______');
                const premiumCounter = foundPremium.policies.length;
                foundPremium.reference = ref;

                // Update premium payment
                app.service('premium-payments').update(foundPremium._id, foundPremium).then(updatedPremium => {
                    console.log('Updated');
                    console.log('_____ updatedPremium ______');
                    console.log(updatedPremium);
                    console.log('_____End updatedPremium______');
                    let verificationData = {
                        reference: updatedPremium.reference,
                        premiumId: updatedPremium._id
                    };
                    // Call the paystack verification middleware.
                    let url = req.protocol + '://' + req.headers.host + '/paystack-verification';
                    let client = new Client();
                    let args = {
                        data: verificationData,
                        headers: { "Content-Type": "application/json" }
                    };

                    client.post(url, args, function(data, response) {
                        // parsed response body as js object 
                        console.log('_____ data ______');
                        console.log(data);
                        console.log('_____End data');
                        if (data._id) {
                            res.send(data);
                            next;
                        }
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
        }
    };
};