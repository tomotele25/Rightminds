const Course = require("../models/course");
const createCourse = async (req, res) => {
  const {
    title,
    description,
    type,
    level,
    instructor,
    department,
    pdfUrl,
    videoUrl,
    image, // <-- add image field here
  } = req.body;

  if (!title || !description || !type || !level || !instructor || !department) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const course = new Course({
      title,
      description,
      type,
      level,
      instructor,
      department,
      image, // <-- include image in course object
      pdfUrl: type === "pdf" ? pdfUrl : null,
      videoUrl: type === "video" ? videoUrl : null,
    });

    await course.save();
    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating course",
      error: error.message,
    });
  }
};

// Get all courses

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 }); // Most recent first
    res.status(200).json({ success: true, courses });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching courses",
      error: error.message,
    });
  }
};

module.exports = { createCourse, getCourses };
