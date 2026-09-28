// HomePage.jsx - Main Landing Page for CodeChef ABESEC Chapter
// Features:
// 1. Friendly, authentic student intro & hero section
// 2. Informative chapter stats & 3-step starter guide for juniors
// 3. Featured event card highlight
// 4. Next 3 upcoming events cards with direct registration links

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../utils/storage";
import EventCard from "../components/EventCard";

export default function HomePage() {
  const [events, setEvents] = useState([]);

  // Load events from localStorage on mount
  useEffect(() => {
    const loadedEvents = getEvents();
    setEvents(loadedEvents);
  }, []);

  // Pick the designated featured event, or fallback to the first event
  const featuredEvent = events.find((ev) => ev.featured) || events[0];

  // Pick up to 3 upcoming events (excluding the featured one to avoid duplication)
  const upcomingEvents = events
    .filter((ev) => ev.id !== featuredEvent?.id)
    .slice(0, 3);

  return (
    <div className="home-page">
      {/* ---------------- Hero Section ---------------- */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-badge">
            <span className="badge badge-amber">Official Campus Chapter</span>
            <span className="hero-badge-sub">ABESEC Ghaziabad &bull; 2026 Season</span>
          </div>

          <h1 className="hero-title">
            The coding community for students who want to get good at problem solving.
          </h1>

          <p className="hero-subtitle">
            We are a group of 2nd, 3rd, and 4th year B.Tech students at ABES Engineering College. We gather in college labs to practice Data Structures, discuss CodeChef contests, build hackathon projects, and help each other clear technical interviews.
          </p>

          <div className="hero-actions">
            <Link to="/events" className="btn btn-primary">
              View Upcoming Events
            </Link>
            <Link to="/register" className="btn btn-outline">
              Register for an Event
            </Link>
          </div>

          {/* Quick Chapter Stats */}
          <div className="stats-strip">
            <div className="stat-card">
              <span className="stat-number">500+</span>
              <span className="stat-label">Active Student Coders</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">20+</span>
              <span className="stat-label">Campus Workshops & Contests</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">Lab 3</span>
              <span className="stat-label">Weekly Meetup Hub (Ramanujan Block)</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">100%</span>
              <span className="stat-label">Student Run & Free to Join</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Featured Event Highlight ---------------- */}
      {featuredEvent && (
        <section className="featured-section">
          <div className="container">
            <div className="section-header">
              <div>
                <span className="section-eyebrow">Spotlight</span>
                <h2 className="section-title">Featured Workshop</h2>
              </div>
              <Link to="/events" className="section-link">
                View all events &rarr;
              </Link>
            </div>

            <div className="featured-card-wrapper">
              <EventCard event={featuredEvent} featured={true} />
            </div>
          </div>
        </section>
      )}

      {/* ---------------- Upcoming Events (Next 3) ---------------- */}
      <section className="upcoming-section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-eyebrow">Mark Your Calendar</span>
              <h2 className="section-title">Next Up on Campus</h2>
            </div>
            <span className="events-count-note">
              Showing next {upcomingEvents.length} events
            </span>
          </div>

          <div className="events-grid">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          <div className="upcoming-footer-cta">
            <p>Looking for hackathons, guest talks, or older contest archives?</p>
            <Link to="/events" className="btn btn-outline btn-sm">
              Explore Full Events Schedule
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- Informative Section: 3-Step Beginner Guide ---------------- */}
      <section className="starter-guide-section">
        <div className="container">
          <div className="guide-box">
            <span className="section-eyebrow">Junior Roadmap</span>
            <h2 className="guide-title">
              New to coding? Here is how to get started with us
            </h2>
            <p className="guide-desc">
              You do not need to be a 5-star competitive programmer or know advanced algorithms to join. Here is how our seniors recommend starting your journey:
            </p>

            <div className="guide-steps-grid">
              <div className="guide-step-card">
                <span className="step-num">01</span>
                <h4 className="step-heading">Pick C++ or Java</h4>
                <p className="step-text">
                  Most college coding rounds and CodeChef contests rely on C++ STL or Java Collections. Learn basic loops, functions, and arrays in your first month.
                </p>
              </div>

              <div className="guide-step-card">
                <span className="step-num">02</span>
                <h4 className="step-heading">Create a CodeChef Account</h4>
                <p className="step-text">
                  Solve 10 beginner-level problems from the Practice section. Join our official ABESEC college chapter to see your name on the campus leaderboard.
                </p>
              </div>

              <div className="guide-step-card">
                <span className="step-num">03</span>
                <h4 className="step-heading">Attend Wednesday Lab Sessions</h4>
                <p className="step-text">
                  Bring your laptop to Lab 3 in Ramanujan Block. Seniors and batchmates sit together, solve doubts live, and share placement test patterns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
