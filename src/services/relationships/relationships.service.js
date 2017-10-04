// Initializes the `relationships` service on path `/relationships`
const createService = require('feathers-mongoose');
const createModel = require('../../models/relationships.model');
const hooks = require('./relationships.hooks');
const filters = require('./relationships.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'relationships',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/relationships', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('relationships');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
