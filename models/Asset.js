const mongoose = require('mongoose')

const assetSchema = new mongoose.Schema({

    symbol: {type: String, unique: true, uppercase: true, trim: true},
    type: {type: String, trim: true},
    name: {type: String, unique: true, trim: true}
})
 
module.exports = mongoose.model.Asset || mongoose.model('Asset', assetSchema)