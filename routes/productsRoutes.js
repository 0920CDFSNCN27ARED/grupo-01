const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/images" });

const productsController = require("../controllers/productsController");

router.get("/", productsController.showAll);
router.get("/crear", productsController.newProduct);
router.post("/crear", upload.single("image"), productsController.createProduct);

router.get("/:id", productsController.showOne);
router.get("/:id/editar", productsController.editProduct);

module.exports = router;
