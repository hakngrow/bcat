var express = require('express')

var router = express.Router()

router.use(function timeLog (req, res, next) {
    console.log('ctlr_txns, Now: ', new Date().toString())
    next()
})




module.exports = router