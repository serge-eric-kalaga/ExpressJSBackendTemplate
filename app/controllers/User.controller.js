const {User, CreateUserModel, UpdateUserModel} = require("../models/Models")
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {

    async getAllUsers(req, res) {
        try {
            const users = await User.findAll({
                attributes: ["id", "nom_prenom", "username", "createdAt", "updatedAt"]
            });
            res.Response({ data: users })
        } catch (error) {
            res.status(400).Response({ message: error.message })
        }
    },

    async createUser(req, res, next) {
        try {
            CreateUserModel.validateAsync(req.body).then(async (value) => {

                // Check if the username already exists
                const existingUser = await User.findOne({
                    where: {
                        username: req.body.username
                    }
                });
                if (existingUser) {
                    return res.status(400).Response({ message: "Username already exists !" });
                }

                const newUser = await User.create({
                    nom_prenom: req.body.nom_prenom,
                    username: req.body.username,
                    password: bcrypt.hashSync(req.body.password, parseInt(process.env.UserPasswordSaltRound))
                })
                res.Response({ data: newUser })
            }).catch(err => {
                next(err);
            })
        } catch (error) {
            next(err);
        }
    },

    async getUserByUsername(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    username: req.params.username
                },
                order: [["createdAt", "DESC"]], 
                attributes: ["id", "nom_prenom", "username", "createdAt", "updatedAt"]
            })
            if (!user) {
                res.status(404).Response({ message: "User not found !" })
            }
            else {
                res.Response({ data: user })
            }
        } catch (error) {
            res.status(400).Response({ message: error.message })
        }
    },

    async deleteUser(req, res) {
        User.destroy({
            where: {
                username: req.params.username
            }
        }).then(async (value) => {
            if (value == 0) {
                res.status(404).Response({ message: "User not found !" })
            }
            else{
                res.Response({ message: "User deleted !" })
            }
        }).catch(error => {
            res.status(400).Response({ message: error.message })
        })
    },

    async updateUser(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    username: req.params.username
                }
            })
            if (!user) {
                res.status(404).Response({ message: "User not found !" })
            }
            else {
                UpdateUserModel.validateAsync(req.body).then(async (value) => {
                    await user.update(req.body)
                    await user.save()
                    res.Response({ data: user })
                })
            }
        } catch (error) {
            res.status(400).Response({ message: error.message })
        }
    },

    async loginUser(req, res) {
        try {
            
            const user_exist = await User.findOne({
                where: {
                    username: req.body.username,
                }
            });

            if (!user_exist) {
                res.status(401).Response({ message: "Username or password incorrect !" })
            }
            else {

                const checkPassword = bcrypt.compareSync(req.body.password, user_exist.password)

                if (!checkPassword) {
                    res.status(401).Response({ message: "Username or password incorrect !" })
                }
                else {
                    const token = jsonwebtoken.sign({
                        _id: user_exist._id,
                        username: user_exist.username,
                        fullname: user_exist.fullname
                    }, process.env.JWTKey, { expiresIn: 3600 });

                    // res.send(checkPassword)
                    res.Response({
                        data: {
                            username: user_exist.username,
                            fullname: user_exist.fullname,
                            token: token
                        }
                    })

                }

            }

        } catch (error) {
            res.status(400).Response({ message: error.message })
        }
    }

}