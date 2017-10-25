// premium-payment-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const premiumPayments = new Schema({
        platformOwnerId: { type: Schema.Types.Mixed, required: true },
        reference: { type: Schema.Types.Mixed, required: true }, // Reference from paystack.
        policy: { type: Schema.Types.Mixed, required: true },
        paidBy: { type: Schema.Types.Mixed, required: true },
        requestedAmount: { type: Number, required: true }, // Amount to be paid from our end.
        amountPaid: { type: Number, required: true }, // Amount paid at paystack's end.
        isActive: { type: Boolean, default: false }, // This will be set to true if payment is confirmed.
        paystackResponse: { type: Schema.Types.Mixed, required: false }, // This is the response from paystack if payment has been made.
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    });

    return mongooseClient.model('premiumPayments', premiumPayments);
};