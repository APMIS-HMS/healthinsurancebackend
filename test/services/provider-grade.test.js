const assert = require('assert');
const app = require('../../src/app');

describe('\'provider-grade\' service', () => {
  it('registered the service', () => {
    const service = app.service('provider-grades');

    assert.ok(service, 'Registered the service');
  });
});
