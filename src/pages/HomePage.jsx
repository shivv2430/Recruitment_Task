// HomePage placeholder for Step 1
import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>CodeChef ABESEC Chapter</h1>
      <p>Welcome to our student club event portal. Step 1 is ready!</p>
      <div style={{ marginTop: "1rem" }}>
        <Link to="/events" style={{ marginRight: "1rem", color: "#a855f7" }}>
          Browse Events
        </Link>
        <Link to="/admin" style={{ color: "#a855f7" }}>
          Admin Dashboard
        </Link>
      </div>
    </div>
  );
}
