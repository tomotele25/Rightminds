const express = require("express");
const router = express.Router();
const {
  signupUser,
  loginUser,
  refreshToken,
  forgetPassword,
  resetPassword,
} = require("../controllers/auth-controllers");

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);
router.post("/forget-password", forgetPassword);
router.post("/reset-password/:resetToken", forgetPassword);

module.exports = router;
