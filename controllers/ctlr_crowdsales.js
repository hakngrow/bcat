var express = require('express')

var router = express.Router()

var svcCrowdsales = require('../service/svc_crowdsales')
var svcUsers = require('../service/svc_users')

router.get('/', getAllCrowdsales)
router.get('/buy', buyTokens)
router.post('/purchase', purchaseTokens)

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

        console.log(boughtTokens)
    })
    .catch(err => console.log(err.data))

}


module.exports = router