// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const request = require('request');
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function sendBeneficiaryOtp (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations

    let numbers = hook.data.otp.phoneNumbers;
    let sender = hook.data.platformOwnerId.shortName;
    let message = "Your check-in OTP is: " + hook.data.otp.number + ". Thanks";

    const url = 'http://portal.bulksmsnigeria.net/api/?username=apmis&password=apmis&message=' + message + '&sender=' + sender + '&mobiles=@@' + numbers + '@@';
    var response = request.get(url);
    return Promise.resolve(hook);
  };
};
