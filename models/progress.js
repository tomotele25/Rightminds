// models/Progress.js
const mongoose = require("mongoose");

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
  progress: { type: Number, default: 0 }, // 0–100%
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Progress", progressSchema);
