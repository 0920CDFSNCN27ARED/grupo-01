const gifResource = require("../requests/gifResource");

const indexController = {
    showIndex: async (req, res) => {
        
        res.render("index");
    },
};

module.exports = indexController;
