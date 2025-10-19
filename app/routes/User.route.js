const express = require("express");

const userRouter = express.Router();

const {
  getAllUsers,
  createUser,
  loginUser,
  getUserByUsername,
  deleteUser,
  updateUser,
} = require("../controllers/User.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nom_prenom:
 *           type: string
 *           minLength: 3
 *           maxLength: 200
 *         username:
 *           type: string
 *           minLength: 3
 *           maxLength: 40
 *         password:
 *           type: string
 *           minLength: 4
 *         role:
 *           type: string
 *           enum: [ADMIN, USER]
 *           default: USER
 *       required:
 *         - nom_prenom
 *         - username
 *         - password
 *     CreateUserModel:
 *       type: object
 *       properties:
 *         nom_prenom:
 *           type: string
 *           minLength: 3
 *           maxLength: 200
 *         username:
 *           type: string
 *           minLength: 3
 *           maxLength: 40
 *         password:
 *           type: string
 *           minLength: 4
 *         role:
 *           type: string
 *           enum: [ADMIN, USER]
 *           default: USER
 *       required:
 *         - nom_prenom
 *         - username
 *         - password
 *     UpdateUserModel:
 *       type: object
 *       properties:
 *         nom_prenom:
 *           type: string
 *           minLength: 3
 *           maxLength: 200
 *         username:
 *           type: string
 *           minLength: 3
 *           maxLength: 40
 *         password:
 *           type: string
 *           minLength: 4
 *         role:
 *           type: string
 *           enum: [ADMIN, USER]
 *
 *     # Schémas de réponse uniformisée (middleware Response)
 *     ApiResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           example: 200
 *         message:
 *           type: string
 *           example: ok
 *         data:
 *           nullable: true
 *     ApiResponseUser:
 *       allOf:
 *         - $ref: '#/components/schemas/ApiResponse'
 *         - type: object
 *           properties:
 *             data:
 *               $ref: '#/components/schemas/User'
 *     ApiResponseUserList:
 *       allOf:
 *         - $ref: '#/components/schemas/ApiResponse'
 *         - type: object
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *     AuthLoginData:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *         user:
 *           $ref: '#/components/schemas/User'
 *     ApiResponseAuthLogin:
 *       allOf:
 *         - $ref: '#/components/schemas/ApiResponse'
 *         - type: object
 *           properties:
 *             data:
 *               $ref: '#/components/schemas/AuthLoginData'
 */

/**
 * @swagger
 * /users/:
 *   get:
 *     summary: Récupère tous les utilisateurs
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseUserList'
 */
userRouter.get("/", getAllUsers);

/**
 * @swagger
 * /users/{username}:
 *   get:
 *     summary: Récupère un utilisateur par son username
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseUser'
 *       404:
 *         description: Utilisateur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
userRouter.get("/:username", getUserByUsername);

/**
 * @swagger
 * /users/{username}:
 *   delete:
 *     summary: Supprime un utilisateur par son username
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Utilisateur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
userRouter.delete("/:username", deleteUser);

/**
 * @swagger
 * /users/auth/signup:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserModel'
 *     responses:
 *       200:
 *         description: Utilisateur créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseUser'
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
userRouter.post("/auth/signup", createUser);

/**
 * @swagger
 * /users/auth/register:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserModel'
 *     responses:
 *       200:
 *         description: Utilisateur créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseUser'
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
userRouter.post("/auth/register", createUser);

/**
 * @swagger
 * /users/:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserModel'
 *     responses:
 *       200:
 *         description: Utilisateur créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseUser'
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
userRouter.post("/", createUser);

/**
 * @swagger
 * /users/auth/login:
 *   post:
 *     summary: Authentifie un utilisateur
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Authentification réussie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseAuthLogin'
 *       401:
 *         description: Identifiants invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
userRouter.post("/auth/login", loginUser);

module.exports = userRouter;
