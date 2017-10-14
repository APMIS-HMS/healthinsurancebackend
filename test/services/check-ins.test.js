const assert = require('assert');
const app = require('../../src/app');

describe('\'check-ins\' service', () => {
  it('registered the service', () => {
    const service = app.service('check-ins');

    assert.ok(service, 'Registered the service');
  });
});
