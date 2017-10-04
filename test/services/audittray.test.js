const assert = require('assert');
const app = require('../../src/app');

describe('\'audittray\' service', () => {
  it('registered the service', () => {
    const service = app.service('audit-trays');

    assert.ok(service, 'Registered the service');
  });
});
