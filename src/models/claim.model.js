// claim-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const claimStatusModel = require('../viewmodels/claim-status-model');
  const claimAlertMessage = require('../viewmodels/claim-message-model');
  const { Schema } = mongooseClient;
  const claim = new Schema({
    enrolleeName: { type: String, required: true },
    enrolleeNumber: { type: String, required: true },
    medicalPersonelName: { type: String, required: true },
    medicalPersonelShortName: { type: String, required: true },
    authorizationId: { type: String, required: false },
    claimCreatedAt:{ type: Date, required: true },
    diagnosisCode:{ type: String, required: false },
    investigationCode:{ type: String, required: false },
    therapyCode:{ type: String, required: false },
    claimStatus:claimStatusModel,
    totalAmount:{ type: Number, default: 0 },
    paymentStatus:{ type: Schema.Types.Mixed, required: false },
    claimClass:{ type: Schema.Types.Mixed, required: false },
    ApprovedDocumentation:{ type: Schema.Types.Mixed, required: false },
    notificationMessage:claimAlertMessage,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('claim', claim);
};
