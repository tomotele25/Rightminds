const express = require("express");
const router = express.Router();
const updatedUser = require("../controllers/user-controller");
const authMiddleware = require("../middleware/authMiddleware");
router.patch("/updateUser/:me", authMiddleware, updatedUser);

module.exports = router;
