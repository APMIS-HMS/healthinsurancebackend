// person-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const addressSchema = require('../viewmodels/address-model');
const medicalSchema = require('../viewmodels/medical-model');
const imageSchema = require('../viewmodels/image-model');
const nextOfKinSchema = require('../viewmodels/next-of-kin-model');

module.exports = function(app) {
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const person = new Schema({
        platformOnwerId: { type: Schema.Types.ObjectId, required: false },
        platformId: { type: String, require: false },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        otherNames: { type: String, required: false },
        mothersMaidenName: { type: String, required: false },
        email: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        secondaryPhoneNumber: { type: String, required: false },
        title: { type: Schema.Types.Mixed, required: false },
        profileImageObject: imageSchema,
        homeAddress: addressSchema,
        medical: medicalSchema,
        dateOfBirth: { type: Date, require: false },
        gender: { type: Schema.Types.Mixed, required: false },
        nationality: { type: Schema.Types.Mixed, required: false },
        stateOfOrigin: { type: Schema.Types.Mixed, required: false },
        lgaOfOrigin: { type: Schema.Types.Mixed, required: false },
        townOfOrigin: { type: Schema.Types.Mixed, required: false },
        villageOfOrigin: { type: Schema.Types.Mixed, required: false },
        maritalStatus: { type: Schema.Types.Mixed, required: false },
        nextOfKin: [nextOfKinSchema],
        employees: [{ type: Schema.Types.Mixed, required: false }],
        isActive: { type: Boolean, default: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    });

    return mongooseClient.model('person', person);
};
