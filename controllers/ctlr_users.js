var express = require('express')

var router = express.Router()

var svcUsers = require('../service/svc_users')

router.use(function timeLog (req, res, next) {
   console.log('ctlr_users, Now: ', new Date().toString())
   next()
})

router.get('/', getAll)
router.get('/investors', getInvestors)
router.get('/traders', getTraders)

router.get('/:userId', getUser)

router.post('/create', createUser)
router.delete('/delete/:userId', deleteUser)
router.patch('/update/:userId', updateUser)




function getAll(req, res, next) {

    console.log('USERS GET: ALL')

    svcUsers.getUsers()
        .then(users => res.json(users))
        .catch(err => res.json({message: err}))
}

function getInvestors(req, res, next) {

    console.log('USERS GET: investors')

    svcUsers.getUsers('I')
        .then(users => res.json(users))
        .catch(err => res.json({message: err}))
}

function getTraders(req, res, next) {

    console.log('USERS GET: traders')

    svcUsers.getUsers('T')
        .then(users => res.json(users))
        .catch(err => res.json({message: err}))
}


function getUser(req, res, next) {

    console.log('USERS GET: ' + req.params.userId)

    svcUsers.getUser(req.params.userId)
        .then(user => res.json(user))
        .catch(err => res.json({message: err}))
}

function createUser(req, res, next) {

    let userId = req.body.userId
    let password = req.body.password
    let type = req.body.type
    let name = req.body.name
    let wallet = req.body.wallet

    console.log(`USERS CREATE: ${userId}, ${password}, ${type}, ${name}, ${wallet}`)

    svcUsers.createUser(userId, password, type, name, wallet)
        .then(user => res.json(user))
        .catch(err => res.json({message: err}))
}

function deleteUser(req, res, next) {

    console.log('USERS DELETE: ' + req.params.userId)

    svcUsers.deleteUser(req.params.userId)
        .then(user => res.json(user))
        .catch(err => res.json({message: err}))
}

function updateUser(req, res, next) {

    let userId = req.params.userId
    let fieldsToUpdate = {}
    
    if( typeof req.body.password !== 'undefined')
        fieldsToUpdate["password"] = req.body.password

    if( typeof req.body.type !== 'undefined')
        fieldsToUpdate["type"] = req.body.type

    if( typeof req.body.name !== 'undefined')
        fieldsToUpdate["name"] = req.body.name

    if( typeof req.body.wallet !== 'undefined')
        fieldsToUpdate["wallet"] = req.body.wallet

    console.log(`USERS UPDATE: ${userId}, ${JSON.stringify(fieldsToUpdate)}`)

    svcUsers.updateUser(userId, fieldsToUpdate)
        .then(user => res.json(user))
        .catch(err => res.json({message: err}))
}

module.exports = router