var express = require('express')

var router = express.Router()

var svcTokens = require('../service/svc_tokens')
/*
router.use(function timeLog (req, res, next) {
    console.log('ctlr_tokens, Now: ', new Date().toString())
    next()
})
*/

router.get('/api/cap/:address', apiGetCap)
router.get('/api/paused/:address', apiIsPaused)
router.get('/api/decimals/:address', apiGetDecimals)


function apiGetCap(req, res, next) {

    console.log('TOKENS CAP: ' + req.params.address)

    svcTokens.getTokenCap(req.params.address)
        .then(cap => res.json(cap))
        .catch(err => console.log(err))
}

function apiGetDecimals(req, res, next) {

    console.log('TOKENS DECIMALS: ' + req.params.address)

    svcTokens.getTokenDecimals(req.params.address)
        .then(decimals => res.json(decimals))
        .catch(err => console.log(err))
}

function apiIsPaused(req, res, next) {

    console.log('TOKENS PAUSED: ' + req.params.address)

    svcTokens.isTokenPaused(req.params.address)
        .then(paused => res.json(paused))
        .catch(err => console.log(err))
}


router.get('/', getAllTokens)
router.get('/pauser', pauser)
router.post('/processPauser', processPauser)
router.get('/minter', minter)
router.post('/processMinter', processMinter)
router.get('/pause/:address', pauseToken, getAllTokens)
router.get('/unpause/:address', unpauseToken, getAllTokens)
router.get('/issue', issueToken)
router.post('/deploy', deployToken, getAllTokens)


async function getAllTokens(req, res, next) {

    console.log('TOKENS GET: ALL')

    svcTokens.getDeployedTokens().then(tokens => {

        res.render('alte_tokens', {
            title: 'Tokens',
            tokens: tokens,
            status: res.locals.status
        })
    })
    .catch(err => {
        
        console.log(err)
    }) 
}

async function minter(req, res, next) {

    console.log('TOKENS MINTER: ')

    svcTokens.getDeployedTokens().then(tokens => {

        res.render('alte_tokens_Minter', {
            title: 'Token Minter',
            tokens: tokens 
        })
    })
    .catch(err => console.log(err))
}


async function processMinter(req, res, next) {

    let action = req.body.selAction
    let tokenAddress = req.body.selToken
    let minterAddress = req.body.txtMinter

    console.log(`TOKENS PROCESS_MINTER: ${action}, ${tokenAddress}, ${minterAddress}`)

    if (action === 'A') {

        svcTokens.addTokenMinter(tokenAddress, minterAddress).then(pauser => {

            res.render('alte_modal', {
                title: 'Add Token Minter',
                text: `Minter ${minterAddress} is added to token contract ${tokenAddress}`
            })
        })
        .catch(err => console.log(err))
    }

    if (action === 'R') {

        svcTokens.renounceTokenMinter(tokenAddress, minterAddress).then(pauser => {

            res.render('alte_modal', {
                title: 'Renounce Token Minter',
                text: `Minter ${minterAddress} of token contract ${tokenAddress} renounced`
            })
        })
        .catch(err => console.log(err))
    }

    if (action === 'C') {

        svcTokens.isTokenMinter(tokenAddress, minterAddress).then(pauser => {

            res.render('alte_modal', {
                title: 'Check Token Minter',
                text: pauser.output ? `${minterAddress} is a minter` : `${minterAddress} is a NOT minter`
            })
        })
        .catch(err => console.log(err))
    }
}


async function pauser(req, res, next) {

    console.log('TOKENS PAUSER: ')

    svcTokens.getDeployedTokens().then(tokens => {

        res.render('alte_tokens_pauser', {
            title: 'Token Pauser',
            tokens: tokens 
        })
    })
    .catch(err => console.log(err))
}


async function processPauser(req, res, next) {

    let action = req.body.selAction
    let tokenAddress = req.body.selToken
    let pauserAddress = req.body.txtPauser

    console.log(`TOKENS PROCESS_PAUSER: ${action}, ${tokenAddress}, ${pauserAddress}`)

    if (action === 'A') {

        svcTokens.addTokenPauser(tokenAddress, pauserAddress).then(pauser => {

            res.render('alte_modal', {
                title: 'Add Token Pauser',
                text: `Pauser ${pauserAddress} is added to token contract ${tokenAddress}`
            })
        })
        .catch(err => console.log(err))
    }

    if (action === 'R') {

        svcTokens.renounceTokenPauser(tokenAddress, pauserAddress).then(pauser => {

            res.render('alte_modal', {
                title: 'Renounce Token Pauser',
                text: `Pauser ${pauserAddress} of token contract ${tokenAddress} renounced`
            })
        })
        .catch(err => console.log(err))
    }

    if (action === 'C') {

        svcTokens.isTokenPauser(tokenAddress, pauserAddress).then(pauser => {

            res.render('alte_modal', {
                title: 'Check Token Pauser',
                text: pauser.output ? `${pauserAddress} is a pauser` : `${pauserAddress} is a NOT pauser`
            })
        })
        .catch(err => console.log(err))
    }
}


async function pauseToken(req, res, next) {

    let tokenAddress = req.params.address

    console.log(`TOKENS PAUSE: ${tokenAddress}`)

    svcTokens.pauseToken(tokenAddress).then(pausedToken => {

        console.log(`TOKENS PAUSE: ${pausedToken.status} ${pausedToken.statusText}`)

        res.locals.status = `Pause transaction ${pausedToken.statusText}` 
    })
    .catch(err => console.log(err))

    next()
}


async function unpauseToken(req, res, next) {

    let tokenAddress = req.params.address

    console.log(`TOKENS UNPAUSE: ${tokenAddress}`)

    svcTokens.unpauseToken(tokenAddress).then(unpausedToken => {

        console.log(`TOKENS UNPAUSE: ${unpausedToken.status} ${unpausedToken.statusText}`)

        res.locals.status = `Unpause transaction ${unpausedToken.statusText}`
    })
    .catch(err => console.log(err))

    next()
}

async function issueToken(req, res, next) {

    console.log('TOKENS ISSUE: ')

    res.render('alte_tokens_issue', {
        title: 'Issue Token'
    })
}


async function deployToken(req, res, next) {

    let name = req.body.txtName
    let symbol = req.body.txtSymbol
    let decimals = req.body.txtDecimals
    let cap = req.body.txtCap

    console.log(`TOKENS DEPLOY: ${name}, ${symbol}, ${decimals}, ${cap}`)

    svcTokens.deployToken(name, symbol, decimals, cap).then(deployedToken => {

        console.log(`TOKENS DEPLOY: ${deployedToken.status} ${deployedToken.statusText}`)

        res.locals.status = `Token issue ${deployedToken.statusText}`
    })
    .catch(err => console.log(err.data))

    next()
}


module.exports = router