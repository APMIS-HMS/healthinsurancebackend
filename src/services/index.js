const users = require('./users/users.service.js');
const userTypes = require('./user-types/user-types.service.js');
const platformOwners = require('./platform-owners/platform-owners.service.js');
const roles = require('./roles/roles.service.js');
const facilities = require('./facilities/facilities.service.js');
const banks = require('./banks/banks.service.js');
const industries = require('./industries/industries.service.js');
const contactPositions = require('./contact-positions/contact-positions.service.js');
const countries = require('./countries/countries.service.js');
const modules = require('./modules/modules.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(userTypes);
  app.configure(platformOwners);
  app.configure(roles);
  app.configure(facilities);
  app.configure(banks);
  app.configure(industries);
  app.configure(contactPositions);
  app.configure(countries);
  app.configure(modules);
};
