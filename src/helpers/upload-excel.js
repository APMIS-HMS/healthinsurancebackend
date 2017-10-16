var multer = require('multer');
const handler = require('feathers-errors/handler');
var mongoose = require('mongoose');
var Thumbnail = require('thumbnail');


var uploadexcel = {};
var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, './public/uploads/excels')
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
  }
});

uploadexcel.upload = multer({ //multer settings
  storage: storage,
  fileFilter : function(req, file, callback) { //file filter
    if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
        return callback(new Error('Wrong extension type'));
    }
    callback(null, true);
}
}).single('excelfile');
/** API path that will upload the files */

exports.data = uploadexcel;
