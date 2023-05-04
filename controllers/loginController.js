const User = require('../models/user');
// const md5 = require('md5');
const bcrypt = require('bcrypt');
const saltingRounds = 10;

exports.renderLoginPage = async (req, res) => {
    res.render('login');
}

exports.loginUser = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // const password = md5(req.body.password);

    User.findOne({ username: username })
        .then((foundUser) => {
            bcrypt.compare(password, foundUser.password, (err, result) => {
                if(result)
                    res.render('secrets');
            });
        })
        .catch((err) => {
            console.log(err);
        })
}
