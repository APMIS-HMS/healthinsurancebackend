const { authenticate } = require('feathers-authentication').hooks;
const { populate, discard, pluck, pluckQuery, remove } = require('feathers-hooks-common');
const policyId = require('../../hooks/policy-id');
// const { discard } = require('feathers-hooks-common');


const hiaSchema = {
    include: [{
        service: 'facilities',
        nameAs: 'hia',
        parentField: 'hiaId',
        childField: 'hia._id'
    }]
};

// const principalBeneficiarySchema = {
//   include: [{
//     service: 'beneficiaries',
//     nameAs: 'principalBeneficiary',
//     parentField: 'principalBeneficiary',
//     childField: '_id'
//   }]
// };

const principalBeneficiarySchema = {
    include: [{
        service: 'beneficiaries',
        nameAs: 'principalBeneficiary',
        parentField: 'principalBeneficiary',
        childField: '_id',
        query: {
            $select: ['platformOwnerId.name', 'platformOwnerId._id', 'platformOwnerNumber', 'isActive', 'numberOfUnderAge', 'personId.firstName',
                'personId.lastName', 'personId.otherNames', 'personId.gender', 'personId.dateOfBirth', 'personId.homeAddress', 'personId.title'
            ],
            $sort: { createdAt: -1 },
        }
    }]
};

const providerSchema = {
    include: [{
        service: 'facilities',
        nameAs: 'providerId',
        parentField: 'providerId._id',
        childField: '_id',
        query: {
            $sort: { createdAt: -1 },
            $select: ['platformOwnerId.name', 'platformOwnerId._id', 'address', 'name', 'phoneNumber', 'logo', 'facilityType'],
        }
    }]
};

const planSchema = {
    include: [{
        service: 'plans',
        nameAs: 'planId',
        parentField: 'planId',
        childField: '_id',
        query: {
            $sort: { createdAt: -1 },
        }
    }]
};


//principalBeneficiary

const premiumValue = require('../../hooks/premium-value');

const policyNotifier = require('../../hooks/policy-notifier');

module.exports = {
    before: {
        all: [authenticate('jwt')],
        find: [],
        get: [],
        create: [policyId(), premiumValue()],
        update: [policyId()],
        patch: [],
        remove: []
    },

  after: {
    all: [],
    find: [populate({ schema: principalBeneficiarySchema }), populate({ schema: providerSchema }), populate({ schema: planSchema })],
    get: [populate({ schema: principalBeneficiarySchema }), populate({ schema: providerSchema }), populate({ schema: planSchema })],
    create: [policyNotifier()],
    update: [policyNotifier()],
    patch: [],
    remove: []
  },

    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    }
};