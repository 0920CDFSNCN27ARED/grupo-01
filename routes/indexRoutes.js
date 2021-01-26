const express = require("express");
const router = express.Router();

const indexController = require("../controllers/indexController");

const authenticate = require("../middlewares/auth/authenticate");

router.get("/", authenticate, indexController.showIndex);

module.exports = router;
