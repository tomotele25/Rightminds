const express = require("express");
const router = express.Router();
const {
  createAnouncement,
  getAnnouncements,
} = require("../controllers/announcement-controller");

router.post("/anouncement", createAnouncement);
router.get("/getAnnouncements", getAnnouncements);
module.exports = router;
