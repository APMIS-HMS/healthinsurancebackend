// Initializes the `encounter-types` service on path `/encounter-types`
const createService = require('feathers-mongoose');
const createModel = require('../../models/encounter-types.model');
const hooks = require('./encounter-types.hooks');
const filters = require('./encounter-types.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'encounter-types',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/encounter-types', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('encounter-types');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
