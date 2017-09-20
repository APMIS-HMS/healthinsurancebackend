// Initializes the `platform-owners` service on path `/platform-owners`
const createService = require('feathers-mongoose');
const createModel = require('../../models/platform-owners.model');
const hooks = require('./platform-owners.hooks');
const filters = require('./platform-owners.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'platform-owners',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/platform-owners', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('platform-owners');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
