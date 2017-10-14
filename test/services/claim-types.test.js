const assert = require('assert');
const app = require('../../src/app');

describe('\'claim-types\' service', () => {
  it('registered the service', () => {
    const service = app.service('claim-types');

    assert.ok(service, 'Registered the service');
  });
});
