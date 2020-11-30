const express = require("express");
const app = express();
const path = require("path");

app.listen(3000, () => {
    console.log("Server running in port 3000");
});

const staticFileRouter = express.static("public");
app.use(staticFileRouter);

// Setting ejs
app.set("view engine", "ejs");

//home
const indexRoute = require("./routes/indexRoutes");
app.use("/", indexRoute);

//product
app.get("/productDetail", (req, res) => {
    res.sendFile(path.resolve(__dirname, "views/product.html"));
});

app.get("/products", (req, res) => {
    res.sendFile(path.resolve(__dirname, "views/products.html"));
});

// Cart routes (gabi)

const cartRoute = require("./routes/cartRoutes");
app.use("/carrito", cartRoute);

const favouritesRoute = require("./routes/favouritesRoute");
app.use("/favoritos", favouritesRoute);

//Sign Up & Log In
const loginRoute = require("./routes/loginRoutes");
app.use("/login", loginRoute);

const signupRoute = require("./routes/signupRoutes");
app.use("/signup", signupRoute);

// Default route
app.get("*", (req, res) => {
    res.status(404).send("Error 404 not found");
});
