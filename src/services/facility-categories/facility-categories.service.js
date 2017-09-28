// Initializes the `facility-categories` service on path `/facility-categories`
const createService = require('feathers-mongoose');
const createModel = require('../../models/facility-categories.model');
const hooks = require('./facility-categories.hooks');
const filters = require('./facility-categories.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'facility-categories',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/facility-categories', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('facility-categories');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
