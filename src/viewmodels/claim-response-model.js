const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const docSchema = new Schema({
    reason:{ type: String, required: false },
    name:{ type: String, required: false },
    Institution:{ type: Schema.Types.Mixed, required: false },
    isReject: { type: Boolean, 'default': false },
    isQuery: { type: Boolean, 'default': false },
    isHold: { type: Boolean, 'default': false },
    isApprove: { type: Boolean, 'default': false },
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
})
module.exports = docSchema;