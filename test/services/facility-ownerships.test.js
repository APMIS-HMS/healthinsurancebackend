const assert = require('assert');
const app = require('../../src/app');

describe('\'facility-ownerships\' service', () => {
  it('registered the service', () => {
    const service = app.service('facility-ownerships');

    assert.ok(service, 'Registered the service');
  });
});
