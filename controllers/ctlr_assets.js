var express = require('express')

var router = express.Router()

var svcAssets = require('../service/svc_assets')

router.use(function timeLog (req, res, next) {
    console.log('ctlr_assets, Now: ', new Date().toString())
    next()
})

router.get('/', getAll)

router.get('/:symbol', getAsset)

router.post('/create', createAsset)
router.delete('/delete/:symbol', deleteAsset)
router.patch('/update/:symbol', updateAsset)

function getAll(req, res, next) {

    console.log('ASSETS GET: ALL')

    svcAssets.getAssets()
        .then(assets => res.json(assets))
        .catch(err => res.json({message: err}))
}

function getAsset(req, res, next) {

    console.log('ASSETS GET: ' + req.params.symbol)

    svcAssets.getAsset(req.params.symbol)
        .then(asset => res.json(asset))
        .catch(err => res.json({message: err}))
}

function createAsset(req, res, next) {

    let symbol = req.body.symbol
    let type = req.body.type
    let name = req.body.name

    console.log(`ASSETS CREATE: ${symbol}, ${type}, ${name}`)

    svcAssets.createAsset(symbol, type, name)
        .then(asset => res.json(asset))
        .catch(err => res.json({message: err}))
}

function deleteAsset(req, res, next) {

    console.log('ASSETS DELETE: ' + req.params.symbol)

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

    console.log(`ASSETS UPDATE: ${symbol}, ${JSON.stringify(fieldsToUpdate)}`)

    svcAssets.updateAsset(symbol, fieldsToUpdate)
        .then(asset => res.json(asset))
        .catch(err => res.json({message: err}))
}



module.exports = router