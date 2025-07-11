const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      default: "student",
    },
    username: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      lowercase: true,
    },
    lastname: {
      type: String,
      lowercase: true,
    },
    contact: {
      type: String,
      lowercase: true,
    },
    bio: {
      type: String,
      lowercase: true,
    },
    userIsLoggedIn: {
      type: Boolean,
    },
    isUserSubscribed: {
      type: Boolean,
      default: false,
    },
    refreshToken: { type: String },
    badge: { type: String, default: null },
    resetToken: {
      type: String,
      default: null,
    },
    resetTokenExpires: {
      type: Date,
      default: null,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
