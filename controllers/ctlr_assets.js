var express = require('express')

var router = express.Router()

var svcAssets = require('../service/svc_assets')

router.use(function timeLog (req, res, next) {
    console.log('ctlr_assets, Now: ', new Date().toString())
    next()
})

router.get('/api/all', getAll)

router.get('/api/:symbol', getAsset)

router.post('/api/create', createAsset)
router.delete('/api/delete/:symbol', deleteAsset)
router.patch('/api/update/:symbol', updateAsset)

function getAll(req, res, next) {

    console.log('ASSETS API GET: ALL')

    svcAssets.getAssets()
        .then(assets => res.json(assets))
        .catch(err => res.json({message: err}))
}

function getAsset(req, res, next) {

    console.log('ASSETS API GET: ' + req.params.symbol)

    svcAssets.getAsset(req.params.symbol)
        .then(asset => res.json(asset))
        .catch(err => res.json({message: err}))
}

function createAsset(req, res, next) {

    let symbol = req.body.symbol
    let type = req.body.type
    let name = req.body.name

    console.log(`ASSETS API CREATE: ${symbol}, ${type}, ${name}`)

    svcAssets.createAsset(symbol, type, name)
        .then(asset => res.json(asset))
        .catch(err => res.json({message: err}))
}

function deleteAsset(req, res, next) {

    console.log('ASSETS API DELETE: ' + req.params.symbol)

    svcAssets.deleteAsset(req.params.symbol)
        .then(asset => res.json(asset))
        .catch(err => res.json({message: err}))
}

function updateAsset(req, res, next) {

    let symbol = req.params.symbol
    let fieldsToUpdate = {}

    if( typeof req.body.type !== 'undefined')
        fieldsToUpdate["type"] = req.body.type

    if( typeof req.body.name !== 'undefined')
        fieldsToUpdate["name"] = req.body.name

    console.log(`ASSETS API UPDATE: ${symbol}, ${JSON.stringify(fieldsToUpdate)}`)

    svcAssets.updateAsset(symbol, fieldsToUpdate)
        .then(asset => res.json(asset))
        .catch(err => res.json({message: err}))
}


router.get('/', async (req, res) => {

    console.log('ASSETS GET: ALL')

    svcAssets.getAssets().then(assets => {

        res.render('alte_assets', {
            title: 'Assets',
            payload: res.locals.payload,
            assets: assets 
        })
    })
    .catch(err => res.json({message: err}))
})


router.get('/new', async (req, res) => {

    console.log('ASSETS NEW')

    res.render('alte_assets_new', {
        title: 'New Asset'
    })
})

router.post('/create', async (req, res) => {

    let symbol = req.body.txtSymbol
    let type = req.body.selType
    let name = req.body.txtName

    console.log(`ASSETS CREATE: ${symbol}, ${type}, ${name}`)
    
    svcAssets.createAsset(symbol, type, name)
        .then(res.redirect('/assets'))
        .catch(err => res.json({message: err}))
})

router.get('/edit/:symbol', async (req, res) => {

    console.log('ASSETS EDIT: ' + req.params.symbol)

    svcAssets.getAsset(req.params.symbol).then(asset => {

        res.render('alte_assets_edit', {
            title: 'Edit Asset',
            payload: res.locals.payload,
            asset: asset
        })
    })
    .catch(err => {res.json({message: err})})
})

router.post('/update/:symbol', async (req, res) => {

    let symbol = req.params.symbol
    let fieldsToUpdate = {}

    if( typeof req.body.selType !== 'undefined')
        fieldsToUpdate["type"] = req.body.selType

    if( typeof req.body.txtName !== 'undefined')
        fieldsToUpdate["name"] = req.body.txtName

    console.log(`ASSETS UPDATE: ${symbol}, ${JSON.stringify(fieldsToUpdate)}`)

    svcAssets.updateAsset(symbol, fieldsToUpdate)
        .then(res.redirect('/assets'))
        .catch(err => res.json({message: err}))
})

router.get('/delete/:symbol', async (req, res) => {

    console.log('ASSETS DELETE: ' + req.params.symbol)

    svcAssets.getAsset(req.params.symbol).then(asset => {

        res.render('alte_assets_delete', {
            title: 'Delete Asset',
            payload: res.locals.payload,
            asset: asset
        })
    })
    .catch(err => {

        console.log(err)
        
        res.json({message: err})
    })
})

router.post('/remove/:symbol', async (req, res) => {

    console.log('ASSETS REMOVE: ' + req.params.symbol)

    svcAssets.deleteAsset(req.params.symbol)
        .then(res.redirect('/assets'))
        .catch(err => res.json({message: err}))
})



module.exports = router