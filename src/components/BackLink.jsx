// BackLink.jsx - Standardized back navigation for inner pages
// Placed in the top-left area below the navbar for easy navigation.

import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function BackLink({ to = "/", label = "Back to Home" }) {
  const navigate = useNavigate();

  return (
    <div className="back-link-wrapper">
      <div className="container">
        {to === -1 ? (
          <button
            onClick={() => navigate(-1)}
            className="back-nav-btn"
            aria-label="Go back"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>{label}</span>
          </button>
        ) : (
          <Link to={to} className="back-nav-btn">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>{label}</span>
          </Link>
        )}
      </div>
    </div>
  );
}
