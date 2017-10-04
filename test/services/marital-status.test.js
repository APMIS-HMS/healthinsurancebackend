const assert = require('assert');
const app = require('../../src/app');

describe('\'marital-status\' service', () => {
  it('registered the service', () => {
    const service = app.service('marital-status');

    assert.ok(service, 'Registered the service');
  });
});
