const { Product } = require("../database/models");
const erase = require("../utils/delete");
const edit = require("../utils/edit");

const { CellarUser } = require("../database/models");

const productsController = {
    showAll: async (req, res) => {
        try {
            const allProds = await Product.findAll();
            res.render("products/products", {
                products: allProds,
            });
        } catch (err) {
            res.render("error");
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
                grape: req.body.grape,
                description: req.body.description,
                year: req.body.year,
                aged: req.body.aged,
                temperature: req.body.temperature,
                price: req.body.price,
                stock: req.body.stock,
                discount: req.body.discount,
                image: req.file.filename,
                cellarUserId: req.session.loggedUser.id,
            });
            res.redirect(`/productos/${newProduct.id}`);
        } catch (err) {
            res.send(err);
        }
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
        edit(Product, id, req, res);
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
