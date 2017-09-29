// Initializes the `premium-types` service on path `/premium-types`
const createService = require('feathers-mongoose');
const createModel = require('../../models/premium-types.model');
const hooks = require('./premium-types.hooks');
const filters = require('./premium-types.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'premium-types',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/premium-types', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('premium-types');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
