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
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
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
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Utilisateur non trouvé
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
 *       404:
 *         description: Utilisateur non trouvé
 */
userRouter.delete("/:username", deleteUser);

/**
 * @swagger
 * /users/auth/register:
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
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Données invalides
 */
userRouter.post("/auth/register", createUser);

/**
 * @swagger
 * /users/auth/login:
 *   post:
 *     summary: Authentifie un utilisateur
 *     tags:
 *       - Users
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
 *       401:
 *         description: Identifiants invalides
 */
userRouter.post("/auth/login", loginUser);


module.exports = userRouter;
