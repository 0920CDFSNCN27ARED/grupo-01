////URL AVATAR NO FUNCIONA AUN

const { CellarUser, BuyerUser } = require("../../database/models");

module.exports = {
    showAll: async (req, res) => {
        const countCellars = await CellarUser.count();
        const countBuyers = await BuyerUser.count();
        const finalCount = countBuyers + countCellars;

        const allUsers = [];
        const buyerUsers = await BuyerUser.findAll({
            attributes: ["id", ["firstName", "name"], "email"],
        });
        const cellarUsers = await CellarUser.findAll({
            attributes: ["id", ["cellarName", "name"], "email"],
        });

        cellarUsers.forEach((user) => {
            allUsers.push({
                ...user.dataValues,
                detail: `http://localhost:3030/api/users/${user.id}`,
            });
        });
        buyerUsers.forEach((user) => {
            allUsers.push({
                ...user.dataValues,
                detail: `http://localhost:3030/api/users/${user.id}`,
            });
        });

        const response = {
            meta: {
                url: req.originalUrl,
                status: 200,
            },
            data: {
                count: finalCount,
                users: allUsers,
            },
        };
        res.send(response);
    },
    getById: async (req, res) => {
        const user = await BuyerUser.findByPk(req.params.id, {
            attributes: ["firstName", "lastName", "dni", "image"],
        });

        res.send({
            meta: {
                url: req.originalUrl,
                status: 200,
            },
            data: user,
        });
    },
    count: async (req, res) => {
        const countCellars = await CellarUser.count();
        const countBuyers = await BuyerUser.count();
        const finalCount = countBuyers + countCellars;
        res.send({ finalCount });
    },
};
