const express = require("express");
const router = express.Router();
const levelController = require("../controllers/level-controller");

router.get("/levels", levelController.getLevels);
router.post("/levels", levelController.createLevel);

module.exports = router;
