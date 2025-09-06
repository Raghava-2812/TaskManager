const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Connect DB
connectDB();

// Middleware
app.use(cors({
  origin: "https://taskmanager-frontend-fefm.onrender.com",  
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/tasks"));

// Test route
app.get("/", (req, res) => {
  res.send("✅ Task Manager Backend is running!");
});

// Start server
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
