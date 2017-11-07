// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function policyNotifier(hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    hook.app.service("policies").filter((data, connection, hook) => {
      let hia = data.hiaId._id;
      let provider = data.providerId._id;
      let user = connection.user;
      if (user.userType.name === 'Beneficiary') {
        console.log(connection.user);
        console.log(user.userType.name);
        //notify hia, provider
        return (connection.user.facilityId._id === hia) || (connection.user.facilityId._id === provider) ? data : false;
      } else if (user.userType.name === 'Health Insurance Agent') {
        // notify provider, beneficiary
        console.log(connection.user);
        console.log(user.userType.name);
        return (connection.user.facilityId._id === hia) || (connection.user.facilityId._id === provider) ? data : false;
      }
      var notifier = {
        "name": hook.type,
        "body": data.policyId
      };
      hook.app.service("notifications").create(notifier).then(payload => {
        console.log(payload);
      })
    });


    return Promise.resolve(hook);
  };
};
