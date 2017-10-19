const assert = require('assert');
const app = require('../../src/app');

describe('\'drug-pack-sizes\' service', () => {
  it('registered the service', () => {
    const service = app.service('drug-pack-sizes');

    assert.ok(service, 'Registered the service');
  });
});
