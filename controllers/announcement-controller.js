const Announcement = require("../models/announcement");
const createAnouncement = async (req, res) => {
  const { title, message, audience, postedBy } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Check role
    if (decoded.role !== "teacher" && decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message:
          "Access denied. Only teachers or admins can create announcements",
      });
    }

    // Create announcement
    const newAnnouncement = new Announcement({
      title,
      message,
      audience,
      postedBy: decoded.id,
    });

    await newAnnouncement.save();

    res.status(201).json({
      success: true,
      message: "Announcement created successfully",
      data: newAnnouncement,
    });
  } catch (error) {
    console.error("Error creating announcement:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to create announcement",
    });
  }
};

// Get anouncements
const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json({
      status: true,
      data: announcements,
    });
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res
      .status(500)
      .json({ status: false, message: "Failed to fetch announcements" });
  }
};

module.exports = { getAnnouncements, createAnouncement };
