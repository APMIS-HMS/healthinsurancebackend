// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function(options = {}) { // eslint-disable-line no-unused-vars
    return function updateCapitationStatus(hook) {
        // Hooks can either return nothing or a promise
        // that resolves with the `hook` object for asynchronous operations
        if (hook.type === 'before') {
            if (!!hook.data.platformOwnerId) {
                let capitation = hook.data;

                hook.app.service('capitation-fees').find({
                    query: {
                        'platformOwnerId._id': capitation.platformOwnerId._id,
                        isActive: true
                    }
                }).then(res => {
                    if (res.data.length > 0) {
                        res.data[0].isActive = false;
                        hook.app.service('capitation-fees').update(res.data[0]._id, res.data[0]).then(res1 => {
                            // Updated previous capitation
                        }).catch(err => console.log(err));
                    }
                }).catch(err => console.log(err));
            }
        } else {
            return Promise.resolve(hook);
        }
    };
};