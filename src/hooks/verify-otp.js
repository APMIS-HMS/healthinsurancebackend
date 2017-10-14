// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function verifyOtp(hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations

    if (hook.params.verify && hook.result.data.length > 0) {
    
      let record = hook.result.data[0];
      record.otp.isVerified = true;
      record.otp.verifiedBy = hook.params.user._id;
      record.otp.verifiedAt = new Date();

      return hook.app.service("check-ins").update(record._id, record).then(payload => {
        hook.result.data = true;
        return Promise.resolve(hook);
      })
        .catch(err => {
          console.log(err);
        })

    }
  };
};
