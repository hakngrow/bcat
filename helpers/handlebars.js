module.exports = {

    getUserType: userType => {

        if(userType === 'I')
            return 'Investor'
        else if(userType === 'T')
            return 'Trader'
    },

    inc: value => {return parseInt(value) + 1},

    isAdmin: type => {return type === 'A'},
    isInvestor: type => {return type === 'I'},
    isTrader: type => {return type === 'T'},

    getAssetType: assetType => {

      if(assetType === 'C')
          return 'Crypto'
      else if(assetType === 'E')
          return 'Equity'
    },

    isCrypto: type => {return type === 'C'},
    isEquity: type => {return type === 'E'},

    bar: function(){
      return "BAR!"
    }

  }