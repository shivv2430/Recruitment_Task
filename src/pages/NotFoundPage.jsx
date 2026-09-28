// NotFoundPage placeholder for Step 1
import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div style={{ padding: "3rem", textAlign: "center" }}>
      <h2>404 - Page Not Found</h2>
      <p style={{ margin: "1rem 0" }}>
        Looks like you took a wrong turn, or this event link expired.
      </p>
      <Link to="/" style={{ color: "#a855f7", textDecoration: "underline" }}>
        Return to Home
      </Link>
    </div>
  );
}
