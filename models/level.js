const mongoose = require("mongoose");

const levelSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Level", levelSchema);
