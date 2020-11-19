const express = require("express");
const app = express();
const path = require("path");

app.listen(3000, () => {
    console.log("Server running in port 3000");
});

const staticFileRouter = express.static("public");
app.use(staticFileRouter);

//home
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "views/index.html"));
});

//product
app.get("/productDetail", (req, res) => {
    res.sendFile(path.resolve(__dirname, "views/product.html"));
});

app.get("/products", (req, res) => {
    res.sendFile(path.resolve(__dirname, "views/products.html"));
});

// Cart and derives (gabi)
app.get("/carritoDeCompras", (req, res) => {
    res.sendFile(path.resolve(__dirname, "views/productCart.html"));
});

app.get("/productosGuardados", (req, res) => {
    res.sendFile(path.resolve(__dirname, "views/savedProducts.html"));
});

app.get("/favoritos", (req, res) => {
    res.sendFile(path.resolve(__dirname, "views/favourites.html"));
});

// Default route
app.get("*", (req, res) => {
    res.status(404).send("Error 404 not found");
});
