function isAdmin(req, res, next) {
    if (
        !req.session.loggedUser ||
        req.session.loggedUser.category != "empresa"
    ) {
        res.redirect("/");
    } else if (req.session.loggedUser.category == "empresa") {
        next();
    }
}

module.exports = isAdmin;
