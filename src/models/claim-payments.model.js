// claim-payments-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
    const mongooseClient = app.get('mongooseClient');
    const claimDoc = require('../viewmodels/claim-document-model');
    const { Schema } = mongooseClient;
    const claimPayments = new Schema({
        claimNo: { type: String, required: true },
        providerFacilityId: { type: Schema.Types.Mixed, required: true },
        checkedinDetail: { type: Schema.Types.Mixed, required: true },
        CurentClaimStatus: { type: Schema.Types.Mixed, required: false },
        claimType: { type: Schema.Types.Mixed, required: false }, // either fee for service or Capitation.
        claimNote: { type: Schema.Types.Mixed, required: false }, // either fee for service or Capitation.
        approval: { type: Schema.Types.Mixed, required: false },
        medicalPersonelName: { type: Schema.Types.Mixed, required: true },
        medicalPersonelShortName: { type: Schema.Types.Mixed, required: false },
        authorizationCode: { type: String, required: false },
        costingApprovalDocumentation: { type: Number, default: 0 },
        paymentStatus: { type: Schema.Types.Mixed, required: false },
        approvedDocumentation: claimDoc,
        isQueuedForPayment: { type: Boolean, required: true },
        isPaymentMade: { type: Boolean, required: true },
        dateClaimCreated: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    });

    return mongooseClient.model('claimPayments', claimPayments);
};