// Initializes the `contact-positions` service on path `/contact-positions`
const createService = require('feathers-mongoose');
const createModel = require('../../models/contact-positions.model');
const hooks = require('./contact-positions.hooks');
const filters = require('./contact-positions.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'contact-positions',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/contact-positions', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('contact-positions');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
