require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs')
const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const session = require('express-session');
const User = require('./models/user');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

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


passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, {
      id: user.id,
      username: user.username,
      picture: user.picture
    });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});


// google OAuth 

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      
        console.log(profile);
        return cb(err, user);
    });
  }
));


// Routes
const homeRoute = require('./routes/homeRoute');
const loginRoute = require('./routes/loginRoute');
const registerRoute = require('./routes/registerRoute');
const secretsRoute = require('./routes/secretsRoute');
const logoutRoute = require('./routes/logoutRoute');
const submitRoute = require('./routes/submitRoute');
const OAuth = require('./controllers/authController');

app.use('/', homeRoute);
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/secrets', secretsRoute);
app.use('/submit', submitRoute);
app.use('/logout', logoutRoute);

// google auth javascript origin
// app.use('/auth/google',  passport.authenticate('google', { scope: ['profile'] }));

app.route('/auth/google')

  .get(passport.authenticate('google', {

    scope: ['profile']

  }));

// google callback -> /auth/google/callback
app.get('/auth/google/secrets',
      passport.authenticate("google", 
      { failureRedirect: "/login" }), 
      function(req, res)
      {
        res.redirect('/secrets');
      });

app.listen(3000, ()=>{
    console.log("server started on port 3000");
})