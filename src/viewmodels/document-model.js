const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
    type: { type: Schema.Types.String, require: true },
    clinicalDocumentation: { type: Schema.Types.Mixed, require: true },
    approvedStatus: { type: Schema.Types.Mixed, require: true },
    order:{type: Number, require: true},
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
})
module.exports = DocumentSchema;