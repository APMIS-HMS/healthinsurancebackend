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
      console.log(user.userType.name);
      console.log(connection.user.facilityId._id + " ------FacilityId");
      console.log(hia + " ---HIA");
      console.log(provider + " ---provider");
      if (user.userType.name === 'Beneficiary') {
        console.log("It is a beneficiary");
        //notify hia, provider
        return (connection.user.facilityId._id === hia) || (connection.user.facilityId._id === provider) ? data : false;
      } else if (user.userType.name === 'Health Insurance Agent') {
        // notify provider, beneficiary
        console.log("Health Insurance Agent");
        return (connection.user.facilityId._id === hia) || (connection.user.facilityId._id === provider) ? data : false;
      }else{
        return data;
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
