// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

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
      if(hook.result.data.length > 0){
        hook.result.data.forEach(user =>{
          user.roles.forEach(role => {
            hook.app.service("roles").get(role._id, {}).then(roleObject => {
              role.accessibilities = roleObject.accessibilities;
            })
          })
        })
        return Promise.resolve(hook);
      }
    }
  };
};
