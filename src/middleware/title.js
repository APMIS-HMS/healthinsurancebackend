'use strict';
module.exports = function (app) {
    return function (req, res, next) {
        // Perform actions
        app.service('titles').find({}).then(payload => {
                res.send(payload);
            }).
            catch(next);
        };
};
