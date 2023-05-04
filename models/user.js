const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');
const userSchema = new mongoose.Schema(
{
    username: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model('user', userSchema);

// passport createa a local-mongoose-strategy
passport.use(User.createStrategy());

module.exports = User;