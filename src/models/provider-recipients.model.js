module.exports = function(app) {
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const providerRecipientsSchema = new Schema({
        platformOwnerId: { type: Schema.Types.Mixed, required: true },
        hiaId: { type: Schema.Types.ObjectId, require: true },
        providerId: { type: Schema.Types.ObjectId, required: true },
        details: { type: Schema.Types.Mixed, required: true },
        isRecipientConfirmed: { type: Schema.Types.Boolean, default: false },
        createdAt: { type: Date, 'default': Date.now },
        updatedAt: { type: Date, 'default': Date.now }
    });

    return mongooseClient.model('providerRecipients', providerRecipientsSchema);
};