const productsController = {
    showProducts: (req, res) => {
        res.render("products/products");
    },
    newProduct: (req, res) => {
        res.render("products/newProduct");
    },
    editProduct: (req, res) => {
        res.render("products/editProduct");
    },
};

module.exports = productsController;
