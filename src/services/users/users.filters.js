/* eslint no-console: 1 */

module.exports = function (data, connection, hook) { // eslint-disable-line no-unused-vars
  const users = app.service('users');
  users.filter((data, connection) => {
    delete data.password;
    return connection.user ? data : false;
  })
};
