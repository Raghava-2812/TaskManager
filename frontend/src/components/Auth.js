import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../config"; // ← import API_URL
import "./Auth.css";

function Auth({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
  await axios.post(`${API_URL}/api/auth/signup`, form);
  setMessage("Signup successful, please login.");
  setIsSignup(false);
} else {
  const res = await axios.post(`${API_URL}/api/auth/login`, form);
  onLogin(res.data.token);
}
    } catch (err) {
      setMessage(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
        <h1>Task Manager Application</h1>
        <div className="auth-card">
          <h2>{isSignup ? "Sign Up" : "Login"}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
          </form>
          {message && <p className="error">{message}</p>}
          <p className="switch-link" onClick={() => setIsSignup(!isSignup)}>
            {isSignup
              ? "Already have an account? Login"
              : "Don’t have an account? Sign Up"}
          </p>
        </div>
      </div>
  );
}

export default Auth;
