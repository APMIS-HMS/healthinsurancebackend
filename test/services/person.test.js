const assert = require('assert');
const app = require('../../src/app');

describe('\'person\' service', () => {
  it('registered the service', () => {
    const service = app.service('people');

    assert.ok(service, 'Registered the service');
  });
});
