// notification-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const notification = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    policyId:{ type: Schema.Types.ObjectId, required: false },
    userType: { type: Schema.Types.Mixed, required: false  },
    isRead:{ type: Schema.Types.Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('notification', notification);
};
