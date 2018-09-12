// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const request = require('request');
module.exports = function(options = {}) { // eslint-disable-line no-unused-vars
    return function generateFacilityItUser(hook) {
        // Hooks can either return nothing or a promise
        // that resolves with the `hook` object for asynchronous operations
        if (hook.type === 'after') {
            let facility = hook.data;
            let itContact = facility.itContact;

            let user = {};
            let password = aphaformator();
            user.email = itContact.email;
            user.password = password;
            user.firstName = itContact.firstName;
            user.lastName = itContact.lastName;
            user.otherNames = itContact.otherNames;
            user.phoneNumber = itContact.phoneNumber;
            user.userType = facility.facilityType;
            user.platformOwnerId = facility.platformOwnerId;


            hook.app.service('facilities')
                .find({ query: { name: facility.name } })
                .then(payload2 => {
                    if (payload2.data.length > 0) {
                        var innerFacility = payload2.data[0];
                        user.facilityId = innerFacility;

                        hook.app.service('users')
                            .create(user)
                            .then(payload => {
                                let sender = '';
                                if (facility.shortName !== undefined) {
                                    sender = facility.shortName;
                                } else {
                                    sender = user.platformOwnerId.shortName;
                                }

                                let message = 'Below is your login details as the ' +
                                    sender + ' platform Admin for your organisation ' +
                                    user.facilityId.name + ' :' +
                                    'Your user-name:' + user.email +
                                    ' password is: ' + password +
                                    ' kindly change your password';

                                const url =
                                    'http://portal.bulksmsnigeria.net/api/?username=apmis&password=apmis&message=' +
                                    message + '&sender=' + sender + '&mobiles=@@' +
                                    user.phoneNumber + '@@';
                                var response = request.get(url);
                            })
                            .catch(err => {
                                console.log(err);
                            })
                        return Promise.resolve(hook);
                    }
                })
                .catch(err2 => { console.log(err2) })
        } else {
            return Promise.resolve(hook);
        }
    };
};

function aphaformator() {
    var text = '';
    var possible =
        'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789@abcdefghijklmnopqrstuvwxyz';

    for (var i = 0; i < 8; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}