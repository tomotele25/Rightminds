const User = require("../models/user");
const bcrypt = require("bcryptjs");
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
    const checkExistingUser = await User.findOne({ email });
    if (checkExistingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new teacher
    const createNewTeacher = new User({
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

module.exports = { createTeachers, getAllTeachers, getTotalNumberOfTeachers };
