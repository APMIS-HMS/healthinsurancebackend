const assert = require('assert');
const app = require('../../src/app');

describe('\'premium-types\' service', () => {
  it('registered the service', () => {
    const service = app.service('premium-types');

    assert.ok(service, 'Registered the service');
  });
});
