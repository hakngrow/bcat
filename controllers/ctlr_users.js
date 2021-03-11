var express = require('express')

var router = express.Router()

var svcUsers = require('../service/svc_users')

router.use(function timeLog (req, res, next) {
   console.log('ctlr_users, Now: ', new Date().toString())
   next()
})

router.get('/api/all', getAll)
router.get('/api/investors', getInvestors)
router.get('/api/traders', getTraders)

router.get('/api/:userId', getUser)

router.post('/api/create', createUser)
router.delete('/api/delete/:userId', deleteUser)
router.patch('/api/update/:userId', updateUser)

function getAll(req, res, next) {

    console.log('USERS API GET: ALL')

    svcUsers.getUsers()
        .then(users => res.json(users))
        .catch(err => res.json({message: err}))
}

function getInvestors(req, res, next) {

    console.log('USERS API GET: investors')

    svcUsers.getUsers('I')
        .then(users => res.json(users))
        .catch(err => res.json({message: err}))
}

function getTraders(req, res, next) {

    console.log('USERS API GET: traders')

    svcUsers.getUsers('T')
        .then(users => res.json(users))
        .catch(err => res.json({message: err}))
}


function getUser(req, res, next) {

    console.log('USERS API GET: ' + req.params.userId)

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

    console.log(`USERS API CREATE: ${userId}, ${password}, ${type}, ${name}, ${wallet}`)

    svcUsers.createUser(userId, password, type, name, wallet)
        .then(user => res.json(user))
        .catch(err => res.json({message: err}))
}

function deleteUser(req, res, next) {

    console.log('USERS API DELETE: ' + req.params.userId)

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

    console.log(`USERS API UPDATE: ${userId}, ${JSON.stringify(fieldsToUpdate)}`)

    svcUsers.updateUser(userId, fieldsToUpdate)
        .then(user => res.json(user))
        .catch(err => res.json({message: err}))
}

router.get('/', async (req, res) => {

    console.log('USERS GET: ALL')

    svcUsers.getUsers().then( users => {

        res.render('alte_users', {
            title: 'Users',
            payload: res.locals.payload,
            users: users 
        })
    })
    .catch(err => res.json({message: err}))
})

router.get('/new', async (req, res) => {

    console.log('USERS NEW')

    res.render('alte_users_new', {
        title: 'New User'
    })
})

router.post('/create', async (req, res) => {

    let userId = req.body.txtUserId
    let password = req.body.txtPassword
    let type = req.body.selType
    let name = req.body.txtName
    let wallet = req.body.txtWallet

    console.log(`USERS CREATE: ${userId}, ${password}, ${type}, ${name}, ${wallet}`)
    
    svcUsers.createUser(userId, password, type, name, wallet)
        .then(res.redirect('/users'))
        .catch(err => res.json({message: err}))
})

router.get('/edit/:userId', async (req, res) => {

    console.log('USERS EDIT: ' + req.params.userId)

    svcUsers.getUser(req.params.userId).then( user => {

        res.render('alte_users_edit', {
            title: 'Edit User',
            payload: res.locals.payload,
            user: user
        })
    })
    .catch(err => res.json({message: err}))
})

router.post('/update/:userId', async (req, res) => {

    let userId = req.params.userId
    let fieldsToUpdate = {}
    
    if( typeof req.body.txtPassword !== 'undefined')
        fieldsToUpdate["password"] = req.body.txtPassword

    if( typeof req.body.selType !== 'undefined')
        fieldsToUpdate["type"] = req.body.selType

    if( typeof req.body.txtName !== 'undefined')
        fieldsToUpdate["name"] = req.body.txtName

    if( typeof req.body.txtWallet !== 'undefined')
        fieldsToUpdate["wallet"] = req.body.txtWallet

    console.log(`USERS UPDATE: ${userId}, ${JSON.stringify(fieldsToUpdate)}`)

    svcUsers.updateUser(userId, fieldsToUpdate)
        .then(res.redirect('/users'))
        .catch(err => res.json({message: err}))
})

router.get('/delete/:userId', async (req, res) => {

    console.log('USERS DELETE: ' + req.params.userId)

    svcUsers.getUser(req.params.userId).then( user => {

        res.render('alte_users_delete', {
            title: 'Delete User',
            payload: res.locals.payload,
            user: user
        })
    })
    .catch(err => res.json({message: err}))
})

router.post('/remove/:userId', async (req, res) => {

    console.log('USERS REMOVE: ' + req.params.userId)

    svcUsers.deleteUser(req.params.userId)
        .then(res.redirect('/users'))
        .catch(err => res.json({message: err}))
})

module.exports = router