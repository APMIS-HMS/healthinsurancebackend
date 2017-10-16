// Initializes the `investigation` service on path `/investigations`
const createService = require('feathers-mongoose');
const createModel = require('../../models/investigation.model');
const hooks = require('./investigation.hooks');
const filters = require('./investigation.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'investigation',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/investigations', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('investigations');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
