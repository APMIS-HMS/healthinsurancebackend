'use strict';
module.exports = function (app) {
    return function (req, res, next) {
        let platformOwnerId = req.query.platformOwnerId;
        console.log(platformOwnerId);
        let count = 0;
        app.service('policies').find({
            query: {
                'platformOwnerId._id':platformOwnerId,
                $select: ['dependantBeneficiaries.policyId']
            }
        }).then(payload => {
            // payload.data.forEach(obj => {
            //     count = count + obj.dependantBeneficiaries.length + 1;
            // });


            // for(var i = payload.data.length-1; i>=0; i--){
            //     let tmp = payload.data[i];
            //     count = count + tmp.dependantBeneficiaries.length + 1;
            // }

            var j = payload.data.length;
            while(j--){
                count = count + payload.data[j].dependantBeneficiaries.length + 1;
            }
            res.send(count.toString());
            next;
        }).catch(err => {
            res.send(err)
            next;
        });
    }
};
