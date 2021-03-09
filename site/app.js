const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const logsMiddleware = require("./src/middlewares/logsMiddleware");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const authenticateSession = require("./src/middlewares/authenticateSession");
const authenticateCookie = require("./src/middlewares/authenticateCookie");
const isAdmin = require("./src/middlewares/isAdmin");

//views variables
app.locals.user = null;

app.listen(3030, () => {
    console.log("Server running in port 3030");
});

const staticFileRouter = express.static("public");
app.use(staticFileRouter);

app.use(
    session({
        secret: "Secreto",
    })
);
app.use(cookieParser());
app.use(methodOverride("_method"));

//Logs
// app.use(logsMiddleware);

//auth
app.use(authenticateSession);
app.use(authenticateCookie);

//POST PROCESSING
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Setting ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));
//--------------------------------//

// API

// const apiRouter = require("./routes/api/productRouter");
// app.use("/api/products", apiRouter);

// RUTAS //
//home
const indexRoute = require("./src/routes/indexRoutes");
app.use("/", indexRoute);

//prods
const productsRoute = require("./src/routes/productsRoutes");
app.use("/productos", productsRoute);

//users
const usersRoute = require("./src/routes/usersRoute");
app.use("/usuarios", usersRoute);

// Cart routes
const cartRoute = require("./src/routes/cartRoutes");
app.use("/carrito", cartRoute);

const favouritesRoute = require("./src/routes/favouritesRoute");

app.use("/favoritos", favouritesRoute);

// Default route
app.get("*", (req, res) => {
    res.status(404).send("Error 404 not found");
});