// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function afterValueChange(hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations

    if (hook.path.toString() != "audit-trays") {
      var tray = {
        "user": "",
        "operation": hook.method,
        "changes": {
          "before": hook.data.beforeValue,
          "after": hook.data
        }
      };
      delete hook.data.beforeValue;
      hook.app.service("audit-trays").create(tray);
    }

    return Promise.resolve(hook);
  };
};