const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const otpSchema = new Schema({
    checkOutBy: { type: Schema.Types.ObjectId, require: true },
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
})
module.exports = otpSchema;