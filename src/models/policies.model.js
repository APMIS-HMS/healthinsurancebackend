// policies-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const beneficiaryPolicySchema = require('../viewmodels/beneficiary-policy-model');

    const policies = new Schema({
        policyId: { type: String, required: true },
        platformOwnerId: { type: Schema.Types.Mixed, required: true }, // platform owner object
        principalBeneficiary: { type: Schema.Types.ObjectId, required: true }, // platform owner object
        hiaId: { type: Schema.Types.Mixed, required: true }, // lashma/hia
        providerId: { type: Schema.Types.Mixed, required: true }, // provider
        planTypeId: { type: Schema.Types.Mixed, required: true }, // planType
        planId: { type: Schema.Types.ObjectId, required: true }, // plan
        premiumCategoryId: { type: Schema.Types.Mixed, required: true }, // premiumCategory
        premiumPackageId: { type: Schema.Types.Mixed, required: true }, // premiumCategory
        sponsorshipId: { type: Schema.Types.Mixed, required: true }, // premiumCategory
        sponsor: { type: Schema.Types.Mixed, required: false }, // premiumCategory
        dependantBeneficiaries: [beneficiaryPolicySchema],
        validityPeriods: [{ type: Schema.Types.Mixed, required: false }],
        isPaid: { type: Schema.Types.Boolean, default: false },
        isActive: { type: Schema.Types.Boolean, default: false },
        
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    });

    return mongooseClient.model('policies', policies);
};