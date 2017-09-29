// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const request = require('superagent');
const HOST = 'http://localhost:3031';
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function saveFacilityImage(hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations

  
      // console.log(hook.data.formData);
      // console.log(hook.app.io)
      /  if (hook.method === 'create' && hook.type === 'before') {/ hook.app.io.emit('/upload-file', (value) =>{
      //   console.log(value)
      // })
      // hook.app.io.emit('/upload-file', hook.data.formData);
      // hook.params.query.formData = hook.params.query.formData;




      // hook.params.query.formData = hook.params.query.formData;
      // console.log(hook.params.query.formData)
      let keep = hook.data.formData
      hook.data = hook.data.param;


      
      console.log('am in')
      console.log(2222);
      console.log(keep.files)
      let formData;
      if (keep.files && keep.files[0]) {
        formData = new FormData();
        formData.append("platform", keep.files[0]);
        console.log('am out')
        console.log(formData)
      }
      hook.data = hook.data.param;










      // delete hook.params.query.checkOut;

     
      // console.log(path);
      // return request
      //   .post(path)
      //   .send(hook.data.formData);









      return Promise.resolve(hook);

    } else if (hook.method === 'create' && hook.type === 'after') {
      const path = HOST + '/upload-file';
      // request.post({ url: path, formData:  hook.params.query.formData }, function optionalCallback(err, httpResponse, body) {
      //   if (err) {
      //     return console.error('upload failed:', err);
      //   }
      //   console.log('Upload successful!  Server responded with:', body);
      //   return Promise.resolve(hook);
      // });

       console.log(hook.query.formData);
      console.log(hook.params.query.formData)
      return request
        .post(path)
        .send(hook.query.formData);

    }

  };
};
