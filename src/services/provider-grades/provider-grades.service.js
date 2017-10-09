// Initializes the `provider-grade` service on path `/provider-grades`
const createService = require('feathers-mongoose');
const createModel = require('../../models/provider-grades.model');
const hooks = require('./provider-grades.hooks');
const filters = require('./provider-grades.filters');

module.exports = function() {
    const app = this;
    const Model = createModel(app);
    const paginate = app.get('paginate');

    const options = {
        name: 'provider-grades',
        Model,
        paginate
    };

    // Initialize our service with any options it requires
    app.use('/provider-grades', createService(options));

    // Get our initialized service so that we can register hooks and filters
    const service = app.service('provider-grades');

    service.hooks(hooks);

    if (service.filter) {
        service.filter(filters);
    }
};