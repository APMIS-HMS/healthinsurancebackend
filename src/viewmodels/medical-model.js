const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    bloodGroup: { type: String, required: false },
    genotype: { type: String, required: false },
    preMedicalConditions: [{ type: String, required: false }],
    otherPreMedicalCondition: { type: String, required: false },
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
})
module.exports = addressSchema;
