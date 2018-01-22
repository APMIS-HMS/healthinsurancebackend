'use strict';
var Client = require('node-rest-client').Client;

module.exports = function(app) {
    return function(req, res, next) {
        let accountNumber = '0037507065'
        req.body.accountNumber;
        let bankCode = '063'; // req.body.bankCode;
        let platformOwnerId = req.body.platformOwnerId;
        let providerId = req.body.providerId;
        let hiaId = req.body.hiaId;
        var baseUrl = process.env.PAYSTACKBASEURL;
        var verifyURL = `${baseUrl}bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`;
        var secretKey = `Bearer ${process.env.PAYSTACKSECRETKEY}`;
        var client = new Client();
        var args = {
            headers: { "Content-Type": "application/json", "Authorization": secretKey }
        };
        // Resolve Account Details
        client.get(verifyURL, args, function(data, response) {
            // parsed response body as js object
            if (data.status) {
                let CRURL = `${baseUrl}transferrecipient`;
                args.data = {
                    "type": "nuban",
                    "name": data.data.account_name,
                    "account_number": data.data.account_number,
                    "bank_code": bankCode,
                    "currency": "NGN"
                };
                // Add provider account to wallet
                client.post(CRURL, args, function(cData, response) {
                    // parsed response body as js object
                    console.log('---------- Raw cData--------');
                    console.log(cData);
                    console.log('---------- End Raw cData--------');
                    if (cData.status) {
                        let pPayload = {
                            platformOwnerId: platformOwnerId,
                            hiaId: hiaId,
                            providerId: providerId,
                            details: cData.data,
                            isRecipientConfirmed: true
                        };
                        // Create provider-recipient
                        app.service('provider-recipients').create(pPayload).then(result => {
                            if (result._id !== undefined) {
                                res.jsend.success(cData);
                            }
                        }).catch(err => {
                            console.log(err);
                        });
                    } else {
                        res.jsend.error('There was a problem creating recipient');
                    }
                }).on('error', function(err) {
                    console.log('request error', err);
                });
            } else {
                res.jsend.error('Account number is invalid!');
            }
        }).on('error', function(err) {
            console.log('request error', err);
        });
    }
}