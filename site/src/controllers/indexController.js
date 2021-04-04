const gifResource = require("../requests/gifResource");
const {Product} = require("../database/models")

const indexController = {
    
    showIndex: async (req, res) => {
        try {
            const allProds = await Product.findAll();
            res.render("index", {
                products: allProds,
            });
        } catch (err) {
            console.log(err);
            res.render("error");
        }
        
    },
};

module.exports = indexController;
