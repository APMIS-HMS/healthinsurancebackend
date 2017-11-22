'use strict';

module.exports = function (app) {
    return function (req, res, next) {
        let sessionId = req.body.sessionId;
        let phoneNumber = req.body.phoneNumber;
        let serviceCode = req.body.serviceCode;
        let text = req.body.text;

        res.send('CON '+req.body.text);
        next;
    }
};

