const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const providerSchema = new Schema({
    facilityOwnership: { type: Schema.Types.Mixed, require: false },
    facilityType: { type: Schema.Types.Mixed, required: true },
    facilityClass: [{ type: Schema.Types.String, required: false }],
    hefeemaNo: { type: String, required: false },
    hefeemaStatus: { type: String, required: false },
    lasrraId: { type: String, required: true },
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
})
module.exports = providerSchema;