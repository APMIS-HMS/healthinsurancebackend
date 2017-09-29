// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function generatePlatformId(hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    if (hook.method === 'create' && hook.type === 'before') {
      hook.data.platformId = this.getApmisId();
    }
    return Promise.resolve(hook);
  };
};

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (var i = 0; i < 2; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function getApmisId() {
  var number = Math.floor(Math.random() * 99999) + 1;
  if (number.length <= 5) {
    number = String("00000" + number).slice(-5);
  }
  var retVal = makeid() + "-" + number;
  return retVal;
}