const assert = require('assert');
const app = require('../../src/app');

describe('\'claim\' service', () => {
  it('registered the service', () => {
    const service = app.service('cliams');

    assert.ok(service, 'Registered the service');
  });
});
