const { Product } = require("../../database/models");

module.exports = {
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
