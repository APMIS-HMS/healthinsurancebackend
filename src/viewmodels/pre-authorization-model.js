const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const docModel = require('../viewmodels/document-model');
const resModel = require('../viewmodels/document-response-model');

const PreAuthorizationModelSchema = new Schema({
    document: [docModel],
    response: resModel,
    approvedStatus: { type: Schema.Types.Mixed, require: true },
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
})
module.exports = PreAuthorizationModelSchema;