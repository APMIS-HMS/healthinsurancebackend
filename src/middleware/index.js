const beneficiary = require('../middleware/beneficiary');
const hia = require('../middleware/hia');
const hia_plans = require('../middleware/hia_plans');
const hia_premiums = require('../middleware/hia_premiums');
const beneficiary_api = require('../middleware/beneficiary_api');
const create_beneficiary_api = require('../middleware/create_beneficiary_api');
const provider = require('../middleware/provider');
const sendSMS = require('../middleware/send-sms');
var multer = require('multer');
const handler = require('feathers-errors/handler');
const logger = require('../hooks/logger');
const fs = require('fs');
var mongoose = require('mongoose');
var Thumbnail = require('thumbnail');

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
                file.path = file.path.replace(pattern, '/')
                return {
                    file: processFile(file)
                }
            }));
        });
    });

    app.post('/lashma-beneficiaries', beneficiary(app));
    app.put('/lashma-beneficiaries', beneficiary(app));
    app.get('/api/hias', hia(app));
    app.get('/api/providers', provider(app));
    app.get('/api/hia-plans', hia_plans(app));
    app.get('/api/hia-premiums', hia_premiums(app));
    app.get('/api/beneficiaries', beneficiary_api(app));
    app.post('/api/beneficiaries', create_beneficiary_api(app));
    app.post('/api/send-sms', sendSMS(app));

    app.post('/uploadexcel', function(req, res) {
        var exceltojson;
        uploadexcel.data.upload(req, res, function(err) {
            if (err) {
                console.log(err)
                res.json({
                    error_code: 1,
                    err_desc: err
                });
                return;
            }
            /** Multer gives us file info in req.file object */
            if (!req.file) {
                console.log('no file')
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