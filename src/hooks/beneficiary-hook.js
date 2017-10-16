// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const promises = [];
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function beneficiaryHook (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    promises.push(hook.result.data.forEach(function (element) {
      hook.app.service('beneficiaries').find({
        query: { _id: element.beneficiaryId }
      }).then(beneficiary => {
        element.beneficiaryObject2 = beneficiary.data[0];
        //console.log(element.beneficiaryObject);
      })
    }));
    return Promise.all(promises).then(() => hook);
  };
};
