// Initializes the `plan-types` service on path `/plan-types`
const createService = require('feathers-mongoose');
const createModel = require('../../models/plan-types.model');
const hooks = require('./plan-types.hooks');
const filters = require('./plan-types.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'plan-types',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/plan-types', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('plan-types');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
