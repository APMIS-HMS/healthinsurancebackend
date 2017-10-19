'use strict';
module.exports = function (app) {
  return function (req, res, next) {
    // Perform actions
    app.service('facilities').find(
      {
        query: {
          'facilityType._id': "59c18f238778c62c9490c2af"
        },
        header:{
            "Authorization":req.headers.authorization
        }
      }).then(payload => {
        res.send(payload);
        next;
      }).
      catch(next);
  };
};
