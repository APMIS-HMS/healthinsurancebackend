const { authenticate } = require('feathers-authentication').hooks;
const authCode = require('../../hooks/generate-pre-authorization-code');
const { populate } = require('feathers-hooks-common');
const personSchema = {
  include: [{
    service: 'people',
    nameAs: 'personId',
    parentField: 'personId',
    childField: '_id',
    query: {
      $sort: { createdAt: -1 },
    }
  }]
};

const policySchema = {
  include: [{
    service: 'policies',
    nameAs: 'policyId',
    parentField: 'policyId',
    childField: '_id',
    query: {
      $sort: { createdAt: -1 },
    }
  }]
};

const checkinSchema = {
  include: [{
    service: 'check-ins',
    nameAs: 'checkedInDetails',
    parentField: 'checkedInDetails',
    childField: '_id',
    query: {
      $sort: { createdAt: -1 },
    }
  }]
};

const beneficiarySchema = {
  include: [{
    service: 'beneficiaries',
    nameAs: 'beneficiaryObject',
    parentField: 'beneficiaryId',
    childField: '_id',
    query: {
      $sort: { createdAt: -1 },
    }
  }]
};

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [authCode()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [populate({ schema: personSchema }), populate({ schema: policySchema }), populate({ schema: beneficiarySchema }), populate({ schema: checkinSchema })],
    get: [populate({ schema: personSchema }), populate({ schema: policySchema }), populate({ schema: beneficiarySchema }), populate({ schema: checkinSchema })],
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
