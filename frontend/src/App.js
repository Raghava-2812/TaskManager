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
    setEmail(email);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div className="app-container">
      {token ? (
        <>
          <Navbar username={email} handleLogout={handleLogout} />
          <div className="app-body">
            <TaskList token={token} />
          </div>
        </>
      ) : (
        <Auth onLogin={handleLogin} />
      )}
      <footer className="app-footer">
            © {new Date().getFullYear()} Task Manager. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
