// Initializes the `notification` service on path `/notifications`
const createService = require('feathers-mongoose');
const createModel = require('../../models/notification.model');
const hooks = require('./notification.hooks');
const filters = require('./notification.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'notification',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/notifications', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('notifications');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
