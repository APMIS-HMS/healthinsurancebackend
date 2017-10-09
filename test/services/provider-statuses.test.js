const assert = require('assert');
const app = require('../../src/app');

describe('\'provider-statuses\' service', () => {
  it('registered the service', () => {
    const service = app.service('provider-statuses');

    assert.ok(service, 'Registered the service');
  });
});
