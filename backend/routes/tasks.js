const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

// Get all tasks
router.get("/", authMiddleware, async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
});

// Add task
router.post("/", authMiddleware, async (req, res) => {
  const newTask = new Task({
    text: req.body.text,
    completed: req.body.completed || false,
    important: req.body.important || false,
    userId: req.userId,
  });
  await newTask.save();
  res.json(newTask);
});

// Update task
router.put("/:id", authMiddleware, async (req, res) => {
  const updateData = {};
  if (req.body.text !== undefined) updateData.text = req.body.text;
  if (req.body.completed !== undefined) updateData.completed = req.body.completed;
  if (req.body.important !== undefined) updateData.important = req.body.important;

  const updatedTask = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    updateData,
    { new: true }
  );
  res.json(updatedTask);
});

// Delete task
router.delete("/:id", authMiddleware, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ msg: "Task deleted" });
});

module.exports = router;
