const assert = require('assert');
const hasCheckinToday = require('../../src/hooks/has-checkin-today');

describe('\'has-checkin-today\' hook', () => {
  it('runs the hook', () => {
    // A mock hook object
    const mock = {};
    // Initialize our hook with no options
    const hook = hasCheckinToday();

    // Run the hook function (which returns a promise)
    // and compare the resulting hook object
    return hook(mock).then(result => {
      assert.equal(result, mock, 'Returns the expected hook object');
    });
  });
});
