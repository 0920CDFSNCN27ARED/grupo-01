const getUsers = require("../utils/getDbFile");

function authenticateCookie(req, res, next) {
    const cookiedUser = req.cookies.remember;

    if (!cookiedUser) {
        return next();
    }

    const users = getUsers("users.json");

    const loggedUser = users.find((user) => {
        return user.id == cookiedUser;
    });

    if (!loggedUser) {
        delete req.session.loggedUser;
        return next();
    }

    res.locals.user = loggedUser;

    next();
}

module.exports = authenticateCookie;
