const {
    CFG_ACCESS_TOKEN_SECRET, CFG_ACCESS_TOKEN_LIFE, 
    CFG_REFRESH_TOKEN_SECRET, CFG_REFRESH_TOKEN_LIFE 
} = require('../helpers/config')

var jwt = require('jsonwebtoken')
var express = require('express')

var router = express.Router()

var svcUsers = require('../service/svc_users')

router.post('/', authenticateUser, (req, res) => {
    res.redirect('/home')
})


function authenticateUser(req, res, next) {

    let _userId = req.body.userId
    let _password = req.body.password

    console.log(`AUTHENTICATION authenticateUser: ${_userId}, ${_password}`)

    svcUsers.getUser(_userId)
        .then(user => {

            console.log(`AUTHENTICATION authenticateUser: ` + JSON.stringify(user))

            if(user && user.password === _password) {
                
                let payload = {
                    userId: user.userId,
                    name: user.name,
                    type: user.type
                }

                let accessToken = jwt.sign(payload, CFG_ACCESS_TOKEN_SECRET, {
                    algorithm: 'HS256',
                    expiresIn: CFG_ACCESS_TOKEN_LIFE
                })

                let refreshToken = jwt.sign(payload, CFG_REFRESH_TOKEN_SECRET, {
                    algorithm: 'HS256',
                    expiresIn: CFG_REFRESH_TOKEN_LIFE
                })

                console.log(`AUTHENTICATION authenticateUser: ` + accessToken)

                res.cookie('jwt', accessToken, {httpOnly: true})
                next()
            }
            else
                res.status(401).send()
        })
        .catch(err => {

            console.log(err)

            res.json({message: err})
        })
}

module.exports = router