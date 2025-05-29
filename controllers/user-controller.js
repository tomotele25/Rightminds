const User = require("../models/user");
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

// Delete an individual by their ID
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

module.exports = { deleteUserById, deleteUsersWithoutNames };
