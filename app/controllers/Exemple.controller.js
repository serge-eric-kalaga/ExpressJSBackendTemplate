const { Exemple, CreateExempleModel, UpdateExempleModel } = require("../models/Models");
const { generateISBN } = require("../utils/Functions");

module.exports = {
    async getAllExemples(req, res) {
        try {
            const exemples = await Exemple.findAll();
            res.Response({ data: exemples });
        } catch (error) {
            res.status(400).Response({ message: error.message });
        }
    },


    async getExempleById(req, res) {
        try {
            const exemple = await Exemple.findByPk(req.params.id);
            if (!exemple) {
                return res.status(404).Response({ message: `Exemple ${req.params.id} not found!` });
            }
            res.Response({ data: exemple });
        } catch (error) {
            res.status(400).Response({ message: error.message });
        }
    },


    async createExemple(req, res, next) {
        try {
            await CreateExempleModel.validateAsync(req.body);
            req.body.isbn = generateISBN();
            const newExemple = await Exemple.create(req.body);
            res.Response({ data: newExemple });
        } catch (error) {
            next(error);
        }
    },

    async updateExemple(req, res, next) {
        try {
            const exemple = await Exemple.findByPk(req.params.id);
            if (!exemple) {
                return res.status(404).Response({ message: `Exemple ${req.params.id} not found!` });
            }
            await UpdateExempleModel.validateAsync(req.body);
            await exemple.update(req.body);
            res.Response({ data: exemple });
        } catch (error) {
            next(error);
        }
    },

    async deleteExemple(req, res) {
        try {
            // verify if id is valid
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).Response({ message: "Invalid ID format!" });
            }

            const result = await Exemple.destroy({ where: { id: id } });
            if (!result) {
                return res.status(404).Response({ message: `Exemple ${id} not found!` });
            }
            res.Response({ message: "Exemple deleted successfully!" });
        } catch (error) {
            console.log(error);

            res.status(400).Response({ message: error.message });
        }
    }

};