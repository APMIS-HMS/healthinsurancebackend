const assert = require('assert');
const app = require('../../src/app');

describe('\'visitType\' service', () => {
  it('registered the service', () => {
    const service = app.service('visit-types');

    assert.ok(service, 'Registered the service');
  });
});
