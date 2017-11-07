// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const promise = [];

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function policyId(hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    promise.push(hook.app.service("policies").find({ query: { "platformOwnerId._id": hook.data.platformOwnerId._id, $limit: 0 } }));
    return Promise.all(promise).then(payload => {
      var availableLength = 0;
      var counter = 0;
      console.log(payload);
      console.log(payload.length);
      for (var i = payload[0].total + 1; i <= payload[0].total + payload.length; i++) {
        console.log(i);
        let formatedValue = ("00000" + i).slice(-5);
        var formatedCounter = "P" + formatedValue;
        hook.data.policyId = formatedCounter;
        console.log(hook.data.policyId);
        if (i == payload[0].total + payload.length) {
          hook.data.dependantBeneficiaries.forEach(function (bPolicyId) {
            bPolicyId.policyId = formatedCounter + "-D";
            console.log("--Policy--");
            console.log(bPolicyId.policyId);
          });
        }
      }
    });
  };
};
