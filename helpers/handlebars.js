var svcAssets = require('../service/svc_assets')

module.exports = {

  inc: value => {
    return parseInt(value) + 1
  },

  isEqual: (val1, val2) => {
    return val1 === val2
  },

  getYesNo: (booleanVal) => {
    return (booleanVal ? 'Yes' : 'No' )
  },

  getUserType: userType => {
    if (userType === 'I') return 'Investor'
    else if (userType === 'T') return 'Trader'
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

  isCommunityMember: (communityId, joinedCommunityIds) => {
    return joinedCommunityIds.includes(communityId.toString())
  },

  bar: function () {
    return 'BAR!'
  }
}
