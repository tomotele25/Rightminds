require("dotenv").config();

const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
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

// Login controller
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

//get teacher data
const getTeacherData = async (req, res) => {};

//get student data
const getStudentData = async (req, res) => {};

//fetch the total number of student
const getTotalNumberOfStudent = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: "student" }); // not "students"
    res.status(200).json({
      success: true,
      message: "Total number of students fetched successfully",
      totalStudents,
    });
  } catch (error) {
    console.log("Error fetching total number of students", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve total number of students",
    });
  }
};
const getTotalNumberOfTeachers = async (req, res) => {
  try {
    const totalTeachers = await User.countDocuments({ role: "teacher" }); // not "students"
    res.status(200).json({
      success: true,
      message: "Total number of teachers fetched successfully",
      totalTeachers,
    });
  } catch (error) {
    console.log("Error fetching total number of teacher", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve total number of teacher",
    });
  }
};
const getAllStudents = async (req, res) => {
  try {
    const studentsData = await User.find({ role: "student" }).select(
      "-password"
    );

    if (studentsData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No students found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student data fetched successfully",
      studentsData,
    });
  } catch (error) {
    console.log("Error fetching student data", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve student data",
    });
  }
};
const getAllTeachers = async (req, res) => {
  try {
    const teachersData = await User.find({ role: "teacher" }).select(
      "-password"
    );

    if (teachersData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No teachers found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Teachers data fetched successfully",
      teachersData,
    });
  } catch (error) {
    console.log("Error fetching teachers data", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve teachers data",
    });
  }
};
const deleteUsersWithoutNames = async (req, res) => {
  try {
    const result = await User.deleteMany({
      $or: [
        { firstname: { $in: [null, ""] } },
        { lastname: { $in: [null, ""] } },
      ],
    });

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} users deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting users without names:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete users without names",
    });
  }
};
const deleteUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Failed to delete user" });
  }
};

// create teachers

const createTeachers = async (req, res) => {
  const { firstname, lastname, email, password, contact, username } = req.body;

  // Check for missing fields
  if (!email || !firstname || !lastname || !password || !contact || !username) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    // Check if user already exists by email
    const checkExistingUser = await user.findOne({ email });
    if (checkExistingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new teacher
    const createNewTeacher = new user({
      email,
      firstname,
      lastname,
      password: hashedPassword,
      contact,
      username,
      role: "teacher",
    });

    // Save the teacher to the database
    await createNewTeacher.save();

    // Send response
    res.status(201).json({
      success: true,
      message: "Teacher created successfully",
      data: createNewTeacher,
    });
  } catch (error) {
    console.error("Error creating teacher:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  signupUser,
  loginUser,
  createTeachers,
  getTotalNumberOfStudent,
  getTotalNumberOfTeachers,
  getAllStudents,
  getAllTeachers,
  deleteUsersWithoutNames,
  deleteUserById,
};
