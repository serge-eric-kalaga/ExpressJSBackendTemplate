const { Sequelize, DataTypes, Model } = require("sequelize");
const Joi = require("joi");
const { DB } = require("../configs/Database");


const Exemple = DB.define(
    "Exemple",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null,
        }
    },
    {}
);


// Relationship



const CreateExempleModel = Joi.object({
    title: Joi.string().required().min(3).max(200),
    author: Joi.string().required().min(3).max(200),
    description: Joi.string().optional().max(1000),
});
const UpdateExempleModel = Joi.object({
    title: Joi.string().optional().min(3).max(200),
    author: Joi.string().optional().min(3).max(200),
    description: Joi.string().optional().max(1000)
})



module.exports = { Exemple, CreateExempleModel, UpdateExempleModel };