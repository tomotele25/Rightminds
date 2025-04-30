require("dotenv").config();

const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const jwtsecret = process.env.JWT_SECRET_KEY;

// register controller

const signupUser = async (req, res) => {
  const { email, password, role, username } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const existingUser = await User.findOne({ email, username });
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
    });

    await newUser.save();

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

// Login controller
const loginUser = async (req, res) => {
  console.log("jwt secret: ", jwtsecret);

  try {
    const { email, password, role } = req.body;
    const accessToken = jwt.sign(
      {
        userId: user._id,
        email: email,
        role: role || "student",
      },
      jwtsecret
    );

    const checkExistingUser = await User.findOne({
      email,
    });

    if (!checkExistingUser) {
      return res.status(400).json({
        success: false,
        message: "Wrong credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      checkExistingUser.password
    );
    // console.log("is valid: ", password, checkExistingUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Wrong credentials",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some error occured please try again",
    });
  }
};

const getUserName = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    console.log("username:", username);

    const checkExistingUserName = await User.findOne({ username });

    if (!checkExistingUserName) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user: checkExistingUserName });
  } catch (error) {
    console.error("Could not get username:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { signupUser, loginUser, getUserName };
