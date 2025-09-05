// models/Task.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  important: { type: Boolean, default: false },  // Add this
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
