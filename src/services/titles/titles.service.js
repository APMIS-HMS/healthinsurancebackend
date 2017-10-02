// Initializes the `titles` service on path `/titles`
const createService = require('feathers-mongoose');
const createModel = require('../../models/titles.model');
const hooks = require('./titles.hooks');
const filters = require('./titles.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'titles',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/titles', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('titles');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
