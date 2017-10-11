const beneficiary = require('../middleware/beneficiary');
var multer = require('multer');
// const profileimage = require('./profileimage');
// const useraccesscontrol = require('./useraccesscontrol');
// const queryservice = require('./queryservice');
// const patientqueryservice = require('./patientqueryservice');
const handler = require('feathers-errors/handler');
// const notFound = require('./not-found-handler');
const logger = require('../hooks/logger');
const fs = require('fs');
var mongoose = require('mongoose');
var Thumbnail = require('thumbnail');

module.exports = function () {
  // Add your custom middleware here. Remember, that
  // in Express the order matters
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
    // let originalDetailFileName = file.filename.split('.')[0] + '-300x300.jpg';
    file.thumbnail = '/uploads/thumbnails/' + originalFileName;
    // file.detailthumbnail = '/public/uploads/detailimages/' + originalDetailFileName;
    var thumbnail = new Thumbnail('./public/uploads/image', './public/uploads/thumbnails');

    thumbnail.ensureThumbnail(file.filename, 100, null, function (err, filename, retVal) {
      const fs = require('fs');
            fs.unlink('./public/uploads/image/' + file.filename, function (err) {
              if (err) return console.log(err);
            });
     });
    // var thumbnail = new Thumbnail('./public/uploads/image', './public/uploads/detailimages');
    // thumbnail.ensureThumbnail(file.filename, 300, null, function (err, filename, retVal) {
    //   const fs = require('fs');

    //   fs.unlink('./public/uploads/image/' + file.filename, function (err) {
    //     if (err) return console.log(err);
    //   });

    // });
    return file;
  }

  app.post('/upload-file', function (req, res) {
    uploadProfileImgs(req, res, function (err) {
      if(err){
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
  //app.use(notFound());
  // app.use(logger(app));
  // app.use(handler());
};
