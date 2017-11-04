// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const promises = [];
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function returnLimitedUserInfo(hook) {
    if (hook.method === 'create' || hook.method === 'patch' || hook.method === 'get') {
      if (hook.params.user === undefined) {
        let facility = hook.data;
        delete facility.email;
        delete facility._id;
        delete facility.address;
        delete facility.businessContact;
        delete facility.itContact;
        delete facility.employer;
        delete facility.facilityType;
        delete facility.hia;
        delete facility.provider;
        delete facility.isTokenVerified;
        delete facility.createdAt;
        delete facility.bankDetails;
        delete facility.name;
        delete facility.phoneNumber;
        delete facility.platformOwnerId;
        delete facility.isConfirmed;
        delete facility.shortName;
        delete facility.website;
        delete facility.logo;
      }

      return Promise.resolve(hook);
    } else {
      if (hook.params.user === undefined) {
        if(hook.result.data!=undefined){
          if (hook.result.data.length > 0) {
            let facility = hook.result.data[0];
            hook.result.data.forEach(facility => {
              delete facility.email;
              delete facility._id;
              delete facility.address;
              delete facility.businessContact;
              delete facility.itContact;
              delete facility.employer;
              delete facility.facilityType;
              delete facility.hia;
              delete facility.provider;
              delete facility.isTokenVerified;
              delete facility.createdAt;
              delete facility.bankDetails;
              delete facility.name;
              delete facility.phoneNumber;
              delete facility.platformOwnerId;
              delete facility.isConfirmed;
              delete facility.shortName;
              delete facility.website;
              delete facility.logo;
            });
            return Promise.resolve(hook);
          }
        }
        
      }
    }
  };
};
