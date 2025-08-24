import React, { useEffect, useState } from "react";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user from localStorage (set after login)
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  if (!user) {
    return <div className="profile-container">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-name">{user.name}</h2>
        <p className="profile-email">{user.email}</p>
        <p className="profile-bio">{user.bio || "No bio added yet"}</p>

        <div className="actions">
          <button className="btn">Edit Profile</button>
          <button className="btn">Settings</button>
        </div>
      </div>
    </div>
  );
}
