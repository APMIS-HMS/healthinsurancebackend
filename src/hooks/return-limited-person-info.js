// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const promises = [];
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function returnLimitedUserInfo(hook) {
    if (hook.method === 'create' || hook.method === 'patch' || hook.method === 'get') {
      if (hook.params.user === undefined) {
        let person = hook.result;
        delete person.email;
        delete person._id;
        delete person.gender;
        delete person.firstName;
        delete person.lastName;
        delete person.otherNames;
        delete person.mothersMaidenName;
        delete person.phoneNumber;
        delete person.title;
        delete person.platformOwnerId;
        delete person.stateOfOrigin;
        delete person.isActive;
        delete person.createdAt;
        delete person.dateOfBirth;
        delete person.homeAddress;
        delete person.lgaOfOrigin;
        delete person.maritalStatus;
        delete person.platformOnwerId;
        delete person.employees;
        delete person.nextOfKin;
        delete person.maritalStatus;
      }

      return Promise.resolve(hook);
    } else {
      if (hook.params.user === undefined) {
        if (hook.result.data != undefined) {
          if (hook.result.data.length > 0) {
            let person = hook.result.data[0];
            hook.result.data.forEach(person => {
              delete person.email;
              delete person._id;
              delete person.gender;
              delete person.firstName;
              delete person.lastName;
              delete person.otherNames;
              delete person.mothersMaidenName;
              delete person.phoneNumber;
              delete person.title;
              delete person.platformOwnerId;
              delete person.stateOfOrigin;
              delete person.isActive;
              delete person.createdAt;
              delete person.dateOfBirth;
              delete person.homeAddress;
              delete person.lgaOfOrigin;
              delete person.maritalStatus;
              delete person.platformOnwerId;
              delete person.employees;
              delete person.nextOfKin;
              delete person.maritalStatus;
            });
            return Promise.resolve(hook);
          }
        }
      }
    }
  };
};
