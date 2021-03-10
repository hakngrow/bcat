const Community = require('../models/Community')

async function getCommunities(_communityType) {

    if(typeof _communityType === 'undefined')
        return await Community.find()
    else
        return await Community.find({type: _communityType})
}


async function getCommunity(_communityId) {
    return await Community.findById(_communityId)
}

async function createCommunity(_type, _name, _strategy, _assetSymbol, _traderId) {

    const community = new Community({

        type: _type,
        name: _name,
        strategy: _strategy,
        assetSymbol: _assetSymbol,
        traderId: _traderId
    })

    return await community.save()
}

async function deleteCommunity(_communityId) {
    return await Community.remove({_id: _communityId})
}

async function updateCommunity(_communityId, _fieldsToUpdate) {

    return await Community.updateOne(
        {_id: _communityId},
        {$set: _fieldsToUpdate}
    )
}

module.exports = {
    getCommunities, getCommunity, createCommunity, deleteCommunity, updateCommunity
}