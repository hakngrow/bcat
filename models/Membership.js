const mongoose = require('mongoose')

const membershipSchema = new mongoose.Schema({

        userId: {type: String, trim: true},
        communityId: {type: String, trim: true}
    },
    {timestamps: true}
)
 
module.exports = mongoose.model.Membership || mongoose.model('Membership', membershipSchema)