const User = require("../models/user");
// Get the data of all students
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

module.exports = { getAllStudents, getTotalNumberOfStudent };
