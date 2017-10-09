// Initializes the `provider-statuses` service on path `/provider-statuses`
const createService = require('feathers-mongoose');
const createModel = require('../../models/provider-statuses.model');
const hooks = require('./provider-statuses.hooks');
const filters = require('./provider-statuses.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'provider-statuses',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/provider-statuses', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('provider-statuses');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
