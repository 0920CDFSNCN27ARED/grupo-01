const { Product, Grape, Sequelize } = require("../../database/models");
const sequelize = require("sequelize");
const QueryTypes = sequelize.QueryTypes;

module.exports = {
    // falta el countByCategory
    showAll: async (req, res) => {
        const productsCount = await Product.count();
        const products = await Product.findAll({
            attributes: ["id", "productName", "description"],
            raw: true,
            nest: true,
            include: { model: Grape, as: "grape", required: true },
        });

        // Get count by category
        const countByGrape = await Grape.sequelize.query(
            `SELECT name as grape, COUNT(*) as "productsPerGrape" FROM grapes right join products on products.grapeId = grapes.id GROUP BY name;`,

            {
                type: QueryTypes.SELECT,
            }
        );
        let countByGrapeObject = {};
        countByGrape.forEach((grape) => {
            countByGrapeObject[grape.grape] = grape.productsPerGrape;
        });

        const productsForApi = [];

        products.forEach((product) => {
            productsForApi.push({
                ...product,
                detail: `http://localhost:3000/api/products/${product.id}`,
            });
        });

        const response = {
            meta: {
                url: req.originalUrl,
                status: 200,
            },
            data: {
                count: productsCount,
                countByGrape: countByGrapeObject,
                products: productsForApi,
            },
        };
        res.send(response);
    },
    getById: async (req, res) => {
        const product = await Product.findByPk(req.params.id, {
            include: { all: true, attributtes: { exclude: ["grapeId", "GrapeId"] }},
            nest: true,
           
        });
        
        res.send({
            meta: {
                url: req.originalUrl,
                status: 200,
            },
            data: product,
        });
    },
    list: async(req, res) => {
        const products = await Product.findAll()
        
        res.send()
    }
};
