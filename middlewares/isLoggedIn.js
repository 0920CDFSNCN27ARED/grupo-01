function isLoggedIn(req, res, next) {
    if (!req.session.loggedUser ) {
        return res.redirect("/");
    } else {
        return next();
    }
}

module.exports = isLoggedIn;
