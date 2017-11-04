// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const promise = [];
const resolvers = [];


module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function lashmaId(hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    console.log(hook.data.platformOwnerId._id);
    promise.push(hook.app.service("beneficiaries").find({ query: { "platformOwnerId._id": hook.data.platformOwnerId._id, $limit: 0 } }));
    return Promise.all(promise).then(payload2 => {
      console.log(payload2);
      var availableLength = 0;
      var counter = 0;
      for (var i = payload2[0].total + 1; i <= payload2[0].total + payload2.length; i++) {
        console.log(i);
        let year = new Date().getFullYear().toString().split('');
        let month = new Date().getMonth() + 1;
        let formatedM = ("0" + month).slice(-2);
        let formatedCounter = ("000" + i).slice(-4);
        let lashmaPlatformNo = hook.data.platformOwnerId.shortName + "-" + year[year.length - 2] + "" + +year[year.length - 1] + "" + formatedM + "-" + formatedCounter;
        //console.log(lashmaPlatformNo);
        hook.data.platformOwnerNumber = lashmaPlatformNo;

        hook.platformOwnerNumber = lashmaPlatformNo;
      }
    });
    //return Promise.resolve(hook);
  };
};
