const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController");

router.get("/", productsController.showProducts);
router.get("/", productsController.newProduct);
router.get("/", productsController.editProduct);

module.exports = router;
