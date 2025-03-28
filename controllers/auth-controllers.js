require("dotenv").config();

const bcrypt = require("bcryptjs");
const User = require("../models/user");
const user = require("../models/user");
const jwt = require("jsonwebtoken");
const jwtsecret = process.env.JWT_SECRET_KEY;

// register controller
const signupUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    console.log("details: ", email, password);
    const checkExistingUser = await User.findOne({
      $or: [{ email }, { password }],
    });

    if (checkExistingUser) {
      return res.status(400).json({
        success: false,
        message: "user already exist with the same user name",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newlyCreatedUser = new User({
      email,
      password: hashedPassword,
      role: role || "student",
    });

    await newlyCreatedUser.save();
    if (newlyCreatedUser) {
      res
        .status(201)
        .json({ success: true, message: "User registered Successfully" });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Unable to register user" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "some error occured please try again" });
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
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some error occured please try again",
    });
  }
};

module.exports = { signupUser, loginUser };
