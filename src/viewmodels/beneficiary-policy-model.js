const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accessibilitySchema = new Schema({
    beneficiary: { type: Schema.Types.Mixed, required: true },
    isActive: { type: Schema.Types.Boolean, default: false },
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
})
module.exports = accessibilitySchema;