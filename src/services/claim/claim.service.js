// Initializes the `claim` service on path `/cliams`
const createService = require('feathers-mongoose');
const createModel = require('../../models/claim.model');
const hooks = require('./claim.hooks');
const filters = require('./claim.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'claim',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/claims', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('claims');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
