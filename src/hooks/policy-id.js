// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const promise = [];
var alphabeth = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"];
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function policyId(hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    return hook.app.service("policies").find({ query: { "platformOwnerId._id": hook.data.platformOwnerId._id } }).then(p2 => {
      let pId = p2.data.length + 1;
      let formatedValue = ("00000" + pId).slice(-5);
      var formatedCounter = "P" + formatedValue;
      hook.data.policyId = formatedCounter;
      hook.data.principalPolicyId = formatedCounter + "-A";
      hook.data.dependantBeneficiaries.forEach(function (bPolicyId, index) {
        let count = index + 2;
        bPolicyId.policyId = formatedCounter + "-" + alphabeth[count];
      });
    })
    // promise.push(hook.app.service("policies").find({ query: { "platformOwnerId._id": hook.data.platformOwnerId._id, $limit: 0 } }));
    // return Promise.all(promise).then(payload => {
    //   var availableLength = 0;
    //   var counter = 0;
    //   for (var i = payload[0].total + 1; i <= payload[0].total + payload.length; i++) {
    //     let formatedValue = ("00000" + i).slice(-5);
    //     var formatedCounter = "P" + formatedValue;
    //     hook.data.policyId = formatedCounter;
    //     hook.data.principalPolicyId = formatedCounter + "-A";
    //     if (i == payload[0].total + payload.length) {
    //       hook.data.dependantBeneficiaries.forEach(function (bPolicyId, index) {
    //         let count = index + 2;
    //         bPolicyId.policyId = formatedCounter + "-" + alphabeth[count];
    //       });
    //     }
    //   }
    // });
    //Promise.resolve(hook);
  };
};
