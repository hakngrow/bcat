const path = require('path')

const {CFG_HOST, CFG_PORT, CFG_DB_URL} = require('./helpers/config')

// -------------------------------------------
// ExpressJS configuration
// -------------------------------------------

const express = require('express')
const app = express()

app.use(express.static('public'))


// -------------------------------------------
// Middlewares configuration
// -------------------------------------------



const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'})); // For parsing application/json
app.use(bodyParser.urlencoded({limit: '50mb', extended: true})); // For parsing application/xwww-form-urlencoded

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const cors = require('cors')
app.use(cors())




// -------------------------------------------
// Mongoose configuration
// -------------------------------------------

const mongoose = require('mongoose')

mongoose.connect(CFG_DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(
    _ => console.log('MongoDB connected:', CFG_DB_URL),
    err => console.error('MongoDB connection error:', err)
)

const db = mongoose.connection


// -------------------------------------------
// Handlebars template engine configuration
// -------------------------------------------

const hbs = require('handlebars')
const exphbs = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

app.engine('hbs', 
    exphbs({
        handlebars: allowInsecurePrototypeAccess(hbs),
        defaultLayout: 'alte_main', 
        extname: '.hbs',
        helpers: require('./helpers/handlebars')
    })
)

app.set('view engine', 'hbs')
app.set('views', './views')






// -------------------------------------------
// Routing controllers configuration
// -------------------------------------------

const {verifyUser} = require('./service/svc_authentication')

var ctlr_authentication = require(path.join(__dirname, '/controllers/ctlr_authentication'))
app.use('/authenticate', ctlr_authentication)

var ctlr_users = require(path.join(__dirname, '/controllers/ctlr_users'))
app.use('/users', verifyUser, ctlr_users)

var ctlr_assets = require(path.join(__dirname, '/controllers/ctlr_assets'))
app.use('/assets', verifyUser, ctlr_assets)

var ctlr_communities = require(path.join(__dirname, '/controllers/ctlr_communities'))
app.use('/comms', verifyUser, ctlr_communities)

var ctlr_memberships = require(path.join(__dirname, '/controllers/ctlr_memberships'))
app.use('/mbrshps', verifyUser, ctlr_memberships)

var ctlr_tokens = require(path.join(__dirname, '/controllers/ctlr_tokens'))
app.use('/tokens', verifyUser, ctlr_tokens)



var ctlr_txns = require(path.join(__dirname, '/controllers/ctlr_txns'))
app.use('/txns', ctlr_txns)



app.get('/home', verifyUser, (req, res) => {
  res.render('alte_blank', {title: "Dashboard v0.1"})
})





app.listen(CFG_PORT, () => {
    console.log(`BCAT Dashboard listening at http://${CFG_HOST}:${CFG_PORT}`)
})
