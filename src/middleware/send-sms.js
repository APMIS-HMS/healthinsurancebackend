'use strict';
const request = require('request');

module.exports = function(app) {
    return function(req, res, next) {
        const content = req.query.content;
        const sender = req.query.sender;
        const receiver = req.query.receiver;


        const otpContent = content;
        const url = 'http://portal.bulksmsnigeria.net/api/?username=apmis&password=apmis&message=' + otpContent + '&sender=' + sender + '&mobiles=@@' + receiver + '@@';
        var response = request.get(url);
        return res.send(response);
        next;
    }
}