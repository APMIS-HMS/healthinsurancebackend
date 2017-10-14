// Initializes the `claim-types` service on path `/claim-types`
const createService = require('feathers-mongoose');
const createModel = require('../../models/claim-types.model');
const hooks = require('./claim-types.hooks');
const filters = require('./claim-types.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'claim-types',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/claim-types', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('claim-types');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
