// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function policyId(hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    if (hook.method === 'create') {
      return hook.app.service("policies").find({ query: { "platformOwnerId": hook.data.platformOwnerId, $limit: 0 } }).then(payload => {
        var counter = payload.total + 1;
        console.log(counter);
        var formatedCounter = "P" + ("0000" + counter).slice(-5);
        hook.data.policyId = formatedCounter;
        console.log(hook.data.policyId);
        hook.data.dependantBeneficiaries.forEach(function (bPolicyId, i) {
          bPolicyId.policyId = formatedCounter + '-' + i + 1;
        });
      })
      return Promise.resolve(hook);
    }else if(hook.method === 'update'){
      hook.data.dependantBeneficiaries.forEach(function (bPolicyId, i) {
        if(bPolicyId.policyId === undefined){
          bPolicyId.policyId = hook.data.policyId + '-' + i + 1;
        }  
      });
      return Promise.resolve(hook);
    }

  };
};
