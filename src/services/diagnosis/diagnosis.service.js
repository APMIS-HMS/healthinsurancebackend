// Initializes the `diagnosis` service on path `/diagnosises`
const createService = require('feathers-mongoose');
const createModel = require('../../models/diagnosis.model');
const hooks = require('./diagnosis.hooks');
const filters = require('./diagnosis.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'diagnosis',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/diagnosises', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('diagnosises');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
