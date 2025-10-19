const express = require("express");
const exempleRouter = express.Router();

const {
  getAllExemples,
  getExempleById,
  createExemple,
  updateExemple,
  deleteExemple,
} = require("../controllers/Exemple.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Exemple:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *           minLength: 3
 *           maxLength: 200
 *         author:
 *           type: string
 *           minLength: 3
 *           maxLength: 200
 *         description:
 *           type: string
 *           maxLength: 1000
 *       required:
 *         - title
 *         - author
 *     CreateExempleModel:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           minLength: 3
 *           maxLength: 200
 *         author:
 *           type: string
 *           minLength: 3
 *           maxLength: 200
 *         description:
 *           type: string
 *           maxLength: 1000
 *       required:
 *         - title
 *         - author
 *     UpdateExempleModel:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           minLength: 3
 *           maxLength: 200
 *         author:
 *           type: string
 *           minLength: 3
 *           maxLength: 200
 *         description:
 *           type: string
 *           maxLength: 1000
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
 *     ApiResponseExemple:
 *       allOf:
 *         - $ref: '#/components/schemas/ApiResponse'
 *         - type: object
 *           properties:
 *             data:
 *               $ref: '#/components/schemas/Exemple'
 *     ApiResponseExempleList:
 *       allOf:
 *         - $ref: '#/components/schemas/ApiResponse'
 *         - type: object
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exemple'
 */

/**
 * @swagger
 * /exemples/:
 *   get:
 *     summary: Récupère tous les exemples
 *     tags:
 *       - Exemples
 *     responses:
 *       200:
 *         description: Liste des exemples
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseExempleList'
 */
exempleRouter.get("/", getAllExemples);

/**
 * @swagger
 * /exemples/:
 *   post:
 *     summary: Crée un nouvel exemple
 *     tags:
 *       - Exemples
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateExempleModel'
 *     responses:
 *       201:
 *         description: Exemple créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseExemple'
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
exempleRouter.post("/", createExemple);

/**
 * @swagger
 * /exemples/{id}:
 *   get:
 *     summary: Récupère un exemple par son id
 *     tags:
 *       - Exemples
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Exemple trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseExemple'
 *       404:
 *         description: Exemple non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
exempleRouter.get("/:id", getExempleById);

/**
 * @swagger
 * /exemples/{id}:
 *   delete:
 *     summary: Supprime un exemple par son id
 *     tags:
 *       - Exemples
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Exemple supprimé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Exemple non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
exempleRouter.delete("/:id", deleteExemple);

/**
 * @swagger
 * /exemples/{id}:
 *   patch:
 *     summary: Met à jour un exemple par son id
 *     tags:
 *       - Exemples
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateExempleModel'
 *     responses:
 *       200:
 *         description: Exemple mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseExemple'
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Exemple non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
exempleRouter.patch("/:id", updateExemple);

module.exports = exempleRouter;
