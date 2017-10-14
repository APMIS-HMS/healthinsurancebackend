// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function generateCheckinOtp(hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    if (hook.data != undefined) {
     
      let otpModel = {
        number:getOpt(),
        generatedAt: new Date()
      }
      hook.data.otp = otpModel;
    }
    return Promise.resolve(hook);
  };
};

function getOpt() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";

  for (var i = 0; i < 4; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}