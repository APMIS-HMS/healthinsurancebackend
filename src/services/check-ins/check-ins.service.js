// Initializes the `check-ins` service on path `/check-ins`
const createService = require('feathers-mongoose');
const createModel = require('../../models/check-ins.model');
const hooks = require('./check-ins.hooks');
const filters = require('./check-ins.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'check-ins',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/check-ins', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('check-ins');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
