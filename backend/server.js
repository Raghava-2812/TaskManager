const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// =================== DATABASE ===================
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Error:", err));

// =================== MODELS ===================
const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model("User", UserSchema);

const TaskSchema = new mongoose.Schema({
  text: String,
  completed: { type: Boolean, default: false },
  important: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
const Task = mongoose.model("Task", TaskSchema);

// =================== MIDDLEWARE ===================
const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ msg: "No token" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ msg: "Invalid token" });
    req.userId = decoded.id;
    next();
  });
};

// =================== ROUTES ===================
app.get("/", (req, res) => {
  res.send("✅ Task Manager Backend is running!");
});

// Signup
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.json({ msg: "Signup successful" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not registered. Please signup." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Tasks
app.get("/tasks", authMiddleware, async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
});

app.post("/tasks", authMiddleware, async (req, res) => {
  const newTask = new Task({
    text: req.body.text,
    completed: req.body.completed || false,
    important: req.body.important || false,
    userId: req.userId,
  });
  await newTask.save();
  res.json(newTask);
});

app.put("/tasks/:id", authMiddleware, async (req, res) => {
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

app.delete("/tasks/:id", authMiddleware, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ msg: "Task deleted" });
});

// =================== SERVER START ===================
app.listen(port, () =>
  console.log(`🚀 Server running on http://localhost:${port}`)
);
