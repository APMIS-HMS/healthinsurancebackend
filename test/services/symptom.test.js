const assert = require('assert');
const app = require('../../src/app');

describe('\'symptom\' service', () => {
  it('registered the service', () => {
    const service = app.service('symptoms');

    assert.ok(service, 'Registered the service');
  });
});
