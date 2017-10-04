// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html


module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function beforeValueChange(hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    if (hook.path.toString() != "audit-trays") {
      var service = hook.path.toString();
      if (service == "authentication") {
        service = "users";
      }//users
      console.log(service);
      hook.app.service(service).find({
        query: { _id: hook.data._id }
      }).then(payload => {
        if (payload.data.length != 0) {
          hook.data.beforeValue = payload.data[0];
          console.log(hook.data.beforeValue);
        }
      });
    }

    return Promise.resolve(hook);
  };
};
