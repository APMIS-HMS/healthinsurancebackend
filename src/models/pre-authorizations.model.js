// pre-authorizations-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const claimStatusModel = require('../viewmodels/claim-status-model');
  const claimAlertMessage = require('../viewmodels/claim-message-model');
  const claimDoc = require('../viewmodels/claim-document-model');
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const preAuthorizations = new Schema({
    providerFacilityId: { type: Schema.Types.Mixed, required: true },
    checkedInDetails: { type: Schema.Types.Mixed, required: true },
    documentation: [claimDoc],
    CurentClaimStatus: { type: Schema.Types.Mixed, required: false },
    claimType: { type: Schema.Types.Mixed, required: false }, // either fee for service or Capitation.
    claimNote: { type: Schema.Types.Mixed, required: false }, // either fee for service or Capitation.
    approval: { type: Schema.Types.Mixed, required: false },
    medicalPersonelName: { type: String, required: true },
    medicalPersonelShortName: { type: String, required: false },
    authorizationCode: { type: String, required: false },
    costingApprovalDocumentation: { type: Number, default: 0 },
    paymentStatus: { type: Schema.Types.Mixed, required: false },
    approvedDocumentation: [claimDoc],
    notificationMessage: claimAlertMessage,
    dateClaimCreated: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('preAuthorizations', preAuthorizations);
};
