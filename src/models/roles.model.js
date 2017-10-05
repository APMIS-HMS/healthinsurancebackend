// roles-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const roles = new Schema({
        module: { type: Schema.Types.Mixed, required: true },
        accessibilities: [{ type: Schema.Types.Mixed }],
        isActive: { type: Boolean, default: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    });
    return mongooseClient.model('roles', roles);
};