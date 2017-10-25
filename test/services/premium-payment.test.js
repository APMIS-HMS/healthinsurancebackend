const assert = require('assert');
const app = require('../../src/app');

describe('\'premium-payment\' service', () => {
  it('registered the service', () => {
    const service = app.service('premium-payment');

    assert.ok(service, 'Registered the service');
  });
});
