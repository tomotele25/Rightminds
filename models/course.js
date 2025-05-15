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
    instructor: { type: String, required: true },
    type: {
      type: String,
      enum: ["pdf", "video"],
      required: true,
    },
    pdfUrl: {
      type: String,
      required: function () {
        return this.type === "pdf";
      }, // pdfUrl is required if type is 'pdf'
    },
    videoUrl: {
      type: String,
      required: function () {
        return this.type === "video";
      }, // videoUrl is required if type is 'video'
    },
    instructor: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
