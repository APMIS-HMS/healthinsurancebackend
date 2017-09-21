


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = require('./wallet-transaction-model');

const walletSchema = new Schema({
    balance: { type: Schema.Types.Number, default: 0 },
    ledgerBalance: { type: Schema.Types.Number, default: 0 },
    transactions: [transactionSchema],
    description: { type: String, required: false },
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
})
module.exports = walletSchema;