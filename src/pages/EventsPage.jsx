// EventsPage placeholder for Step 1
import React from "react";
import { Link } from "react-router-dom";

export default function EventsPage() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Club Events</h2>
      <p>All upcoming workshops, hackathons, and contests will appear here.</p>
      <Link to="/" style={{ color: "#a855f7" }}>Back to Home</Link>
    </div>
  );
}
