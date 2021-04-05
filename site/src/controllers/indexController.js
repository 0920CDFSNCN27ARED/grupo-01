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

            console.log(bestSellers, "-----------------");
            const bestSellersId = [];
            for (const bestSeller of bestSellers[0]) {
                bestSellersId.push(bestSeller.productId);
            }
            console.log(bestSellersId, "-----------------");
            const products = await Product.findAll({
                where: { id: bestSellersId },
            });
            //console.log(products, "-----------------");
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
