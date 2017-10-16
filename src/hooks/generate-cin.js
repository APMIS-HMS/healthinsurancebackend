// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function generateCin(hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    let facility = hook.data;
    console.log(facility.shortName)
    if(facility.shortName=== undefined){
      let cin = facility.platformOwnerId.shortName + '-' + getCIN();
      if (facility.hia !== undefined) {
        facility.hia.cin = cin;
      } else if (facility.provider !== undefined) {
        facility.provider.providerId = cin;
      }else if(facility.employer !== undefined){
        facility.employer.cin = cin;
      }
      return Promise.resolve(hook);
    }else{
      return Promise.resolve(hook);
    }
  
  };
};
function getCIN() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";

  for (var i = 0; i < 4; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}
