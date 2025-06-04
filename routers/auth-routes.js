const express = require("express");
const router = express.Router();
const {
  signupUser,
  loginUser,
  refreshToken,
} = require("../controllers/auth-controllers");

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);

module.exports = router;
