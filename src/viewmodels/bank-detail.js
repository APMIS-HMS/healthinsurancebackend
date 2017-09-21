const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bankDetailSchema = new Schema({
    name: { type: String, required: true },
    accountNumber: { type: String, required: true },
    bank: { type: Schema.Types.Mixed, required: true },
    state: { type: Schema.Types.Mixed, required: true },
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
})
module.exports = bankDetailSchema;