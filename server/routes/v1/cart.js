const express = require("express");
const Cart = require("../../controllers/cart");


const router = express.Router();

router.get("/getusercart", Cart.getUserCart);

router.post("/createusercart/:id", Cart.createUserCart);

router.put("/editusercart/:id", Cart.editUserCart);

router.delete("/deleteusercart/:id", Cart.deleteUserCart);

module.exports = router;
