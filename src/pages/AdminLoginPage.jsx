// AdminLoginPage.jsx - Club Lead & Admin Login Gate
// Includes top-left back link, demo passcode hint, and honest educational note.

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAdminAuthenticated } from "../utils/storage";
import BackLink from "../components/BackLink";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple demo password check
    if (passcode === "abesec2026" || passcode === "admin123") {
      setAdminAuthenticated(true);
      navigate("/admin");
    } else {
      setError("Incorrect passcode. Try 'abesec2026' or 'admin123'");
    }
  };

  return (
    <div className="admin-login-page">
      {/* Top Left Back Navigation below Navbar */}
      <BackLink to="/" label="Back to Home" />

      <div className="container">
        <div className="admin-login-card">
          <div className="admin-icon-badge">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>

          <h2 className="admin-login-title">Club Lead Portal</h2>
          <p className="admin-login-subtitle">
            Enter the club management passcode to manage upcoming events, edit dates, and view student registration rosters.
          </p>

          <form onSubmit={handleLogin} className="admin-form">
            <div className="form-group">
              <label className="form-label" htmlFor="passcode">
                Admin Passcode
              </label>
              <input
                type="password"
                id="passcode"
                placeholder="Enter passcode"
                className={`form-input ${error ? "error" : ""}`}
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (error) setError("");
                }}
                autoFocus
              />
              {error && <span className="error-text">{error}</span>}
            </div>

            <button type="submit" className="btn btn-primary btn-submit-full">
              Unlock Dashboard
            </button>
          </form>

          {/* Educational Note for 2nd Year Project Evaluation */}
          <div className="admin-educational-note">
            <div className="note-badge">Developer Note</div>
            <p>
              In this beginner React project, authentication runs locally in browser state. In a real-world production app, this would be guarded by Firebase Authentication or JWT tokens issued by a Node.js backend.
            </p>
            <p className="demo-hint">
              Demo passcode: <code className="code-tag">abesec2026</code> or <code className="code-tag">admin123</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
