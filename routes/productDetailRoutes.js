const express = require("express");
const router = express.Router();

const productDetailController = require("../controllers/productDetailController");

router.get("/", productDetailController.showProductDetail);

module.exports = router;
