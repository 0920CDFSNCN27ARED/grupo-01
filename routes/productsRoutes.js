const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/images" });

const productsController = require("../controllers/productsController");

const assertSignIn = require("../middlewares/assertSignIn");


router.get("/", productsController.showAll);
router.get("/crear", productsController.newProduct);
router.post("/crear", upload.single("image"), productsController.createProduct);
router.get("/buscar", productsController.search);

router.get("/:id", assertSignIn, productsController.showOne);
router.get("/:id/editar", productsController.editProduct);
router.put("/:id/editar",upload.single("image"), productsController.edit);

router.delete("/:id/edit", productsController.deleteProduct);

module.exports = router;
