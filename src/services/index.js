const users = require('./users/users.service.js');
const userTypes = require('./user-types/user-types.service.js');
const platformOwners = require('./platform-owners/platform-owners.service.js');
const roles = require('./roles/roles.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(userTypes);
  app.configure(platformOwners);
  app.configure(roles);
};
