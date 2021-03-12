var express = require('express')

var router = express.Router()

var svcAssets = require('../service/svc_assets')
var svcUsers = require('../service/svc_users')
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

    let render_data = {
        title: 'New Community'
    }

    svcAssets.getAssets().then(assets => {
            
        render_data['assets'] = assets

        svcUsers.getUsers('T').then(users => {
        
                render_data['traders'] = users

                res.render('alte_communities_new', render_data)
        })
    })
})

router.post('/create', async (req, res) => {

    let type = req.body.selType
    let name = req.body.txtName
    let strategy = req.body.txtStrategy
    let assetSymbol = req.body.selAsset
    let traderId = req.body.selTrader

    console.log(`COMMUNITIES CREATE: ${type}, ${name}, ${strategy}, ${assetSymbol}, ${traderId}`)

    svcCommunities.createCommunity(type, name, strategy, assetSymbol, traderId)
        .then(res.redirect('/comms'))
        .catch(err => res.json({message: err}))
})


router.get('/edit/:id', async (req, res) => {

    console.log('COMMUNITIES EDIT: ' + req.params.id)

    let render_data = {
        title: 'Edit Community',
        payload: res.locals.payload
    }

    svcCommunities.getCommunity(req.params.id).then(community => {

        render_data['community'] = community

        svcAssets.getAssets().then(assets =>{

            render_data['assets'] = assets

            svcUsers.getUsers('T').then(traders => {
                
                render_data['traders'] = traders

                res.render('alte_communities_edit', render_data)
            })
        })
    })
    .catch(err => {res.json({message: err})})
})


router.post('/update/:id', async (req, res) => {

    let communityId = req.params.id
    let fieldsToUpdate = {}

    if( typeof req.body.txtName !== 'undefined')
        fieldsToUpdate["name"] = req.body.txtName

    if( typeof req.body.selType !== 'undefined')
        fieldsToUpdate["type"] = req.body.selType

    if( typeof req.body.txtStrategy !== 'undefined')
        fieldsToUpdate["strategy"] = req.body.txtStrategy

    if( typeof req.body.selAsset !== 'undefined')
        fieldsToUpdate["assetSymbol"] = req.body.selAsset

    if( typeof req.body.selTrader !== 'undefined')
        fieldsToUpdate["traderId"] = req.body.selTrader

    console.log(`COMMUNITIES UPDATE: ${communityId}, ${JSON.stringify(fieldsToUpdate)}`)

    svcCommunities.updateCommunity(communityId, fieldsToUpdate)
        .then(res.redirect('/comms'))
        .catch(err => res.json({message: err}))
})

router.get('/delete/:id', async (req, res) => {

    console.log('COMMUNITIES DELETE: ' + req.params.id)

    let render_data = {
        title: 'Delete Community',
        payload: res.locals.payload
    }

    svcCommunities.getCommunity(req.params.id).then(community => {

        render_data['community'] = community

        svcAssets.getAssets().then(assets =>{

            render_data['assets'] = assets

            svcUsers.getUsers('T').then(traders => {
                
                render_data['traders'] = traders

                res.render('alte_communities_delete', render_data)
            })
        })
    })
    .catch(err => res.json({message: err}))
})

router.post('/remove/:id', async (req, res) => {

    console.log('COMMUNITIES REMOVE: ' + req.params.id)

    svcCommunities.deleteCommunity(req.params.id)
        .then(res.redirect('/comms'))
        .catch(err => res.json({message: err}))
})

module.exports = router