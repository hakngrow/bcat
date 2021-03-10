const mongoose = require('mongoose')

const communitySchema = new mongoose.Schema({

        type: {type: String, trim: true},
        name: {type: String, unique: true, trim: true},
        strategy: {type: String, trim: true},
        assetSymbol: {type: String, uppercase: true, trim: true},
        traderId: {type: String, trim: true}
    },
    {timestamps: true}
)
 
module.exports = mongoose.model.Community || mongoose.model('Community', communitySchema)