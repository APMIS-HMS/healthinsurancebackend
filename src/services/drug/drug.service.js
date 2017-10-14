// Initializes the `drug` service on path `/drugs`
const createService = require('feathers-mongoose');
const createModel = require('../../models/drug.model');
const hooks = require('./drug.hooks');
const filters = require('./drug.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'drug',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/drugs', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('drugs');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
