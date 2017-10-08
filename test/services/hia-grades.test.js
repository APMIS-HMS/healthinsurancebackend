const assert = require('assert');
const app = require('../../src/app');

describe('\'hia-grades\' service', () => {
  it('registered the service', () => {
    const service = app.service('hia-grades');

    assert.ok(service, 'Registered the service');
  });
});
