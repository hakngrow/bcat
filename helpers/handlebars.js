module.exports = {

    getUserType: userType => {

        if(userType === 'I')
            return 'Investor'
        else if(userType === 'T')
            return 'Trader'
    },

    inc: value => {return parseInt(value) + 1},

    bar: function(){
      return "BAR!"
    }

  }