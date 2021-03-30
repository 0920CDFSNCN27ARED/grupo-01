const express = require("express");
const cors = require("cors")
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
app.use(cors())
app.listen(3000, () => {
    console.log("Server running in port 3000");
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

const apiProdsRouter = require("./src/routes/api/productsRouter");
app.use("/api/products", apiProdsRouter);
const apiUsersRouter = require("./src/routes/api/usersRouter");
app.use("/api/users", apiUsersRouter);
const apiOrdersRouter = require("./src/routes/api/ordersRouter");
app.use("/api/orders", apiOrdersRouter);

// RUTAS //
//home
const indexRoute = require("./src/routes/indexRoutes");
app.use("/", indexRoute);

//prods
const productsRoute = require("./src/routes/productsRouter");
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
    res.render("error")
});
