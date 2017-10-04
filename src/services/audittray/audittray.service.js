// Initializes the `audittray` service on path `/audit-trays`
const createService = require('feathers-mongoose');
const createModel = require('../../models/audittray.model');
const hooks = require('./audittray.hooks');
const filters = require('./audittray.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'audittray',
    Model,
    paginate: {
      default: 25,
      max: 25
    },
  };

  // Initialize our service with any options it requires
  app.use('/audit-trays', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('audit-trays');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
