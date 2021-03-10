const User = require('../models/User')

async function getUsers(_userType) {

    if(typeof _userType === 'undefined')
        return await User.find()
    else
        return await User.find({type: _userType})
}

async function getUser(_userId) {
    return await User.findOne({userId: _userId})
}

async function createUser(_userId, _password, _type, _name, _wallet) {

    const user = new User({
 
        userId: _userId,
        password: _password,
        type: _type,

        name: _name,

        wallet: _wallet
    })

    return await user.save()
}

async function deleteUser(_userId) {
    return await User.remove({userId: _userId})
}

async function updateUser(_userId, _fieldsToUpdate) {

    return await User.updateOne(
        {userId: _userId},
        {$set: _fieldsToUpdate}
    )
}

module.exports = {
    getUsers, getUser, createUser, deleteUser, updateUser
}