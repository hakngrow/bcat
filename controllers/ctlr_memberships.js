var express = require('express')

var router = express.Router()

var svcCommunities = require('../service/svc_communities')
var svcMemberships = require('../service/svc_memberships')

router.use(function timeLog (req, res, next) {
    console.log('ctlr_memberships, Now: ', new Date().toString())
    next()
})

router.get('/api/all', getAll)

router.get('/api/comms/:communityId', getMembers)
router.get('/api/users/:userId', getCommunities)

router.post('/api/create', createMembership)

router.delete('/api/delete/users/:userId/comms/:communityId', deleteMembership)
router.delete('/api/delete/comms/:communityId', deleteMembers)
router.delete('/api/delete/users/:userId', deleteCommunities)

router.patch('/api/update/:id', updateMembership)


function getAll(req, res, next) {

    console.log('MEMBERSHIPS API GET: ALL')

    svcMemberships.getMemberships()
        .then(memberships => res.json(memberships))
        .catch(err => res.json({message: err}))
}

function getMembers(req, res, next) {

    console.log('MEMBERSHIPS API GET MEMBERS: ' + req.params.communityId)

    svcMemberships.getMembers(req.params.communityId)
        .then(members => res.json(members))
        .catch(err => res.json({message: err}))
}

function getCommunities(req, res, next) {

    console.log('MEMBERSHIPS API GET COMMUNITIES: ' + req.params.userId)

    svcMemberships.getCommunities(req.params.userId)
        .then(communities => res.json(communities))
        .catch(err => res.json({message: err}))
}

function createMembership(req, res, next) {

    let userId = req.body.userId
    let communityId = req.body.communityId

    console.log(`MEMBERSHIPS API CREATE: ${userId}, ${communityId}`)

    svcMemberships.createMembership(userId, communityId)
        .then(membership => res.json(membership))
        .catch(err => res.json({message: err}))
}

function deleteMembership(req, res, next) {

    let userId = req.params.userId
    let communityId = req.params.communityId

    console.log(`MEMBERSHIPS API DELETE: ${userId}, ${communityId}`)

    svcMemberships.deleteMembership(userId, communityId)
        .then(membership => res.json(membership))
        .catch(err => res.json({message: err}))
}

function deleteMembers(req, res, next) {

    console.log(`MEMBERSHIPS API DELETE MEMBERS: ${req.params.communityId}`)

    svcMemberships.deleteMembers(req.params.communityId)
        .then(members => res.json(members))
        .catch(err => res.json({message: err}))
}

function deleteCommunities(req, res, next) {

    console.log(`MEMBERSHIPS API DELETE COMMUNITIES: ${req.params.userId}`)

    svcMemberships.deleteCommunities(req.params.userId)
        .then(members => res.json(members))
        .catch(err => res.json({message: err}))
}

function updateMembership(req, res, next) {

    let membershipId = req.params.id
    let fieldsToUpdate = {}

    if( typeof req.body.userId !== 'undefined')
        fieldsToUpdate["userId"] = req.body.userId

    if( typeof req.body.communityId !== 'undefined')
        fieldsToUpdate["communityId"] = req.body.communityId

    console.log(`MEMBERSHIPS API UPDATE: ${membershipId}, ${JSON.stringify(fieldsToUpdate)}`)

    svcMemberships.updateMembership(membershipId, fieldsToUpdate)
        .then(membership => res.json(membership))
        .catch(err => res.json({message: err}))
}



router.get('/', async (req, res) => {

    console.log('MEMBERSHIPS GET: ALL')

    let userId = res.locals.payload.userId

    svcCommunities.getCommunities().then(communities => {
        svcMemberships.getCommunities(userId).then(memberships => {

            res.render('alte_memberships', {
                title: 'Communities',
                payload: res.locals.payload,
                communities: communities,
                joinedCommunityIds: memberships.map(membership => membership.communityId)
            })
        })
    })
    .catch(err => res.json({message: err}))
})

router.get('/join/users/:userId/comms/:communityId', async (req, res) => {

    let userId = req.params.userId
    let communityId = req.params.communityId

    console.log(`MEMBERSHIPS JOIN: ${userId}, ${communityId}`)

    svcMemberships.createMembership(userId, communityId)
        .then(res.redirect('/mbrshps'))
        .catch(err => res.json({message: err}))

})


module.exports = router