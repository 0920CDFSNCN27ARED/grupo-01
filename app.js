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
app.set('views', path.join(__dirname, 'views'));

//home
const indexRoute = require("./routes/indexRoutes");
app.use("/", indexRoute);

//product
const productDetailRoute = require("./routes/productDetailRoutes");
app.use("/productDetail", productDetailRoute);

const productsRoute = require("./routes/productsRoutes");
app.use("/products", productsRoute);

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
