// Initializes the `hia-types` service on path `/hia-types`
const createService = require('feathers-mongoose');
const createModel = require('../../models/hia-types.model');
const hooks = require('./hia-types.hooks');
const filters = require('./hia-types.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'hia-types',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/hia-types', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('hia-types');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
