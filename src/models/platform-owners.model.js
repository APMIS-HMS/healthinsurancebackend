// platform-owners-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const contactSchema = require('../viewmodels/contact');
  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;

  const platformOwners = new Schema({
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    website: { type: String, required: true },
    contact: { contactSchema },
    contactUser: { type: Schema.Types.ObjectId, 'refs': 'users' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('platformOwners', platformOwners);
};
