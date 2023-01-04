const router = require("express").Router();
const axios = require("axios");
const { productController } = require("../controllers/index");
const { multerUpload } = require("../middleware/multer");
require("dotenv/config");

router.post("/create", productController.create);
router.post("/createCategory", productController.createCategory);
router.post(
  "/single-uploaded/:id",
  multerUpload.single("file"),
  productController.uploadFile
);
router.patch("/update/:id", productController.update);
router.get("/list", productController.findAll);
router.get("/listCategory", productController.findAllCategory);
router.get("/list/:id", productController.findById);
router.get("/list/filter", productController.findBy);
router.get("/list/total", productController.totalBooks);
router.get("/search", productController.searchBy);
router.get("/view2", productController.view2);
router.get("/sort", productController.sortBy);
router.delete("/remove/:id", productController.remove);

module.exports = router;