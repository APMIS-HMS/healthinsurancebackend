// claim-payments-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
    const mongooseClient = app.get('mongooseClient');
    const claimDoc = require('../viewmodels/claim-document-model');
    const { Schema } = mongooseClient;
    const claimPayments = new Schema({
        platformOwnerId: { type: Schema.Types.Mixed, required: true },
        providerId: { type: Schema.Types.Mixed, required: true },
        hiaId: { type: Schema.Types.Mixed, required: false },
        reference: { type: Schema.Types.Mixed, required: false }, // Reference from any payment gateway.
        claims: [{ type: Schema.Types.Mixed, required: false }], // Array of claims for Fee for service.
        policies: [{ type: Schema.Types.Mixed, required: false }], // Array of policies for capitation.
        paidBy: { type: Schema.Types.Mixed, required: true },
        paidByType: { type: Schema.Types.Mixed, required: true }, // Who made payment. either PlatformOwner or Hia
        claimType: { type: Schema.Types.String, required: true }, // Capitation or Fee for service
        amount: { type: Number, required: true }, // Amount to be paid.
        isActive: { type: Boolean, default: false }, // This will be set to true if payment is confirmed.
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    });

    return mongooseClient.model('claimPayments', claimPayments);
};