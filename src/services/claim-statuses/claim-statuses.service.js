// Initializes the `claim-statuses` service on path `/claim-statuses`
const createService = require('feathers-mongoose');
const createModel = require('../../models/claim-statuses.model');
const hooks = require('./claim-statuses.hooks');
const filters = require('./claim-statuses.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'claim-statuses',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/claim-statuses', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('claim-statuses');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
