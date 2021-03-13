const { CellarUser, BuyerUser } = require("../../database/models");

module.exports = {
    count: async (req, res) => {
        const countCellars = await CellarUser.count();
        const countBuyers = await BuyerUser.count();
        const finalCount = countBuyers + countCellars;
        res.send({ finalCount });
    },
};
