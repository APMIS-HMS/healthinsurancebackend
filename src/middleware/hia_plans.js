'use strict';
module.exports = function (app) {
    return function (req, res, next) {
        // Perform actions
        app.service('plans').find(
            {
                query: {
                    'platformOwnerId._id': req.query._id
                },
                header: {
                    "Authorization": req.headers.authorization
                }
            }).then(payload => {
                var plans = [];
                payload.data.forEach(function (element, i) {
                    delete element.premiums;
                    delete element.platformOwnerId;
                    delete element.userType;
                    delete element.facilityId;
                    plans.push(element);
                    if (i == payload.data.length - 1) {
                        res.send(plans);
                        next;
                    }
                }, this);
                
            }).
            catch(next);
    };
};
