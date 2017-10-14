// Initializes the `encounter-statuses` service on path `/encounter-statuses`
const createService = require('feathers-mongoose');
const createModel = require('../../models/encounter-statuses.model');
const hooks = require('./encounter-statuses.hooks');
const filters = require('./encounter-statuses.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'encounter-statuses',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/encounter-statuses', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('encounter-statuses');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
