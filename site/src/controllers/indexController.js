const gifResource = require("../requests/gifResource");
const { Product, OrderItem } = require("../database/models");
const sequelize = require("sequelize");
const indexController = {
    showIndex: async (req, res) => {
        try {
            const bestSellers = await OrderItem.sequelize.query(
                `select productId, COUNT(*)
                FROM order_items
                GROUP BY productId
                LIMIT 4;`,
                { raw: true }
            );

            const allProds = await Product.sequelize.query(`select *
            FROM products
            LIMIT 6;`,
            { raw: true })

            const bestSellersId = [];
            for (const bestSeller of bestSellers[0]) {
                bestSellersId.push(bestSeller.productId);
            }
            const bsproducts = await Product.findAll({
                where: { id: bestSellersId },
            });

            console.log(bsproducts);
            res.render("index", {
                bsproducts, allProds: allProds
            });
        } catch (err) {
            console.log(err, "----------------------------------");
            res.render("error");
        }
    },
};

module.exports = indexController;
