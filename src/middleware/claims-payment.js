'use strict';
var Client = require('node-rest-client').Client;

module.exports = function(app) {
    return function(req, res, next) {
        if (req.body.platformOwnerId !== undefined || req.body.providerId !== undefined || req.body.hiaId !== undefined) {
            let platformOwner = req.body.platformOwnerId;
            let platformOwnerId = req.body.platformOwnerId._id;
            let hia = req.body.hiaId;
            let hiaId = (hia !== undefined) ? hia._id : undefined;
            let provider = req.body.providerId;
            let providerId = (provider !== undefined) ? provider._id : undefined;
            let claims = req.body.claimIds;
            let claimType = req.body.claimType;
            let paidBy = req.body.paidBy;
            let paidByType = req.body.paidByType;
            let amount = req.body.amount;
            let counter = 0;
            let claimLength = claims.length;

            app.service('provider-recipients').find({
                query: { 'providerId': providerId, 'platformOwnerId': platformOwnerId, isRecipientConfirmed: true }
            }).then(result => {
                if (result.data.length > 0) {
                    let recipient = result.data[0].details.recipient_code;
                    let reason = `Paid ${amount} for ${claims.length} claims`;
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
                        // parsed response body as js object.
                        if (data.status) {
                            let payload = {
                                platformOwnerId: platformOwner,
                                providerId: provider,
                                hiaId: (hia === undefined) ? undefined : hia,
                                reference: data.data,
                                claims: claims,
                                paidBy: paidBy,
                                paidByType: paidByType,
                                claimType: claimType,
                                amount: amount,
                                isActive: true
                            };
                            // Create claims-payment
                            app.service('claim-payments').create(payload).then(createdRes => {
                                if (createdRes._id !== undefined) {
                                    claims.forEach(function(claim, i) {
                                        // Uncheck all items from claims service first
                                        app.service('claims').get(claim).then(claimRes => {
                                            claimRes.isPaid = true;
                                            app.service('claims').update(claimRes._id, claimRes).then(claimUpdate => {
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
            res.jsend.error('Some parameters are missing');
        }
    };
};