require("dotenv").config();

const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { sendSignupEmail, sendForgotPasswordEmail } = require("../mailer");

const jwtsecret = process.env.JWT_SECRET_KEY;
const crypto = require("crypto");
// Register controller

const signupUser = async (req, res) => {
  const { email, password, role, username, firstname, lastname } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with the same email",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      role: role || "student",
      username,
      firstname,
      lastname,
    });

    await newUser.save();
    try {
      await sendSignupEmail(email, firstname);
    } catch (err) {
      console.error("Email failed:", err);
    }

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error during signup:", error);

    return res.status(500).json({
      success: false,
      message: "Some error occurred. Please try again.",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Wrong credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Wrong credentials" });
    }

    // Create access token
    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      jwtsecret,
      { expiresIn: "15m" } // e.g., 15 minutes expiry
    );

    // Create refresh token
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET_KEY,
      { expiresIn: "7d" } // e.g., 7 days expiry
    );

    // Save refresh token to user in DB
    user.refreshToken = refreshToken;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred, please try again",
    });
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh Token Required" });
  }

  try {
    // Verify refresh token signature and expiration
    const payload = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET_KEY
    );

    // Find user by ID
    const user = await User.findById(payload.id);

    // Check if user exists and refresh token matches
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid Refresh Token" });
    }

    // Issue new access token
    const newAccessToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15m" }
    );

    // Issue new refresh token and save it
    const newRefreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET_KEY,
      { expiresIn: "7d" }
    );
    user.refreshToken = newRefreshToken;
    await user.save();

    return res.status(200).json({
      success: true,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token" });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    user.resetToken = hashedToken;
    user.resetTokenExpires = Date.now() + 15 * 60 * 1000; // 15 mins
    await user.save();

    // Send raw token in the email
    await sendForgotPasswordEmail(email, rawToken);
    res.status(200).json({
      success: true,
      message: "Reset link sent to your email",
    });
  } catch (error) {
    console.error("Forget password error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};

const resetPassword = async (req, res) => {
  const { password } = req.body;

  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.resetToken)
      .digest("hex");

    const user = await User.findOne({
      resetToken: hashedToken,
      resetTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });
    }

    const salt = 10;
    user.password = await bcrypt.hash(password, salt);

    user.resetToken = undefined;
    user.resetTokenExpires = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password has been reset successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

module.exports = {
  signupUser,
  loginUser,
  refreshToken,
  forgetPassword,
  resetPassword,
};
