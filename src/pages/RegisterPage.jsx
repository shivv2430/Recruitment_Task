// RegisterPage placeholder for Step 1
import React from "react";
import { Link, useParams } from "react-router-dom";

export default function RegisterPage() {
  const { eventId } = useParams();

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Event Registration</h2>
      <p>Registering for event ID: {eventId || "General Registration"}</p>
      <Link to="/events" style={{ color: "#a855f7" }}>Back to Events</Link>
    </div>
  );
}
