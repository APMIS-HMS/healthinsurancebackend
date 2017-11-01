// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function populateBeneficiary(hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    hook.result.forEach(function (element) {
      console.log(element)
      hook.app.service('people').get(element.personId).then(person => {
        element.person = person;
      })
    }, this);
    return Promise.resolve(hook);
  };
};
