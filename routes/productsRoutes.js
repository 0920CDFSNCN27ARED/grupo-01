const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController");

router.get("/", productsController.showAll);
router.get("/crear", productsController.newProduct);
router.post("/crear",productsController.createProduct)

router.get("/:id", productsController.showOne);
router.get("/:id/edit", productsController.editProduct);

module.exports = router;
