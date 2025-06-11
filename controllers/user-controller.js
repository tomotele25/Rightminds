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

const updateUser = async (req, res) => {
  const userId = req.User.id;
  const { firstname, lastname, username, contact, bio } = req.body;
  try {
    const payload = { firstname, lastname, contact, bio };
    if (!firstname || !lastname || !username || !contact || !bio) {
      re.status(401).json({
        success: false,
        message: "All fields are required ",
      });
    }

    const updatedUser = User.findByIdAndUpdate(userId, payload, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      updateUser,
    });
  } catch (error) {
    console.log("Could not update user", error.message);
    res.status(500).json({ success: false, message: "Error from server " });
  }
};

module.exports = { deleteUserById, deleteUsersWithoutNames, updateUser };
