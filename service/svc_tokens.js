const axios = require('axios')

const {
    CFG_KLD_API_KEY, CFG_KLD_BASIC_AUTH, 
    CFG_KLD_CONSOLE_URL, CFG_KLD_CONSORTIA_ID, CFG_KLD_ENV_ID,
    CFG_KLD_NODE0_SIGNACC0, CFG_KLD_NODE0_URL_REST, CFG_KLD_GWAPI_ID_TOKEN
} = require('../helpers/config')

const URL_REST_CONTRACTS = 'https://' + CFG_KLD_CONSOLE_URL + '/ledger/' + CFG_KLD_CONSORTIA_ID + '/' + CFG_KLD_ENV_ID + '/tokens/contracts'

const URL_GWAPI_TOKEN = 'https://' + CFG_KLD_BASIC_AUTH + '@' + CFG_KLD_NODE0_URL_REST + '/gateways/' + CFG_KLD_GWAPI_ID_TOKEN


async function getDeployedTokens() {

    let result = await axios.get(URL_REST_CONTRACTS, {headers: {'Authorization': 'Bearer ' + CFG_KLD_API_KEY}})

    const tokens = result.data.map(token => {
            
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

async function getDeployedToken(address) {

    let url = URL_REST_CONTRACTS + '/' + address

    let result = await axios.get(url, {headers: {'Authorization': 'Bearer ' + CFG_KLD_API_KEY}})

    let {tokenName, tokenSymbol, erc20TotalSupply, gatewayAPIId} = result

    let token= {
        name: tokenName, 
        symbol: tokenSymbol, 
        totalSupply: erc20TotalSupply, 
        'address': address, 
        gatewayId: gatewayAPIId,
        decimals: getTokenDecimals(address),
        paused: isTokenPaused(address)
    }

    return token
}

async function getTokenCap(address) {

    let url = URL_GWAPI_TOKEN + '/' + address + '/cap?kld-from=' + CFG_KLD_NODE0_SIGNACC0

    let result = await axios.get(url).catch(err => console.log(err))

    return result.data.output
}

async function getTokenName(address) {

    let url = URL_GWAPI_TOKEN + '/' + address + '/name?kld-from=' + CFG_KLD_NODE0_SIGNACC0

    let result = await axios.get(url).catch(err => console.log(err))

    return result.data.output
}

async function getTokenSymbol(address) {

    let url = URL_GWAPI_TOKEN + '/' + address + '/symbol?kld-from=' + CFG_KLD_NODE0_SIGNACC0

    let result = await axios.get(url).catch(err => console.log(err))

    return result.data.output
}

async function getTokenDecimals(address) {

    let url = URL_GWAPI_TOKEN + '/' + address + '/decimals?kld-from=' + CFG_KLD_NODE0_SIGNACC0

    let result = await axios.get(url).catch(err => console.log(err))

    return result.data.output
}

async function getTokenBalance(address) {

    let url = URL_GWAPI_TOKEN + '/' + address + '/balanceOf?kld-from=' + CFG_KLD_NODE0_SIGNACC0

    let result = await axios.get(url).catch(err => console.log(err))

    return result.data.output
}

async function isTokenPaused(address) {

    let url = URL_GWAPI_TOKEN + '/' + address + '/paused?kld-from=' + CFG_KLD_NODE0_SIGNACC0

    let result = await axios.get(url).catch(err => console.log(err))

    return result.data.output
}

async function addTokenPauser(tokenAddress, pauserAddress) {

    let url = URL_GWAPI_TOKEN + '/' + tokenAddress + '/addPauser?kld-from=' + CFG_KLD_NODE0_SIGNACC0

    let payload = {account: pauserAddress}

    return await axios.post(url, payload)
}

async function renounceTokenPauser(tokenAddress, renounceAddress) {

    let url = URL_GWAPI_TOKEN + '/' + tokenAddress + '/renouncePauser?kld-from=' + renounceAddress

    await axios.post(url, {})
}

async function isTokenPauser(tokenAddress, pauserAddress) {

    let url = URL_GWAPI_TOKEN + '/' + tokenAddress + '/isPauser?kld-from=' + CFG_KLD_NODE0_SIGNACC0 + '&account=' + pauserAddress

    let result = await axios.get(url).catch(err => {
        
        if (err.response)
            console.log(err.response.data)
    })

    return result.data
}

async function pauseToken(address) {

    let url = URL_GWAPI_TOKEN + '/' + address + '/pause?kld-from=' + CFG_KLD_NODE0_SIGNACC0

    return await axios.post(url, {}).catch(err=>console.log(err.response.data))
}

async function unpauseToken(address) {

    let url = URL_GWAPI_TOKEN + '/' + address + '/unpause?kld-from=' + CFG_KLD_NODE0_SIGNACC0

    return await axios.post(url, {}).catch(err=>console.log(err.response.data))
}

async function deployToken(_name, _symbol, _decimals, _cap) {

    let url = URL_GWAPI_TOKEN + '?kld-from=' + CFG_KLD_NODE0_SIGNACC0

    let payload = {name: _name, symbol: _symbol, decimals: _decimals, cap: _cap}

    let result = await axios.post(url, payload).catch(err => console.log(err.response))

    return result
}

module.exports = {
    getDeployedTokens, getDeployedToken, 
    getTokenCap, getTokenName, getTokenSymbol, getTokenDecimals, getTokenBalance, isTokenPaused,
    addTokenPauser, renounceTokenPauser, isTokenPauser, pauseToken, unpauseToken, deployToken
}