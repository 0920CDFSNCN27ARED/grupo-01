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
            include: {
                all: true,
                attributtes: { exclude: ["grapeId", "GrapeId"] },
            },
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
    list: async (req, res) => {
        const products = await Product.findAll();

        res.send();
    },
    latest: async (req, res) => {
        const count = await Product.count();
        const eightLastProds = await Product.findAll({
            limit: 8,
            order: [["createdAt", "DESC"]],
        });
        res.send({
            meta: {
                url: req.originalUrl,
                status: 200,
                totalCount: count,
            },
            data: eightLastProds,
        });
    },
    offers: (req, res) => {
        res.send("Offers");
    },
    count: async (req, res) => {
        const count = await Product.count();
        res.send({ count });
    },
    totalPrice: async (req, res) => {
        const products = await Product.findAll();
        const stringTotalPrice = products.reduce((acc, product) => {
            return acc + Number(product.price);
        }, 0);
        const totalPrice = stringTotalPrice;
        res.send({ totalPrice });
    },
    getOne: async (req, res) => {
        const product = await Product.findByPk(req.params.id);
        res.send(product);
    },
};
