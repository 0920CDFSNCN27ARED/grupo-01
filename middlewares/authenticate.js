const getUsers = require("../utils/getDbFile");

function authenticate(req, res, next) {
    console.log(req.session.loggedUser);
    next();
}

module.exports = authenticate;
