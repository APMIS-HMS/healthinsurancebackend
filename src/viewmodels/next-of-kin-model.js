const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nextOfKinSchema = new Schema({
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    organisationId: { type: String, required: false },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: false },
    relationship: { type: Schema.Types.ObjectId, required: true },
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
})
module.exports = nextOfKinSchema;