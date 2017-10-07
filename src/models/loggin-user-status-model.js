const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logginUserStatus = new Schema({
    isLoggedIn: { type: Boolean, 'default': false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
module.exports = logginUserStatus;