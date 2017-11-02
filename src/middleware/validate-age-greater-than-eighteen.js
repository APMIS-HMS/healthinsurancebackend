'use strict';
const request = require('request');
var differenceInYears = require('date-fns/difference_in_years');

module.exports = function (app) {
    return function (req, res, next) {
        let inReq = req.query.dateOfBirth;
        var dateOfBirth = new Date(inReq.year, inReq.month-1, inReq.day);
        var result = differenceInYears(
            new Date(),
            dateOfBirth
        );
        res.send({response:result});
        next;
    }
}