// EventCard.jsx - Reusable Card component for displaying club events
// Used on both the HomePage (for featured & upcoming events) and the EventsPage.

import React from "react";
import { Link } from "react-router-dom";

export default function EventCard({ event, featured = false }) {
  if (!event) return null;

  // Determine badge styling based on event category
  const getBadgeClass = (category) => {
    switch (category) {
      case "Contest":
        return "badge-amber";
      case "Hackathon":
        return "badge-green";
      case "Workshop":
      case "Talk":
      default:
        return "badge-purple";
    }
  };

  // Format date nicely (e.g., "Oct 5, 2026")
  const formatDate = (dateStr) => {
    try {
      const options = { month: "short", day: "numeric", year: "numeric" };
      return new Date(dateStr).toLocaleDateString("en-US", options);
    } catch {
      return dateStr;
    }
  };

  return (
    <div className={`event-card ${featured ? "featured" : ""}`}>
      {/* Top Header: Category Tag & Optional Featured Pill */}
      <div className="event-card-header">
        <span className={`badge ${getBadgeClass(event.category)}`}>
          {event.category}
        </span>
        {featured && (
          <span className="badge badge-amber featured-pill">
            ★ Featured Event
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="event-title">{event.title}</h3>

      {/* Event Meta Information (Date, Time, Venue) */}
      <div className="event-meta">
        <div className="meta-item">
          {/* Calendar Icon */}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span>{formatDate(event.date)} &bull; {event.time}</span>
        </div>

        <div className="meta-item">
          {/* Location Pin Icon */}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{event.venue}</span>
        </div>
      </div>

      {/* Description */}
      <p className="event-desc">{event.shortDescription}</p>

      {/* Topic Tags */}
      {event.tags && event.tags.length > 0 && (
        <div className="event-tags">
          {event.tags.map((tag) => (
            <span key={tag} className="code-tag">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Card Action */}
      <div className="event-card-footer">
        <Link to={`/register/${event.id}`} className="btn btn-primary btn-sm">
          Register Now
        </Link>
        <span className="capacity-hint">
          {event.capacity ? `${event.capacity} seats limit` : "Open registration"}
        </span>
      </div>
    </div>
  );
}
