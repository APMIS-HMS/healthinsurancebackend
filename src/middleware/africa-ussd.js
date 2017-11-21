'use strict';
const bcrypt = require('bcryptjs');
module.exports = function (app) {
    return function (req, res, next) {
        // Perform actions
        // let password = req.query;
        // console.log(password);
        res.send('CON welcome to apmis');
        next;
    }
};
