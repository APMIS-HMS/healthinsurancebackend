const assert = require('assert');
const app = require('../../src/app');

describe('\'claim-payments\' service', () => {
  it('registered the service', () => {
    const service = app.service('claim-payments');

    assert.ok(service, 'Registered the service');
  });
});
