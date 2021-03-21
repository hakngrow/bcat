const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  
    CFG_HOST: process.env.HOST,
    CFG_PORT: process.env.PORT,
    
    CFG_DB_URL: process.env.DB_URL,

    CFG_ACCESS_TOKEN_SECRET : process.env.ACCESS_TOKEN_SECRET,
    CFG_ACCESS_TOKEN_LIFE: process.env.ACCESS_TOKEN_LIFE,
    CFG_REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    CFG_REFRESH_TOKEN_LIFE: process.env.REFRESH_TOKEN_LIFE,

    CFG_KLD_BASIC_AUTH: process.env.KLD_BASIC_AUTH,
    CFG_KLD_API_KEY: process.env.KLD_API_KEY,

    CFG_KLD_CONSORTIA_ID: process.env.KLD_CONSORTIA_ID,
    CFG_KLD_ENV_ID: process.env.KLD_ENV_ID,
    
    CFG_KLD_REGION_URL: process.env.KLD_REGION_URL,
    CFG_KLD_CONSOLE_URL: process.env.KLD_CONSOLE_URL,

    CFG_KLD_NODE0_SIGNACC0: process.env.KLD_NODE0_SIGNACC0,
    CFG_KLD_NODE0_SIGNACC1: process.env.KLD_NODE0_SIGNACC1,
    CFG_KLD_NODE0_SIGNACC2: process.env.KLD_NODE0_SIGNACC2,
    CFG_KLD_NODE0_ID: process.env.KLD_NODE0_ID,
    CFG_KLD_NODE0_URL_REST: process.env.KLD_NODE0_URL_REST,

    CFG_KLD_GWAPI_ID_TOKEN: process.env.KLD_GWAPI_ID_TOKEN,
    CFG_KLD_GWAPI_ID_CROWDSALE: process.env.KLD_GWAPI_ID_CROWDSALE

}