// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const request = require('request');
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
    return function autoGeneratePassword(hook) {
        // Hooks can either return nothing or a promise
        // that resolves with the `hook` object for asynchronous operations
        if (hook.method === 'create') {
            if (hook.type === 'before') {
                if (hook.data.password === null || hook.data.password === undefined) {
                    hook.data.password = aphaformator();
                    hook.params.password = hook.data.password;
                    hook.params.platformOwnerId = hook.data.platformOwnerId;
                    // console.log(hook.params.platformOwnerId)
                } else {
                    hook.params.password = hook.data.password;
                }
            } else if (hook.type === 'after') {
                let password = hook.params.password;
                if (hook.data.platformOwnerId !== undefined) {
                    let sender = hook.data.platformOwnerId.shortName;
                    let message = "Your " + sender + " auto-generated password is: " + password + " kindly change your password";
console.log("----------------Auto Pswd Start--------------------");
console.log(message);
console.log("----------------Auto Pswd End--------------------");
                    const url = 'http://portal.bulksmsnigeria.net/api/?username=apmis&password=apmis&message=' + message + '&sender=' + sender + '&mobiles=@@' + hook.data.phoneNumber + '@@';
                    var response = request.get(url, function (error, response, body){
                        if(error){
                            // console.log(error);
                        }
                    });
                }

            }
        }
        return Promise.resolve(hook);
    };
};

function aphaformator() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789@abcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 8; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function sendEmailViaApi(sender, receiver, title, body) {
    var helper = require('sendgrid').mail
    var from_email = new helper.Email(sender)
    var to_email = new helper.Email(receiver)
    var subject = title
    var content = new helper.Content("text/plain", body)
    var mail = new helper.Mail(from_email, subject, to_email, content)
    var sg = require('sendgrid')('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')
    var request_send_grid = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });

    sg.API(request_send_grid, function (error, response) { })
}