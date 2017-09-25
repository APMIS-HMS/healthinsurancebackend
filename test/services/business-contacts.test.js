const assert = require('assert');
const app = require('../../src/app');

describe('\'contact-positions\' service', () => {
  it('registered the service', () => {
    const service = app.service('contact-positions');

    assert.ok(service, 'Registered the service');
  });
});
