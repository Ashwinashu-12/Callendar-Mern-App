// client/src/pages/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">📅 Welcome to <span>Calendar App</span></h1>
        <p className="home-subtitle">
          Manage your events, stay organized, and never miss a moment!
        </p>

        <div className="home-buttons">
          <button onClick={() => navigate("/calendar")} className="btn calendar-btn">
            Calendar
          </button>
          <button onClick={() => navigate("/profile")} className="btn profile-btn">
            Profile
          </button>
          <button onClick={handleLogout} className="btn logout-btn">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
