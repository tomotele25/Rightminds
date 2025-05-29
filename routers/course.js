const express = require("express");
const router = express.Router();
const {
  createCourse,
  getCourses,
} = require("../controllers/course-controller");

router.get("/getCourses", getCourses);

router.post("/createCourse", createCourse);
module.exports = router;
