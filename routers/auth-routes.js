const express = require("express");
const router = express.Router();
const { loginUser, signupUser } = require("../controllers/auth-controllers");

router.post("/signup", signupUser);
router.post("/login", loginUser);

module.exports = router;
