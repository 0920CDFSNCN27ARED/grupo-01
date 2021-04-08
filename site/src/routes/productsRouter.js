const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/images" });
const uploadMany = multer({dest: "public/images/products"})

const productsController = require("../controllers/productsController");
const isAdmin = require("../middlewares/isAdmin");

//listado
router.get("/", productsController.showAll);
router.get("/pagina/:pagNmbr", productsController.showPag);

//crear
router.get("/crear", isAdmin, productsController.newProduct);
router.post(
    "/crear",
    uploadMany.array("image", 6),
    productsController.createProduct
);

//buscar
router.get("/buscar", productsController.search);

//detalle
router.get("/:id", productsController.showOne);

//editar
router.get("/:id/editar", isAdmin, productsController.editProduct);
router.put("/:id/editar", uploadMany.array("image",6), productsController.edit);

//eliminar
router.delete("/:id/eliminar", isAdmin, productsController.deleteProduct);

module.exports = router;
