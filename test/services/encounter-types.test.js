const assert = require('assert');
const app = require('../../src/app');

describe('\'encounter-types\' service', () => {
  it('registered the service', () => {
    const service = app.service('encounter-types');

    assert.ok(service, 'Registered the service');
  });
});
