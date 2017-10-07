// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html


module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function beforeValueChange(hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    //console.log(hook.data.user);
    if (hook.path.toString() != "audit-trays") {
      var service = hook.path.toString();
      if (service == "authentication") {
        service = "users";
      }
      //console.log(hook.data);
      if (hook.data != undefined) {
        hook.app.service(service).find({
          query: { _id: hook.data._id }
        }).then(payload => {
          if (payload.data.length != 0) {
          hook.data.beforeValue = payload.data[0];
          }
        });
      }

    }

    return Promise.resolve(hook);
  };
};
