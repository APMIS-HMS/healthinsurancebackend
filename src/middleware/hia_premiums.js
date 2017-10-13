'use strict';
module.exports = function (app) {
    return function (req, res, next) {
        // Perform actions
        app.service('plans').find(
            {
                query: {
                    'platformOwnerId._id': req.query.id
                },
                header: {
                    "Authorization": req.headers.authorization
                }
            }).then(payload => {
                var plans = [];
                var element = payload.data[0];
                delete element.name;
                delete element._id;
                delete element.planType;
                delete element.platformOwnerId;
                delete element.userType;
                delete element.facilityId;
                delete element.updatedAt;
                delete element.createdAt;
                delete element.__v;
                res.send(element);
                next;
            }).
            catch(next);
    };
};
