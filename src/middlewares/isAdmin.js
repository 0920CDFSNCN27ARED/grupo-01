function isAdmin(req, res, next) {
    if (
        !req.session.loggedUser ||
        !req.session.loggedUser.cuit
    ) {
        res.redirect("/");
    } else if (req.session.loggedUser.cuit) {
        next();
    }
}

module.exports = isAdmin;
