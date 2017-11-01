const { authenticate } = require('feathers-authentication').hooks;
const generateCIN = require('../../hooks/generate-cin');
const generateItUser = require('../../hooks/generate-facility-it-user');
const returnLimitedFacilityInfo = require('../../hooks/return-limited-facility-info');
module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate('jwt'), generateCIN()],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [returnLimitedFacilityInfo()],
    find: [],
    get: [],
    create: [generateItUser()],
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