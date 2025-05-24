const express = require("express");
const router = express.Router();
const { createCourse, getCourses } = require("../controllers/auth-controllers");
const { uploadImage } = require("../controllers/upload-controller");

const upload = require("../middleware/upload");

router.get("/getCourses", getCourses);
router.post("/upload-image", uploadImage);
router.post("/createCourse", createCourse);
module.exports = router;
