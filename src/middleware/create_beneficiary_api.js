'use strict';

function PolicyIDRecurtion(beneficiaries, principal, policy, res, next, app) {
    var policyValueId = validatePolicyID();
    return app.service('policies').find({
        query: { policyId: policyValueId }
    }).then(policyItem => {
        if (policyItem.data.length == 0) {
            beneficiaries.forEach(function (element, n) {
                element.policyId = policyValueId + "-" + formatMonthValue(n);
            })
            policy.policyId = policyValueId;
            policy.principalBeneficiary = principal;
            policy.dependantBeneficiaries = beneficiaries;
            app.service('policies').create(policy).then(policyObject => {
                res.send({ policyObject });
                next;
            })
        }
        else {
            return PolicyIDRecurtion(value, policy, res, app);
        }
    });
};

function validatePolicyID() {
    var otp = "";
    var possible = "0123456789";

    for (var i = 0; i <= 5; i++)
        otp += possible.charAt(Math.floor(Math.random() * possible.length));

    return otp;
};

function formatMonthValue(val) {
    if (val.length <= 2) {
        val = String("00" + val).slice(-2);
    }
    return val;
}

function generateLashmaID(app, id) {
    return app.service('beneficiaries').find({ query: { "platformOwnerId._id": id } }).then(items => {
        let year = new Date().getFullYear().toString().split('');
        let month = new Date().getMonth() + 1;
        let m = formatMonthValue(month.toString());
        let itemCounter = items.data.length;
        let lashmaPlatformNo = [];
        let lashmaPlatformNo1 = items.data[0].platformOwnerId.shortName + "-" + year[year.length - 2] + "" + year[year.length - 1] + "" + m;
        //let lashmaPlatformNo = owner.shortName + "-" + year[year.length - 2] + "" + +year[year.length - 1] + "" + m + "-" + counter;
        lashmaPlatformNo.push(lashmaPlatformNo1);
        lashmaPlatformNo.push(itemCounter);
        return lashmaPlatformNo;
    }).catch(err => {
        // console.log(err);
    })
};



function formatValue(val) {
    if (val.length <= 4) {
        val = String("0000" + val).slice(-4);
    }
    return val;
}

function aphaformator() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";

    for (var i = 0; i < 8; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

module.exports = function (app) {
    return function (req, res, next) {
        console.log("POST");
        var counter = 0;
        var persons = [];
        var beneficiaries = [];
        let principal = req.body.principal
        //console.log(principal);
        app.service('people').create(principal).then(person => {
            var beneficiaryDetails = {
                "numberOfUnderAge": req.body.principal.numberOfUnderAge,
                "platformOwnerId": req.body.principal.platformOwnerId
            };
            beneficiaryDetails.personId = person._id;
            //console.log(beneficiaryDetails)
            generateLashmaID(app, req.body.principal.platformOwnerId).then(result => {
                var lastVal = result[1] + 5;
                let strLastVal = formatValue(lastVal);
                let resultVal = result[0] +"-"+ strLastVal;
                beneficiaryDetails.platformOwnerNumber = resultVal;
                app.service('beneficiaries').create(beneficiaryDetails).then(beneficiary => {
                    req.body.dependent.forEach(function (item) {
                        app.service('people').create(item).then(person2 => {
                            var beneficiaryDetailDependant = {
                                "numberOfUnderAge": item.numberOfUnderAge,
                                "platformOwnerId": item.platformOwnerId
                            };
                            beneficiaryDetailDependant.personId = person2._id;
                            generateLashmaID(app, item.platformOwnerId).then(result1 => {
                                counter += 1;
                                let lastVal1 = result1[1] + counter;
                                let strLastVal1 = formatValue(lastVal1);
                                let resultVal1 = result1[0] +"-"+ strLastVal1;
                                beneficiaryDetailDependant.platformOwnerNumber = resultVal1;
                                app.service('beneficiaries').create(beneficiaryDetailDependant).then(beneficiary2 => {
                                    var beneficiary_policy = {
                                        "beneficiary": beneficiary2,
                                        "relationshipId": item.relationship
                                    };

                                    beneficiaries.push(beneficiary_policy);

                                    if (counter == req.body.dependent.length) {
                                        PolicyIDRecurtion(beneficiaries, req.body.principal, req.body.policy, res, next, app)
                                    }
                                })
                            });
                        }, error => {
                            res.send(error);
                        }).catch(err => {
                            res.send(err);
                            next
                        });
                    });
                })
            });
        }, error => {
            res.send(error);
        }).catch(err => {
            res.send(err);
            next
        });
    };
};
