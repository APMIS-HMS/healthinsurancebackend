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
                res.send(true);
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

function generateLashmaID(app, owner) {
    console.log(app)
    console.log(owner);
    app.service('beneficiaries').find({ query: { platformOwnerId: owner._id } }).then(items => {
        console.log(22)
        console.log(items);
        let lashmaPlatformId = owner.name + "/" + new Date().getFullYear() + "/" + formatValue(items.data.length + 1);
        return lashmaPlatformId;
    }).catch(err => {
        console.log(err);
    })
};



function formatValue(val) {
    if (val.length <= 4) {
        val = String("0000" + number).slice(-4);
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
        console.log(req.method)
        if (req.method == "POST") {
            let person = req.body.person;
            app.service('people').create(person).then(payload => {
                let beneficiaryDetails = req.body.beneficiary;
                beneficiaryDetails.personId = payload._id;
                beneficiaryDetails.platformOwnerNumber = aphaformator(); //generateLashmaID(app, req.body.platform);
               
                app.service('beneficiaries').create(beneficiaryDetails).then(payload2 => {
                    // PolicyIDRecurtion(payload2, req.body.policy, res, app);
                    res.send({payload, payload2});
                    next;
                })
            }, error => {
                res.send(error);
            }).catch(err => {
                res.send(err);
                next
            });
        } else {
            let person = req.body.person;
            app.service('people').update(person._id, person).then(payload => {
                let beneficiaryDetails = req.body.beneficiary;
                app.service('beneficiaries').update(beneficiaryDetails._id, beneficiaryDetails).then(payload2 => {
                    app.service('policies').find({
                        query: { 'principalBeneficiary._id': beneficiaryDetails._id }
                    }).then(policyItem => {
                        let personDependant = req.body.personDependant;
                        app.service('people').create(personDependant).then(payload3 => {
                            let beneficiaryDependant = req.body.beneficiaryDependant;
                            beneficiaryDependant.personId = payload3._id;
                            beneficiaryDependant.platformOwnerNumber = generateLashmaID(req.body.platform);
                            app.service('beneficiaries').create(beneficiaryDependant).then(payload4 => {
                                policyItemObject = policyItem.data[0];
                                if (policyItemObject.dependantBeneficiaries == undefined) {
                                    policyItemObject.dependantBeneficiaries = [];
                                }
                                policyItemObject.dependantBeneficiaries.push(payload4);
                                app.service('policies').update(policyItemObject._id, policyItemObject).then(payload5 => {
                                    res.send(true);
                                });
                            })
                        }, error => {
                            res.send(error);
                        })
                    })
                })
            }, error => {
                res.send(error);
            }).catch(next);
        }
    };
};
