// Initializes the `procedure` service on path `/procedures`
const createService = require('feathers-mongoose');
const createModel = require('../../models/procedure.model');
const hooks = require('./procedure.hooks');
const filters = require('./procedure.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'procedure',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/procedures', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('procedures');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
