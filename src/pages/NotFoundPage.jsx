// NotFoundPage.jsx - Friendly 404 Error View
import React from "react";
import { Link } from "react-router-dom";
import BackLink from "../components/BackLink";

export default function NotFoundPage() {
  return (
    <div className="not-found-page">
      {/* Top Left Back Navigation below Navbar */}
      <BackLink to="/" label="Back to Home" />

      <div className="container">
        <div className="not-found-card">
          <div className="not-found-code">404</div>
          <h2 className="not-found-title">Looks like this link expired or does not exist</h2>
          <p className="not-found-desc">
            The page you are looking for might have been moved, or maybe that contest ended. Do not worry, you can always jump back to our upcoming events or explore the chapter home page.
          </p>
          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary">
              Return to Home
            </Link>
            <Link to="/events" className="btn btn-outline">
              Browse Upcoming Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
