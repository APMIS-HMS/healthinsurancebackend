// modules-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const accessiblitySchema = require('../viewmodels/accessibility-model');
  const modules = new Schema({
    name: { type: String, required: true },
    accessibilities: [{ type: accessiblitySchema }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('modules', modules);
};
