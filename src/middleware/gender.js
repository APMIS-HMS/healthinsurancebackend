'use strict';
module.exports = function (app) {
    return function (req, res, next) {
        // Perform actions
        
        app.service('gender').find({}).then(payload => {
                res.send(payload);
            }).
            catch(next);
        };
};
