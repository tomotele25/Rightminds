const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  date: { type: String, required: true },
  userId: { type: String, required: true },
});

module.exports = mongoose.model("Activity", activitySchema);
