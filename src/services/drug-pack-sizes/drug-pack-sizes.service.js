// Initializes the `drug-pack-sizes` service on path `/drug-pack-sizes`
const createService = require('feathers-mongoose');
const createModel = require('../../models/drug-pack-sizes.model');
const hooks = require('./drug-pack-sizes.hooks');
const filters = require('./drug-pack-sizes.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'drug-pack-sizes',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/drug-pack-sizes', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('drug-pack-sizes');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
