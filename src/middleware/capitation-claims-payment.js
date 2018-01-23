'use strict';
var Client = require('node-rest-client').Client;

module.exports = function(app) {
    return function(req, res, next) {
        if (!!req.body.policies) {
            let policies = req.body.policies;
            let platformOwner = req.body.platformOwnerId;
            let platformOwnerId = req.body.platformOwnerId._id;
            let hia = req.body.hiaId;
            let hiaId = (hia !== undefined) ? hia._id : undefined;
            let provider = req.body.providerId;
            let providerId = (provider !== undefined) ? provider._id : undefined;
            let claimType = req.body.claimType;
            let paidBy = req.body.paidBy;
            let paidByType = req.body.paidByType;
            let amount = req.body.amount;
            let counter = 0;
            let policyLength = policies.length;

            if (policyLength > 0) {
                // Get the recipient details
                app.service('provider-recipients').find({
                    query: { 'providerId': providerId, 'platformOwnerId': platformOwnerId, isRecipientConfirmed: true }
                }).then(result => {
                    if (result.data.length > 0) {
                        let recipient = result.data[0].details.recipient_code;
                        let reason = `Paid ${amount} for ${policies.length} claims`;
                        let url = `${process.env.PAYSTACKBASEURL}transfer`;
                        let secretKey = `Bearer ${process.env.PAYSTACKSECRETKEY}`;
                        let client = new Client();
                        let args = {
                            data: {
                                "source": "balance",
                                "reason": reason,
                                "amount": amount * 100,
                                "recipient": recipient
                            },
                            headers: { "Content-Type": "application/json", "Authorization": secretKey }
                        };
                        // Confirm payment
                        client.post(url, args, function(data, response) {
                            // parsed response body as js object
                            console.log('---------- Raw data--------');
                            console.log(data);
                            console.log('---------- End Raw data--------');
                            if (data.status) {
                                let payload = {
                                    platformOwnerId: platformOwner,
                                    providerId: provider,
                                    hiaId: (hia === undefined) ? undefined : hia,
                                    reference: data.data,
                                    policies: policies,
                                    paidBy: paidBy,
                                    paidByType: paidByType,
                                    claimType: claimType,
                                    amount: amount,
                                    isActive: true
                                };
                                // Create claims-payment
                                app.service('claim-payments').create(payload).then(createdRes => {
                                    if (createdRes._id !== undefined) {
                                        policies.forEach(function(policy, i) {
                                            // Uncheck all items from claims service first
                                            app.service('policies').get(policy).then(policyRes => {
                                                console.log("---------- policyRes --------");
                                                console.log(policyRes);
                                                console.log("---------- End policyRes --------");
                                                policyRes.lastCapitationPaidDate = new Date();
                                                app.service('policies').update(policyRes._id, policyRes).then(policyUpdate => {
                                                    counter++;
                                                    if (counter === policyLength) {
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
                                    }
                                }).catch(err => {
                                    res.send(err);
                                    next
                                });
                            } else {
                                res.jsend.error(data.message);
                                next;
                            }
                        }).on('error', function(err) {
                            console.log('request error', err);
                        });
                    }
                }).catch(err => {
                    console.log(err);
                });
            } else {
                res.jsend.error("Policy array is empty");
                next;
            }
        } else {
            res.jsend.error("Attach policies property to the array");
            next;
        }
    };
};