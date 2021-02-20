// const getUsers = require("../utils/getDbFile");
const { CellarUser, BuyerUser } = require("../database/models");

function authenticateCookie(req, res, next) {
    const cookiedUser = req.cookies.remember;

    if (!cookiedUser) {
        return next();
    }

    const loggedUser = BuyerUser.findByPk(cookiedUser);
    const loggedCellar = CellarUser.findByPk(cookiedUser);

    if (loggedUser) {
        res.locals.user = loggedUser;
        next();
    } else if (loggedCellar) {
        res.locals.user = loggedCellar;
        next();
    }
    delete req.session.loggedUser;
    return next();
}

module.exports = authenticateCookie;
