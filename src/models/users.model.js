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
      password: { type: String, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      otherNames: { type: String, required: false },
      phoneNumber: { type: String, required: false },
      userType: { type: Schema.Types.Mixed },
      platformOwnerId: { type: Schema.Types.Mixed },
      facilityId: { type: Schema.Types.Mixed },
      roles: [{ type: Schema.Types.Mixed }],
      isActive: { type: Schema.Types.Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    });
  
    return mongooseClient.model('users', users);
  };
  