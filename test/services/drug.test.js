const assert = require('assert');
const app = require('../../src/app');

describe('\'drug\' service', () => {
  it('registered the service', () => {
    const service = app.service('drugs');

    assert.ok(service, 'Registered the service');
  });
});
