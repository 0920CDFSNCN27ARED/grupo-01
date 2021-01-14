const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.listen(3000, () => {
    console.log("Server running in port 3000");
});

const staticFileRouter = express.static("public");
app.use(staticFileRouter);

app.locals.matchedProducts = null;

app.use(methodOverride("_method"));

//POST PROCESSING
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Setting ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//--------------------------------//

// RUTAS //
//home
const indexRoute = require("./routes/indexRoutes");
app.use("/", indexRoute);

//prods
const productsRoute = require("./routes/productsRoutes");
app.use("/productos", productsRoute);

//users
const usersRoute = require("./routes/usersRoute");
app.use("/usuarios", usersRoute);


// Cart routes -m 
const cartRoute = require("./routes/cartRoutes");
app.use("/carrito", cartRoute);

const favouritesRoute = require("./routes/favouritesRoute");
app.use("/favoritos", favouritesRoute);


// Default route
app.get("*", (req, res) => {
    res.status(404).send("Error 404 not found");
});
