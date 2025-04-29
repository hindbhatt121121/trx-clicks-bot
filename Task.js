const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  link: { type: String, required: true },
  reward: { type: Number, default: 1 },
});

module.exports = mongoose.model("Task", taskSchema);
