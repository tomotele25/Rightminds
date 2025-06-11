const Quiz = require("../models/quiz");
const express = require("express");

const createQuiz = async (req, res) => {
  try {
    const { title, course, duration, level, department, questions } = req.body;

    // Transform questions to match schema
    const formattedQuestions = questions.map((q) => ({
      question: q.questionText,
      options: q.options,
      correctAnswer: q.options[q.correctAnswerIndex],
    }));

    const newQuiz = new Quiz({
      title,
      course,
      department,
      level,
      duration,
      startTime: "", // You can set this if you collect it from frontend
      endTime: "", // Same here
      questions: formattedQuestions,
    });

    await newQuiz.save();

    res
      .status(201)
      .json({ message: "Quiz created successfully", quiz: newQuiz });
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ message: "Server error" });
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
    return res.status(200).json({ success: true, data: quiz });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

const submitQuiz = async (req, res) => {
  try {
    const { quizId, studentId, answers } = req.body;

    if (!studentId || !quizId || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    let correct = 0;
    let wrong = 0;

    // Check answers
    answers.forEach(({ questionId, answer }) => {
      const question = quiz.questions.id(questionId);
      if (question) {
        if (question.correctAnswer === answer) {
          correct++;
        } else {
          wrong++;
        }
      }
    });

    const total = correct + wrong;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

    // Save result
    quiz.results.push({
      studentId,
      score: percentage,
      finishTime: new Date().toISOString(),
    });

    await quiz.save();

    res.status(200).json({
      success: true,
      message: "Quiz submitted",
      correctAnswers: correct,
      wrongAnswers: wrong,
      percentage,
    });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createQuiz, getAllQuizzes, getQuizById, submitQuiz };
