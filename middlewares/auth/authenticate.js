const getUsers = require("../../utils/getDbFile");

function authenticate(req, res, next) {
  
    const users = getUsers("users.json");
    const id = req.session.loggedUserId;
    
    if (!id) return next();

    const loggedUser = users.find((user) => {
        return user.id == id;
    });

    if (!loggedUser) {
        delete req.session.loggedUserId;
        return next();
    }

    req.loggedUser = loggedUser;
  
    next();
}

module.exports = authenticate;
