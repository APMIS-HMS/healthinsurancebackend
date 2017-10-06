// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
    const mongooseClient = app.get('mongooseClient');
    const userType = require('../models/user-types.model');
    const loggedInUserStatus = require('../models/loggin-user-status-model');
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const users = new mongooseClient.Schema({
        email: { type: String, unique: true },
        password: { type: String },
        userType: { type: Schema.Types.Mixed }, // Changes
        roles: [{ type: Schema.Types.Mixed }],
        loggedInUserStatus: loggedInUserStatus,
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    });

    return mongooseClient.model('users', users);
};