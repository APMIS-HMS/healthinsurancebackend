const assert = require('assert');
const app = require('../../src/app');

describe('\'industries\' service', () => {
  it('registered the service', () => {
    const service = app.service('industries');

    assert.ok(service, 'Registered the service');
  });
});
