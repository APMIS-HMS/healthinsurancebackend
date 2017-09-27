const assert = require('assert');
const app = require('../../src/app');

describe('\'facility-categories\' service', () => {
  it('registered the service', () => {
    const service = app.service('facility-categories');

    assert.ok(service, 'Registered the service');
  });
});
