const router = require("express").Router();
const productController = require("../controllers/ProductController");

const auth = require("../middleware/auth.js")();

router.get("/", auth.authenticate(), productController.product_all);
router.get("/:id", auth.authenticate(), productController.product_detail);
router.post("/", auth.authenticate(), productController.product_create);
router.put("/:id", auth.authenticate(), productController.product_update);
router.delete("/:id", auth.authenticate(), productController.product_delete);

module.exports = router;
