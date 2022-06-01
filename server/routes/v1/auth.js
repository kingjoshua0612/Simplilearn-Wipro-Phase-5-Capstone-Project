const express = require("express");
const auth = require("../../controllers/auth");
const authMiddleware = require("../../middlewares/auth");
const validator = require("../../middlewares/validator");

const router = express.Router();

//localhost:4100/v1/auth/login
router.post("/login", auth.login);
//localhost:4100/v1/auth/signup
router.post("/signup", auth.signup);

module.exports = router;
