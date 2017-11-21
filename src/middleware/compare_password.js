'use strict';
const bcrypt = require('bcryptjs');
module.exports = function (app) {
    return function (req, res, next) {
        // Perform actions
        let password = req.query.password;
        let email = req.query.email;
        app.service('users').find({
            query: {
                'email': email
            }
        }).then(payload => {
            if (payload.data.length > 0) {
                let user = payload.data[0];
                bcrypt.compare(password, user.password, function (error, result) {
                    if (error) {
                        res.send(error);
                        next;
                    } else if (result) {
                        res.send(result);
                        next;
                    } else {
                        res.send(false);
                        next;
                    }
                });
            }
        }).catch(err => {
            next;
        });
    }
};
