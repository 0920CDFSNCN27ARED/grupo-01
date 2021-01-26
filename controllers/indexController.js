const indexController = {
    showIndex: (req, res) => {
        res.render("index", { user: req.session.loggedUser });
    },
};

module.exports = indexController;
