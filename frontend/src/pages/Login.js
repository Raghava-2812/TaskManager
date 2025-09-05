import React, { useState } from "react";
import API from "../api"; // ← uses API_URL now

export default function Login({ setAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // optional for errors

  const login = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setAuth(true);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Login failed");
    }
  };

  const signup = async () => {
    try {
      const res = await API.post("/auth/signup", { email, password });
      localStorage.setItem("token", res.data.token);
      setAuth(true);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div>
      <h2>Login / Signup</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
      <button onClick={signup}>Signup</button>
      {message && <p style={{ color: "red" }}>{message}</p>}
    </div>
  );
}
