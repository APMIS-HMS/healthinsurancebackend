'use strict';
const request = require('request');

module.exports = function(app) {
    return function(req, res, next) {
        let search = req.body.search;
        let platformOwnerId = req.body.platformOwnerId;

        app.service('beneficiaries').find({
            query: {
                'platformOwnerId._id': platformOwnerId,
                $or: [
                    { 'personId.lastName': { $regex: search, '$options': 'i' } },
                    { 'personId.firstName': { $regex: search, '$options': 'i' } },
                ]
            }
        }).then(payload => {
            let ids = [];
            payload.data.forEach(benef => {
                ids.push(benef._id);
            })


            app.service('policies').find({
                query: {
                    $or: [{
                            principalBeneficiary: {
                                $in: ids
                            }
                        },
                        { 'dependantBeneficiaries.beneficiary.personId.firstName': { $regex: search, '$options': 'i' } },
                        { 'dependantBeneficiaries.beneficiary.personId.lastName': { $regex: search, '$options': 'i' } }
                    ]
                }
            }).then(pay => {
                res.send(pay);
            }).catch(next);




        }).catch(next);
    };

    res.send({ response: result });
    next;
}