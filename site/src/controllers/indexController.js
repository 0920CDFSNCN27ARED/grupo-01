const gifResource = require("../requests/gifResource");
const { Product, OrderItem } = require("../database/models");
const sequelize = require("sequelize");
const indexController = {
    showIndex: async (req, res) => {
        try {
            const bestSellers = await OrderItem.sequelize.query(
                `
                    select productId, COUNT(*)
                    FROM order_items
                    GROUP BY productId
                    LIMIT 3;`,
                { raw: true }
            );

            const bestSellersId = [];
            for (const bestSeller of bestSellers[0]) {
                bestSellersId.push(bestSeller.productId);
            }
            const products = await Product.findAll({
                where: { id: bestSellersId },
            });
            res.render("index", {
                products: products,
            });
        } catch (err) {
            console.log(err, "----------------------------------");
            res.render("error");
        }
    },
};

module.exports = indexController;
