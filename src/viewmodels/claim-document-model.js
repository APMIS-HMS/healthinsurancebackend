const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const docSchema = new Schema({
    visitType:[{ type: Schema.Types.Mixed, required: false }],
    drugs:[{ type: Schema.Types.Mixed, required: false }],
    investigations:[{ type: Schema.Types.Mixed, required: false }],
    procedures:[{ type: Schema.Types.Mixed, required: false }],
    diagnosis:[{ type: Schema.Types.Mixed, required: false }],
    symptoms:[{ type: Schema.Types.Mixed, required: false }],
    clinicNote:[{ type: Schema.Types.Mixed, required: false }],
    isRequest: { type: Boolean, required: true },
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
})
module.exports = docSchema;