// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function autoGeneratePassword(hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    if (hook.method === 'create') {
      if (hook.type === 'before') {
        if (hook.data.password == null) {
          hook.data.password = aphaformator();
          console.log(hook.data)
        }
      } else if (hook.type === 'after') {
        console.log('am called after');
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

  sg.API(request_send_grid, function (error, response) {
  })
}
