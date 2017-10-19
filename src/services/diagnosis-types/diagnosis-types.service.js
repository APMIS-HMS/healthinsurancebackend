// Initializes the `diagnosis-types` service on path `/diagnosis-types`
const createService = require('feathers-mongoose');
const createModel = require('../../models/diagnosis-types.model');
const hooks = require('./diagnosis-types.hooks');
const filters = require('./diagnosis-types.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'diagnosis-types',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/diagnosis-types', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('diagnosis-types');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
