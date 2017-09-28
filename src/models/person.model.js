// person-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const addressSchema = require('../viewmodels/address-model');
const imageSchema = require('../viewmodels/image-model');
const nextOfKinSchema = require('../viewmodels/next-of-kin-model');

module.exports = function(app) {
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const person = new Schema({
        platformOnwerId: { type: String, required: false },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        otherNames: { type: String, required: true },
        otherNames: { type: String, required: true },
        email: { type: String, required: false },
        phoneNumber: { type: String, required: true },
        title: { type: Schema.Types.Mixed, required: false },
        profileImageObject: imageSchema,
        homeAddress: addressSchema,
        dateOfBirth: { type: Date, require: false },
        gender: { type: String, required: true },
        nationality: { type: Schema.Types.Mixed, required: false },
        stateOfOrigin: { type: Schema.Types.Mixed, required: false },
        lgaOfOrigin: { type: Schema.Types.Mixed, required: false },
        maritalStatus: { type: Schema.Types.Mixed, required: false },
        nextOfKin: [nextOfKinSchema],
        organisations: [{ type: Schema.Types.Mixed, required: false }],
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    });

    return mongooseClient.model('person', person);
};