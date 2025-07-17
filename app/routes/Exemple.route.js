const express = require("express");
const userRouter = express.Router();


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
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exemple'
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
 *               $ref: '#/components/schemas/Exemple'
 *       400:
 *         description: Données invalides
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
 *               $ref: '#/components/schemas/Exemple'
 *       404:
 *         description: Exemple non trouvé
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
 *       404:
 *         description: Exemple non trouvé
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
 *               $ref: '#/components/schemas/Exemple'
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Exemple non trouvé
 */
exempleRouter.patch("/:id", updateExemple);

  
module.exports = exempleRouter;
