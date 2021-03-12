const Asset = require('../models/Asset')

async function getAssets(_assetType) {

    if(typeof _assetType === 'undefined')
        return await Asset.find()
    else
        return await Asset.find({type: _assetType})
}

async function getAsset(_symbol) {
    return await Asset.findOne({symbol: _symbol})
}

async function createAsset(_symbol,  _type, _name) {

    const asset = new Asset({
 
        symbol: _symbol,
        type: _type,
        name: _name
    })

    return await asset.save()
}

async function deleteAsset(_symbol) {
    return await Asset.remove({symbol: _symbol})
}

async function updateAsset(_symbol, _fieldsToUpdate) {

    return await Asset.updateOne(
        {symbol: _symbol},
        {$set: _fieldsToUpdate}
    )
}

module.exports = {
    getAssets, getAsset, createAsset, deleteAsset, updateAsset
}