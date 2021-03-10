const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    userId: {type: String, unique: true, lowercase: true, trim: true},
    password: {type: String, trim: true},
    type: {type: String, trim: true},

    name: {type: String, trim: true},

    wallet: {type: String, trim: true}

})
 
module.exports = mongoose.model.User || mongoose.model('User', userSchema)