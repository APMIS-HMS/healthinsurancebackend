'use strict';
module.exports = function (app) {
    return function (req, res, next) {
        let _id = req.query._id;
        let userType = req.query.userType;
        console.log(_id);
        console.log(userType);
        let count = 0;
        let query;
        if(userType === 'Platform Owner'){
            query = {
                'platformOwnerId._id':_id,
                $select: ['dependantBeneficiaries.policyId']
            }
        }else if(userType === 'Health Insurance Agent'){
            query = {
                'hiaId._id':_id,
                $select: ['dependantBeneficiaries.policyId']
            }
        }else if(userType === 'Provider'){
            query = {
                'providerId._id':_id,
                $select: ['dependantBeneficiaries.policyId']
            }
        }else if(userType === 'Employer'){
            query = {
                'sponsor._id':_id,
                $select: ['dependantBeneficiaries.policyId']
            }
        }
        app.service('policies').find({
            query: query
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
            let cn = {
                count: count
            }
            console.log(cn);
            res.send(cn);
            next;
        }).catch(err => {
            res.send(err)
            next;
        });
    }
};
