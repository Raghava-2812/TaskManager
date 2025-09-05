import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Auth from "./components/Auth";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = (token, email) => {
    setToken(token);
    setEmail(email); // store username/email
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setToken(null);
  };

  return (
    <>
      {token ? (
        <div className="app-body">
          <Navbar username={email} handleLogout={handleLogout} />
          <TaskList token={token} />
        </div>
      ) : (
        <Auth onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
