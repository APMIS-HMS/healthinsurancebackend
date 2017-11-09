// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

function postNotification(user, hook) {
  var notifier = {
    "title": hook.method,
    "body": connection.user.firstName + " " + connection.user.lastName + " (" +
    connection.user.userType.name + ") made a/an " + hook.method + " on " +
    data.policyId + " at around " + data.createdAt,
    "policyId": data._id,
    "userType": user.userType
  };
  console.log("------About to save-------");
  hook.app.service("notifications").create(notifier).then(payload => {
    //console.log(payload);
    console.log("------saved-------");
  });
}


module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function policyNotifier(hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    hook.app.service("policies").filter((data, connection) => {
      let hia = data.hiaId._id;
      let provider = data.providerId._id;
      let user = connection.user;
      if (user.userType.name === 'Beneficiary') {
        //notify hia, provider
        //postNotification(user, hook);
        return data;
      } else if (user.userType.name === 'Health Insurance Agent') {
        console.log("------Insider HIA--------");
        //postNotification(user,hook);
        var notifier = {
          "title": hook.method + " a Policy:"+data.policyId,
          "body": connection.user.firstName + " " + connection.user.lastName + " (" +
          connection.user.userType.name + ") made a/an " + hook.method + " on " +
          data.policyId + " at around " + data.createdAt,
          "policyId": data._id,
          "userType": user.userType
        };
        console.log("------About to save-------");
        hook.app.service("notifications").create(notifier).then(payload => {
          console.log(payload);
          console.log("------saved-------");
          
        });
        return data;

      } else {
        //postNotification(user, hook);
        return data;
      }

    });


    return Promise.resolve(hook);
  };
};