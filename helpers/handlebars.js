var svcAssets = require('../service/svc_assets')

module.exports = {

  getUserType: userType => {
    if (userType === 'I') return 'Investor'
    else if (userType === 'T') return 'Trader'
  },

  inc: value => {
    return parseInt(value) + 1
  },

  isAdmin: userType => {
    return userType === 'A'
  },
  isInvestor: userType => {
    return userType === 'I'
  },
  isTrader: userType => {
    return userType === 'T'
  },

  getAssetType: assetType => {
    if (assetType === 'C') return 'Crypto'
    else if (assetType === 'E') return 'Equity'
  },

  isCrypto: assetType => {
    return assetType === 'C'
  },
  isEquity: assetType => {
    return assetType === 'E'
  },

  getCommunityType: commType => {
    if (commType === 'A') return 'Arbitrage'
    else if (commType === 'D') return 'Discretionary'
    else if (commType === 'H') return 'High Freq'
  },

  isArbitrage: commType => {
    return commType === 'A'
  },
  isDiscretionary: commType => {
    return commType === 'D'
  },
  isHighFrequency: commType => {
    return commType === 'H'
  },

  getAssets: _ => {

    let assets = {}

    

    svcAssets.getAssets().forEach(asset => { 
      assets[asset.symbol] = asset.name
    })

    return assets
  },

  bar: function () {
    return 'BAR!'
  }
}
