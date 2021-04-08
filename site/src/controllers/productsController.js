const { Product, CellarUser, Grape } = require("../database/models");
const erase = require("../utils/delete");
const edit = require("../utils/edit");
function imagesToArray(stringImages) {
    let images = [];
    for (const image of stringImages) {
        images.push(image.filename);
    }
    return images.join(",");
}

const productsController = {
    showAll: async (req, res) => {
        const itemsPerPage = req.query.itemsPerPage || 10;
        try {
            const allProds = await Product.findAll({
                // limit: Number(itemsPerPage) ,
            });
            const count = await Product.count();
            const pags = Math.ceil(count / itemsPerPage);
            pagsNmbr = pags < 1 ? 1 : pags;
            res.render("products/products", {
                products: allProds,
                pagsNmbr,
                itemsPerPage,
            });
        } catch (err) {
            console.log(err);
            res.render("error");
        }
    },
    showPag: async (req, res) => {
        try {
            const count = await Product.count();
            const itemsPerPage = req.query.itemsPerPage || 10;
            const pagNmbr = Number(req.params.pagNmbr);

            console.log(itemsPerPage, "ITEMS -------");
            const pags = Math.ceil(count / itemsPerPage);
            pagsNmbr = pags < 1 ? 1 : pags;

            const products = await Product.findAll({
                limit: Number(itemsPerPage),
                offset: itemsPerPage * (pagNmbr - 1),
            });
            res.render("products/products", {
                products,
                pagsNmbr,
                itemsPerPage,
            });
        } catch (err) {
            console.log(err);
        }
    },
    showOne: async (req, res) => {
        const oneProd = await Product.findByPk(req.params.id, {
            include: ["grape", "cellaruser"],
        });
        if (oneProd == undefined) {
            return res.status(404).render("error");
        }
        //const images = oneProd.image.split(",");
        console.log(oneProd);
        res.render("products/productDetail", {
            product: oneProd,
            //images,
            
        });
        
    },

    newProduct: async (req, res) => {
        const grapes = await Grape.findAll();
        res.render("products/newProduct", { grapes });
    },
    createProduct: async (req, res) => {
        try {
            const imagesString = imagesToArray(req.files);

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
        const grapes = await Grape.findAll();
        const product = await Product.findByPk(req.params.id);
        if (product == null) {
            return res.status(404).render("error");
        }
        if (product.cellarUserId == req.session.loggedUser.id) {
            return res.render("products/editProduct", {
                product: product,
                grapes,
            });
        }
        res.redirect("/");
    },

    edit: async (req, res) => {
        try {
            const imagesString = imagesToArray(req.files);
            const editedProduct = await Product.update(
                {
                    productName: req.body.productName,
                    description: req.body.description,
                    grapeId: req.body.grape,
                    year: req.body.year,
                    aged: req.body.aged,
                    temperature: req.body.temperature,
                    price: req.body.price,
                    stock: req.body.stock,
                    discount: req.body.discount,
                    image: imagesString,
                    cellarUserId: req.session.loggedUser.id,
                },
                { where: { id: req.params.id } }
            );

            res.redirect(`/productos/${req.params.id}`);
        } catch (err) {
            console.log(err);
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
