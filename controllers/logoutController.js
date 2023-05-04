const passport = require('passport');
exports.logTheUserOut = async(req, res) =>{
    req.logout((err) =>{
        if(err)
        {
            console.log(err);
            res.send("There is a problem in loggin out try some time later");
        }
        else
        {
            res.redirect('/');
        }
    });
}