const express = require("express");
const router = express.Router();
const {
  createAnouncement,
  getAnnouncements,
} = require("../controllers/auth-controllers");

router.post("/anouncement", createAnouncement);
router.get("/getAnnouncements", getAnnouncements);
module.exports = router;
