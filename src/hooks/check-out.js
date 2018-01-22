// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function claimUniqueNo(hook) {
      console.log(hook.data)
    return hook.app.service("check-ins").get(hook.data.checkedinDetail.checkedInDetails._id, {}).then(payload => {
      payload.isCheckedOut = true;
      hook.app.service("check-ins").update(payload._id, payload);
    });
    return Promise.resolve(hook);
  };
};
