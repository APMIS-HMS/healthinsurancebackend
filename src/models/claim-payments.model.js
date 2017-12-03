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
        reference: { type: Schema.Types.Mixed, required: false }, // Reference from any payment gateway.
        claims: [{ type: Schema.Types.Mixed, required: true }], // Array of claim ids.
        paidBy: { type: Schema.Types.Mixed, required: true },
        amount: { type: Number, required: true }, // Amount to be paid.
        isActive: { type: Boolean, default: false }, // This will be set to true if payment is confirmed.
        paymentResponse: { type: Schema.Types.Mixed, required: false }, // This is the response from paystack if payment has been made.
        paymentType: { type: Schema.Types.Mixed, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    });

    return mongooseClient.model('claimPayments', claimPayments);
};