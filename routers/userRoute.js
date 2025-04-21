const express = require("express");
const router = express.Router();
const { getUserName } = require("../controllers/auth-controllers");

router.post("/username", getUserName);

module.exports = router;
