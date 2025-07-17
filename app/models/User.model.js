const { Sequelize, DataTypes, Model } = require("sequelize");
const Joi = require("joi");
const { DB } = require("../configs/Database");

const User = DB.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom_prenom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {}
);

const CreateUserModel = Joi.object({
  nom_prenom: Joi.string().required().min(3).max(200),
  username: Joi.string().required().min(3).max(40).alphanum(),
  password: Joi.string().required().min(4),
});

const UpdateUserModel = Joi.object({
  nom_prenom: Joi.string().min(3).max(200),
  username: Joi.string().min(3).max(40).alphanum(),
  password: Joi.string().min(4),
})

module.exports = { User, CreateUserModel, UpdateUserModel };
