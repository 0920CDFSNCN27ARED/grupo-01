const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require("cookie-parser");


app.listen(3030, () => {
    console.log("Server running in port 3030");
});

const staticFileRouter = express.static("public");
app.use(staticFileRouter);

app.use(cookieParser());
app.use(methodOverride("_method"));

app.locals.loggedUser = null; 

//POST PROCESSING
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Setting ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(session({secret:"secretText"}))
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

// Cart routes 
const cartRoute = require("./routes/cartRoutes");
app.use("/carrito", cartRoute);

const favouritesRoute = require("./routes/favouritesRoute");
app.use("/favoritos", favouritesRoute);

// Default route
app.get("*", (req, res) => {
    res.status(404).send("Error 404 not found");
});
