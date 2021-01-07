const getProducts = require("../utils/getProducts");

const productsController = {
    showAll: (req, res) => {
        const products = getProducts();
        res.render("products/products", {
            products,
        });
    },
    showOne: (req, res) => {
        const products = getProducts();
        const requiredProduct = products.find((prod) => {
            return prod.id == req.params.id;
        });
        if (requiredProduct == null) {
            return res
                .status(404)
                .send("404 not found. <br> ¡Houston, poseemos problemas!");
        }

        res.render("products/productDetail", {
            product: requiredProduct,
        });
    },
    newProduct: (req, res) => {
        res.render("products/newProduct");
    },
    editProduct: (req, res) => {
        res.render("products/editProduct");
    },
};

module.exports = productsController;
