const Joi = require("joi");
const sequelizeValidation = require("sequelize");
const sendInternalErrorNotificationToAdmin = require("../services/Admin.service").sendInternalErrorNotificationToAdmin;

function globalErrorHandler(err, req, res, next) {
  const errorMessage = err.message || "Something went wrong.";
  const statusCode = err.statusCode || 400;

  // Send notification to admin on internal server errors
  if (statusCode === 500) {
    sendInternalErrorNotificationToAdmin(req, err).catch((error) => {
      console.error("Failed to send internal error notification to admin:", error);
    });
  }

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
