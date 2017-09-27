// Initializes the `plans` service on path `/plans`
const createService = require('feathers-mongoose');
const createModel = require('../../models/plans.model');
const hooks = require('./plans.hooks');
const filters = require('./plans.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'plans',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/plans', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('plans');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
