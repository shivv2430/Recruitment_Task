// AdminDashboardPage placeholder for Step 1
import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboardPage() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Admin Dashboard</h2>
      <p>Manage club events, view registrations, and check stats.</p>
      <Link to="/" style={{ color: "#a855f7" }}>Back to Home</Link>
    </div>
  );
}
