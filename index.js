const express = require('express')
const bodyParser = require('body-parser')
const mongoDB = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
config = require('config');
let PORT = config.get('PORT')

app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieSession({
    maxAge:30*24*60*60*1000,
    keys :[config.get('keys')]
}))

app.use(passport.initialize());
app.use(passport.session());

mongoDB.connect(config.get('mongoURI.uri'),{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true, 
},console.log("mongo connected"))

require('./models/User')
require('./services/passport')
require('./routes/authRoutes')



app.listen(PORT,()=>{console.log('connected')})
//export NODE_ENV=config
