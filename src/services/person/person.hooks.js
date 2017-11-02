const { authenticate } = require('feathers-authentication').hooks;
const returnLimitedPersonInfo = require('../../hooks/return-limited-person-info');
module.exports = {
    before: {
        all: [],
        find: [],
        get: [authenticate('jwt')],
        create: [],
        update: [authenticate('jwt')],
        patch: [authenticate('jwt')],
        remove: [authenticate('jwt')]
    },

    after: {
        all: [returnLimitedPersonInfo()],
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