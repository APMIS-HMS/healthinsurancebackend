// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

var isToday = require('date-fns/is_today');
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function hasCheckinToday(hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    if (hook.method === 'find') {
      if (hook.params.hasCheckInToday && hook.result.data.length > 0) {
        let checkins = [];
        hook.result.data.forEach(function (checkIn) {
          if (isToday(checkIn.createdAt)) {
            checkins.push(checkIn);
          }
        })
        hook.result.data = checkins;
      }
    }

    if(hook.method === 'patch'){
      hook.data.confirmation = new Date();
    }


    return Promise.resolve(hook);
  };
};
