const Joi = require("joi");
const sequelizeValidation = require("sequelize");

function globalErrorHandler(err, req, res, next) {
  const errorMessage = err.message || "Something went wrong.";
  const statusCode = err.statusCode || 400;

  if (err.name == "ValidationError") {
    res.status(400).json({
      statusCode: statusCode,
      message: errorMessage,
      error: err.name,
      details: err.details,
    });
  } else if (err.name == "SequelizeValidationError") {
    res.status(400).json({
      statusCode: statusCode,
      message: errorMessage,
      error: err.name,
      details: err.errors,
    });
    return;
  } else if (err.name == "SequelizeUniqueConstraintError") { 
    res.status(400).json({
      statusCode: statusCode,
      message: errorMessage,
      error: err.name,
      details: err.errors,
    });
    return;
  }

 
   else {
    res.status(400).json({
      statusCode: statusCode,
      message: errorMessage,
      error: err.name,
      details: err.errors,
    });
  }
}

module.exports = globalErrorHandler;
