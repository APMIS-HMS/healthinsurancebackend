const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nextOfKinSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    otherNames: { type: String, required: false },
    sphoneNumber: { type: String, required: false },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: false },
    relationship: { type: Schema.Types.Mixed, required: true },
    title: { type: Schema.Types.Mixed, required: true },
    gender: { type: Schema.Types.Mixed, required: true },
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
})
module.exports = nextOfKinSchema;