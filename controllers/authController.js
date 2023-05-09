const passport = require("passport")

exports.googleAuth = passport.authenticate('google', { scope: ['profile'] })

exports.googleAuthCallback = passport.authenticate("google", { failureRedirect: "/login" }),
function(req, res) {
  res.redirect('/secrets');
}

// exports.googleAuth = passport.authenticate('google', { scope: ['profile'] })