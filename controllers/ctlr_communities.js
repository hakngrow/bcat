var express = require('express')

var router = express.Router()

var svcCommunities = require('../service/svc_communities')

router.use(function timeLog (req, res, next) {
    console.log('ctlr_communities, Now: ', new Date().toString())
    next()
})

router.get('/', getAll)
router.get('/:communityId', getCommunity)

router.post('/create', createCommunity)
router.delete('/delete/:communityId', deleteCommunity)
router.patch('/update/:communityId', updateCommunity)

function getAll(req, res, next) {

    console.log('COMMUNITIES GET: ALL')

    svcCommunities.getCommunities()
        .then(communities => res.json(communities))
        .catch(err => res.json({message: err}))
}

function getCommunity(req, res, next) {

    console.log(`COMMUNITIES GET: ${req.params.communityId}`)

    svcCommunities.getCommunity(req.params.communityId)
        .then(community => res.json(community))
        .catch(err => res.json({message: err}))
}

function createCommunity(req, res, next) {

    let type = req.body.type
    let name = req.body.name
    let strategy = req.body.strategy
    let assetSymbol = req.body.assetSymbol
    let traderId = req.body.traderId

    console.log(`COMMUNITIES CREATE: ${type}, ${name}, ${strategy}, ${assetSymbol}, ${traderId}`)

    svcCommunities.createCommunity(type, name, strategy, assetSymbol, traderId)
        .then(community => res.json(community))
        .catch(err => res.json({message: err}))
}

function deleteCommunity(req, res, next) {

    console.log('COMMUNITIES DELETE: ' + req.params.communityId)

    svcCommunities.deleteCommunity(req.params.communityId)
        .then(community => res.json(community))
        .catch(err => res.json({message: err}))
}

function updateCommunity(req, res, next) {

    let communityId = req.params.communityId
    let fieldsToUpdate = {}

    if( typeof req.body.type !== 'undefined')
        fieldsToUpdate["type"] = req.body.type

    if( typeof req.body.name !== 'undefined')
        fieldsToUpdate["name"] = req.body.name

    if( typeof req.body.strategy !== 'undefined')
        fieldsToUpdate["strategy"] = req.body.strategy

    if( typeof req.body.assetSymbol !== 'undefined')
        fieldsToUpdate["assetSymbol"] = req.body.assetSymbol

    if( typeof req.body.traderId !== 'undefined')
        fieldsToUpdate["traderId"] = req.body.traderId

    console.log(`COMMUNITIES UPDATE: ${communityId}, ${JSON.stringify(fieldsToUpdate)}`)

    svcCommunities.updateCommunity(communityId, fieldsToUpdate)
        .then(community => res.json(community))
        .catch(err => res.json({message: err}))
}


module.exports = router