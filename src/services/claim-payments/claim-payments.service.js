// Initializes the `claim-payments` service on path `/claim-payments`
const createService = require('feathers-mongoose');
const createModel = require('../../models/claim-payments.model');
const hooks = require('./claim-payments.hooks');
const filters = require('./claim-payments.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'claim-payments',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/claim-payments', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('claim-payments');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
