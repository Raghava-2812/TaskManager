const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get tasks for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  const tasks = await Task.find({ user: req.user });
  res.json(tasks);
});

// Add task
router.post("/", authMiddleware, async (req, res) => {
  const newTask = new Task({
    text: req.body.text,
    completed: req.body.completed || false,
    important: req.body.important || false,  // Add important field
    user: req.user,
  });
  await newTask.save();
  res.json(newTask);
});

// Edit task
router.put("/:id", authMiddleware, async (req, res) => {
  const updateData = {};
  if (req.body.text !== undefined) updateData.text = req.body.text;
  if (req.body.completed !== undefined) updateData.completed = req.body.completed;
  if (req.body.important !== undefined) updateData.important = req.body.important; // Add important

  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user },
    updateData,
    { new: true }
  );
  res.json(task);
});

// Delete task
router.delete("/:id", authMiddleware, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, user: req.user });
  res.json({ msg: "Task deleted" });
});

module.exports = router;
