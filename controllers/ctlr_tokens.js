var express = require('express')

var router = express.Router()

var svcTokens = require('../service/svc_tokens')

router.use(function timeLog (req, res, next) {
    console.log('ctlr_tokens, Now: ', new Date().toString())
    next()
})

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



router.get('/', async (req, res) => {

    console.log('TOKENS GET: ALL')

    svcTokens.getDeployedTokens().then(tokens => {

        console.log(tokens)

        res.render('alte_tokens', {
            title: 'Tokens',
            tokens: tokens 
        })
    })
    .catch(err => {
        
        console.log(err)

        res.json({message: err})
    }) 
})


router.get('/edit/:address', async (req, res) => {

    let address = req.params.address

    console.log('TOKENS GET: ' + address)

    
})



module.exports = router