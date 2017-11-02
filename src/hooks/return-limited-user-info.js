// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const promises = [];
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function returnLimitedUserInfo(hook) {
    if (hook.method === 'create' || hook.method === 'patch' || hook.method === 'get') {
      if (hook.params.user === undefined && hook.data !== undefined && hook.data !== null) {
        let user = hook.data;
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
      }

      return Promise.resolve(hook);
    } else {
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
          return Promise.resolve(hook);
        }
      }
    }
  };
};
