const fmtCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  //minimumFractionDigits: 0, // (will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
})

const fmtNumber = new Intl.NumberFormat()

module.exports = {

  inc: value => {
    return parseInt(value) + 1
  },

  isEqual: (val1, val2) => {
    return val1 === val2
  },
  isUndefined: (val) => {
    return typeof val === 'undefined'
  },

  formatCurrency: (amount) => {
    return fmtCurrency.format(amount)
  },
  formatNumber: (amount) => {
    return fmtNumber.format(amount)
  },

  getYesNo: (booleanVal) => {
    return (booleanVal ? 'Yes' : 'No' )
  },

  getShortAddress: (address) => {
    return address.substring(0, 8) + '...'
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
