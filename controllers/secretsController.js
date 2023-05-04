const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

exports.renderSecretsPage = async(req, res) =>{
    if(req.isAuthenticated()){
        console.log("user authenticated");
        res.render('secrets')
    }
    else res.redirect('/login');
}