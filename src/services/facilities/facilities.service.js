// Initializes the `facilities` service on path `/facilities`
const createService = require('feathers-mongoose');
const createModel = require('../../models/facilities.model');
const hooks = require('./facilities.hooks');
const filters = require('./facilities.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'facilities',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/facilities', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('facilities');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
