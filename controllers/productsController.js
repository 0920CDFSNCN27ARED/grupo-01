const { match } = require("assert");
const { get } = require("../routes/usersRoute");
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

    edit: async (req, res) => {
        const editProduct = require("../utils/edit");
        editProduct(getProducts, "products.json", req);
        res.redirect(`/productos/${req.params.id}`);
    },

    deleteProduct: async (req, res) => {
        try {
            await Product.destroy({
                where: { id: req.params.id },
            });
            res.redirect(`/productos`);
        } catch (err) {
            res.send(err);
        }
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
