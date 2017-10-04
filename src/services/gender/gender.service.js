// Initializes the `gender` service on path `/gender`
const createService = require('feathers-mongoose');
const createModel = require('../../models/gender.model');
const hooks = require('./gender.hooks');
const filters = require('./gender.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'gender',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/gender', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('gender');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
