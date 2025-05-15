const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // or "Admin" if you have a separate model
      required: true,
    },
    audience: {
      type: String,
      audience: ["students", "teachers"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("anouncement", announcementSchema);
