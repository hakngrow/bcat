const axios = require('axios')

const svcToken = require('../service/svc_tokens')
const svcUser = require('../service/svc_users')

const {
    CFG_KLD_API_KEY, CFG_KLD_BASIC_AUTH, 
    CFG_KLD_CONSOLE_URL, CFG_KLD_CONSORTIA_ID, CFG_KLD_ENV_ID,
    CFG_KLD_NODE0_SIGNACC0, CFG_KLD_NODE0_URL_REST, CFG_KLD_GWAPI_ID_CROWDSALE
} = require('../helpers/config')

const URL_PFAPI_CONTRACTS = 'https://' + CFG_KLD_CONSOLE_URL + '/ledger/' + CFG_KLD_CONSORTIA_ID + '/' + CFG_KLD_ENV_ID + '/contracts'

const URL_GWAPI_TOKEN = 'https://' + CFG_KLD_BASIC_AUTH + '@' + CFG_KLD_NODE0_URL_REST + '/gateways/' + CFG_KLD_GWAPI_ID_CROWDSALE


async function getDeployedCrowdsales() {

    let result = await axios.get(URL_PFAPI_CONTRACTS, {headers: {'Authorization': 'Bearer ' + CFG_KLD_API_KEY}})

    const selectedContracts = result.data.filter(contract => {       
        return contract.gatewayAPIId === CFG_KLD_GWAPI_ID_CROWDSALE
    })

    let crowdsales = []

    for (let i = 0; i < selectedContracts.length; i++) {

        let crowdsale = await getCrowdsale(selectedContracts[i].address)

        crowdsales.push(crowdsale)
      }

    return crowdsales
}


async function getCrowdsale(addrCrowdsale) {

    let crowdsaleWallet = await getWalletAddress(addrCrowdsale)
    let crowdsaleRate = await getRate(addrCrowdsale)
    let crowdsaleWeiRaised = await getWeiRaised(addrCrowdsale)
    
    let tokenAddress = await getTokenAddress(addrCrowdsale)

    let tokenName = await svcToken.getTokenName(tokenAddress)
    let tokenSymbol = await svcToken.getTokenSymbol(tokenAddress)
    let tokenCap = await svcToken.getTokenCap(tokenAddress)
    let tokenPaused = await svcToken.isTokenPaused(tokenAddress)

    let crowdsale = {
        address: addrCrowdsale,
        name: tokenName,
        symbol: tokenSymbol,
        totalSupply: tokenCap,
        rate: crowdsaleRate,
        weiRaised: crowdsaleWeiRaised,
        wallet: crowdsaleWallet,
        paused: tokenPaused
    }

    return crowdsale
}


async function getTokenAddress(addrCrowdsale) {

    let url = URL_GWAPI_TOKEN + '/' + addrCrowdsale + '/token?kld-from=' + CFG_KLD_NODE0_SIGNACC0

    let result = await axios.get(url).catch(err => console.log(err))

    return result.data.output
}


async function getWalletAddress(addrCrowdsale) {

    let url = URL_GWAPI_TOKEN + '/' + addrCrowdsale + '/wallet?kld-from=' + CFG_KLD_NODE0_SIGNACC0

    let result = await axios.get(url).catch(err => console.log(err.response))

    return result.data.output
}


async function getRate(addrCrowdsale) {

    let url = URL_GWAPI_TOKEN + '/' + addrCrowdsale + '/rate?kld-from=' + CFG_KLD_NODE0_SIGNACC0

    let result = await axios.get(url).catch(err => console.log(err))

    return result.data.output
}


async function getWeiRaised(addrCrowdsale) {

    let url = URL_GWAPI_TOKEN + '/' + addrCrowdsale + '/weiRaised?kld-from=' + CFG_KLD_NODE0_SIGNACC0

    let result = await axios.get(url).catch(err => console.log(err))

    return result.data.output
}

async function purchaseTokens(addrCrowdsale, addrBeneficiary, value) {

    let url = URL_GWAPI_TOKEN + '/' + addrCrowdsale + '/buyTokens?kld-from=' + CFG_KLD_NODE0_SIGNACC0 + '&kld-ethvalue=' + value

    let payload = {
        "beneficiary": addrBeneficiary
    }

    let result = await axios.post(url, payload).catch(err => console.log(err))

    console.log(result)

}

module.exports = {
    getDeployedCrowdsales, purchaseTokens
}