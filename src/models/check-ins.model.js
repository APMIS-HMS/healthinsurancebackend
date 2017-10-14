// check-ins-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const otpSchema = require('../viewmodels/otp-model')
  const checkIns = new Schema({
    platformOwnerId: { type: Schema.Types.Mixed, required: true },
    providerFacilityId: { type: Schema.Types.Mixed, required: true },
    beneficiaryId: { type: Schema.Types.Mixed, required: true },
    principalBeneficiaryId: { type: Schema.Types.Mixed, required: true },
    encounterDateTime: { type: Schema.Types.Date, required: true },
    encounterStatus: { type: Schema.Types.Mixed, required: true },
    encounterType: { type: Schema.Types.Mixed, required: true },
    expirationStatus: { type: Schema.Types.Mixed, required: false },
    preAuthorizationRequested: { type: Schema.Types.Mixed, required: false },
    claimStatus: { type: Schema.Types.Mixed, required: true },
    claimType: { type: Schema.Types.Mixed, required: true },
    isTransitionCheckIn: { type: Schema.Types.Boolean, required: false },
    transitionCheckInId: { type: Schema.Types.Mixed, required: false },
    confirmation: { type: Schema.Types.Date, required: false },
    otp: otpSchema,
    checkOut: { type: Schema.Types.Mixed, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('checkIns', checkIns);
};