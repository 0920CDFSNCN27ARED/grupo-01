function isAdmin(req, res, next) {
    if (res.app.locals.user !== null && res.app.locals.user.category != "empresa") {
        res.redirect("/");
    } else if (res.app.locals.user == null) {
        res.redirect("/");
    } else {
        next();
    }
}

module.exports = isAdmin;
