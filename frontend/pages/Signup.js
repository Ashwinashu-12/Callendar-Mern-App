import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // for navigation
import "./Auth.css";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState(""); // optional
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fullName, username, email, password }),
      });

      let data;
      try {
        const text = await res.text();
        data = JSON.parse(text);
      } catch {
        throw new Error("Server returned non-JSON response");
      }

      if (!res.ok) {
        throw new Error(data?.message || "Signup failed");
      }

      console.log("✅ Signup success:", data);
      alert("Signup successful!");

      // Reset form
      setFullName("");
      setUsername("");
      setEmail("");
      setPassword("");

      // Redirect to login page
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Username (optional)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account?{" "}
          <span className="login-link" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
