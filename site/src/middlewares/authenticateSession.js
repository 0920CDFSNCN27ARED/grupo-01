const { CellarUser, BuyerUser } = require("../database/models");

async function authenticateSession(req, res, next) {
    const savedUser = req.session.loggedUser;

    if (!savedUser) {
        return next();
    }

    const loggedUser = await BuyerUser.findByPk(savedUser.id, {
        include: ["addresses","orders"]
    });
    const loggedCellar = await CellarUser.findByPk(savedUser.id);

    if (loggedUser && savedUser.dni) {
        res.locals.user = loggedUser;
        return next();
    }
    if (loggedCellar && savedUser.cuit) {
        res.locals.user = loggedCellar;
        return next();
    }
    delete req.session.loggedUser;
    return next();
}

module.exports = authenticateSession;
