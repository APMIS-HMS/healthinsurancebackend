const assert = require('assert');
const app = require('../../src/app');

describe('\'user-type\' service', () => {
  it('registered the service', () => {
    const service = app.service('user-types');

    assert.ok(service, 'Registered the service');
  });
});
