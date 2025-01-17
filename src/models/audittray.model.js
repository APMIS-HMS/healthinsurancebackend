// audittray-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const audittray = new Schema({
    user: { type: Schema.Types.Mixed, required: false },
    operation:{ type: String, required: false },
    changes:{ type: Schema.Types.Mixed, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('audittray', audittray);
};
