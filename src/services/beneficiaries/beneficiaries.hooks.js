const { authenticate } = require('feathers-authentication').hooks;
const { populate } = require('feathers-hooks-common');

const personSchemaList = {
  include: [{
    service: 'people',
    nameAs: 'person',
    parentField: 'personId',
    childField: '_id',
    query: {
      $select: ['email', 'firstName', 'lastName', 'gender', 'platformId', 'dateOfBirth', 'homeAddress.lga'],
      $sort: { createdAt: -1 }
    }
  }]
};

const personSchema = {
  include: [{
    service: 'people',
    nameAs: 'personId',
    parentField: 'personId._id',
    childField: '_id',
    query: {
      $select: ['email', 'firstName',
       'lastName', 'otherNames',
       'gender', 'platformId', 'dateOfBirth',
        'homeAddress', 'title','mothersMaidenName',
        'email','phoneNumber','secondaryPhoneNumber','profileImageObject',
        'nationality','stateOfOrigin','lgaOfOrigin','maritalStatus','nextOfKin',
        'employees','isActive'
      ],
      $sort: { createdAt: -1 }
    }
  }]
};

const lashmaId = require('../../hooks/lashma-id');

const populatePlatformValue = require('../../hooks/populate-platform-value');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [populatePlatformValue(),lashmaId()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [populate({ schema: personSchemaList })],
    get: [populate({ schema: personSchema })],
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
