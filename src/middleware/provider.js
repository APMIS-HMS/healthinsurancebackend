'use strict';
module.exports = function(app) {
    return function(req, res, next) {
        app.service('facilities').find({
            query: {
                'facilityType.name': "Provider"
            },
            header: {
                "Authorization": req.headers.authorization
            }
        }).then(payload => {
            res.send(payload);
            next;
        }).catch(next);
    };
};