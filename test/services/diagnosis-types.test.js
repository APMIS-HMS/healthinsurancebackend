const assert = require('assert');
const app = require('../../src/app');

describe('\'diagnosis-types\' service', () => {
  it('registered the service', () => {
    const service = app.service('diagnosis-types');

    assert.ok(service, 'Registered the service');
  });
});
