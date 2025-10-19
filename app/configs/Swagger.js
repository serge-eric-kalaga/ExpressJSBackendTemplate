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
      description: process.env.APP_DESCRIPTION || 'Template for ExpressJS backend application',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
        description: 'Serveur de développement',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Entrez votre token JWT (récupéré via /users/auth/login)',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nom_prenom: { type: 'string', example: 'John Doe' },
            username: { type: 'string', example: 'johndoe' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: {
              type: 'string',
              example: 'admin',
              description: 'Nom d\'utilisateur'
            },
            password: {
              type: 'string',
              format: 'password',
              example: 'admin',
              description: 'Mot de passe'
            },
          },
        },
        LoginResponse: {
          type: 'object',
          properties: {
            statusCode: { type: 'integer', example: 200 },
            message: { type: 'string', example: 'ok' },
            data: {
              type: 'object',
              properties: {
                access_token: {
                  type: 'string',
                  description: 'Token JWT à copier dans le bouton Authorize'
                },
                token_type: { type: 'string', example: 'Bearer' },
                username: { type: 'string', example: 'admin' },
                nom_prenom: { type: 'string', example: 'Administrator' },
              },
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            statusCode: { type: 'integer' },
            message: { type: 'string' },
            data: { nullable: true },
          },
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Non autorisé - Token manquant ou invalide',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerUiOptions = {
  explorer: true,
  swaggerOptions: {
    persistAuthorization: true,
    docExpansion: 'none',
    filter: true,
    tryItOutEnabled: true,
  },
};

module.exports.swaggerSpec = swaggerSpec;
module.exports.swaggerUiOptions = swaggerUiOptions;