const assert = require('assert');
const generatePreAuthorizationCode = require('../../src/hooks/generate-pre-authorization-code');

describe('\'generate-pre-authorization-code\' hook', () => {
  it('runs the hook', () => {
    // A mock hook object
    const mock = {};
    // Initialize our hook with no options
    const hook = generatePreAuthorizationCode();

    // Run the hook function (which returns a promise)
    // and compare the resulting hook object
    return hook(mock).then(result => {
      assert.equal(result, mock, 'Returns the expected hook object');
    });
  });
});
