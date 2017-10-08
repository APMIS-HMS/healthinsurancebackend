const assert = require('assert');
const app = require('../../src/app');

describe('\'hia-types\' service', () => {
  it('registered the service', () => {
    const service = app.service('hia-types');

    assert.ok(service, 'Registered the service');
  });
});
