const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    street: { type: String, required: true },
    neighbourhood: { type: String, required: true },
    state: { type: Schema.Types.Mixed, required: true },
    lga: { type: Schema.Types.Mixed, required: true },
    city: { type: Schema.Types.Mixed, required: true },
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
})
module.exports = addressSchema;