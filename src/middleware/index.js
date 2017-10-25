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
const sendSMS = require('../middleware/send-sms');
var multer = require('multer');
const handler = require('feathers-errors/handler');
const logger = require('../hooks/logger');
const fs = require('fs');
var mongoose = require('mongoose');
var Thumbnail = require('thumbnail');


const excelToJson = require('convert-excel-to-json');
const uploadexcel = require('../helpers/upload-excel');

module.exports = function () {
    const app = this;
    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './public/uploads/image');
        },
        filename: function (req, file, callback) {
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

        thumbnail.ensureThumbnail(file.filename, 100, null, function (err, filename, retVal) {
            const fs = require('fs');
            fs.unlink('./public/uploads/image/' + file.filename, function (err) {
                if (err) return console.log(err);
            });
        });
        return file;
    }

    app.post('/upload-file', function (req, res) {
        uploadProfileImgs(req, res, function (err) {
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



    app.post('/upload-excel', function (req, res) {
        var exceltojson;
        uploadexcel.data.upload(req, res, function (err) {

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
                var bodyObj = [];
                var principal = {};
                var beneficiaries = [];
                var policy = {};
                const result = excelToJson({
                    sourceFile: req.file.path,
                    outputJSON: false
                });
                console.log("Am here");
                result.Sheet1.forEach(function (item, index) {
                    if (index > 0) {
                        
                        if (item.A != undefined && item.B != undefined && item.C != undefined
                            && item.D != undefined && item.E != undefined && item.F != undefined && item.G != undefined
                            && item.H != undefined && item.I != undefined
                            && item.J != undefined && item.K != undefined && item.L != undefined && item.M != undefined
                            && item.N != undefined && item.O != undefined && item.P != undefined && item.Q != undefined
                            && item.R != undefined && item.S != undefined && item.AL != undefined && item.AM != undefined
                            && item.AL != undefined && item.AM != undefined && item.AN != undefined && item.AO != undefined
                            && item.AP != undefined && item.AQ != undefined) {
                            console.log("A");
                            beneficiaries = [];
                            principal = {
                                "dateOfBirth": item.A,
                                "email": item.B,
                                "numberOfUnderAge": item.C,
                                "gender": item.D,
                                "homeAddress": {
                                    "neighbourhood": item.E,
                                    "state": item.F,
                                    "lga": item.G,
                                    "street": item.H
                                },
                                "lastName": item.I,
                                "firstName": item.J,
                                "lgaOfOrigin": item.K,
                                "maritalStatus": item.L,
                                "mothersMaidenName": item.M,
                                "otherNames": item.N,
                                "phoneNumber": item.O,
                                "platformOwnerId": item.P,
                                "stateOfOrigin": item.Q,
                                "title": item.S
                            };
                            policy = {
                                "platformOwnerId": item.AL,
                                "hiaId": item.AM,
                                "providerId": item.AN,
                                "planTypeId": item.AO,
                                "planId": item.AP,
                                "premiumCategoryId": item.AQ

                            };

                        }
                        if (item.S != undefined && item.T != undefined && item.U != undefined && item.V != undefined && item.W != undefined
                            && item.X != undefined && item.Y != undefined && item.Z != undefined && item.AA != undefined && item.AB != undefined
                            && item.AC != undefined && item.AD != undefined && item.AE != undefined && item.AF != undefined && item.AG != undefined) {
                            beneficiaries.push({
                                "dateOfBirth": item.S,
                                "email": item.T,
                                "gender": item.U,
                                "lastName": item.V,
                                "firstName": item.W,
                                "lgaOfOrigin": item.X,
                                "numberOfUnderAge": item.Y,
                                "maritalStatus": item.Z,
                                "mothersMaidenName": item.AA,
                                "otherNames": item.AB,
                                "phoneNumber": item.AC,
                                "platformOwnerId": item.AD,
                                "stateOfOrigin": item.AE,
                                "relationship": item.AF,
                                "title": item.AG,
                                "homeAddress": {
                                    "neighbourhood": item.AH,
                                    "state": item.AI,
                                    "lga": item.AJ,
                                    "street": item.AK
                                }
                            });
                            console.log("B");
                        }
                        if (result.Sheet1[index + 1].A != undefined
                            && result.Sheet1[index + 1].B != undefined
                            && result.Sheet1[index + 1].C != undefined
                            && result.Sheet1[index + 1].D != undefined
                            && result.Sheet1[index + 1].I != undefined
                            && result.Sheet1[index + 1].J != undefined) {
                            bodyObj = {
                                "principal": principal,
                                "dependent": beneficiaries,
                                "policy": policy
                            }
                            console.log("c");

                            var agent = require('superagent-use')(require('superagent'));
                            var prefix = require('superagent-prefix');
                            agent.use(prefix('http://localhost:3031'));

                            res.send(agent.post('/api/beneficiaries').send(bodyObj));
                        }



                    }
                }, this);
                res.json({
                    error_code: 0,
                    err_desc: null,
                    data: result
                });

            } catch (e) {
                res.json({
                    error_code: 1,
                    err_desc: "Corupted excel file"
                });
            }
        });
    });
};
