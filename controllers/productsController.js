const { match } = require("assert");
const { get } = require("../routes/usersRoute");
const { Product } = require("../database/models");
const erase = require("../utils/delete");
const edited = require("../utils/edit");
const { Console } = require("console");

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
    createProduct: async (req, res) => {
        try {
            const newProduct = await Product.create({
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
        } catch (err) {
            res.send(err);
        }
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
        const id = req.params.id;
        edited(Product, id, req, res);
        res.redirect(`/productos/${id}`);
    },

    deleteProduct: (req, res) => {
        const id = req.params.id;
        erase(Product, id, res);
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
