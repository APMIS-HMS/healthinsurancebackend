const { authenticate } = require('feathers-authentication').hooks;
const generateCIN = require('../../hooks/generate-cin');
const generateItUser = require('../../hooks/generate-facility-it-user');

module.exports = {
  before: {
    all: [ ],
    find: [],
    get: [authenticate('jwt')],
    create: [authenticate('jwt'), generateCIN()],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [],
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