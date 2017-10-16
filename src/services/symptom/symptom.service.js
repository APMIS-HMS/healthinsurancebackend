// Initializes the `symptom` service on path `/symptoms`
const createService = require('feathers-mongoose');
const createModel = require('../../models/symptom.model');
const hooks = require('./symptom.hooks');
const filters = require('./symptom.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'symptom',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/symptoms', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('symptoms');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
