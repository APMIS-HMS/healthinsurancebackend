// Initializes the `professions` service on path `/professions`
const createService = require('feathers-mongoose');
const createModel = require('../../models/provider-recipients.model');
const hooks = require('./provider-recipients.hooks');
const filters = require('./provider-recipients.filters');

module.exports = function() {
    const app = this;
    const Model = createModel(app);
    const paginate = app.get('paginate');

    const options = {
        name: 'provider-recipients',
        Model,
        paginate
    };

    // Initialize our service with any options it requires
    app.use('/provider-recipients', createService(options));

    // Get our initialized service so that we can register hooks and filters
    const service = app.service('provider-recipients');

    service.hooks(hooks);

    if (service.filter) {
        service.filter(filters);
    }
};