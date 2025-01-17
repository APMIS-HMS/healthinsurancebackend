// Initializes the `policies` service on path `/policies`
const createService = require('feathers-mongoose');
const createModel = require('../../models/policies.model');
const hooks = require('./policies.hooks');
const filters = require('./policies.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'policies',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/policies', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('policies');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
