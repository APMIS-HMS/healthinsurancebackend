// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const request = require('superagent');
const HOST = 'http://localhost:3031';
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function saveFacilityImage(hook) {
    if (hook.method === 'create' && hook.type === 'before') {
      hook.app.io.emit('/upload-file', (value) => {
        let keep = hook.data.formData
        hook.data = hook.data.param;

        let formData;
        if (keep.files && keep.files[0]) {
          formData = new FormData();
          formData.append("platform", keep.files[0]);
        }
        hook.data = hook.data.param;

        return Promise.resolve(hook);

      })
    } else if (hook.method === 'create' && hook.type === 'after') {
      const path = HOST + '/upload-file';

      return request
        .post(path)
        .send(hook.query.formData);

    }

  };
}
