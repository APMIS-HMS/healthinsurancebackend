'use strict';

var SPONSORSHIP = [
    { 'id': 1, 'name': 'Self' },
    { 'id': 2, 'name': 'Organization' }
];

function PolicyIDRecurtion(beneficiaries, principal, policy, res, next, app) {
    policy.principalBeneficiary = principal;
    policy.dependantBeneficiaries = beneficiaries;
    app.service('policies').create(policy).then(policyObject => {
        res.send({ policyObject });
        next;
    })
};


module.exports = function (app) {
    return function (req, res, next) {
        var errorMessage = {
            "State": "Failed",
            "Transaction": "Creating Beneficiary"
        };

        var counter = 0;
        var persons = [];
        var reqPolicy = req.body.policy;
        var reqbeneficiaries = req.body.dependent;
        var beneficiaries = [];
        var principal = req.body.principal
        app.service('countries').find({
            query:
            {
                'states.name': { $regex: req.body.principal.homeAddress.state.toString(), '$options': 'i' },
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
                            'states.name': { $regex: req.body.principal.stateOfOrigin.toString(), '$options': 'i' },
                            $select: { 'states.$': 1 }
                        }
                    }).then(origin => {
                        if (origin.data[0] != undefined) {
                            var lgaOriginFiltered = origin.data[0].states[0].lgs.filter(x => x.name.toLowerCase() === req.body.principal.lgaOfOrigin.toLowerCase());
                            if (lgaOriginFiltered[0] != undefined) {
                                principal.lgaOfOrigin = lgaOriginFiltered[0];
                                let stateOfOrigin = origin.data[0].states[0];
                                delete stateOfOrigin.cities;
                                delete stateOfOrigin.lgs;
                                principal.stateOfOrigin = stateOfOrigin;
                                app.service('gender').find({
                                    query:
                                    {
                                        'name': { $regex: req.body.principal.gender.toString(), '$options': 'i' }
                                    }
                                }).then(gender => {
                                    if (gender.data[0] != undefined) {
                                        principal.gender = gender.data[0];

                                        app.service('titles').find({
                                            query:
                                            {
                                                'name': { $regex: req.body.principal.title.toString(), '$options': 'i' }
                                            }
                                        }).then(title => {
                                            if (title.data[0] != undefined) {
                                                principal.title = title.data[0];
                                                app.service('marital-status').find({
                                                    query:
                                                    {
                                                        'name': { $regex: req.body.principal.maritalStatus.toString(), '$options': 'i' }
                                                    }
                                                }).then(maritalStatuses => {
                                                    if (maritalStatuses.data[0] != undefined) {
                                                        principal.maritalStatus = maritalStatuses.data[0];
                                                        app.service('facilities').find({
                                                            query:
                                                            {
                                                                'platformOwnerId.name': { $regex: req.body.principal.platformOwner.toString(), '$options': 'i' }
                                                            }
                                                        }).then(facilities => {
                                                            if (facilities.data[0] != undefined) {
                                                                principal.platformOwnerId = facilities.data[0].platformOwnerId;
                                                                reqbeneficiaries.forEach(function (reqItem, index) {

                                                                    app.service('countries').find({
                                                                        query:
                                                                        {
                                                                            'states.name': { $regex: reqItem.stateOfOrigin.toString(), '$options': 'i' },
                                                                            $select: { 'states.$': 1 }
                                                                        }
                                                                    }).then(bOrigin => {
                                                                        if (bOrigin.data[0] != undefined) {
                                                                            var bLgaOriginFiltered = bOrigin.data[0].states[0].lgs.filter(x => x.name.toLowerCase() === reqItem.lgaOfOrigin.toLowerCase());
                                                                            if (bLgaOriginFiltered[0] != undefined) {
                                                                                reqItem.lgaOfOrigin = bLgaOriginFiltered[0];
                                                                                let bStateOfOrigin = bOrigin.data[0].states[0];
                                                                                delete bStateOfOrigin.cities;
                                                                                delete bStateOfOrigin.lgs;
                                                                                reqItem.stateOfOrigin = bStateOfOrigin;
                                                                                app.service('gender').find({
                                                                                    query:
                                                                                    {
                                                                                        'name': { $regex: reqItem.gender.toString(), '$options': 'i' }
                                                                                    }
                                                                                }).then(bGender => {
                                                                                    if (bGender.data[0] != undefined) {
                                                                                        reqItem.gender = bGender.data[0];

                                                                                        app.service('titles').find({
                                                                                            query:
                                                                                            {
                                                                                                'name': { $regex: reqItem.title.toString(), '$options': 'i' }
                                                                                            }
                                                                                        }).then(bTitle => {
                                                                                            if (bTitle.data[0] != undefined) {
                                                                                                reqItem.title = bTitle.data[0];
                                                                                                app.service('marital-status').find({
                                                                                                    query:
                                                                                                    {
                                                                                                        'name': { $regex: reqItem.maritalStatus.toString(), '$options': 'i' }
                                                                                                    }
                                                                                                }).then(bMaritalStatuses => {
                                                                                                    if (bMaritalStatuses.data[0] != undefined) {
                                                                                                        reqItem.maritalStatus = bMaritalStatuses.data[0];

                                                                                                        app.service('relationships').find({
                                                                                                            query:
                                                                                                            {
                                                                                                                'name': { $regex: reqItem.relationship.toString(), '$options': 'i' }
                                                                                                            }
                                                                                                        }).then(bRelationship => {
                                                                                                            if (bRelationship.data[0] != undefined) {
                                                                                                                reqItem.relationshipId = bRelationship.data[0];
                                                                                                                if (reqbeneficiaries.length == index + 1) {

                                                                                                                    app.service('facilities').find({
                                                                                                                        query:
                                                                                                                        {
                                                                                                                            'platformOwnerId.name': { $regex: reqItem.platformOwner.toString(), '$options': 'i' }
                                                                                                                        }
                                                                                                                    }).then(bPlatformOwner => {
                                                                                                                        if (bPlatformOwner.data[0] != undefined) {
                                                                                                                            reqItem.platformOwnerId = bPlatformOwner.data[0].platformOwnerId;
                                                                                                                            app.service('facilities').find({
                                                                                                                                query:
                                                                                                                                {
                                                                                                                                    'hia.nhisNumber': { $regex: reqPolicy.nhisNumber.toString(), '$options': 'i' }
                                                                                                                                }
                                                                                                                            }).then(hias => {
                                                                                                                                if (hias.data[0] != undefined) {
                                                                                                                                    reqPolicy.hiaId = {
                                                                                                                                        "name": hias.data[0].name,
                                                                                                                                        "_id": hias.data[0]._id,
                                                                                                                                        "hia": hias.data[0].hia
                                                                                                                                    };
                                                                                                                                    app.service('facilities').find({
                                                                                                                                        query:
                                                                                                                                        {
                                                                                                                                            'provider.providerId': { $regex: reqPolicy.provider.toString(), '$options': 'i' }
                                                                                                                                        }
                                                                                                                                    }).then(Providers => {
                                                                                                                                        if (Providers.data[0] != undefined) {
                                                                                                                                            reqPolicy.providerId = Providers.data[0].provider;
                                                                                                                                            app.service('plan-types').find({
                                                                                                                                                query:
                                                                                                                                                {
                                                                                                                                                    'name': { $regex: reqPolicy.planType.toString(), '$options': 'i' }
                                                                                                                                                }
                                                                                                                                            }).then(planTypes => {
                                                                                                                                                if (planTypes.data[0] != undefined) {
                                                                                                                                                    reqPolicy.planTypeId = planTypes.data[0];

                                                                                                                                                    app.service('plans').find({
                                                                                                                                                        query:
                                                                                                                                                        {
                                                                                                                                                            'name': { $regex: reqPolicy.plan.toString(), '$options': 'i' }
                                                                                                                                                        }
                                                                                                                                                    }).then(plans => {
                                                                                                                                                        if (plans.data[0] != undefined) {
                                                                                                                                                            
                                                                                                                                                            reqPolicy.planId = {
                                                                                                                                                                "_id": plans.data[0]._id,
                                                                                                                                                                "name": plans.data[0].name
                                                                                                                                                            };
                                                                                                                                                            let premium = plans.data[0].premiums.filter(x => x.category.name == reqPolicy.premiumPackage);
                                                                                                                                                            if (premium[0] != undefined) {
                                                                                                                                                                reqPolicy.premiumPackageId = premium[0];

                                                                                                                                                                app.service('premium-types').find({
                                                                                                                                                                    query:
                                                                                                                                                                    {
                                                                                                                                                                        'name': { $regex: reqPolicy.premiumCategory.toString(), '$options': 'i' }
                                                                                                                                                                    }
                                                                                                                                                                }).then(premiumCategory => {
                                                                                                                                                                    if (premiumCategory.data[0] != undefined) {
                                                                                                                                                                        reqPolicy.premiumCategoryId = premiumCategory.data[0];

                                                                                                                                                                        let sponsorshipItem = SPONSORSHIP.filter(x => x.name.toLowerCase() == reqPolicy.sponsorship.toLowerCase());
                                                                                                                                                                        if (sponsorshipItem[0] != undefined) {

                                                                                                                                                                            app.service('facilities').find({
                                                                                                                                                                                query:
                                                                                                                                                                                {
                                                                                                                                                                                    'platformOwnerId.name': { $regex: reqPolicy.platformOwner.toString(), '$options': 'i' }
                                                                                                                                                                                }
                                                                                                                                                                            }).then(pPlatformOwner => {
                                                                                                                                                                                if (pPlatformOwner.data[0] != undefined) {
                                                                                                                                                                                    reqPolicy.platformOwnerId = pPlatformOwner.data[0].platformOwnerId;
                                                                                                                                                                                    reqPolicy.sponsorshipId = sponsorshipItem[0];
                                                                                                                                                                                    var beneficiaryDetails = {
                                                                                                                                                                                        "numberOfUnderAge": principal.numberOfUnderAge,
                                                                                                                                                                                        "platformOwnerId": principal.platformOwnerId
                                                                                                                                                                                    };

                                                                                                                                                                                    app.service('people').create(principal).then(person => {

                                                                                                                                                                                        beneficiaryDetails.personId = person;
                                                                                                                                                                                        app.service('beneficiaries').create(beneficiaryDetails).then(beneficiary => {
                                                                                                                                                                                            reqbeneficiaries.forEach(function (item) {
                                                                                                                                                                                                var beneficiaryDetailDependant = {
                                                                                                                                                                                                    "numberOfUnderAge": item.numberOfUnderAge,
                                                                                                                                                                                                    "platformOwnerId": item.platformOwnerId
                                                                                                                                                                                                };
                                                                                                                                                                                                var beneficiary_policy = {
                                                                                                                                                                                                    "relationshipId": item.relationship
                                                                                                                                                                                                };
                                                                                                                                                                                                app.service('people').create(item).then(person2 => {
                                                                                                                                                                                                    beneficiaryDetailDependant.personId = person2;
                                                                                                                                                                                                    app.service('beneficiaries').create(beneficiaryDetailDependant).then(beneficiary2 => {
                                                                                                                                                                                                        beneficiary_policy.beneficiary = beneficiary2;
                                                                                                                                                                                                        beneficiaries.push(beneficiary_policy);
                                                                                                                                                                                                        counter += 1;

                                                                                                                                                                                                        if (counter == req.body.dependent.length) {
                                                                                                                                                                                                            PolicyIDRecurtion(beneficiaries, beneficiary, reqPolicy, res, next, app)
                                                                                                                                                                                                        }
                                                                                                                                                                                                    })

                                                                                                                                                                                                }, error => {
                                                                                                                                                                                                    res.send(error);
                                                                                                                                                                                                }).catch(err => {
                                                                                                                                                                                                    res.send(err);
                                                                                                                                                                                                    next
                                                                                                                                                                                                });
                                                                                                                                                                                            });
                                                                                                                                                                                        });

                                                                                                                                                                                    }, error => {
                                                                                                                                                                                        res.send(error);
                                                                                                                                                                                    }).catch(err => {
                                                                                                                                                                                        res.send(err);
                                                                                                                                                                                        next
                                                                                                                                                                                    });

                                                                                                                                                                                } else {
                                                                                                                                                                                    errorMessage.Details = reqPolicy.platformOwner + " donot exist as a Policy PlatformOwner";
                                                                                                                                                                                    errorMessage.Time = new Date();
                                                                                                                                                                                    res.send(errorMessage);
                                                                                                                                                                                }

                                                                                                                                                                            })
                                                                                                                                                                        } else {
                                                                                                                                                                            errorMessage.Details = reqPolicy.sponsorship + " donot exist as a Sponsorship";
                                                                                                                                                                            errorMessage.Time = new Date();
                                                                                                                                                                            res.send(errorMessage);
                                                                                                                                                                        }

                                                                                                                                                                    } else {
                                                                                                                                                                        errorMessage.Details = reqPolicy.premiumCategory + " donot exist as a Premium Category";
                                                                                                                                                                        errorMessage.Time = new Date();
                                                                                                                                                                        res.send(errorMessage);
                                                                                                                                                                    }
                                                                                                                                                                });

                                                                                                                                                            } else {
                                                                                                                                                                errorMessage.Details = reqPolicy.premiumPackage + " donot exist as a Premium Package";
                                                                                                                                                                errorMessage.Time = new Date();
                                                                                                                                                                res.send(errorMessage);
                                                                                                                                                            }


                                                                                                                                                        } else {
                                                                                                                                                            errorMessage.Details = reqPolicy.plan + " donot exist as an Plan";
                                                                                                                                                            errorMessage.Time = new Date();
                                                                                                                                                            res.send(errorMessage);
                                                                                                                                                        }
                                                                                                                                                    });
                                                                                                                                                } else {
                                                                                                                                                    errorMessage.Details = reqPolicy.planType + " donot exist as an PlanType";
                                                                                                                                                    errorMessage.Time = new Date();
                                                                                                                                                    res.send(errorMessage);
                                                                                                                                                }
                                                                                                                                            });
                                                                                                                                        } else {
                                                                                                                                            errorMessage.Details = reqPolicy.provider + " donot exist as a Provider";
                                                                                                                                            errorMessage.Time = new Date();
                                                                                                                                            res.send(errorMessage);
                                                                                                                                        }
                                                                                                                                    });
                                                                                                                                } else {
                                                                                                                                    errorMessage.Details = reqPolicy.nhisNumber + " donot exist as an NHIS Number";
                                                                                                                                    errorMessage.Time = new Date();
                                                                                                                                    res.send(errorMessage);
                                                                                                                                }
                                                                                                                            });

                                                                                                                        } else {
                                                                                                                            errorMessage.Details = "Index " + index + " Beneficial " + "'" + reqItem.platformOwner + "'" + + " donot exist as an PlatformOwner";
                                                                                                                            errorMessage.Time = new Date();
                                                                                                                            res.send(errorMessage);
                                                                                                                        }
                                                                                                                    })
                                                                                                                }

                                                                                                            } else {
                                                                                                                errorMessage.Details = "Index " + index + " Beneficial " + "'" + reqItem.relationship + "'" + " donot exist as a Marital Status";
                                                                                                                errorMessage.Time = new Date();
                                                                                                                res.send(errorMessage);
                                                                                                            }
                                                                                                        })

                                                                                                    } else {
                                                                                                        errorMessage.Details = "Index " + index + " Beneficial " + "'" + reqItem.maritalStatus + "'" + " donot exist as a Marital Status";
                                                                                                        errorMessage.Time = new Date();
                                                                                                        res.send(errorMessage);
                                                                                                    }
                                                                                                })
                                                                                            } else {
                                                                                                errorMessage.Details = "Index " + index + " Beneficial " + "'" + reqItem.title + "'" + " donot exist as a Title";
                                                                                                errorMessage.Time = new Date();
                                                                                                res.send(errorMessage);
                                                                                            }
                                                                                        })

                                                                                    } else {
                                                                                        errorMessage.Details = "Index " + index + " Beneficial " + "'" + reqItem.gender + "'" + " donot exist as a Gender";
                                                                                        errorMessage.Time = new Date();
                                                                                        res.send(errorMessage);
                                                                                    }

                                                                                })

                                                                            } else {
                                                                                errorMessage.Details = "Index " + index + " Beneficial " + "'" + reqItem.lgaOfOrigin + "'" + " donot exist as a LGA State of Origin";
                                                                                errorMessage.Time = new Date();
                                                                                res.send(errorMessage);
                                                                            }
                                                                        } else {
                                                                            errorMessage.Details = "Index " + index + " Beneficial " + "'" + reqItem.stateOfOrigin + "'" + " donot exist as a State of Origin";
                                                                            errorMessage.Time = new Date();
                                                                            res.send(errorMessage);
                                                                        }
                                                                    })
                                                                })

                                                            } else {
                                                                errorMessage.Details = req.body.principal.platformOwner + " donot exist as a PlatformOwner";
                                                                errorMessage.Time = new Date();
                                                                res.send(errorMessage);
                                                            }
                                                        })

                                                    } else {
                                                        errorMessage.Details = req.body.principal.maritalStatus + " donot exist as a Marital Status";
                                                        errorMessage.Time = new Date();
                                                        res.send(errorMessage);
                                                    }
                                                })
                                            } else {
                                                errorMessage.Details = req.body.principal.title + " donot exist as a Title";
                                                errorMessage.Time = new Date();
                                                res.send(errorMessage);
                                            }
                                        })
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
