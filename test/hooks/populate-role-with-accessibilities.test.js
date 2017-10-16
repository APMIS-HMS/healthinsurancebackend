const assert = require('assert');
const populateRoleWithAccessibilities = require('../../src/hooks/populate-role-with-accessibilities');

describe('\'populate-role-with-accessibilities\' hook', () => {
  it('runs the hook', () => {
    // A mock hook object
    const mock = {};
    // Initialize our hook with no options
    const hook = populateRoleWithAccessibilities();

    // Run the hook function (which returns a promise)
    // and compare the resulting hook object
    return hook(mock).then(result => {
      assert.equal(result, mock, 'Returns the expected hook object');
    });
  });
});
