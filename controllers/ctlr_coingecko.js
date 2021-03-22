var express = require('express')

var router = express.Router()

var svcCoinGecko = require('../service/svc_coingecko')

router.get('/api/ping', apiPing)
router.get('/api/global', apiGlobal)
router.get('/api/coins', apiCoins)
router.get('/api/coins/list', apiCoinIds)

router.get('/fetch/:coinId', apiFetch)
router.get('/fetch/tickers/:coinId', apiFetchTickers)

router.get('/api/svc', apiSupportedVsCurrencies)
router.get('/api/price/:coinId/:vsCurrency', apiPrice)

router.get('/api/exchanges', apiExchanges)


router.get('/markets', markets)
router.get('/tickers/:coinId', tickers)


router.get('/price', price)

router.get('/exchanges', exchanges)




async function apiPing(req, res, next) {

    console.log('COINGECKO API PING:')

    res.json(await svcCoinGecko.ping())
}

async function apiGlobal(req, res, next) {

    console.log('COINGECKO API GLOBAL:')

    res.json(await svcCoinGecko.global())
}

async function apiCoins(req, res, next) {

    console.log('COINGECKO API COINS:')

    res.json(await svcCoinGecko.coins())
}

async function apiCoinIds(req, res, next) {

    console.log('COINGECKO API COIN_IDS:')

    res.json(await svcCoinGecko.coinIds())
}

async function apiFetch(req, res, next) {

    let coinId = req.params.coinId

    console.log(`COINGECKO API FETCH: ${coinId}`)

    res.json(await svcCoinGecko.fetch(coinId))
}


async function apiFetchTickers(req, res, next) {

    let coinId = req.params.coinId

    console.log(`COINGECKO API FETCH_TICKERS: ${coinId}`)

    res.json(await svcCoinGecko.fetchTickers(coinId))
}


async function apiSupportedVsCurrencies(req, res, next) {

    console.log('COINGECKO API SUPPORTED_VS_CURRENCIES: ')

    res.json(await svcCoinGecko.supportedVsCurrencies())
}


async function apiExchanges(req, res, next) {

    console.log('COINGECKO API EXCHANGES:')

    res.json(await svcCoinGecko.exchanges())
}


async function apiPrice(req, res, next) {

    let coinId = req.params.coinId
    let vsCurrency = req.params.vsCurrency

    console.log(`COINGECKO API PRICE: ${coinId} ${vsCurrency}`)

    res.json(await svcCoinGecko.simplePrice(coinId, vsCurrency))
}








async function markets(req, res, next) {

    console.log('COINGECKO MARKETS: ')

    svcCoinGecko.markets().then(data => {

        res.render('alte_coingecko_markets', {
            title: 'Markets',
            markets: data.data
        })
    })
    .catch(err => {res.json({message: err})})
}


async function tickers(req, res, next) {

    let coinId = req.params.coinId

    console.log(`COINGECKO TICKERS: ${coinId}`)

    svcCoinGecko.fetchTickers(coinId).then(data => {

        res.render('alte_coingecko_tickers', {
            title: `Tickers - ${coinId}`,
            name: data.data.name,
            tickers: data.data.tickers
        })
    })
    .catch(err => {res.json({message: err})})
}


async function price(req, res, next) {

    let coinId = req.params.coinId

    console.log(`COINGECKO TICKERS: ${coinId}`)

}


async function exchanges(req, res, next) {

    console.log('COINGECKO EXCHANGES:')

    svcCoinGecko.exchanges().then(data => {

        res.render('alte_coingecko_exchanges', {
            title: `Exchanges`,
            exchanges: data.data
        })
    })
    .catch(err => {res.json({message: err})})
}




module.exports = router