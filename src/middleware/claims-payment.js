module.exports = function(app) {
    return function(req, res, next) {
        if (!!req.body.claims) {
            let claims = req.body.claims;
            const claimLength = claims.length;
            let createdClaims = [];
            let counter = 0;
            if (claimLength > 0) {
                claims.forEach(function(claim, i) {
                    // Uncheck all items from claims service first
                    // claim.is
                    // app.service('claims').update(claim).then(claim => {
                        app.service('claim-payments').create(claim).then(claimsPayment => {
                            counter++;
                            if (counter === claimLength) {
                              const response = {
                                  status: true,
                                  statusCode: 200,
                                  data: createdClaims
                              }
                              res.send(response);
                              return;
                            }
                        }).catch(err => {
                          res.send(err);
                          next
                        });
                    // }).catch(err => {
                    //   res.send(err);
                    //   next
                    // });
                });
            } else {
                let response = {
                    status: false,
                    statusCode: 400,
                    error: 'Claims array is empty',
                    data: null
                };
                res.send(response);
                next;
            }
        } else {
            let response = {
                status: false,
                statusCode: 400,
                error: 'Attach claims property to the array',
                data: null
            };
            res.send(response);
            next;
        }
    };
};
