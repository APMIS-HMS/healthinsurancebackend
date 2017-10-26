// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function populatePlatformValue (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    console.log(hook.data);
    return hook.app.service("facilities").find({ query: { "platformOwnerId._id": hook.data.platformOwnerId} }).then(payload => {
      var platformOwnerId = payload.data[0].platformOwnerId;
      hook.data.platformOwnerId = platformOwnerId;
    });
    return Promise.resolve(hook);
  };
};
