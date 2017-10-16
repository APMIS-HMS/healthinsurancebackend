// interview-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const interview = new Schema({
    name: { type: String, required: true },
    email:{ type: String, required: true },
    address:{ type: String, required: true },
    phone:{ type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('interview', interview);
};
