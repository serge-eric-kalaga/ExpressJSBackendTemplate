const {User} = require("../models/User.model")
const bcrypt = require("bcrypt");

module.exports =

{
    async InitUser() {

        console.log("========== Initialisation de l'utilisateur par defaut ==========");
        const username = "admin";
        const userExist = User.findOne({
            where: { username: username }
        });
        
        if (await userExist == null) {
            User.create({
                username: username,
                password: bcrypt.hashSync("admin", parseInt(process.env.UserPasswordSaltRound)),
                nom_prenom: "Admin"
            }).then(async (value) => {
                console.log("Initialisation de l'utilisateur par defaut ok !");
            }).catch(error => {
                console.log("Initialisation de l'utilisateur par defaut KO !");
            })
            console.log("Succes !");
        }
        else{
            console.log("Default User Already Exist ! ");
        }
    }
}