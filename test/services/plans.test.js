const assert = require('assert');
const app = require('../../src/app');

describe('\'plans\' service', () => {
  it('registered the service', () => {
    const service = app.service('plans');

    assert.ok(service, 'Registered the service');
  });
});
