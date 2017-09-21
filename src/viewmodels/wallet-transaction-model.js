const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    transactionType: { type:String, default:'Cr'},
    amount: { type: Schema.Types.Number, default:0 },
    transactionSource: { type:String, default:'Cash'},
    transactionStatus: { type:String, default:'Completed'},
    refCode:{ type:String},
    balance: { type: Schema.Types.Number, default:0 },
    ledgerBalance: { type: Schema.Types.Number, default:0 },
    description: { type: String, required: false },
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
})
module.exports = transactionSchema;