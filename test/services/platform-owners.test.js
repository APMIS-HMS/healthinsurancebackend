const assert = require('assert');
const app = require('../../src/app');

describe('\'platform-owners\' service', () => {
  it('registered the service', () => {
    const service = app.service('platform-owners');

    assert.ok(service, 'Registered the service');
  });
});
