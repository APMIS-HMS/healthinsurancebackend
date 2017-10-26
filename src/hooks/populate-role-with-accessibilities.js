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
      if (hook.result.data.length > 0) {
        let user = hook.result.data[0];
        user.roles.forEach(role => {
          promises.push(hook.app.service("roles").get(role._id, {}).then(roleObject => {
            role.accessibilities = roleObject.accessibilities;
            console.log('yes')
          }))
        })
        console.log('final')
        return Promise.all(promises).then(() => hook);
      }
    }
  };
};
