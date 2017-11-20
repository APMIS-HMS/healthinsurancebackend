const assert = require('assert');
const sendPolicySmsNotice = require('../../src/hooks/send-policy-sms-notice');

describe('\'send_policy_sms_notice\' hook', () => {
  it('runs the hook', () => {
    // A mock hook object
    const mock = {};
    // Initialize our hook with no options
    const hook = sendPolicySmsNotice();

    // Run the hook function (which returns a promise)
    // and compare the resulting hook object
    return hook(mock).then(result => {
      assert.equal(result, mock, 'Returns the expected hook object');
    });
  });
});
