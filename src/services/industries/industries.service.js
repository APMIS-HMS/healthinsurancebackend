// Initializes the `industries` service on path `/industries`
const createService = require('feathers-mongoose');
const createModel = require('../../models/industries.model');
const hooks = require('./industries.hooks');
const filters = require('./industries.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'industries',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/industries', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('industries');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
