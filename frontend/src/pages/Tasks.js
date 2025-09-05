import React, { useState, useEffect } from "react";
import API from "../api";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  // Add a new task
  const addTask = async () => {
    if (!title.trim()) return; // prevent empty tasks
    try {
      const res = await API.post("/tasks", { title });
      setTasks([...tasks, res.data]);
      setTitle("");
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  // Toggle task completion
  const toggleTask = async (id, completed) => {
    try {
      const res = await API.put(`/tasks/${id}`, { completed: !completed });
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error("Failed to toggle task:", err);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Tasks</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((t) => (
          <li key={t._id}>
            <span
              style={{
                textDecoration: t.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
              onClick={() => toggleTask(t._id, t.completed)}
            >
              {t.title}
            </span>
            <button onClick={() => deleteTask(t._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
