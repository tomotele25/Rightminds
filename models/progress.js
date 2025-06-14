// models/Progress.js
const mongoose = require("mongoose");

const quizAttemptSchema = new mongoose.Schema({
  score: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const progressSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  status: {
    type: String,
    enum: ["In Progress", "Completed"],
    default: "In Progress",
  },
  progress: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now },

  // NEW: Track each quiz attempt
  quizAttempts: [quizAttemptSchema],
});

module.exports = mongoose.model("Progress", progressSchema);
