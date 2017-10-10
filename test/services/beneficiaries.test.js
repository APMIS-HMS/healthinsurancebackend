const assert = require('assert');
const app = require('../../src/app');

describe('\'beneficiaries\' service', () => {
  it('registered the service', () => {
    const service = app.service('beneficiaries');

    assert.ok(service, 'Registered the service');
  });
});
