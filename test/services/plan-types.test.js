const assert = require('assert');
const app = require('../../src/app');

describe('\'plan-types\' service', () => {
  it('registered the service', () => {
    const service = app.service('plan-types');

    assert.ok(service, 'Registered the service');
  });
});
