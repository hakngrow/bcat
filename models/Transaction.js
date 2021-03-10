const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
        userId: {type: String, trim: true},
        symbol: {type: String, uppercase: true, trim: true},
        type: {type: String, uppercase: true, trim: true},
        units: {type: Number},
        price: {type: Decimal128}
    }, 
    {timestamps: true}
)
 
module.exports = mongoose.model.Transaction || mongoose.model('Transaction', transactionSchema)