// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

function formatNumber(val) {
  if (val.length <= 4) {
    val = String("0000" + val).slice(-4);
  }
  return val;
  
}

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function claimUniqueNo(hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    console.log(hook.data);
    console.log("Enter");
    return hook.app.service("claims").find({}).then(payload => {
      var counter = payload.data.length + 1;
      if (counter.length < 4) {
        let formatedVal = "CM-"+ ("0000" + counter).slice(-4);
        hook.data.claimNo = formatedVal;
      }else{
        hook.data.claimNo = "CM-"+ ("0000" + counter).slice(-4);
      }
      //console.log(hook.data.claimNo);

    })
    return Promise.resolve(hook);
  };
};
