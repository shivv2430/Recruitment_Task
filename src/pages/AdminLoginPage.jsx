// AdminLoginPage placeholder for Step 1
import React from "react";
import { Link } from "react-router-dom";

export default function AdminLoginPage() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Admin Login</h2>
      <p>Log in with club credentials to manage events and student registrations.</p>
      <Link to="/" style={{ color: "#a855f7" }}>Back to Home</Link>
    </div>
  );
}
