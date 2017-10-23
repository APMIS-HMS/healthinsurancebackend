// capitation-fees-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const capitationFees = new Schema({
        amount: { type: Number, required: true },
        platformOwnerId: { type: Schema.Types.Mixed, required: true },
        endDate: { type: Date, required: true },
        isActive: { type: Boolean, required: true, default: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    });

    return mongooseClient.model('capitationFees', capitationFees);
};