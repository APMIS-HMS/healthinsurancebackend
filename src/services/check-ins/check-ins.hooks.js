const { authenticate } = require('feathers-authentication').hooks;
const otpGenerator   = require('../../hooks/generate-checkin-otp');
const otpSms   = require('../../hooks/send-beneficiary-otp');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [otpGenerator()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [otpSms()],
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
