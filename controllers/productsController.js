const getProducts = require("../utils/getProducts");
const saveProducts = require("../utils/saveDbChanges");



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
        if (requiredProduct == undefined) {
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
    createProduct: (req,res)=>{
        const products = getProducts();
        
        
        const newProduct = {productName,productDescription,productYear,productCountry,productRegion,productView,productSmell,productTaste,productTemperature,productAged,productPrice,productQuantity,productPairing} = req.body;
        const id = products[products.length - 1].id;
        newProduct.id = id + 1;
        newProduct.image = req.file.filename;

        products.push(newProduct);
        saveProducts("products.json",products);
        res.redirect(`/productos/${newProduct.id}`)
    },
    editProduct: (req, res) => {
        res.render("products/editProduct");
    },
};

module.exports = productsController;
