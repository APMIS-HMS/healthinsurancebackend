// facilities-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const constactSchema = require('../viewmodels/contact-model');
const providerSchema = require('../viewmodels/provider-model');
const hiaSchema = require('../viewmodels/hia-model');
const employerSchema = require('../viewmodels/employer-model');
const imageSchema = require('../viewmodels/image-model');
const addressSchema = require('../viewmodels/address-model');
const bankDetailSchema = require('../viewmodels/bank-detail');
const toLower = require('../helpers/to-lower');
const walletSchema = require('../viewmodels/wallet-model');
module.exports = function(app) {
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;


    const facilities = new Schema({
        name: { type: String, required: true },
        email: { type: String, required: true, set: toLower },
        phoneNumber: { type: String, required: true },
        businessContact: constactSchema,
        itContact: constactSchema,
        provider: providerSchema,
        hia: hiaSchema,
        employer: employerSchema,
        logo: imageSchema,
        address: addressSchema,
        bankDetails: bankDetailSchema,
        facilityType: { type: Schema.Types.Mixed },
        website: { type: String, required: false },
        shortName: { type: String, required: false },
        verificationToken: { type: String, required: false },
        isTokenVerified: { type: Boolean, 'default': false },
        wallet: walletSchema,
        createdAt: { type: Date, 'default': Date.now },
        updatedAt: { type: Date, 'default': Date.now }
    });

    return mongooseClient.model('facilities', facilities);
};