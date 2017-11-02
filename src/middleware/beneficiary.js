'use strict';

function PolicyIDRecurtion(beneficiaries, principal, policy, res, next, app) {
    policy.principalBeneficiary = principal;
    policy.dependantBeneficiaries = beneficiaries;
    // console.log('__________________Start________________________');
    // console.log(policy);
    // console.log('__________________end________________________');
    console.log(policy);
    app.service('policies').create(policy).then(policyObject => {
        res.send({ policyObject });
        next;
    })
    // var policyValueId = validatePolicyID();
    // return app.service('policies').find({
    //     query: { policyId: policyValueId }
    // }).then(policyItem => {
    //     if (policyItem.data.length == 0) {
    //         beneficiaries.forEach(function(element, n) {
    //             element.policyId = policyValueId + "-" + formatMonthValue(n);
    //         })
    //         policy.policyId = policyValueId;
    //         policy.principalBeneficiary = principal;
    //         policy.dependantBeneficiaries = beneficiaries;
    //         // console.log('__________________Start________________________');
    //         // console.log(policy);
    //         // console.log('__________________end________________________');
    //         app.service('policies').create(policy).then(policyObject => {
    //             res.send({ policyObject });
    //             next;
    //         })
    //     } else {
    //         return PolicyIDRecurtion(value, policy, res, app);
    //     }
    // });
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

function generateLashmaID(app, owner) {
    return app.service('beneficiaries').find({ query: { "platformOwnerId": owner._id } }).then(items => {
        let year = new Date().getFullYear().toString().split('');
        let month = new Date().getMonth() + 1;
        let m = formatMonthValue(month.toString());
        let itemCounter = items.data.length;
        let counter = formatValue(itemCounter.toString());
        let lashmaPlatformNo = [];
        let lashmaPlatformNo1 = owner.shortName + "-" + year[year.length - 2] + "" + year[year.length - 1] + "" + m;
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
        if (req.method == "POST") {
            console.log(req.body);
            let personObj = req.body.person;
            console.log(personObj);
            app.service('people').create(personObj).then(person => {
                
                var beneficiaryDetails = req.body.beneficiary;
                beneficiaryDetails.personId = person;
                app.service('beneficiaries').create(beneficiaryDetails).then(beneficiary => {
                    res.send({ person, beneficiary });
                    next;
                })
            }, error => {
                res.send(error);
            }).catch(err => {
                res.send(err);
                next
            });
        } else {
            var persons = [];
            var beneficiaries = [];
            var counter = 0;
            console.log(req.body.persons);
            req.body.persons.forEach(function (item) {
                counter = counter + 1;
                console.log(counter);
                app.service('people').create(item.person).then(person => {
                    persons.push(person);
                    var beneficiaryDetails = item.beneficiary;
                    beneficiaryDetails.personId = person;
                    app.service('beneficiaries').create(beneficiaryDetails).then(beneficiary => {
                        var beneficiary_policy = {
                            "beneficiary": beneficiary,
                            "relationshipId": item.relationship
                        };

                        beneficiaries.push(beneficiary_policy);

                        if (counter == req.body.persons.length) {
                            PolicyIDRecurtion(beneficiaries, req.body.principal, req.body.policy, res, next, app)
                        }
                    })
                    // generateLashmaID(app, req.body.platform).then(result => {
                    //     counter += 1;
                    //     let lastVal = result[1] + counter;
                    //     let strLastVal = formatValue(lastVal);
                    //     let resultVal = result[0] + "-" + strLastVal;
                    //     beneficiaryDetails.platformOwnerNumber = resultVal;
                    //     app.service('beneficiaries').create(beneficiaryDetails).then(beneficiary => {
                    //         var beneficiary_policy = {
                    //             "beneficiary": beneficiary,
                    //             "relationshipId": item.relationship
                    //         };

                    //         beneficiaries.push(beneficiary_policy);

                    //         if (counter == req.body.persons.length) {
                    //             PolicyIDRecurtion(beneficiaries, req.body.principal, req.body.policy, res, next, app)
                    //         }
                    //     })
                    // });
                }, error => {
                    res.send(error);
                }).catch(err => {
                    res.send(err);
                    next
                });
            });
        }
    };
};