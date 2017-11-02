'use strict';

const promises = [];

function PolicyIDRecurtion(beneficiaries, principal, policy, res, next, app) {
    // var policyValueId = validatePolicyID();
    // return app.service('policies').find({
    //     query: { policyId: policyValueId }
    // }).then(policyItem => {
    //     if (policyItem.data.length == 0) {
    //         beneficiaries.forEach(function (element, n) {
    //             element.policyId = policyValueId + "-" + formatMonthValue(n);
    //         })
    //         policy.policyId = policyValueId;
    //         policy.principalBeneficiary = principal;
    //         policy.dependantBeneficiaries = beneficiaries;
    //         app.service('policies').create(policy).then(policyObject => {
    //             res.send({ policyObject });
    //             next;
    //         })
    //     }
    //     else {
    //         return PolicyIDRecurtion(value, policy, res, app);
    //     }
    // });
    policy.principalBeneficiary = principal;
    policy.dependantBeneficiaries = beneficiaries;
    app.service('policies').create(policy).then(policyObject => {
        res.send({ policyObject });
        next;
    })
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
    //console.log(id);
    return app.service('beneficiaries').find({ query: { "platformOwnerId": id } }).then(items => {
        let year = new Date().getFullYear().toString().split('');
        let month = new Date().getMonth() + 1;
        let m = ("0" + month).slice(-2);
        let itemCounter = ("000" + items.data.length).slice(-4);
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
        var errorMessage = {
            "State": "Failed",
            "Transaction": "Creating Beneficiary"
        };
        console.log("POST");
        var counter = 0;
        var persons = [];
        var beneficiaries = [];
        let principal = req.body.principal
        console.log(req.body.principal.homeAddress.state);
        app.service('countries').find({
            query:
            {
                'states.name': req.body.principal.homeAddress.state,
                $select: { 'states.$': 1 }
            }
        }).then(country => {
            if (country.data[0] != undefined) {
                let state = country.data[0].states[0];
                delete state.cities;
                delete state.lga;
                principal.homeAddress.state = state;
                var lgaFiltered = country.data[0].states[0].lgs.filter(x => x.name.toLowerCase() === req.body.principal.homeAddress.lga.toLowerCase());
                if (lgaFiltered[0] != undefined) {
                    principal.homeAddress.lga = lgaFiltered[0];
                    app.service('countries').find({
                        query:
                        {
                            'states.name': req.body.principal.stateOfOrigin,
                            $select: { 'states.$': 1 }
                        }
                    }).then(origin => {
                        if (origin.data[0] != undefined) {
                            let stateOfOrigin = origin.data[0].states[0];
                            delete stateOfOrigin.cities;
                            delete stateOfOrigin.lga;
                            principal.stateOfOrigin = stateOfOrigin;
                            var lgaOriginFiltered = origin.data[0].states[0].lgs.filter(x => x.name.toLowerCase() === req.body.principal.lgaOfOrigin.toLowerCase());
                            if (lgaOriginFiltered[0] != undefined) {
                                principal.lgaOfOrigin = lgaOriginFiltered[0];
                                app.service('gender').find({
                                    query:
                                    {
                                        'name': req.body.principal.gender
                                    }
                                }).then(gender => {
                                    if (gender.data[0] != undefined) {
                                        principal.gender = gender.data[0];
                                        app.service('people').create(principal).then(person => {
                                            var beneficiaryDetails = {
                                                "numberOfUnderAge": req.body.principal.numberOfUnderAge,
                                                "platformOwnerId": req.body.principal.platformOwnerId
                                            };
                                            beneficiaryDetails.personId = person;
                                            //console.log(beneficiaryDetails)
                    
                                            app.service('beneficiaries').create(beneficiaryDetails).then(beneficiary => {
                                                // console.log(beneficiary);
                                                req.body.dependent.forEach(function (item) {
                                                    app.service('people').create(item).then(person2 => {
                                                        var beneficiaryDetailDependant = {
                                                            "numberOfUnderAge": item.numberOfUnderAge,
                                                            "platformOwnerId": item.platformOwnerId
                                                        };
                    
                                                        beneficiaryDetailDependant.personId = person2;
                                                        app.service('beneficiaries').create(beneficiaryDetailDependant).then(beneficiary2 => {
                                                            var beneficiary_policy = {
                                                                "beneficiary": beneficiary2,
                                                                "relationshipId": item.relationship
                                                            };
                    
                                                            beneficiaries.push(beneficiary_policy);
                                                            counter += 1;
                    
                                                            if (counter == req.body.dependent.length) {
                                                                PolicyIDRecurtion(beneficiaries, beneficiary, req.body.policy, res, next, app)
                                                            }
                                                        })
                    
                                                        // generateLashmaID(app, item.platformOwnerId).then(result1 => {
                                                        //     counter += 1;
                                                        //     let lastVal1 = result1[1] + counter;
                                                        //     let strLastVal1 = formatValue(lastVal1);
                                                        //     let resultVal1 = result1[0] +"-"+ strLastVal1;
                                                        //     beneficiaryDetailDependant.platformOwnerNumber = resultVal1;
                                                        //     app.service('beneficiaries').create(beneficiaryDetailDependant).then(beneficiary2 => {
                                                        //         var beneficiary_policy = {
                                                        //             "beneficiary": beneficiary2,
                                                        //             "relationshipId": item.relationship
                                                        //         };
                    
                                                        //         beneficiaries.push(beneficiary_policy);
                    
                                                        //         if (counter == req.body.dependent.length) {
                                                        //             PolicyIDRecurtion(beneficiaries, beneficiary, req.body.policy, res, next, app)
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
                                            });
                                            // generateLashmaID(app, req.body.principal.platformOwnerId).then(result => {
                                            //     console.log(result);
                                            //     var lastVal = result[1] + 1;
                                            //     let strLastVal = formatValue(lastVal);
                                            //     let resultVal = result[0] +"-"+ strLastVal;
                                            //     beneficiaryDetails.platformOwnerNumber = resultVal;
                                            //     app.service('beneficiaries').create(beneficiaryDetails).then(beneficiary => {
                                            //         req.body.dependent.forEach(function (item) {
                                            //             app.service('people').create(item).then(person2 => {
                                            //                 var beneficiaryDetailDependant = {
                                            //                     "numberOfUnderAge": item.numberOfUnderAge,
                                            //                     "platformOwnerId": item.platformOwnerId
                                            //                 };
                                            //                 beneficiaryDetailDependant.personId = person2;
                                            //                 return generateLashmaID(app, item.platformOwnerId).then(result1 => {
                                            //                     counter += 1;
                                            //                     let lastVal1 = result1[1] + counter;
                                            //                     let strLastVal1 = formatValue(lastVal1);
                                            //                     let resultVal1 = result1[0] +"-"+ strLastVal1;
                                            //                     beneficiaryDetailDependant.platformOwnerNumber = resultVal1;
                                            //                     app.service('beneficiaries').create(beneficiaryDetailDependant).then(beneficiary2 => {
                                            //                         var beneficiary_policy = {
                                            //                             "beneficiary": beneficiary2,
                                            //                             "relationshipId": item.relationship
                                            //                         };
                    
                                            //                         beneficiaries.push(beneficiary_policy);
                    
                                            //                         if (counter == req.body.dependent.length) {
                                            //                             PolicyIDRecurtion(beneficiaries, beneficiary, req.body.policy, res, next, app)
                                            //                         }
                                            //                     })
                                            //                 });
                                            //             }, error => {
                                            //                 res.send(error);
                                            //             }).catch(err => {
                                            //                 res.send(err);
                                            //                 next
                                            //             });
                                            //         });
                                            //     })
                                            // });
                                        }, error => {
                                            res.send(error);
                                        }).catch(err => {
                                            res.send(err);
                                            next
                                        });
                                    } else {
                                        errorMessage.Details = req.body.principal.gender + " donot exist as a Gender";
                                        errorMessage.Time = new Date();
                                        res.send(errorMessage);
                                    }

                                })

                            } else {
                                errorMessage.Details = req.body.principal.lgaOfOrigin + " donot exist as a LGA State of Origin";
                                errorMessage.Time = new Date();
                                res.send(errorMessage);
                            }
                        } else {
                            errorMessage.Details = req.body.principal.stateOfOrigin + " donot exist as a State of Origin";
                            errorMessage.Time = new Date();
                            res.send(errorMessage);
                        }
                    })
                }
                else {
                    errorMessage.Details = req.body.principal.homeAddress.lga + " donot exist as a Residential LGA";
                    errorMessage.Time = new Date();
                    res.send(errorMessage);
                }
            }
            else {
                errorMessage.Details = req.body.principal.homeAddress.state + " donot exist as a Residential State";
                errorMessage.Time = new Date();
                res.send(errorMessage);
            }
        })
    };
};
