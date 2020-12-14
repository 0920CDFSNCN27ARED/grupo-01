const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController");

router.get("/", productsController.showProducts);
router.get("/nuevoProducto", productsController.newProduct);
router.get("/editarProducto", productsController.editProduct);

module.exports = router;
