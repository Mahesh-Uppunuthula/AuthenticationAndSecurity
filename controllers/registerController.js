const User = require('../models/user');
// const md5 = require('md5');
const bcrypt = require('bcrypt');
const saltingRounds = 10;

exports.renderRegisterPage = async (req, res) => {
    res.render('register');
}

exports.registerUser = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // const password = md5(req.body.password);

    bcrypt.hash(password, saltingRounds, (err, hash) => {

        const newUser = new User(
            {
                username: username,
                password: hash
            })

        newUser.save()
            .then(() => {
                res.render('secrets');
            })
            .catch((err) => {
                res.send(err);
            })
    })

}