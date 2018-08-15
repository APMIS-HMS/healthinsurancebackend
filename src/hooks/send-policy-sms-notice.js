// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const request = require('request');
module.exports = function(options = {}) { // eslint-disable-line no-unused-vars
    return function sendPolicySmsNotice(hook) {
        // Hooks can either return nothing or a promise
        // that resolves with the `hook` object for asynchronous operations
        const numbers = hook.data.principalBeneficiary.personId.phoneNumber;
        console.log('Number ', numbers);
        const sender = hook.data.platformOwnerId.shortName;
        console.log('Sender ', sender);
        const policyOwner = hook.data.hiaId != undefined ? hook.data.hiaId : hook.data.platformOwnerId.shortName;
        console.log('PolicyOwner ', policyOwner);
        const message = `${policyOwner} created an Health Insurance Policy on your behalf with PolicyID: ${hook.data.policyId}.
         Your ${sender}-ID ${hook.data.principalBeneficiary.platformOwnerNumber}. Thanks`;
        console.log('Message ', message);
        const url = `http://portal.bulksmsnigeria.net/api/?username=apmis&password=apmis&message=${message}&sender=${sender}&mobiles=@@${numbers}@@`;
        console.log('Url ', url);
        const response = request.get(url);
        console.log(response);
        return Promise.resolve(hook);
    };
};
