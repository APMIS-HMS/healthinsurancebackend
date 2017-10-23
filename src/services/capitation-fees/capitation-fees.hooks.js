const { authenticate } = require('feathers-authentication').hooks;
const updateCapitationStatus = require('../../hooks/deactivate-capitation-license');

module.exports = {
    before: {
        all: [authenticate('jwt')],
        find: [],
        get: [],
        create: [updateCapitationStatus()],
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