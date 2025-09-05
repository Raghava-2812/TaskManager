import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Auth from "./components/Auth";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [token, setToken] = useState(sessionStorage.getItem("token") || null);

  const handleLogin = (newToken) => {
    sessionStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setToken(null);
  };

  return (
    <>
      {token ? (
        <div className="app-body">
          <Navbar onLogout={handleLogout} />
          <TaskList token={token} />
        </div>
      ) : (
        <Auth onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
