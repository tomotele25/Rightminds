const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [String], // Optional but must be array
  answer: { type: String, required: true },
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String, required: true },
  course: { type: String, required: true },
  level: { type: String, required: true },
  questions: { type: [questionSchema], required: true },
});

module.exports = mongoose.model("Quiz", quizSchema);
