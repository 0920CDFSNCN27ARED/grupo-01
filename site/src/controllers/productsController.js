const { Product, CellarUser, Grape } = require("../database/models");
const erase = require("../utils/delete");
const edit = require("../utils/edit");

const productsController = {
    showAll: async (req, res) => {
        const itemsPerPage = req.query.itemsPerPage || 10;
        try {
            const allProds = await Product.findAll({
                limit: Number(itemsPerPage) || 25,
            });
            const count = await Product.count();
            const pags = Math.ceil(count / itemsPerPage);
            pagsNmbr = pags < 1 ? 1 : pags;

            res.render("products/products", {
                products: allProds,
                pagsNmbr,
            });
        } catch (err) {
            console.log(err);
            res.render("error");
        }
    },
    showPag: async (req, res) => {
        const count = await Product.count();
        const itemsPerPage = req.query.itemsPerPage || 10;
        const pagNmbr = req.params.pagNmbr;

        const pags = Math.ceil(count / itemsPerPage);
        pagsNmbr = pags < 1 ? 1 : pags;

        const products = await Product.findAll({
            limit: itemsPerPage || 10,
            offset: itemsPerPage * (pagNmbr - 1),
        });
        res.render("products/products", { products, pagsNmbr });
    },
    showOne: async (req, res) => {
        const oneProd = await Product.findByPk(req.params.id, {
            include: ["grape", "cellaruser"],
        });
        if (oneProd == undefined) {
            return res.status(404).render("error");
        }
        const images = oneProd.image.split(",");
        res.render("products/productDetail", {
            product: oneProd,
            images,
        });
    },

    newProduct: async (req, res) => {
        const grapes = await Grape.findAll();
        res.render("products/newProduct", { grapes });
    },
    createProduct: async (req, res) => {
        try {
            let images = [];
            for (const image of req.files) {
                images.push(image.filename);
            }
            const imagesString = images.join(",");
           
            const newProduct = await Product.create({
                productName: req.body.productName,
                grapeId: req.body.grape,
                description: req.body.description,
                year: req.body.year,
                aged: req.body.aged,
                temperature: req.body.temperature,
                price: req.body.price,
                stock: req.body.stock,
                discount: req.body.discount,
                image: imagesString,
                cellarUserId: req.session.loggedUser.id,
            });
            res.redirect(`/productos/${newProduct.id}`);
        } catch (err) {
            console.log(err);
            res.render("error");
        }
    },

    editProduct: async (req, res) => {
        const product = await Product.findByPk(req.params.id);
        if (product == null) {
            return res.status(404).render("error");
        }
        res.render("products/editProduct", {
            product: product,
        });
    },

    edit: async (req, res) => {
        const id = req.params.id;
        const stat = await edit(Product, id, req);
        if (stat === "Updated") {
            res.redirect(`/productos/${id}`);
        }
    },

    deleteProduct: async (req, res) => {
        const id = req.params.id;
        const stat = await erase(Product, id);
        if (stat === "Deleted") {
            return res.redirect(`/productos`);
        }
        console.log(stat);
        res.redirect(`/productos/${id}`);
    },
    search: async (req, res) => {
        const products = await Product.findAll();
        const searched = req.query.search;
        const searchedWords = searched.split(" ");

        let wordMatch;

        matchedProducts = products.filter((product) => {
            wordMatch = searchedWords.find((word) => {
                return product.productName
                    .toLowerCase()
                    .includes(word.toLowerCase());
            });
            return wordMatch;
        });

        if (matchedProducts.length == 0) {
            res.redirect("/productos");
        } else {
            res.render("products/products", {
                products: matchedProducts,
                pagsNmbr: 2,
            });
        }
    },
};

module.exports = productsController;
