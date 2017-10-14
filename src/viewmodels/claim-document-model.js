const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const docSchema = new Schema({
    clinicalDocument: { type: Schema.Types.Mixed, required: false },
    response: { type: Schema.Types.Mixed, required: false },
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
})
module.exports = docSchema;