import React from "react";
import "./Navbar.css";
import { API_URL } from "../config"; // assuming you created config.js

function Navbar({ onLogout }) {
  const handleLogout = () => {
    // Clear sessionStorage token
    sessionStorage.removeItem("token");

    // Update App.js state to re-render login page
    onLogout();
  };


  return (
    <div className="navbar">
      <h2>Task Manager</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Navbar;
