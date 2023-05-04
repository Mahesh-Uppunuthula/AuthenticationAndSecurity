require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs')
const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const session = require('express-session');
const User = require('./models/user');

require('./db.connect');

const app = express();

// configs and setups 
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:false
}))

app.use(passport.initialize());
app.use(passport.session());


//serialse : creates cookie
passport.serializeUser(User.serializeUser());

//serialse : destroys cookie
passport.deserializeUser(User.deserializeUser());


// Routes
const homeRoute = require('./routes/homeRoute');
const loginRoute = require('./routes/loginRoute');
const registerRoute = require('./routes/registerRoute');
const secretsRoute = require('./routes/secretsRoute');
const logoutRoute = require('./routes/logoutRoute');

app.use('/', homeRoute);
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/secrets', secretsRoute);
app.use('/logout', logoutRoute);

app.listen(3000, ()=>{
    console.log("server started on port 3000");
})