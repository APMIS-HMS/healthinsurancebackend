const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const providerSchema = new Schema({
    facilityOwnership: { type: Schema.Types.Mixed, require: false },
    facilityType: { type: Schema.Types.Mixed, required: true },
    facilityClass: [{ type: Schema.Types.Mixed, required: false }],
    hefeemaNo: { type: String, required: false },
    hefeemaStatus: { type: String, required: false },
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
})
module.exports = providerSchema;