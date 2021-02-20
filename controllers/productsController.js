const { match } = require("assert");
const { get } = require("../routes/usersRoute");
const getProducts = require("../utils/getDbFile");
const saveProducts = require("../utils/saveDbChanges");
const fileToGet = "products.json";
const { Product } = require("../database/models");

const productsController = {
    showAll: async (req, res) => {
        try {
            const allProds = await Product.findAll();
            res.render("products/products", {
                products: allProds,
            });
        } catch (err) {
            res.send("Error");
        }
    },
    // showAll: (req, res) => {

    //     const products = getProducts(fileToGet);
    //     res.render("products/products", {
    //         products: products,
    //     });
    // },
    showOne: async (req, res) => {
        const oneProd = await Product.findByPk(req.params.id);
        if (oneProd == undefined) {
            return res
                .status(404)
                .send("404 not found. <br> ¡Houston, poseemos problemas!");
        }

        res.render("products/productDetail", {
            product: oneProd,
        });
    },
    // const products = getProducts(fileToGet);
    // const requiredProduct = products.find((prod) => {
    //     return prod.id == req.params.id;
    // });
    // if (requiredProduct == undefined) {
    //     return res
    //         .status(404)
    //         .send("404 not found. <br> ¡Houston, poseemos problemas!");
    // }

    // res.render("products/productDetail", {
    //     product: requiredProduct,
    // });
    newProduct: (req, res) => {
        res.render("products/newProduct");
    },
    createProduct: (req, res) => {
        Pelicula.create({
            productName: req.body.productName,
            grape: req.body.productGrape,
            description: req.body.productDescription,
            year: req.body.productYear,
            aged: req.body.productAged,
            temperature: req.body.productTemperature,
            price: req.body.productPrice,
            stock: req.body.productStock,
            discount: req.body.productDiscount,
        });
        // const createNew = require("../utils/createNew");
        // const newProduct = createNew(getProducts, "products.json", req);

        res.redirect(`/productos/${newProduct.id}`);
    },

    editProduct: async (req, res) => {
        const product = await Product.findByPk(req.params.id);
        if (product == null) {
            return res
                .status(404)
                .send("404 not found. <br> ¡Houston, poseemos problemas!");
        }
        res.render("products/editProduct", {
            product: product,
        });
    },

    edit: (req, res) => {
        const editProduct = require("../utils/edit");
        editProduct(getProducts, "products.json", req);
        res.redirect(`/productos/${req.params.id}`);
    },

    deleteProduct: (req, res) => {
        const deleteProduct = require("../utils/delete");
        deleteProduct(getProducts, fileToGet, req);
        res.redirect("/productos");
    },

    // search: (req, res) => {
    //     const products = getProducts(fileToGet);
    //     const searched = req.query.search;
    //     const searchedWords = searched.split(" ");

    //     let wordMatch;

    //     matchedProducts = products.filter((product) => {
    //         wordMatch = searchedWords.find((word) => {
    //             return product.product_name
    //                 .toLowerCase()
    //                 .includes(word.toLowerCase());
    //         });
    //         return wordMatch;
    //     });

    //     if (matchedProducts.length == 0) {
    //         res.render("products/products", {
    //             products: products,
    //             matchedProducts: matchedProducts,
    //         });
    //     } else {
    //         res.render("products/products", { products: matchedProducts });
    //     }
    // },
};

module.exports = productsController;
