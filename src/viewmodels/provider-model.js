const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const providerSchema = new Schema({
    facilityOwnership: { type: Schema.Types.Mixed, require: false },
    facilityType: { type: Schema.Types.Mixed, required: true },
    facilityGrade: { type: Schema.Types.Mixed, required: true },
    facilityClass: [{ type: Schema.Types.String, required: false }],
    validityPeriods: [{ type: Schema.Types.Mixed, required: false }],
    hefeemaNumber: { type: String, required: false },
    hefeemaStatus: { type: Schema.Types.Mixed, required: false },
    lasrraId: { type: String, required: true },
    comment: { type: String, required: false },
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
})
module.exports = providerSchema;