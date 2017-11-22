'use strict';
const options = {
    apiKey: '2d4e0c15346ba6e810bcfd74ed300cb4042a000fba6effeadbcb775e538bce44',         // Use sandbox API key for sandbox development
    username: 'sandbox',      // Use "sandbox" for sandbox development
};

const AfricasTalking = require('africastalking')(options);
module.exports = function (app) {
    return function (req, res, next) {
        let sessionId = req.body.sessionId;
        let phoneNumber = req.body.phoneNumber;
        let serviceCode = req.body.serviceCode;
        let text = req.body.text;

        if (text == '') {
            // This is the first request. Note how we start the response with CON
            let response = 'CON What would you want to check \n'
            response += '1. My Account \n'
            response += '2. My phone number'
            // res.send(response)
            res.send('CON ' + req.body.phoneNumber);
            next;
        }else{
            res.send('CON ' + req.body.serviceCode);
            next; 
        }
    };

