const Membership = require('../models/Membership')

async function getMemberships() {
    return await Membership.find()
}

async function getMembers(_communityId) {
    return await Membership.find({communityId: _communityId})
}

async function getCommunities(_userId) {
    return await Membership.find({userId: _userId})
}

async function createMembership(_userId,  _communityId) {

    const membership = new Membership({
 
        userId: _userId,
        communityId: _communityId
    })

    return await membership.save()
}

async function deleteMembership(_userId,  _communityId) {
    return await Membership.deleteOne({userId: _userId, communityId: _communityId})
}

async function deleteMembers(_communityId) {
    return await Membership.deleteMany({communityId: _communityId})
}

async function deleteCommunities(_userId) {
    return await Membership.deleteMany({userId: _userId})
}

async function updateMembership(_membershipId, _fieldsToUpdate) {

    return await Membership.updateOne(
        {_id: _membershipId},
        {$set: _fieldsToUpdate}
    )
}

module.exports = {
    getMemberships, getMembers, getCommunities, createMembership, deleteMembership, deleteMembers, deleteCommunities, updateMembership
}