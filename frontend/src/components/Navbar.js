import React from "react";
import "./Navbar.css";
import { API_URL } from "../config";

export function Navbar({ username, handleLogout }) {
  return (
    <div className="navbar">
      <h2>Welcome,{username}</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Navbar;