const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const beneficiaryPolicySchema = new Schema({
    beneficiary: { type: Schema.Types.Mixed, required: true },
    isActive: { type: Schema.Types.Boolean, default: false },
    policyId: { type: String, required: true },
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
})
module.exports = beneficiaryPolicySchema;