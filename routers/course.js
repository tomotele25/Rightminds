const express = require("express");
const router = express.Router();
const { createCourse } = require("../controllers/auth-controllers");
const { getCourses } = require("../controllers/auth-controllers");
router.post("/createCourse", createCourse);
router.get("/getCourses", getCourses);
module.exports = router;
