const express = require("express");
const router = express.Router();
const {
  getTotalNumberOfStudent,
  getAllStudents,
} = require("../controllers/auth-controllers");

router.get("/students", getTotalNumberOfStudent);
router.get("/students/data", getAllStudents);

module.exports = router;
