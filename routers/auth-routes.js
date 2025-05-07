const express = require("express");
const router = express.Router();
const {
  signupUser,
  loginUser,
  getUserProfile,
} = require("../controllers/auth-controllers");

router.post("/signup", signupUser);
router.post("/login", loginUser);
// router.get("/profile", getUserProfile);
module.exports = router;
