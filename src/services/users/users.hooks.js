const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');

const { hashPassword } = require('feathers-authentication-local').hooks;
const autoGeneratePassword = require('../../hooks/auto-generate-password');
const restrict = [
    authenticate('jwt'),
    restrictToOwner({
        idField: '_id',
        ownerField: '_id'
    })
];

module.exports = {
    before: {
        all: [],
        find: [],
        get: [],
        // get: [...restrict],
        create: [autoGeneratePassword(), hashPassword()],
        // update: [...restrict, hashPassword()],
        // patch: [...restrict, hashPassword()],
        // remove: [...restrict]
        update: [hashPassword()],
        patch: [ hashPassword()],
        remove: []
    },

    after: {
        all: [
            commonHooks.when(
                hook => hook.params.provider,
                commonHooks.discard('password')
            )
        ],
        find: [],
        get: [],
        create: [autoGeneratePassword()],
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