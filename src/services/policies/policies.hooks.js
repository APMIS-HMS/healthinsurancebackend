const { authenticate } = require('feathers-authentication').hooks;

const policyId = require('../../hooks/policy-id');


const hiaSchema = {
  include: [{
    service: 'facilities',
    nameAs: 'hia',
    parentField: 'hiaId',
    childField: 'hia._id'
  }]
};

module.exports = {
  before: {
    all: [],//authenticate('jwt') ],
    find: [],
    get: [],
    create: [policyId()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
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
