const assert = require('assert');
const app = require('../../src/app');

describe('\'banks\' service', () => {
  it('registered the service', () => {
    const service = app.service('banks');

    assert.ok(service, 'Registered the service');
  });
});
