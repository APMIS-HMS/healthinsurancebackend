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

        console.log(req.body);
        // let my = Object.keys(req.body[0]);
        res.send('CON' + serviceCode);
        next;
        // if (text == undefined || text == null) {
        //     // This is the first request
        //     let response = 'CON Welcome to APMIS Insurance USSG Gateway \n'
        //     response += '1. Verify Registrationtion \n'
        //     response += '2. Register \n'
        //     response += '3. Get Policy \n'
        //     response += '4. Pay Premium'
        //     res.send(response);
        //     next;
        // }else{
        //     res.send(serviceCode);
        //     next;
        // }
    };
}

