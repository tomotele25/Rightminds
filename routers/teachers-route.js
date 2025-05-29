const express = require("express");
const router = express.Router();
const {
  getTotalNumberOfTeachers,
  createTeachers,
  getAllTeachers,
} = require("../controllers/teachers-controller");

router.get("/totalteachers", getTotalNumberOfTeachers);
router.post("/createteachers", createTeachers);
router.get("/getteachers", getAllTeachers);
module.exports = router;
