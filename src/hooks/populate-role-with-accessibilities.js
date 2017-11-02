// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const promises = [];
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function populateRoleWithAccessibilities(hook) {
    if (hook.method === 'create' || hook.method === 'patch' || hook.method === 'get') {
      // if (hook.data !== undefined) {
      //   let user = hook.data;
      //   user.roles.forEach(role => {
      //     hook.app.service("roles").get(role._id, {}).then(roleObject => {
      //       role.accessibilities = roleObject.accessibilities;
      //     })

      //   })
      //   return Promise.resolve(hook);
      // } else {
      //   return Promise.resolve(hook);
      // }
    } else {
      console.log(hook.params.user);
      if (hook.params.user === undefined) {
        if (hook.result.data.length > 0) {
          let user = hook.result.data[0];
          hook.result.data.forEach(user => {
            delete user.email;
            delete user._id;
            delete user.roles;

            delete user.firstName;
            delete user.lastName;
            delete user.phoneNumber;
            delete user.userType;
            delete user.platformOwnerId;
            delete user.facilityId;
            delete user.isActive;
            delete user.createdAt;
          });
          return Promise.all(promises).then(() => hook);
        }
      }
      // if (hook.result.data.length > 0) {
      //   let user = hook.result.data[0];
      //   user.roles.forEach(role => {
      //     promises.push(hook.app.service("roles").get(role._id, {}).then(roleObject => {
      //       role.accessibilities = roleObject.accessibilities;
      //       console.log('yes')
      //     }))
      //   })
      //   console.log('final')
      //   return Promise.all(promises).then(() => hook);
      // }
    }
  };
};
