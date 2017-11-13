'use strict';
module.exports = function (app) {
    return function (req, res, next) {
        // Perform actions
        app.service('users').find(
            {
                query: {
                    'phoneNumber': { $regex: req.query.phonenumber, '$options': 'i' }
                }
            }).then(payload => {
                if (payload.data.length > 0) {
                    var response = { "status": "ACTIVE", "plan": "HOUSEHOLD" }
                }
                res.send(payload);
                next;
            }).
            catch(next);
    };
};
