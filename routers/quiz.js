const express = require("express");
const {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  submitQuiz,
} = require("../controllers/quiz-controller");
const getStudentProgress = require("../controllers/progress-controller");
const router = express.Router();

router.post("/createQuiz", createQuiz);
router.get("/getAllQuiz", getAllQuizzes);
router.post("/submitQuiz", submitQuiz);
router.get("/getQuiz/:id", getQuizById);
router.get("/progress/:studentId", getStudentProgress);
module.exports = router;
