const assert = require('assert');
const app = require('../../src/app');

describe('\'claim-statuses\' service', () => {
  it('registered the service', () => {
    const service = app.service('claim-statuses');

    assert.ok(service, 'Registered the service');
  });
});
