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
    count : async (req, res) => {
        const count = await Product.count();
        console.log(count)
    res.send({count});
}
};
