const passport = require('passport');
const User = require('../models/user');
const saltingRounds = 10;

exports.renderLoginPage = async (req, res) => {
    res.render('login');
}

exports.loginUser = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = new User({
        username: username,
        password: password
    })

    req.login(user, (err) => {
        if (err) {
            console.log(err);
            res.redirect("/login");
        }
        else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/secrets');
            })
        }
    })


}
