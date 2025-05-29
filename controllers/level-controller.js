const Level = require("../models/level");

// Get all levels
exports.getLevels = async (req, res) => {
  try {
    const levels = await Level.find({});
    res.json(levels);
  } catch (err) {
    res.status(500).json({ message: "Failed to load levels" });
  }
};

// Create a new level
exports.createLevel = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Level name is required" });
    }

    // Check if level already exists
    const existing = await Level.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Level already exists" });
    }

    const level = new Level({ name });
    await level.save();

    res.status(201).json({ message: "Level created", level });
  } catch (err) {
    res.status(500).json({ message: "Failed to create level" });
  }
};
