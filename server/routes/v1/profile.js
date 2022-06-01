const express = require("express");
const users = require("../../controllers/users");

const router = express.Router();

router.put("/updateuser", users.updateUser);
router.get("/getUser/:userName",users.getUserByUsername)
router.put("/updateuser/:id", users.updateUserById);
router.put("/updatepassword/:id",users.updatePassword);

router.post('/addFunds',users.addFunds)

module.exports = router;