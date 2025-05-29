require("dotenv").config();

const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const jwtsecret = process.env.JWT_SECRET_KEY;

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

    const checkExistingUser = await User.findOne({ email });
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
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Wrong credentials",
      });
    }
    const accessToken = jwt.sign(
      {
        id: checkExistingUser.id,
        email: checkExistingUser.email,
        role: checkExistingUser.role,
      },
      jwtsecret
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: checkExistingUser,
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred, please try again",
    });
  }
};

module.exports = { signupUser, loginUser };
