// Initializes the `pre-authorizations` service on path `/pre-authorizations`
const createService = require('feathers-mongoose');
const createModel = require('../../models/pre-authorizations.model');
const hooks = require('./pre-authorizations.hooks');
const filters = require('./pre-authorizations.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'pre-authorizations',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/pre-authorizations', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('pre-authorizations');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
