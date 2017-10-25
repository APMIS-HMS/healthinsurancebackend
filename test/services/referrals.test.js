const assert = require('assert');
const app = require('../../src/app');

describe('\'referrals\' service', () => {
  it('registered the service', () => {
    const service = app.service('referrals');

    assert.ok(service, 'Registered the service');
  });
});
