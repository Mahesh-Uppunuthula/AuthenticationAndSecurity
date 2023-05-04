const User = require('../models/user');
const passport = require('passport');

exports.renderRegisterPage = async (req, res) => {
    res.render('register');
}

exports.registerUser = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.register({username:username}, password, (err, user) =>{
        if(err)
        {
            console.log(err);
            res.redirect('/register');
        }
        else
        {
            console.log(user);
            passport.authenticate("local")(req, res, ()=>{
                console.log("register authentication");
                res.redirect('/secrets');
            })
        };
    })


}