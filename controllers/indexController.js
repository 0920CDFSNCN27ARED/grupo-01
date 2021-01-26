const indexController = {
    showIndex: (req, res) => {

        res.render("index", {user: req.loggedUser});
    },
};

module.exports = indexController;
