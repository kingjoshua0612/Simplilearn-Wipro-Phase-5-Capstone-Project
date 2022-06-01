const express = require("express");
const ProductRequest = require("../../controllers/product_request");


const router = express.Router();

router.post("/addRequest", ProductRequest.addRequest);
router.delete("/deleteRequest/:id",ProductRequest.deleteRequest);
router.get("/getRequest",ProductRequest.getRequest);

module.exports = router;
