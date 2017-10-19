const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestObj = require('./claim-request-model');
const responseObj = require('./claim-response-model');

const docSchema = new Schema({
    request: requestObj,
    response: responseObj,
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
})
module.exports = docSchema;