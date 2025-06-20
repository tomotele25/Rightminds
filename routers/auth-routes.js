const express = require("express");
const router = express.Router();

const {
  signupUser,
  loginUser,
  refreshToken,
  resetPassword,
  forgetPassword,
} = require("../controllers/auth-controllers");

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);
router.post("/forget-password", forgetPassword);
router.post("/reset-password/:resetToken", resetPassword);

module.exports = router;
