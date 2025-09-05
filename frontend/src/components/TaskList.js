import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";
import "./TaskList.css";

function TaskList({ token }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_URL}/tasks`, {
        headers: { Authorization: token },
      });
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [token]);

  // Show temporary message
  const showMessage = (msg) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(""), 3000);
  };

  // Add task
const addTask = async () => {
  if (!newTask.trim()) return;

  try {
    const res = await axios.post(
  `${API_URL}/tasks`,
  { text: newTask, completed: false, important: false },
  { headers: { Authorization:token } }
);
    setTasks([...tasks, res.data]);
    setNewTask("");
    showMessage("Task added successfully!");
  } catch (error) {
    console.error("Error adding task:", error.response || error);
    alert(`Failed to add task: ${error.response?.data?.message || error.message}`);
  }
};

  // Toggle complete
  const toggleComplete = async (id, completed) => {
    try {
      const res = await axios.put(
        `${API_URL}/tasks/${id}`,
        { completed: !completed },
        { headers: { Authorization: token } }
      );
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
      showMessage(completed ? "Task marked as incomplete" : "Task completed!");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Toggle important
  const toggleImportant = async (id, important) => {
    try {
      const res = await axios.put(
        `${API_URL}/tasks/${id}`,
        { important: !important },
        { headers: { Authorization: token } }
      );
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
      showMessage(important ? "Task unmarked as important" : "Task marked as important");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`, {
        headers: { Authorization: token },
      });
      setTasks(tasks.filter((t) => t._id !== id));
      showMessage("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Start editing
  const startEdit = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  // Save edited task
  const saveEdit = async (id) => {
    if (!editingText.trim()) return;
    try {
      const res = await axios.put(
        `${API_URL}/tasks/${id}`,
        { text: editingText },
        { headers: { Authorization: token } }
      );
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
      setEditingId(null);
      setEditingText("");
      showMessage("Task updated successfully!");
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  return (
    <div className="task-list-container">
      {/* Task Input */}
      {statusMessage && (
  <div className="status-toast">
    {statusMessage}
  </div>
)}
      <div className="task-input-section">
        <input
          type="text"
          placeholder="Enter new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      {/* Task List */}
      <div className="task-display-section">
        {tasks.length === 0 ? (
          <p className="no-tasks-message">
            You have no tasks yet. Add your first task to get started!
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className={`task-item ${task.completed ? "completed" : ""} ${
                task.important ? "important" : ""
              }`}
            >
              {editingId === task._id ? (
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="edit-input"
                />
              ) : (
                <span>{task.text}</span>
              )}

              <div className="task-btns">
                <button
                  className="toggle-btn"
                  onClick={() => toggleComplete(task._id, task.completed)}
                >
                  {task.completed ? "Undo" : "Complete"}
                </button>
                <button
                  className="toggle-btn"
                  onClick={() => toggleImportant(task._id, task.important)}
                >
                  {task.important ? "Unmark Important" : "Mark Important"}
                </button>
                <button
                  className="edit-btn"
                  onClick={() =>
                    editingId === task._id ? saveEdit(task._id) : startEdit(task._id, task.text)
                  }
                >
                  {editingId === task._id ? "Save" : "Edit"}
                </button>
                {editingId === task._id ? (
                  <button className="delete-btn" onClick={cancelEdit}>
                    Cancel
                  </button>
                ) : (
                  <button className="delete-btn" onClick={() => deleteTask(task._id)}>
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TaskList;
