const e = require("express");
const logger = require("../utils/Logger");
const { Sequelize } = require("sequelize");

const DB = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.DATABASE_USER,
  process.env.MYSQL_ROOT_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    logging: logger.debug.bind(logger),
    // operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    timezone: "+00:00",
  }
);


const connect_db = async () => {
  try {
    await DB.authenticate();
    console.log(
      "=================> Base de données connectée ! <================="
    );

    DB.sync({
      alter: true,
      // force: true,
    });
    
    return DB;
  } catch (error) {
    logger.error(
      "=================> Erreur lors de la connexion à la base de données <=================\n",
      error
    );
    console.log(error);
    
    process.exit(1);
  }
};


module.exports = {
  DB,
  connect_db,
};
