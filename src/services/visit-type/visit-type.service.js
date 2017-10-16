// Initializes the `visitType` service on path `/visit-types`
const createService = require('feathers-mongoose');
const createModel = require('../../models/visit-type.model');
const hooks = require('./visit-type.hooks');
const filters = require('./visit-type.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'visit-type',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/visit-types', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('visit-types');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
