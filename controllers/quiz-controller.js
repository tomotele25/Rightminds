const Quiz = require("../models/quiz");
const express = require("express");
const router = express.Router();
const createQuiz = async (req, res) => {
  const { title, department, course, level, questions } = req.body;

  // Basic validation
  if (
    !title ||
    !department ||
    !course ||
    !level ||
    !Array.isArray(questions) ||
    questions.length === 0
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields including questions are required.",
    });
  }

  // Validate each question
  for (const q of questions) {
    if (!q.question || !q.answer) {
      return res.status(400).json({
        success: false,
        message:
          "Each question must have a question text and a correct answer.",
      });
    }

    // If options are provided, there must be at least 2
    if (q.options && (!Array.isArray(q.options) || q.options.length < 2)) {
      return res.status(400).json({
        success: false,
        message: "If options are provided, there must be at least 2 options.",
      });
    }
  }

  try {
    const newQuiz = new Quiz({ title, department, course, level, questions });
    await newQuiz.save();

    return res.status(201).json({
      success: true,
      message: "Quiz created successfully",
      data: newQuiz,
    });
  } catch (error) {
    console.error("Error creating quiz:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to create quiz",
    });
  }
};
const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find(); // fetch all quizzes without any filter
    res.status(200).json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const getQuizById = async (req, res) => {
  const quizId = req.params.id;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }
    return res.json(quiz);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createQuiz, getAllQuizzes, getQuizById };
