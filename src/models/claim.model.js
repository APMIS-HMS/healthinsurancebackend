// claim-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
    const mongooseClient = app.get('mongooseClient');
    const claimStatusModel = require('../viewmodels/claim-status-model');
    const claimAlertMessage = require('../viewmodels/claim-message-model');
    const claimDoc = require('../viewmodels/claim-document-model');
    const { Schema } = mongooseClient;
    const claim = new Schema({
        claimNo: { type: String, required: true },
        providerFacilityId: { type: Schema.Types.Mixed, required: true },
        checkedinDetail: { type: Schema.Types.Mixed, required: true },
        documentations: [claimDoc],
        CurentClaimStatus: { type: Schema.Types.Mixed, required: false },
        claimType: { type: Schema.Types.Mixed, required: false }, // either fee for service or Capitation.
        claimNote: { type: Schema.Types.Mixed, required: false }, // either fee for service or Capitation.
        approval: { type: Schema.Types.Mixed, required: false },
        medicalPersonelName: { type: Schema.Types.Mixed, required: true },
        medicalPersonelShortName: { type: String, required: false },
        medicalPersonelUnit: { type: String, required: false },
        authorizationCode: { type: String, required: false },
        costingApprovalDocumentation: { type: Number, default: 0 },
        paymentStatus: { type: Schema.Types.Mixed, required: false },
        approvedDocumentation: claimDoc,
        notificationMessage: claimAlertMessage,
        isQueuedForPayment: { type: Boolean, default: false },
        dateClaimCreated: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    });

    return mongooseClient.model('claim', claim);
};