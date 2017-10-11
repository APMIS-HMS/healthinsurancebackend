'use strict';

function PolicyIDRecurtion(value, policy, res, app) {
    const policyValueId = validatePolicyID();
    return app.service('policies').find({
        query: { policyId: policyValueId }
    }).then(policyItem => {
        if (policyItem.data.length == 0) {
            let policyValue = policy;
            policyValue.policyId = policyValueId;
            policyValue.principalBeneficiary = value;
            app.service('policies').create(policyValue).then(payload3 => {
                return true;
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

function generateLashmaID(app, owner) {

    return app.service('beneficiaries').find({ query: { "platformOwnerId._id": owner._id } }).then(items => {
        let year = new Date().getFullYear().toString().split('');
        let month = new Date().getMonth();
        let m = formatMonthValue(month.toString());
        let itemCounter = items.data.length + 1;
        let counter = formatValue(itemCounter.toString());

        let lashmaPlatformNo = owner.name + "/" + year[year.length - 2] + "" + +year[year.length - 1] + "" + m + "/" + counter;
        return lashmaPlatformNo;
    }).catch(err => {
        console.log(err);
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
            let personObj = req.body.person;
            app.service('people').create(personObj).then(person => {
                var beneficiaryDetails = req.body.beneficiary;
                beneficiaryDetails.personId = person._id;
                generateLashmaID(app, req.body.platform).then(result => {
                    beneficiaryDetails.platformOwnerNumber = result;
                    app.service('beneficiaries').create(beneficiaryDetails).then(beneficiary => {
                        res.send({ person, beneficiary });
                        next;
                    })
                });
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
            req.body.persons.forEach(function (item) {
                app.service('people').create(item.person).then(person => {
                    persons.push(person);
                    var beneficiaryDetails = item.beneficiary;
                    beneficiaryDetails.personId = person._id;
                    generateLashmaID(app, req.body.platform).then(result => {
                        beneficiaryDetails.platformOwnerNumber = result;
                        app.service('beneficiaries').create(beneficiaryDetails).then(beneficiary => {
                            beneficiaries.push(beneficiary);
                            counter +=1;
                            if(counter == req.body.persons.length){
                                res.send({ persons, beneficiaries });
                                next;
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
        }
    };
};
