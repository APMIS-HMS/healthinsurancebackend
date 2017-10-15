// Initializes the `modules` service on path `/modules`
const createService = require('feathers-mongoose');
const createModel = require('../../models/modules.model');
const hooks = require('./modules.hooks');
const filters = require('./modules.filters');

module.exports = function() {
    const app = this;
    const Model = createModel(app);
    const paginate = app.get('paginate');

    const options = {
        name: 'modules',
        Model,
        paginate,
        limit: 20
    };

    // Initialize our service with any options it requires
    app.use('/modules', createService(options));

    // Get our initialized service so that we can register hooks and filters
    const service = app.service('modules');

    service.hooks(hooks);

    if (service.filter) {
        service.filter(filters);
    }
};