const express = require("express");
const router = express.Router();
const {
  getTotalNumberOfTeachers,
  createTeachers,
  getAllTeachers,
} = require("../controllers/auth-controllers");

router.get("/totalteachers", getTotalNumberOfTeachers);
router.post("/createteachers", createTeachers);
router.get("/getteachers", getAllTeachers);
module.exports = router;
