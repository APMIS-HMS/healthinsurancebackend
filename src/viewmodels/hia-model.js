const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hiaSchema = new Schema({
    nhisNumber: { type: String, required: true },
    cin: { type: String, required: true },
    registrationDate: { type: Schema.Types.Date, required: true },
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
})
module.exports = hiaSchema;