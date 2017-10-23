const assert = require('assert');
const app = require('../../src/app');

describe('\'capitation-fees\' service', () => {
  it('registered the service', () => {
    const service = app.service('capitation-fees');

    assert.ok(service, 'Registered the service');
  });
});
