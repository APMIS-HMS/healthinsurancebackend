// Application hooks that run for every service.
const logger = require('./hooks/logger');

const beforeValueChange = require('./hooks/before-value-change');

const afterValueChange = require('./hooks/after-value-change');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [beforeValueChange()],
    update: [beforeValueChange()],
    patch: [beforeValueChange()],
    remove: [beforeValueChange()]
  },

  after: {
    all: [logger()],
    find: [],
    get: [],
    create: [afterValueChange()],
    update: [afterValueChange()],
    patch: [afterValueChange()],
    remove: [afterValueChange()]
  },

  error: {
    all: [ logger() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
