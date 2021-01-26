const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/images" });

const productsController = require("../controllers/productsController");

//listado
router.get("/", productsController.showAll);

//crear
router.get("/crear", productsController.newProduct);
router.post("/crear", upload.single("image"), productsController.createProduct);

//buscar
// router.get("/buscar", productsController.search);

//detalle
router.get("/:id", productsController.showOne);

//editar
router.get("/:id/editar", productsController.editProduct);
router.put("/:id/editar", upload.single("image"), productsController.edit);

//eliminar
router.delete("/:id/edit", productsController.deleteProduct);

module.exports = router;
