const express = require("express");
const products = require("../../controllers/products");
const authMiddleware = require("../../middlewares/auth");
const validator = require("../../middlewares/validator");

const router = express.Router();

router.get("/getallproducts", products.getAllProducts);
router.get("/getproduct", products.getProductsByQuery);

router.post("/addproduct", products.addProduct);

router.put("/update/:id", products.updateProduct);

router.delete("/deleteproduct/:id", products.deleteProduct);

module.exports = router;
