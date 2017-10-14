const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const claimStatusSchema = new Schema({
    message: { type: Schema.Types.Mixed, required: false },
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
})
module.exports = claimStatusSchema;