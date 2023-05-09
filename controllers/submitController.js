const User = require("../models/user");

exports.renderSubmitPage = async(req, res) =>{
    if(req.isAuthenticated())
    {
        res.render("submit");
    }
    else
    {
        res.redirect("/login");
    }
}

exports.submitNewSecret = async(req, res) =>{
    const submittedSecret = req.body.secret;
    const userId = req.user.id;
    // console.log(req.user);

    User.findById(userId)
    .then((foundUser) =>{
        foundUser.secret = submittedSecret;
        foundUser.save()
            .then(()=>{
                res.redirect('/secrets');
                console.log("found user \n" + foundUser);
            })
            .catch((err)=>{
                console.log(err);
            })
    })
    .catch((err) =>{
        console.log(err);
    })

}