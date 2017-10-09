// plans-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const premiumSchema = require('../viewmodels/premium-model');

  const plans = new Schema({
    name: { type: String, required: true },
    planType: { type: Schema.Types.Mixed, require: true },
    planOwnerId: { type: Schema.Types.Mixed, require: true },
    facilityId: { type: Schema.Types.Mixed, require: true },
    isActive: { type: Schema.Types.Boolean, require: true, default: true },
    premiums: [ premiumSchema ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

    return mongooseClient.model('plans', plans);
};