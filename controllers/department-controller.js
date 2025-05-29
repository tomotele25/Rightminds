const Department = require("../models/department");

// Get all departments
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find({});
    res.json(departments);
  } catch (err) {
    res.status(500).json({ message: "Failed to load departments" });
  }
};

// Create a new department
exports.createDepartment = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Department name is required" });
    }

    // Check if department already exists
    const existing = await Department.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Department already exists" });
    }

    const department = new Department({ name });
    await department.save();

    res.status(201).json({ message: "Department created", department });
  } catch (err) {
    res.status(500).json({ message: "Failed to create department" });
  }
};
