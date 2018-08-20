// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const request = require('request');
module.exports = function(options = {}) { // eslint-disable-line no-unused-vars
    return function sendPolicySmsNotice(hook) {
        // Hooks can either return nothing or a promise
        // that resolves with the `hook` object for asynchronous operations
        const numbers = hook.data.principalBeneficiary.personId.phoneNumber;
        const sender = hook.data.platformOwnerId.shortName;
        const policyOwner = (!!hook.data.hiaId) ? hook.data.hiaId : hook.data.platformOwnerId.shortName;
        const message = `${policyOwner} created an Health Insurance Policy on your behalf with PolicyID: ${hook.data.policyId}.
         Your ${sender}-ID ${hook.data.principalBeneficiary.platformOwnerNumber}. Thanks`;
        const url = `http://portal.bulksmsnigeria.net/api/?username=apmis&password=apmis&message=${message}&sender=${sender}&mobiles=@@${numbers}@@`;
        const response = request.get(url);
        return Promise.resolve(hook);
    };
};
