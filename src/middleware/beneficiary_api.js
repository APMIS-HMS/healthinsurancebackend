'use strict';
module.exports = function (app) {
    return function (req, res, next) {
        // Perform actions
        app.service('beneficiaries').find(
            {
                query: {
                    'platformOwnerNumber': req.query.lashmaId
                },
                header: {
                    "Authorization": req.headers.authorization
                }
            }).then(payload => {
                var plans = [];
                var element = payload.data[0];
                delete element.platformOwnerId;
                res.send(element);
                next;
            }).
            catch(next);
    };
};
