// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const promise = [];

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function policyId(hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    promise.push(hook.app.service("policies").find({ query: { "platformOwnerId": hook.data.platformOwnerId, $limit: 0 } }));
    return Promise.all(promise).then(payload => {
      var counter = payload.total + 1;
      console.log(counter);
      var formatedCounter = "P" + ("0000" + counter).slice(-5);
      hook.data.policyId = formatedCounter;
      console.log(hook.data.policyId);
      hook.data.dependantBeneficiaries.forEach(function (bPolicyId) {
        bPolicyId.policyId = formatedCounter;
      });
    })
    //return Promise.resolve(hook);
  };
};

