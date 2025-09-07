import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Auth.css";

function Auth({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignup && form.password !== form.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      if (isSignup) {
        await axios.post(`${API_URL}/api/auth/signup`, {
          email: form.email,
          password: form.password,
        });
        setMessage("Signup successful, please login.");
        setIsSignup(false);
        setForm({ email: "", password: "", confirmPassword: "" });
      } else {
        const res = await axios.post(`${API_URL}/api/auth/login`, {
          email: form.email,
          password: form.password,
        });
        onLogin(res.data.token, res.data.user.email);
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
            onFocus={() => setMessage("")}
            required
          />

          {/* Password */}
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              onFocus={() => setMessage("")}
              required
            />
            <span
              className={`eye-icon ${showPassword ? "open" : "closed"}`}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          {/* Confirm Password */}
          {isSignup && (
            <div className="password-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                onFocus={() => setMessage("")}
                required
              />
              <span
                className={`eye-icon ${showConfirmPassword ? "open" : "closed"}`}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          )}

          <button id="btn" type="submit">{isSignup ? "Sign Up" : "Login"}</button>
        </form>

        {message && <p className="error">{message}</p>}

        <p className="switch-link">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <button className="link-button" onClick={() => setIsSignup(false)}>
                Login
              </button>


            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <button className="link-button" onClick={() => setIsSignup(true)}>
                Sign Up
              </button>

            </>
          )}
        </p>
      </div>
    </div >
  );
}

export default Auth;
