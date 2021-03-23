var express = require('express')

var router = express.Router()

var svcCrowdsales = require('../service/svc_crowdsales')
var svcTokens = require('../service/svc_tokens')
var svcUsers = require('../service/svc_users')

router.get('/', getAllCrowdsales)

router.get('/run', runCrowdsale)
router.post('/deploy', deployCrowdsale, getAllCrowdsales)

router.get('/buy', buyTokens)
router.post('/purchase', purchaseTokens, getAllCrowdsales)

async function getAllCrowdsales(req, res, next) {

    console.log('CROWDSALES GET: ALL')

    svcCrowdsales.getDeployedCrowdsales().then(crowdsales => {

        res.render('alte_crowdsales', {
            title: 'Crowdsales',
            'crowdsales': crowdsales
        })
    })
    .catch(err => console.log(err)) 
}


async function runCrowdsale(req, res, next) {

    console.log('CROWDSALES RUN:')

    try {

        let tokens = await svcTokens.getDeployedTokens()

        res.render('alte_crowdsales_run', {
            title: 'Run Crowdsale',
            'tokens': tokens
        })
    }
    catch(err) {

        console.log(err)
    } 
}


async function deployCrowdsale(req, res, next) {

    let addrToken = req.body.selToken
    let rate = req.body.txtRate
    let addrWallet = req.body.txtWallet

    console.log(`CROWDSALES DEPLOY: ${addrToken} ${rate} ${addrWallet}`)

    svcCrowdsales.deployCrowdsale(addrToken, rate, addrWallet).then(deployedCrowdsale => {

        console.log(`CROWDSALES DEPLOY: ${deployedCrowdsale.status} ${deployedCrowdsale.statusText}`)

        

        res.locals.status = `Crowdsale run ${deployedCrowdsale.statusText}`
    })
    .catch(err => console.log(err.data))

    next()
}


async function buyTokens(req, res, next) {

    console.log('CROWDSALES BUY_TOKENS:')

    try {

        let crowdsales = await svcCrowdsales.getDeployedCrowdsales()

        let investors = await svcUsers.getUsers('I')

        res.render('alte_crowdsales_buy', {
            title: 'Buy Tokens',
            'crowdsales': crowdsales,
            'investors': investors
        })
    }
    catch(err) {

        console.log(err)
    } 
}


async function purchaseTokens(req, res, next) {

    let addrCrowdsale = req.body.selCrowdsale
    let addrBeneficiary = req.body.selInvestor
    let value = req.body.txtValue

    console.log(`CROWDSALES PURCHASE_TOKENS: ${addrCrowdsale} ${addrBeneficiary} ${value}`)

    svcCrowdsales.purchaseTokens(addrCrowdsale, addrBeneficiary, value).then(boughtTokens => {

        console.log(`CROWDSALES PURCHASE_TOKENS: ${boughtTokens.status} ${boughtTokens.statusText}`)

        res.locals.status = `Crowdsale tokens purchase ${boughtTokens.statusText}`
    })
    .catch(err => console.log(err.data))

    next()

}


module.exports = router