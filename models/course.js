const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    level: {
      type: String,
      required: true,
      enum: ["100", "200", "300", "400", "500"],
    },
    department: { type: String, required: true },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
s;

module.exports = mongoose.model("Course", courseSchema);
