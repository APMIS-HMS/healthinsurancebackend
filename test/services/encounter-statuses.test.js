const assert = require('assert');
const app = require('../../src/app');

describe('\'encounter-statuses\' service', () => {
  it('registered the service', () => {
    const service = app.service('encounter-statuses');

    assert.ok(service, 'Registered the service');
  });
});
