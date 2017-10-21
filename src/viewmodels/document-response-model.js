const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const docModel = require('../viewmodels/document-model');

const ResponseModelSchema = new Schema({
    by: { type: Schema.Types.String, require: true },
    reason: { type: Schema.Types.String, require: true },
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
})
module.exports = ResponseModelSchema;