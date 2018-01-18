// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function claimUniqueNo(hook) {
    hook.app.service("check-ins").get(hook.data.checkedinDetail._id, {}).then(payload => {
      payload.isCheckedOut = true;
      hook.app.service("check-ins").update(payload._id, payload).then(payload2 => {
        payload.isCheckedOut = true;
      })
    });
    return Promise.resolve(hook);
  };
};
