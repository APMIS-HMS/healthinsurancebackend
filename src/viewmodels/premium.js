const mongoose = require('mongoose');
require('mongoose-money'); // require mongoose-money before Schema
const Schema = mongoose.Schema;
const Money = require('moneyjs');

const premiumSchema = new Schema({
    amount: { type: Schema.Types.Money, required: true, index: true },
    duration: { type: Number, required: true },
    unit: { type: Schema.Types.String, required: true },
    durationInDay: { type: Number, required: true },
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
})
module.exports = premiumSchema;