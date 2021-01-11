const { match } = require("assert");
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
    createProduct: (req, res) => {
        const products = getProducts();

        const newProduct = ({
            product_name,
            description,
            grape,
            year,
            temperature,
            aged,
            price,
            stock,
            pairing,
        } = req.body);

        if (req.file !== undefined) {
            newProduct.image = req.file.filename;
        }
        const id = products[products.length - 1].id;
        newProduct.id = id + 1;

        products.push(newProduct);
        saveProducts("products.json", products);
        res.redirect(`/productos/${newProduct.id}`);
    },
    editProduct: (req, res) => {
        const products = getProducts();
        const requiredProduct = products.find((prod) => {
            return prod.id == req.params.id;
        });
        if (requiredProduct == null) {
            return res
                .status(404)
                .send("404 not found. <br> ¡Houston, poseemos problemas!");
        }
        res.render("products/editProduct", {
            product: requiredProduct,
        });
    },

    edit: (req, res) => {
        const products = getProducts();
        const requiredProduct = products.find((prod) => {
            return prod.id == req.params.id;
        });

        const filename = req.file ? req.file.filename : requiredProduct.image;

        requiredProduct.product_name = req.body.productName;
        requiredProduct.description = req.body.productDescription;
        requiredProduct.grape = req.body.productGrape;
        requiredProduct.year = req.body.productYear;
        requiredProduct.temperature = req.body.productTemperature;
        requiredProduct.aged = req.body.productAged;
        requiredProduct.price = req.body.productPrice;
        requiredProduct.stock = req.body.productQuantity;
        requiredProduct.pairing = req.body.productPairing;
        requiredProduct.image = filename;

        saveProducts(products);

        res.redirect(`/productos/${req.params.id}`);
    },

    deleteProduct: (req, res) => {
        const products = getProducts();
        const reqProductIndex = products.findIndex((product) => {
            return product.id == id;
        });

        products.splice(reqProductIndex, 1);

        saveDbChange(products);
        res.redirect("/productos");
    },

    search: (req, res) => {
        const products = getProducts();
        const searched = req.query.search;
        const searchedWords = searched.split(" ");

        let wordMatch;

        matchedProducts = products.filter((product) => {
            wordMatch = searchedWords.find((word) => {
                return product.product_name
                    .toLowerCase()
                    .includes(word.toLowerCase());
            });
            return wordMatch;
        });

        if (matchedProducts.length == 0) {
            res.render("products/products", {
                products: products,
                matchedProducts: matchedProducts,
            });
        } else {
            res.render("products/products", { products: matchedProducts });
        }
    },
};

module.exports = productsController;
