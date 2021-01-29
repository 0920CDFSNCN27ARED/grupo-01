const getUsers = require("../utils/getDbFile");

function authenticateSession(req, res, next) {
    const savedUser = req.session.loggedUser;

    if (!savedUser) {
        return next();
    }

    const users = getUsers("users.json");

    const loggedUser = users.find((user) => {
        return user.id == savedUser.id;
    });

    if (!loggedUser) {
        delete req.session.loggedUser;
        return next();
    }

    res.locals.user = loggedUser;

    next();
}

module.exports = authenticateSession;
