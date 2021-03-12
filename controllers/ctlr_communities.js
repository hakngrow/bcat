var express = require('express')

var router = express.Router()

var svcCommunities = require('../service/svc_communities')

router.use(function timeLog (req, res, next) {
    console.log('ctlr_communities, Now: ', new Date().toString())
    next()
})

router.get('/api/all', getAll)
router.get('/api/:communityId', getCommunity)

router.post('/api/create', createCommunity)
router.delete('/api/delete/:communityId', deleteCommunity)
router.patch('/api/update/:communityId', updateCommunity)


function getAll(req, res, next) {

    console.log('COMMUNITIES API GET: ALL')

    svcCommunities.getCommunities()
        .then(communities => res.json(communities))
        .catch(err => res.json({message: err}))
}

function getCommunity(req, res, next) {

    console.log(`COMMUNITIES API GET: ${req.params.communityId}`)

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

    console.log(`COMMUNITIES API CREATE: ${type}, ${name}, ${strategy}, ${assetSymbol}, ${traderId}`)

    svcCommunities.createCommunity(type, name, strategy, assetSymbol, traderId)
        .then(community => res.json(community))
        .catch(err => res.json({message: err}))
}

function deleteCommunity(req, res, next) {

    console.log('COMMUNITIES API DELETE: ' + req.params.communityId)

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

    console.log(`COMMUNITIES API UPDATE: ${communityId}, ${JSON.stringify(fieldsToUpdate)}`)

    svcCommunities.updateCommunity(communityId, fieldsToUpdate)
        .then(community => res.json(community))
        .catch(err => res.json({message: err}))
}



router.get('/', async (req, res) => {

    console.log('COMMUNITIES GET: ALL')

    svcCommunities.getCommunities().then(comms => {

        res.render('alte_communities', {
            title: 'Communities',
            payload: res.locals.payload,
            comms: comms 

        })
    })
    .catch(err => res.json({message: err}))
})

router.get('/new', async (req, res) => {

    console.log('COMMUNITIES NEW')

    res.render('alte_communities_new', {
        title: 'New Community'
    })
})

router.post('/create', async (req, res) => {

    let name = req.body.txtName
    let type = req.body.selType
    let strategy = req.body.txtStrategy
    let assetSymbol = req.body.selAsset
    let traderId = req.body.selTrader

    console.log(`COMMUNITIES CREATE: ${name}, ${type}, ${strategy}, ${assetSymbol}, ${traderId}`)

    next()
})

module.exports = router