const { User, CreateUserModel, UpdateUserModel } = require("./User.model");
const { Exemple, CreateExempleModel, UpdateExempleModel } = require("./Exemple.model");
const { DB, connect_db } = require("../configs/Database");


module.exports = {
  User,
  Exemple,
  CreateExempleModel,
  UpdateExempleModel,
  CreateUserModel,
  UpdateUserModel,
};