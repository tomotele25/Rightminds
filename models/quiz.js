const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true },
  },
  { _id: true }
);

const resultSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  score: { type: Number, required: true },
  finishTime: { type: String },
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String, required: true },
  course: { type: String, required: true },
  duration: { type: String, required: true },
  level: { type: String, required: true },
  questions: { type: [questionSchema], required: true },
  results: { type: [resultSchema], default: [] },
});

module.exports = mongoose.model("Quiz", quizSchema);
