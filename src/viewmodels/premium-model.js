const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const premiumSchema = new Schema({
    amount: { type: Schema.Types.Number, required: true, index: true },
    duration: { type: Number, required: true },
    category: { type: Schema.Types.Mixed, required: true },
    unit: { type: Schema.Types.Mixed, required: true },
    durationInDay: { type: Number, required: true },
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
})
module.exports = premiumSchema;