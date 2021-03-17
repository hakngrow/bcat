const axios = require('axios')

const {
    CFG_KLD_API_KEY, CFG_KLD_BASIC_AUTH, 
    CFG_KLD_CONSOLE_URL, CFG_KLD_CONSORTIA_ID, CFG_KLD_ENV_ID,
    CFG_KLD_NODE0_SIGNACC, CFG_KLD_NODE0_URL_REST, CFG_KLD_GWAPI_ID_TOKEN
} = require('../helpers/config')

const URL_REST_CONTRACTS = 'https://' + CFG_KLD_CONSOLE_URL + '/' + CFG_KLD_CONSORTIA_ID + '/' + CFG_KLD_ENV_ID + '/tokens/contracts'

const URL_GWAPI_TOKEN = 'https://' + CFG_KLD_BASIC_AUTH + '@' + CFG_KLD_NODE0_URL_REST + '/gateways/' + CFG_KLD_GWAPI_ID_TOKEN




async function getDeployedTokens() {

    let response = await axios.get(URL_REST_CONTRACTS, {headers: {'Authorization': 'Bearer ' + CFG_KLD_API_KEY}})

    const tokens = response.data.map(token => {
            
        let objToken = {}

        objToken['name'] = token.tokenName
        objToken['symbol'] = token.tokenSymbol
        objToken['totalSupply'] = token.erc20TotalSupply
        objToken['address'] = token.address
        objToken['gatewayId'] = token.gatewayAPIId

        return objToken
    })

    for (var i = 0; i < tokens.length; i++) {

        let decimals = await getTokenDecimals(tokens[i]['address'])
        let isPaused = await isTokenPaused(tokens[i]['address'])

        tokens[i]['decimals'] = decimals
        tokens[i]['paused'] = isPaused
    }

    return tokens
}

async function getTokenCap(address) {

    let url = URL_GWAPI_TOKEN + '/' + address + '/cap?kld-from=' + CFG_KLD_NODE0_SIGNACC

    let result = await axios.get(url).catch(err => console.log(err))

    return result.data.output
}

async function getTokenName(address) {

    let url = URL_GWAPI_TOKEN + '/' + address + '/name?kld-from=' + CFG_KLD_NODE0_SIGNACC

    let result = await axios.get(url).catch(err => console.log(err))

    return result.data.output
}

async function getTokenSymbol(address) {

    let url = URL_GWAPI_TOKEN + '/' + address + '/symbol?kld-from=' + CFG_KLD_NODE0_SIGNACC

    let result = await axios.get(url).catch(err => console.log(err))

    return result.data.output
}

async function getTokenDecimals(address) {

    let url = URL_GWAPI_TOKEN + '/' + address + '/decimals?kld-from=' + CFG_KLD_NODE0_SIGNACC

    let result = await axios.get(url).catch(err => console.log(err))

    return result.data.output
}

async function getTokenBalance(address) {

    let url = URL_GWAPI_TOKEN + '/' + address + '/balanceOf?kld-from=' + CFG_KLD_NODE0_SIGNACC

    let result = await axios.get(url).catch(err => console.log(err))

    return result.data.output
}

async function isTokenPaused(address) {

    let url = URL_GWAPI_TOKEN + '/' + address + '/paused?kld-from=' + CFG_KLD_NODE0_SIGNACC

    let result = await axios.get(url).catch(err => console.log(err))

    return result.data.output
}

module.exports = {
    getDeployedTokens, getTokenCap, getTokenName, getTokenSymbol, getTokenDecimals, getTokenBalance, isTokenPaused
}