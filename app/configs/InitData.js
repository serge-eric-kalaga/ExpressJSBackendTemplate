const { User } = require("../models/User.model")
const bcrypt = require("bcrypt");

module.exports =

{
    async InitUser() {

        console.log("========== Initialisation de l'utilisateur par defaut ==========");
        const username = process.env.INIT_USERNAME || "admin";
        const userExist = User.findOne({
            where: { username: username }
        });

        if (await userExist == null) {
            User.create({
                username: process.env.INIT_USERNAME || "admin",
                password: bcrypt.hashSync(process.env.INIT_PASSWORD || "admin", parseInt(process.env.UserPasswordSaltRound)),
                nom_prenom: "Admin ADMIN",
                role: "ADMIN",
            }).then(async (value) => {
                console.log("Initialisation de l'utilisateur par defaut ok !");
            }).catch(error => {
                console.log("Initialisation de l'utilisateur par defaut KO !");
            })
            console.log("Succes !");
        }
        else {
            console.log("Default User Already Exist ! ");
        }
    }
}