// Initializes the `marital-status` service on path `/marital-status`
const createService = require('feathers-mongoose');
const createModel = require('../../models/marital-status.model');
const hooks = require('./marital-status.hooks');
const filters = require('./marital-status.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'marital-status',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/marital-status', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('marital-status');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
