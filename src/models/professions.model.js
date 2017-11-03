// professions-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const cadarSchema = require('../viewmodels/cader-model');

    const professions = new Schema({
        name: { type: String, required: true },
        caders: [cadarSchema],
        createdAt: { type: Date, 'default': Date.now },
        updatedAt: { type: Date, 'default': Date.now }
    });

    return mongooseClient.model('professions', professions);
};