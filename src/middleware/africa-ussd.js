'use strict';
const options = {
    apiKey: '2d4e0c15346ba6e810bcfd74ed300cb4042a000fba6effeadbcb775e538bce44',         // Use sandbox API key for sandbox development
    username: 'sandbox',      // Use "sandbox" for sandbox development
};

const AfricasTalking = require('africastalking')(options);
module.exports = function (app) {
    return function (req, res, next) {
        var message = '';

        var sessionId = req.body.sessionId;
        var serviceCode = req.body.serviceCode;
        var phoneNumber = req.body.phoneNumber;
        var text = req.body.text;

        console.log(sessionId, serviceCode, phoneNumber, text);

        var length = text.split('*').length;
        var txt = text.split('*');

        if (text === '') {
            message = 'CON Welcome to APMIS Health Insurance \n';
            message += '1: Verify Registration \n';
            message += '2: Register\n';
            message += '3: Get Policy\n';
            message += '4: Pay Premium';
        }

        // add device
        else if (text === '1') {
            // check if user is agent
            console.log('am here');
            // message = 'CON Enter device IMEI number';
            message = 'END Policy checked';
            var options = text.split('*');
        }
        else if (length === 2 && txt[0] === '1') {
            message = 'CON Enter device color';
        }
        else if (length === 3 && txt[0] === '1') {
            message = 'CON Enter device model\n';
            message += 'eg. Nokia 3310';
        }
        else if (length === 4 && txt[0] === '1') {
            message = 'CON Enter Warranty status\n';
            message += '1) Yes / 2) No';
        }
        else if (length === 5 && txt[0] === '1') {
            message = 'CON Enter Insurance status\n';
            message += '1). Yes / 2). No';
        }
        else if (length === 6 && txt[0] === '1') {
            message = 'CON Is device in stock\n';
            message += '1). Yes / 2). No';
        }
        else if (length === 7 && txt[0] === '1') {
            // commit to db
            message = 'END Device registered';
            var options = text.split('*');

        }

        // add sales person
        else if (text === '2') {
            // check is user is agent
            message = 'CON Enter sales agent name\n';
        }
        else if (length === 2 && txt[0] === '2') {
            message = 'CON Enter sales agent email';
        }
        else if (length === 3 && txt[0] === '2') {
            message = 'CON Enter Agent sales code';
        }
        else if (length === 4 && txt[0] === '2') {
            message = 'CON Enter agent location\n';
            message += 'eg. Kilimani';
        }
        else if (length === 5 && txt[0] === '2') {
            message = 'END Sales agent added';
            var options = text.split('*');

        }


        else if (text === '3') {
            message = 'CON Enter device IMEI number';
        }
        else if (length === 2 && txt[0] === '3') {
            message = 'CON Enter your ID number';
        }
        else if (length === 3 && txt[0] === '3') {
            // check device authenticity
            var options = text.split('*');

            message = 'END You do not have a genuine device';
        }


        else if (text === '4') {
            message = 'CON Enter Sales code';
        }
        else if (length === 2 && txt[0] === '4') {
            message = 'CON Enter Phone IMEI number';
        }
        else if (length === 3 && txt[0] === '4') {
            message = 'CON Enter Buyer ID number';
        }
        else if (length === 4 && txt[0] === '4') {
            message = 'CON Enter Buyer Name';
        }
        else if (length === 5 && txt[0] === '4') {
            message = 'CON Enter Buyer Phone number';
        }
        else if (length === 6 && txt[0] === '4') {
            message = 'END Device sold';
            var options = text.split('*');
        }
        else {
            message = 'END Wrong input';
            // reply with menu
        }

        res.contentType('text/plain');
        res.send(message, 200);

    };
}

