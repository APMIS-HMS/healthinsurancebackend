// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function generatePreAuthorizationCode (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations

    let authorization = hook.data;
    if(authorization.authorizationCode=== undefined){
      let code =  getPreAuthorizationCode();
      authorization.authorizationCode = 'PAC-'+code;
      return Promise.resolve(hook);
    }else{
      return Promise.resolve(hook);
    }


    return Promise.resolve(hook);
  };
};

function getPreAuthorizationCode() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";

  for (var i = 0; i < 6; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}
