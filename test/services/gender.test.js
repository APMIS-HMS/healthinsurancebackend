const assert = require('assert');
const app = require('../../src/app');

describe('\'gender\' service', () => {
  it('registered the service', () => {
    const service = app.service('gender');

    assert.ok(service, 'Registered the service');
  });
});
