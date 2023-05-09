const User = require("../models/user");

exports.renderSecretsPage = async(req, res) =>{
    User.find()
    .then((foundUsers) =>{
        console.log(foundUsers);
        res.render("secrets", {usersWithSecrets: foundUsers});
    })
    .catch((err) =>{
        console.log(err);
    })
}