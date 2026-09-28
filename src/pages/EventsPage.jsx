// EventsPage.jsx - Complete Events Listing with Search, Category Filter, and Student Info
// Built with beginner-friendly React hooks (useState, useMemo) and humanized copy.

import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../utils/storage";
import EventCard from "../components/EventCard";
import BackLink from "../components/BackLink";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Load events from localStorage on component mount
  useEffect(() => {
    const loadedEvents = getEvents();
    setEvents(loadedEvents);
  }, []);

  // Filter categories available
  const categories = ["All", "Workshop", "Contest", "Hackathon", "Talk"];

  // Filter events based on search query and selected category
  const filteredEvents = useMemo(() => {
    return events.filter((item) => {
      // 1. Category check
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      // 2. Search query check (matches title, description, or tags)
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.shortDescription.toLowerCase().includes(q) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(q))) ||
        item.venue.toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    });
  }, [events, searchQuery, selectedCategory]);

  return (
    <div className="events-page">
      {/* Top Left Back Navigation below Navbar */}
      <BackLink to="/" label="Back to Home" />

      <div className="container">
        {/* Page Header */}
        <div className="page-header-box">
          <span className="section-eyebrow">College Calendar &bull; ABESEC</span>
          <h1 className="page-title">Upcoming Club Events</h1>
          <p className="page-subtitle">
            Every session is open to all students across all branches and years. Bring your college ID card, your laptop, and your curiosity. No entry fees ever.
          </p>
        </div>

        {/* Filter & Search Bar Controls */}
        <div className="events-controls-card">
          {/* Search Box */}
          <div className="search-input-wrapper">
            <svg
              className="search-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search by topic, C++, Git, contest, venue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                &times;
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="category-pills">
            {categories.map((cat) => {
              const count =
                cat === "All"
                  ? events.length
                  : events.filter((e) => e.category === cat).length;

              return (
                <button
                  key={cat}
                  className={`category-pill ${
                    selectedCategory === cat ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  <span>{cat}</span>
                  <span className="pill-count">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Results Summary */}
        <div className="results-summary">
          <span>
            Showing <strong>{filteredEvents.length}</strong> of{" "}
            {events.length} events
          </span>
          {(searchQuery || selectedCategory !== "All") && (
            <button
              className="reset-filters-btn"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Events Grid or Friendly Empty State */}
        {filteredEvents.length > 0 ? (
          <div className="events-grid">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="empty-state-card">
            <div className="empty-state-icon">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
            </div>
            <h3 className="empty-state-title">No events matched your search</h3>
            <p className="empty-state-text">
              We could not find any session matching "{searchQuery}". Maybe you have an idea for a topic you want us to cover? Drop into Lab 3 in Ramanujan Block or let the club team know.
            </p>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
            >
              Show All Events
            </button>
          </div>
        )}

        {/* Informative Campus Event Guidelines for Students */}
        <div className="event-info-banner">
          <div className="info-banner-col">
            <h4 className="info-banner-heading">What should I bring?</h4>
            <p className="info-banner-text">
              For hands-on workshops, bring a fully charged laptop and charger. For college contests, college lab computers with GCC/C++ and Java are pre-configured.
            </p>
          </div>
          <div className="info-banner-col">
            <h4 className="info-banner-heading">College On-Duty / Attendance</h4>
            <p className="info-banner-text">
              If an event runs during a scheduled college lab or lecture, an official departmental attendance slip will be stamped for all verified attendees.
            </p>
          </div>
          <div className="info-banner-col">
            <h4 className="info-banner-heading">Got a project or talk idea?</h4>
            <p className="info-banner-text">
              Any student can pitch a session. If you built a cool project or cracked an internship OA, come share your experience with your juniors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
