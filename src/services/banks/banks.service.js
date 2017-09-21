// Initializes the `banks` service on path `/banks`
const createService = require('feathers-mongoose');
const createModel = require('../../models/banks.model');
const hooks = require('./banks.hooks');
const filters = require('./banks.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'banks',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/banks', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('banks');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
