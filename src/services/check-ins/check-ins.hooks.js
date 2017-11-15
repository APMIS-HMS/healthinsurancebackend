const { authenticate } = require('feathers-authentication').hooks;
const hooks = require('feathers-hooks-common');
const otpGenerator = require('../../hooks/generate-checkin-otp');
const otpSms = require('../../hooks/send-beneficiary-otp');
const verifyOtp = require('../../hooks/verify-otp');
const hasCheckInToday = require('../../hooks/has-checkin-today');
const { populate } = require('feathers-hooks-common');

const beneficiarySchemaList = {
  include: [{
    service: 'beneficiaries',
    nameAs: 'beneficiaryObject',
    parentField: 'beneficiaryId',
    childField: '_id'
  }]
};

const personSchemaList = {
  include: [{
    service: 'people',
    nameAs: 'personObject',
    parentField: 'beneficiaryObject.personId',
    childField: '_id'
  }]
};

const policySchemaList = {
  include: [{
    service: 'policies',
    nameAs: 'policyObject',
    parentField: 'policyId',
    childField: '_id'
  }]
};

const preAuthSchemaList = {
  include: [{
    service: 'pre-authorizations',
    nameAs: 'preAuthObject',
    parentField: 'checkedInDetails._id',
    childField: '_id'
  }]
};

module.exports = {
  before: {
    all: [authenticate('jwt'), hooks.client('verify', 'hasCheckInToday')],
    find: [],
    get: [],
    create: [otpGenerator()],
    update: [],
    patch: [hasCheckInToday()],
    remove: []
  },

  after: {
    all: [],
    find: [
      populate({ schema: beneficiarySchemaList }),
      verifyOtp(),
      hasCheckInToday(),
      populate({ schema: policySchemaList }),
      populate({ schema: preAuthSchemaList })      
    ],
    get: [ populate({ schema: beneficiarySchemaList }),populate({ schema: policySchemaList })],
    create: [],
    // create: [otpSms()],
    update: [],
    patch: [populate({ schema: beneficiarySchemaList }),populate({ schema: policySchemaList })],
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
