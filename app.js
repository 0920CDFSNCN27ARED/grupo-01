const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const logsMiddleware = require("./middlewares/logsMiddleware");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const authenticate = require("./middlewares/authenticate");

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
app.use(logsMiddleware);

//auth
app.use(authenticate);

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

// Cart routes
const cartRoute = require("./routes/cartRoutes");
app.use("/carrito", cartRoute);

const favouritesRoute = require("./routes/favouritesRoute");
const { Agent } = require("http");
app.use("/favoritos", favouritesRoute);

// Default route
app.get("*", (req, res) => {
    res.status(404).send("Error 404 not found");
});
