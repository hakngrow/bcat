const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  
    CFG_HOST: process.env.HOST,
    CFG_PORT: process.env.PORT,
    
    CFG_DB_URL: process.env.DB_URL,

    CFG_ACCESS_TOKEN_SECRET : process.env.ACCESS_TOKEN_SECRET,
    CFG_ACCESS_TOKEN_LIFE: process.env.ACCESS_TOKEN_LIFE,
    CFG_REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    CFG_REFRESH_TOKEN_LIFE: process.env.REFRESH_TOKEN_LIFE
}