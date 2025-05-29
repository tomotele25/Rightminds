const express = require("express");
const {
  createQuiz,
  getAllQuizzes,
  getQuizById,
} = require("../controllers/quiz-controller");

const router = express.Router();

router.post("/createQuiz", createQuiz);
router.get("/getAllQuiz", getAllQuizzes);
router.get("/getQuiz/:id", getQuizById);

module.exports = router;
