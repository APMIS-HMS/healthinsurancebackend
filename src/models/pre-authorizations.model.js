// pre-authorizations-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const claimStatusModel = require('../viewmodels/claim-status-model');
  const claimAlertMessage = require('../viewmodels/claim-message-model');
  const preAuthDoc = require('../viewmodels/pre-authorization-model');
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const preAuthorizations = new Schema({
    providerFacilityId: { type: Schema.Types.ObjectId, required: true },
    checkedInDetails: { type: Schema.Types.ObjectId, required: true },
    policyId: { type: Schema.Types.ObjectId, required: true },
    documentation: [preAuthDoc],
    approval: { type: Schema.Types.Date, required: false },
    medicalPersonelName: { type: String, required: true },
    medicalPersonelUnit: { type: String, required: true },
    authorizationCode: { type: String, required: false },
    approvedDocumentation: [preAuthDoc],
    notificationMessage: claimAlertMessage,
    dateOfRequest: { type: Date },
    timeOfRequest: { type: Date, default: Date.now },
    isEmergency: { type: Schema.Types.Boolean, 'default':false},
    visityClassId: { type: Schema.Types.Mixed, required:true},
    approvedStatus: { type: Schema.Types.Mixed, require: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('preAuthorizations', preAuthorizations);
};
