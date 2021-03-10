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

const exphbs = require('express-handlebars')

app.engine('hbs', 
    exphbs({
        defaultLayout: 'alte_main', 
        extname: '.hbs',
        helpers: {}
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
app.use('/users', ctlr_users)

var ctlr_assets = require(path.join(__dirname, '/controllers/ctlr_assets'))
app.use('/assets', ctlr_assets)

var ctlr_communities = require(path.join(__dirname, '/controllers/ctlr_communities'))
app.use('/comms', ctlr_communities)

var ctlr_txns = require(path.join(__dirname, '/controllers/ctlr_txns'))
app.use('/txns', ctlr_txns)



app.get('/home', verifyUser, (req, res) => {
  res.render('blank')
})





app.listen(CFG_PORT, () => {
    console.log(`BCAT Dashboard listening at http://${CFG_HOST}:${CFG_PORT}`)
})
