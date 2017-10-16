// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function populateBeneficiary(hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations

    hook.result.data.forEach(function (element) {
      hook.app.service('beneficiaries').find({
        query: { _id: element.checkedinDetail.beneficiaryObject._id }
      }).then(beneficiary => {
        element.beneficiaryObject = beneficiary.data[0];
        console.log(element.beneficiaryObject);
      })
    }, this);
    return Promise.resolve(hook);
  };
};
