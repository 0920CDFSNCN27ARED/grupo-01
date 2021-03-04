const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/images" });

const productsController = require("../controllers/productsController");
const isAdmin = require("../middlewares/isAdmin");

//listado
router.get("/", productsController.showAll);

//crear
router.get("/crear", isAdmin, productsController.newProduct);
router.post("/crear", upload.single("image"), productsController.createProduct);

//buscar
// router.get("/buscar", productsController.search);

//detalle
router.get("/:id", productsController.showOne);

//editar
router.get("/:id/editar", isAdmin, productsController.editProduct);
router.put("/:id/editar", upload.single("image"), productsController.edit);

//eliminar
router.delete("/:id/eliminar", isAdmin, productsController.deleteProduct);

module.exports = router;
