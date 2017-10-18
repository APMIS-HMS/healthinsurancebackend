// Initializes the `interview` service on path `/interview`
const createService = require('feathers-mongoose');
const createModel = require('../../models/interview.model');
const hooks = require('./interview.hooks');
const filters = require('./interview.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'interview',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/interview', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('interview');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
