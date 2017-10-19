'use strict';
module.exports = function (app) {
    return function (req, res, next) {
        // Perform actions
        
        app.service('countries').find({}).then(payload => {
                var countries = [];
              countries =  payload.data.filter(function(item){
                    return (item.name.toLowerCase().includes(req.query.name.toLowerCase()))
                })
                res.send(countries);
            }).
            catch(next);
        };
};
