const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const providerSchema = new Schema({
    industry: { type: Schema.Types.Mixed, required: true },
    cin: { type: String, required: true },
    cacNumber: { type: String, required: true },
    registrationDate: { type: Schema.Types.Date, required: true },
    lasrraId: { type: String, required: true },
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
})
module.exports = providerSchema;