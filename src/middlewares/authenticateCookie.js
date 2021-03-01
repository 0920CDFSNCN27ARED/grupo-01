const { CellarUser, BuyerUser } = require("../database/models");

async function authenticateCookie(req, res, next) {
    const cookiedUser = req.cookies.remember;
    const isUser = req.cookies.isUser;

    if (!cookiedUser) {
        return next();
    }

    const loggedUser = await BuyerUser.findByPk(cookiedUser);
    const loggedCellar = await CellarUser.findByPk(cookiedUser);

    if (loggedUser && isUser) {
        res.locals.user = loggedUser;
        return next();
    }
    if (loggedCellar) {
        res.locals.user = loggedCellar;
        return next();
    }
    delete req.session.loggedUser;
    return next();
}

module.exports = authenticateCookie;
