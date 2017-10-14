const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const otpSchema = new Schema({
    number: { type: String, required: true },
    isVerified: { type: Boolean, 'default': false },
    generatedAt: { type: Date, 'default': Date.now },
    verifiedAt: { type: Date, require: false },
    verifiedBy: { type: Schema.Types.ObjectId, require: false },
    phoneNumbers: [{ type: Schema.Types.String }],
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
})
module.exports = otpSchema;