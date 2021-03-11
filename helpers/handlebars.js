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

    bar: function(){
      return "BAR!"
    }

  }