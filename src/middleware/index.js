//-------------USSD API START-------------------

const user_verification = require('../middleware/user_verification');

//-------------USSD API END---------------------
const title = require('../middleware/title');
const country = require('../middleware/country');
const gender = require('../middleware/gender');
const beneficiary = require('../middleware/beneficiary');
const hia = require('../middleware/hia');
const hia_plans = require('../middleware/hia_plans');
const hia_premiums = require('../middleware/hia_premiums');
const beneficiary_api = require('../middleware/beneficiary_api');
const create_beneficiary_api = require('../middleware/create_beneficiary_api');
const provider = require('../middleware/provider');
const claims_payment = require('../middleware/claims-payment');
const claims_payment_pay = require('../middleware/claims-payment-pay');
const sendSMS = require('../middleware/send-sms');
const validateAge = require('../middleware/validate-age-greater-than-eighteen');
const searchPolicy = require('../middleware/seach-policy');
const paymentVerification = require('../middleware/payment-verification');
const premiumCashPayment = require('../middleware/premium-policy-payment');
var multer = require('multer');
const handler = require('feathers-errors/handler');
const logger = require('../hooks/logger');
const fs = require('fs');
var mongoose = require('mongoose');
var Thumbnail = require('thumbnail');
const express = require('express');


const excelToJson = require('convert-excel-to-json');
const uploadexcel = require('../helpers/upload-excel');

module.exports = function() {
    const app = this;
    var storage = multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, './public/uploads/image');
        },
        filename: function(req, file, callback) {
            let name = req.body.filename;
            var autoGeneratedFileName = "";
            if (name == "0" || name === undefined) {
                autoGeneratedFileName = mongoose.Types.ObjectId() + ".jpg";
            } else {
                let originalName = name.split('.')[0] + '.jpg';
                autoGeneratedFileName = originalName;
            }
            callback(null, autoGeneratedFileName);
        },
    });

    var uploadProfileImgs = multer({
        storage: storage
    }).any();
    var thumbnail = new Thumbnail('./public/uploads/image', './public/uploads/thumbnails');

    function processFile(file) {
        let originalFileName = file.filename.split('.')[0] + '-100.jpg';
        file.thumbnail = '/uploads/thumbnails/' + originalFileName;
        var thumbnail = new Thumbnail('./public/uploads/image', './public/uploads/thumbnails');

        thumbnail.ensureThumbnail(file.filename, 100, null, function(err, filename, retVal) {
            const fs = require('fs');
            fs.unlink('./public/uploads/image/' + file.filename, function(err) {
                if (err) return console.log(err);
            });
        });
        return file;
    }

    app.post('/upload-file', function(req, res) {
        uploadProfileImgs(req, res, function(err) {
            if (err) {
                return err;
            }
            var pattern = /\\/ig;
            res.json(req.files.map(file => {
                file.path = file.path.replace(pattern, '/');
                console.log(processFile(file));
                return {
                    file: processFile(file)
                }
            }));
        });
    });


    app.post('/lashma-beneficiaries', beneficiary(app));
    app.put('/lashma-beneficiaries', beneficiary(app));
    app.post('/queue-claims-payment', claims_payment(app));
    app.post('/pay-queued-claims', claims_payment_pay(app));
    app.post('/payment-verification', paymentVerification(app));
    app.post('/premium-cash-payment', premiumCashPayment(app));

    app.get('/api/titles', title(app));
    app.get('/api/genders', gender(app));
    app.get('/api/countries', country(app));
    app.get('/api/hias', hia(app));
    app.get('/api/providers', provider(app));
    app.get('/api/hia-plans', hia_plans(app));
    app.get('/api/hia-premiums', hia_premiums(app));
    app.get('/api/beneficiaries', beneficiary_api(app));
    app.post('/api/beneficiaries', create_beneficiary_api(app));
    app.post('/api/send-sms', sendSMS(app));
    app.get('/api/validate-age', validateAge(app));
    app.get('/api/search-policy', searchPolicy(app));

    //-------------USSD API PLUG START-------------------
    app.get('/api/ussd/verify-user', user_verification(app));
    //-------------USSD API PLUG END-------------------

    app.post('/upload-excel', function(req, res) {
        var exceltojson;
        uploadexcel.data.upload(req, res, function(err) {

            if (err) {
                console.log(err);
                res.json({
                    error_code: 1,
                    err_desc: err
                });
                return;
            }
            /** Multer gives us file info in req.file object */
            if (!req.file) {
                console.log('no file');
                res.json({
                    error_code: 1,
                    err_desc: "No file passed"
                });
                return;
            }
            try {

                const result = excelToJson({
                    sourceFile: req.file.path,
                    outputJSON: false
                });

                //res.send(result);
                let bodyObj = []
                let enrolleeList = [];
                let principal = {};
                let beneficiaries = [];
                let policy = {};
                //console.log(result);
                if (result.Sheet1 !== undefined) {
                    console.log(result);
                    return result.Sheet1.forEach(function(item, index) {
                        if (index > 0) {
                            if (item.A != undefined && item.B != undefined && item.C != undefined &&
                                item.D != undefined && item.E != undefined && item.F != undefined && item.G != undefined &&
                                item.H != undefined && item.I != undefined &&
                                item.J != undefined && item.K != undefined && item.L != undefined && item.M != undefined &&
                                item.N != undefined && item.O != undefined && item.P != undefined && item.P != undefined &&
                                item.Q != undefined && item.AL != undefined && item.AM != undefined &&
                                item.AL != undefined && item.AM != undefined && item.AN != undefined && item.AO != undefined) {
                                console.log('A');
                                beneficiaries = [];
                                principal = {
                                    'dateOfBirth': new Date((item.A).toString()),
                                    'email': item.B,
                                    'gender': item.C,
                                    'homeAddress': {
                                        'neighbourhood': item.D,
                                        'state': item.E,
                                        'lga': item.F,
                                        'street': item.G
                                    },
                                    'lastName': item.H,
                                    'firstName': item.I,
                                    'lgaOfOrigin': item.J,
                                    'maritalStatus': item.K,
                                    'mothersMaidenName': item.L,
                                    'otherNames': item.M,
                                    'phoneNumber': item.N,
                                    'platformOwner': item.O,
                                    'stateOfOrigin': item.P,
                                    'title': item.Q
                                };
                                policy = {
                                    'premiumCategory': item.AI,
                                    'premiumPackage': item.AJ,
                                    'sponsorship': item.AK,
                                    'hia': item.AL,
                                    'facilityType': item.AM,
                                    'planType': item.AN,
                                    'plan': item.AO

                                };
                            }
                            console.log(policy);
                            if (item.S != undefined && item.T != undefined && item.U != undefined && item.V != undefined && item.W != undefined &&
                                item.X != undefined && item.Y != undefined && item.Z != undefined && item.AA != undefined && item.AB != undefined &&
                                item.AC != undefined && item.AD != undefined && item.AE != undefined && item.AF != undefined && item.AG != undefined) {
                                beneficiaries.push({
                                    'dateOfBirth': new Date((item.R).toString()),
                                    'email': item.S,
                                    'gender': item.T,
                                    'lastName': item.U,
                                    'firstName': item.V,
                                    'lgaOfOrigin': item.W,
                                    'maritalStatus': item.X,
                                    'mothersMaidenName': item.Y,
                                    'otherNames': item.Z,
                                    'phoneNumber': item.AA,
                                    'stateOfOrigin': item.AB,
                                    'relationship': item.AC,
                                    'title': item.AD,
                                    'homeAddress': {
                                        'neighbourhood': item.AE,
                                        'state': item.AF,
                                        'lga': item.AG,
                                        'street': item.AH
                                    }
                                });
                                console.log('B');
                            }
                            let counter = index + 1;
                            if (result.Sheet1.length == index + 1) {
                                //console.log('c');
                                //console.log(principal);
                                bodyObj.push({
                                    'principal': principal,
                                    'dependent': beneficiaries,
                                    'policy': policy
                                });
                                console.log(bodyObj);
                                res.send(bodyObj);
                            } else {
                                try {
                                    if (result.Sheet1[counter].A != undefined &&
                                        result.Sheet1[counter].B != undefined &&
                                        result.Sheet1[counter].C != undefined &&
                                        result.Sheet1[counter].D != undefined &&
                                        result.Sheet1[counter].I != undefined &&
                                        result.Sheet1[counter].J != undefined) {
                                        bodyObj.push({
                                            'principal': principal,
                                            'dependent': beneficiaries,
                                            'policy': policy
                                        });
                                    }
                                } catch (Exception) {

                                }
                            }
                        }
                    });
                }


                // res.json({
                //     error_code: 0,
                //     err_desc: null,
                //     data: result
                // });

                // console.log(res);
                // res.send(res);

            } catch (e) {
                res.json({
                    error_code: 1,
                    err_desc: "Corupted excel file"
                });
            }
        });
    });

    //app.use('/download-excel', express.static(path.join(__dirname, 'public')))

};