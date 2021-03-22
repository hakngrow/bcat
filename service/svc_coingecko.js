const CoinGecko = require('coingecko-api')

const CoinGeckoClient = new CoinGecko()

async function ping() {

  let data = await CoinGeckoClient.ping()

  return data
}


async function global() {

  let data = await CoinGeckoClient.global()

  return data
}

async function coins(coinId) {

  return await CoinGeckoClient.coins.all()
}

async function coinIds() {

  return await CoinGeckoClient.coins.list()
}

async function markets() {

  return await CoinGeckoClient.coins.markets()
}

async function fetch(coinId) {

  return await CoinGeckoClient.coins.fetch(coinId, {});
}

async function fetchTickers(coinId) {

  return await CoinGeckoClient.coins.fetchTickers(coinId);
}

async function supportedVsCurrencies() {
  return await CoinGeckoClient.simple.supportedVsCurrencies()
}

async function simplePrice(coinIds, vsCurrencies) {

  let params = {
    ids: [coinIds],
    vs_currencies: [vsCurrencies]
  }

  return await  CoinGeckoClient.simple.price(params)
}


async function exchanges() {
  return await CoinGeckoClient.exchanges.all();
}

module.exports = {
  ping, global, coins, coinIds, markets, fetch, fetchTickers, 
  supportedVsCurrencies, simplePrice,
  exchanges
}
