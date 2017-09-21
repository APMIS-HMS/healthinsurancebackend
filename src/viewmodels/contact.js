const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const imageSchema = require('./image-model');

const contactSchema = new Schema({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    otherNames: { type: String, required: false },
    email: { type: Schema.Types.String, required: true },
    phoneNumber:{ type:Schema.Types.String, required:true},
    position:{ type:Schema.Types.String, required:false},
    image: imageSchema,
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
})
module.exports = contactSchema;