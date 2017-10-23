// Initializes the `capitation-fees` service on path `/capitation-fees`
const createService = require('feathers-mongoose');
const createModel = require('../../models/capitation-fees.model');
const hooks = require('./capitation-fees.hooks');
const filters = require('./capitation-fees.filters');

module.exports = function() {
    const app = this;
    const Model = createModel(app);
    const paginate = app.get('paginate');

    const options = {
        name: 'capitation-fees',
        Model,
        paginate: {
            default: 5,
            max: 10
        }
    };

    // Initialize our service with any options it requires
    app.use('/capitation-fees', createService(options));

    // Get our initialized service so that we can register hooks and filters
    const service = app.service('capitation-fees');

    service.hooks(hooks);

    if (service.filter) {
        service.filter(filters);
    }
};