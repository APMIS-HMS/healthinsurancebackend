const assert = require('assert');
const app = require('../../src/app');

describe('\'pre-authorizations\' service', () => {
  it('registered the service', () => {
    const service = app.service('pre-authorizations');

    assert.ok(service, 'Registered the service');
  });
});
