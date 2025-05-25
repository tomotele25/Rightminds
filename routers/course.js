const express = require("express");
const router = express.Router();
const { createCourse, getCourses } = require("../controllers/auth-controllers");

router.get("/getCourses", getCourses);

router.post("/createCourse", createCourse);
module.exports = router;
