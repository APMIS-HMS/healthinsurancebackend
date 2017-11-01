const { authenticate } = require('feathers-authentication').hooks;
const { populate } = require('feathers-hooks-common');
const policyId = require('../../hooks/policy-id');


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
      // $select: ['email', 'firstName', 'lastName', 'gender', 'platformId', 'dateOfBirth', 'homeAddress.lga'],
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

module.exports = {
  before: {
    all: [],//authenticate('jwt') ],
    find: [],
    get: [],
    create: [policyId(), premiumValue()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [populate({ schema: principalBeneficiarySchema }), populate( { schema: providerSchema }), populate( { schema: planSchema })],
    get: [populate({ schema: principalBeneficiarySchema })],
    create: [],
    update: [],
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
