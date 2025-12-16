import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Redirect to admin if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await axios.post(`${API_URL}/api/admin/login`, {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        // notify the app that auth changed so route guards update immediately
        window.dispatchEvent(new Event('authChanged'));
        // Use replace to prevent back button from returning to login
        navigate("/admin", { replace: true });
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Login failed. Please check your email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Admin Login</h2>
        <p>Access to Reliance Soul International Youth Foundation Dashboard</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
