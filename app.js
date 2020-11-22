const express = require("express");
const app = express();
const path = require("path");

app.listen(3000, () => {
    console.log("Server running in port 3000");
});

const staticFileRouter = express.static("public");
app.use(staticFileRouter);

// Setting ejs
app.set("view engine", "ejs")


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

// Cart routes (gabi)

const cartRoute = require("./routes/cartRoutes")
app.use("/carrito",cartRoute)

const favouritesRoute = require("./routes/favouritesRoute")
app.use("/favoritos",favouritesRoute)




app.get("/login", (req, res) => {
    res.sendFile(path.resolve(__dirname, "views/login.html"));
});

app.get("/signup", (req, res) => {
    res.sendFile(path.resolve(__dirname, "views/signup.html"));
});

// Default route
app.get("*", (req, res) => {
    res.status(404).send("Error 404 not found");
});
