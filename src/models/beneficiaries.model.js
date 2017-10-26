// beneficiaries-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const beneficiaries = new Schema({
    stateID: { type: String, required: false }, // lasraid
    platformOwnerNumber: { type: String, required: false }, //lashmaid
    numberOfUnderAge: { type: Number, default: 0 },
    personId: { type: Schema.Types.ObjectId, required: true },
    platformOwnerId: { type: Schema.Types.ObjectId, required: true }, // platform owner object
    isActive: { type: Schema.Types.Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('beneficiaries', beneficiaries);
};