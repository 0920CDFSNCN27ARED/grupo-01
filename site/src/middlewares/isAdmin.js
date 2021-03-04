function isAdmin(req, res, next) {
    if (
        !res.locals.user ||
        !res.locals.user.cuit
    ) {
        res.redirect("/");
    } else if (res.locals.user.cuit) {
        next();
    }
}

module.exports = isAdmin;
