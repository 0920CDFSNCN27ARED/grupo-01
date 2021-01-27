function isAdmin(req, res, next) {
    if (res.locals.user.category != "empresa") {
        res.redirect("/");
    } else {
        next();
    }
}

module.exports = isAdmin;
