const { Product } = require("../../database/models");

module.exports = {
    // falta el countByCategory
    showAll: async (req, res) => {
        const productsCount = await Product.count();
        const products = await Product.findAll({
            attributes: ["id", "productName", "description"],
        });
        console.log(products[0]);
        const productsForApi = [];

        products.forEach((product) => {
            productsForApi.push({
                ...product.dataValues,
                detail: `http://localhost:3030/api/products/${product.id}`,
            });
        });

        const response = {
            meta: {
                url: req.originalUrl,
                status: 200,
            },
            data: {
                count: productsCount,
                products: productsForApi,
            },
        };
        res.send(response);
    },
    getById: async (req, res) => {
        const product = await Product.findByPk(req.params.id, {
            include: { all: true },
        });
        const data = 

        res.send({
            meta: {
                url: req.originalUrl,
                status: 200,
            },
            data: product,
        });
    },
};
