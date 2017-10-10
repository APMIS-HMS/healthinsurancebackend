// policies-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const beneficiaryPolicySchema = require('../viewmodels/beneficiary-policy-model');

  const policies = new Schema({
    policyId: { type: String, required: true },
    platformOwnerId: { type: Schema.Types.Mixed, required: true }, // platform owner object
    principalBeneficiary: { type: Schema.Types.Mixed, required: true }, // platform owner object
    facilityId: { type: Schema.Types.Mixed, required: true }, // lashma/hia
    dependantBeneficiaries: [beneficiaryPolicySchema],
    isActive: { type: Schema.Types.Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('policies', policies);
};
