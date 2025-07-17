bodyParser = require("body-parser"),
  swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express");
const path = require("path");

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: process.env.APP_NAME || 'ExpressJS Backend API',
      version: process.env.APP_VERSION || '1.0.0',
      description: process.env.APP_DESCRIPTION || 'API documentation for the Fleet Service',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
      },
    ],
    components: {
      securitySchemes: null
    }
  },
  apis: ['./routes/*.js'], // Path to your API docs
};


const swaggerSpec = swaggerJsdoc(options);

// console.log("Swagger generated spec:", JSON.stringify(swaggerSpec, null, 2));

module.exports.swaggerSpec = swaggerSpec;