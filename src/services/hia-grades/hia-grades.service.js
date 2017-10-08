// Initializes the `hia-grades` service on path `/hia-grades`
const createService = require('feathers-mongoose');
const createModel = require('../../models/hia-grades.model');
const hooks = require('./hia-grades.hooks');
const filters = require('./hia-grades.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'hia-grades',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/hia-grades', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('hia-grades');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
