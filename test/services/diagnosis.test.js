const assert = require('assert');
const app = require('../../src/app');

describe('\'diagnosis\' service', () => {
  it('registered the service', () => {
    const service = app.service('diagnosises');

    assert.ok(service, 'Registered the service');
  });
});
