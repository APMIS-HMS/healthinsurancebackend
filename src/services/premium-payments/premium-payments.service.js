// Initializes the `premium-payment` service on path `/premium-payment`
const createService = require('feathers-mongoose');
const createModel = require('../../models/premium-payments.model');
const hooks = require('./premium-payments.hooks');
const filters = require('./premium-payments.filters');

module.exports = function() {
    const app = this;
    const Model = createModel(app);
    const paginate = app.get('paginate');

    const options = {
        name: 'premium-payments',
        Model,
        paginate
    };

    // Initialize our service with any options it requires
    app.use('/premium-payments', createService(options));

    // Get our initialized service so that we can register hooks and filters
    const service = app.service('premium-payments');

    service.hooks(hooks);

    if (service.filter) {
        service.filter(filters);
    }
};