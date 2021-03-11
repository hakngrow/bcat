const {CFG_ACCESS_TOKEN_SECRET} = require('../helpers/config')

const jwt = require('jsonwebtoken')

const svcUsers = require('../service/svc_users')

function verifyUser(req, res, next) {

    console.log('AUTHENTICATION verifyUser')

    let accessToken = req.cookies.jwt
    
    if(!accessToken) {
        return res.status(403).send()
    }

    try {
        
        res.locals.payload = jwt.verify(accessToken, CFG_ACCESS_TOKEN_SECRET)
        next()
    }
    catch(err) {

        return res.status(401).send()
    }
}

module.exports = {
    verifyUser
}