// Initializes the `beneficiaries` service on path `/beneficiaries`
const createService = require('feathers-mongoose');
const createModel = require('../../models/beneficiaries.model');
const hooks = require('./beneficiaries.hooks');
const filters = require('./beneficiaries.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'beneficiaries',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/beneficiaries', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('beneficiaries');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
