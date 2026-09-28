// AdminDashboardPage.jsx - Event Management & Student Registrations Dashboard
// Features: Add/Edit/Delete events with confirmation, registration roster table with search/filter, and summary stats.

import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  getEvents,
  saveEvents,
  getRegistrations,
  isAdminAuthenticated,
  setAdminAuthenticated
} from "../utils/storage";
import BackLink from "../components/BackLink";

export default function AdminDashboardPage() {
  const navigate = useNavigate();

  // Protect route: redirect to login if not authenticated
  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate("/admin/login");
    }
  }, [navigate]);

  // Data states
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  // Active view tab: "events" or "registrations"
  const [activeTab, setActiveTab] = useState("events");

  // Event form state (for Add or Edit)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);
  const [eventFormData, setEventFormData] = useState({
    title: "",
    category: "Workshop",
    date: "",
    time: "",
    venue: "",
    shortDescription: "",
    capacity: 60,
    tagsString: "",
    featured: false
  });
  const [formError, setFormError] = useState("");

  // Delete confirmation modal state
  const [eventToDelete, setEventToDelete] = useState(null);

  // Registrations search & filter states
  const [regSearch, setRegSearch] = useState("");
  const [regEventFilter, setRegEventFilter] = useState("All");

  // Load data on mount
  useEffect(() => {
    setEvents(getEvents());
    setRegistrations(getRegistrations());
  }, []);

  // Logout handler
  const handleLogout = () => {
    setAdminAuthenticated(false);
    navigate("/");
  };

  // Open form for creating a new event
  const handleOpenAddForm = () => {
    setEditingEventId(null);
    setEventFormData({
      title: "",
      category: "Workshop",
      date: "",
      time: "4:00 PM - 5:30 PM",
      venue: "Lab 3, Ramanujan Block, ABESEC",
      shortDescription: "",
      capacity: 60,
      tagsString: "C++, Problem Solving",
      featured: false
    });
    setFormError("");
    setIsFormOpen(true);
  };

  // Open form for editing an existing event
  const handleOpenEditForm = (event) => {
    setEditingEventId(event.id);
    setEventFormData({
      title: event.title,
      category: event.category,
      date: event.date,
      time: event.time,
      venue: event.venue,
      shortDescription: event.shortDescription,
      capacity: event.capacity || 60,
      tagsString: event.tags ? event.tags.join(", ") : "",
      featured: Boolean(event.featured)
    });
    setFormError("");
    setIsFormOpen(true);
  };

  // Save event (Create or Update)
  const handleSaveEvent = (e) => {
    e.preventDefault();

    if (!eventFormData.title.trim() || !eventFormData.date || !eventFormData.venue.trim()) {
      setFormError("Title, Date, and Venue are required fields.");
      return;
    }

    const tagsArray = eventFormData.tagsString
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    let updatedList;

    if (editingEventId) {
      // Update existing event
      updatedList = events.map((ev) => {
        if (ev.id === editingEventId) {
          return {
            ...ev,
            title: eventFormData.title.trim(),
            category: eventFormData.category,
            date: eventFormData.date,
            time: eventFormData.time.trim(),
            venue: eventFormData.venue.trim(),
            shortDescription: eventFormData.shortDescription.trim(),
            capacity: Number(eventFormData.capacity) || 60,
            tags: tagsArray,
            featured: eventFormData.featured
          };
        }
        return ev;
      });
    } else {
      // Create new event
      const newEvent = {
        id: "event-" + Date.now(),
        title: eventFormData.title.trim(),
        category: eventFormData.category,
        date: eventFormData.date,
        time: eventFormData.time.trim(),
        venue: eventFormData.venue.trim(),
        shortDescription: eventFormData.shortDescription.trim(),
        capacity: Number(eventFormData.capacity) || 60,
        tags: tagsArray,
        featured: eventFormData.featured
      };
      updatedList = [newEvent, ...events];
    }

    // Save to state and localStorage
    setEvents(updatedList);
    saveEvents(updatedList);
    setIsFormOpen(false);
    setEditingEventId(null);
  };

  // Trigger delete confirmation modal
  const handlePromptDelete = (event) => {
    setEventToDelete(event);
  };

  // Confirm delete
  const handleConfirmDelete = () => {
    if (!eventToDelete) return;
    const updated = events.filter((e) => e.id !== eventToDelete.id);
    setEvents(updated);
    saveEvents(updated);
    setEventToDelete(null);
  };

  // Filtered registrations for the table
  const filteredRegistrations = useMemo(() => {
    return registrations.filter((reg) => {
      // Event filter
      const matchesEvent =
        regEventFilter === "All" || reg.eventId === regEventFilter;

      // Search query filter (matches student name or email)
      const q = regSearch.trim().toLowerCase();
      const matchesQuery =
        !q ||
        reg.name.toLowerCase().includes(q) ||
        reg.email.toLowerCase().includes(q) ||
        reg.phone.includes(q);

      return matchesEvent && matchesQuery;
    });
  }, [registrations, regSearch, regEventFilter]);

  return (
    <div className="admin-dashboard-page">
      {/* Top Left Back Navigation below Navbar */}
      <BackLink to="/" label="Back to Home" />

      <div className="container">
        {/* Top Header & Logout */}
        <div className="dashboard-topbar">
          <div>
            <span className="section-eyebrow">Club Operations Portal</span>
            <h1 className="page-title">Admin Dashboard</h1>
            <p className="page-subtitle">
              Manage CodeChef ABESEC Chapter events, dates, and view live registered student rosters.
            </p>
          </div>
          <button onClick={handleLogout} className="btn btn-outline btn-sm">
            Sign Out
          </button>
        </div>

        {/* Dashboard Stats Cards */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <span className="stat-label">Total Events</span>
            <span className="stat-number">{events.length}</span>
            <span className="stat-sub">{events.filter((e) => e.category === "Workshop").length} workshops</span>
          </div>

          <div className="admin-stat-card">
            <span className="stat-label">Total Registrations</span>
            <span className="stat-number">{registrations.length}</span>
            <span className="stat-sub">Across all campus sessions</span>
          </div>

          <div className="admin-stat-card">
            <span className="stat-label">Contests Scheduled</span>
            <span className="stat-number">{events.filter((e) => e.category === "Contest").length}</span>
            <span className="stat-sub">Rated intra-college</span>
          </div>

          <div className="admin-stat-card">
            <span className="stat-label">Hackathons / Talks</span>
            <span className="stat-number">
              {events.filter((e) => e.category === "Hackathon" || e.category === "Talk").length}
            </span>
            <span className="stat-sub">Community driven</span>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="admin-tabs">
          <button
            className={`admin-tab-btn ${activeTab === "events" ? "active" : ""}`}
            onClick={() => setActiveTab("events")}
          >
            Manage Events ({events.length})
          </button>
          <button
            className={`admin-tab-btn ${activeTab === "registrations" ? "active" : ""}`}
            onClick={() => setActiveTab("registrations")}
          >
            Registered Students ({registrations.length})
          </button>
        </div>

        {/* ---------------- Tab 1: Manage Events ---------------- */}
        {activeTab === "events" && (
          <div className="admin-section">
            <div className="section-header">
              <div>
                <h3 className="section-title">Club Events Roster</h3>
                <p className="section-desc">Add new campus workshops or edit venues and timings.</p>
              </div>
              <button onClick={handleOpenAddForm} className="btn btn-primary btn-sm">
                + Add New Event
              </button>
            </div>

            {/* Event Add/Edit Modal or Inline Form */}
            {isFormOpen && (
              <div className="admin-form-modal-overlay">
                <div className="admin-form-modal">
                  <div className="modal-header">
                    <h3>{editingEventId ? "Edit Event Details" : "Create New Campus Event"}</h3>
                    <button
                      className="modal-close-btn"
                      onClick={() => setIsFormOpen(false)}
                    >
                      &times;
                    </button>
                  </div>

                  {formError && <div className="form-alert-danger">{formError}</div>}

                  <form onSubmit={handleSaveEvent} className="modal-form">
                    <div className="form-group">
                      <label className="form-label">Event Title <span className="required">*</span></label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Graph Algorithms & BFS/DFS Live Session"
                        value={eventFormData.title}
                        onChange={(e) => setEventFormData({ ...eventFormData, title: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-row-2col">
                      <div className="form-group">
                        <label className="form-label">Category</label>
                        <select
                          className="form-select"
                          value={eventFormData.category}
                          onChange={(e) => setEventFormData({ ...eventFormData, category: e.target.value })}
                        >
                          <option value="Workshop">Workshop</option>
                          <option value="Contest">Contest</option>
                          <option value="Hackathon">Hackathon</option>
                          <option value="Talk">Talk</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Date <span className="required">*</span></label>
                        <input
                          type="date"
                          className="form-input"
                          value={eventFormData.date}
                          onChange={(e) => setEventFormData({ ...eventFormData, date: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row-2col">
                      <div className="form-group">
                        <label className="form-label">Time</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. 3:30 PM - 5:30 PM"
                          value={eventFormData.time}
                          onChange={(e) => setEventFormData({ ...eventFormData, time: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Seat Limit</label>
                        <input
                          type="number"
                          className="form-input"
                          value={eventFormData.capacity}
                          onChange={(e) => setEventFormData({ ...eventFormData, capacity: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Venue <span className="required">*</span></label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Lab 3, Ramanujan Block, ABESEC"
                        value={eventFormData.venue}
                        onChange={(e) => setEventFormData({ ...eventFormData, venue: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Short Description</label>
                      <textarea
                        className="form-textarea"
                        rows="3"
                        placeholder="Brief summary for students..."
                        value={eventFormData.shortDescription}
                        onChange={(e) => setEventFormData({ ...eventFormData, shortDescription: e.target.value })}
                      ></textarea>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Tags (comma separated)</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. C++, STL, Algorithms"
                        value={eventFormData.tagsString}
                        onChange={(e) => setEventFormData({ ...eventFormData, tagsString: e.target.value })}
                      />
                    </div>

                    <div className="form-checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={eventFormData.featured}
                          onChange={(e) => setEventFormData({ ...eventFormData, featured: e.target.checked })}
                        />
                        <span>Feature this event on the Home Page spotlight</span>
                      </label>
                    </div>

                    <div className="modal-actions">
                      <button type="button" onClick={() => setIsFormOpen(false)} className="btn btn-outline">
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        {editingEventId ? "Save Changes" : "Create Event"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Delete Confirmation Popup */}
            {eventToDelete && (
              <div className="admin-form-modal-overlay">
                <div className="admin-delete-modal">
                  <div className="delete-modal-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </div>
                  <h3>Delete Event?</h3>
                  <p>
                    Are you sure you want to delete <strong>"{eventToDelete.title}"</strong>? This will remove it from the website and cannot be undone.
                  </p>
                  <div className="modal-actions">
                    <button onClick={() => setEventToDelete(null)} className="btn btn-outline">
                      Cancel
                    </button>
                    <button onClick={handleConfirmDelete} className="btn btn-danger">
                      Yes, Delete Event
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Events List Cards */}
            <div className="admin-events-list">
              {events.map((ev) => (
                <div key={ev.id} className="admin-event-row">
                  <div className="admin-event-info">
                    <div className="admin-event-badges">
                      <span className="badge badge-purple">{ev.category}</span>
                      {ev.featured && <span className="badge badge-amber">Featured</span>}
                      <span className="code-tag">{ev.date}</span>
                    </div>
                    <h4 className="admin-event-title">{ev.title}</h4>
                    <p className="admin-event-sub">
                      {ev.venue} &bull; {ev.time}
                    </p>
                  </div>
                  <div className="admin-event-actions">
                    <button
                      onClick={() => handleOpenEditForm(ev)}
                      className="btn btn-outline btn-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handlePromptDelete(ev)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- Tab 2: View Registered Students ---------------- */}
        {activeTab === "registrations" && (
          <div className="admin-section">
            <div className="section-header">
              <div>
                <h3 className="section-title">Student Registration Roster</h3>
                <p className="section-desc">Search and verify attendees for all upcoming sessions.</p>
              </div>
            </div>

            {/* Search & Filter Controls */}
            <div className="admin-roster-controls">
              <input
                type="text"
                placeholder="Search by student name, email, or phone..."
                value={regSearch}
                onChange={(e) => setRegSearch(e.target.value)}
                className="form-input roster-search-input"
              />

              <select
                value={regEventFilter}
                onChange={(e) => setRegEventFilter(e.target.value)}
                className="form-select roster-filter-select"
              >
                <option value="All">All Events ({registrations.length})</option>
                {events.map((ev) => (
                  <option key={ev.id} value={ev.id}>
                    {ev.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Registrations Count */}
            <div className="results-summary">
              <span>Showing <strong>{filteredRegistrations.length}</strong> registered students</span>
            </div>

            {/* Table */}
            {filteredRegistrations.length > 0 ? (
              <div className="table-responsive-wrapper">
                <table className="roster-table">
                  <thead>
                    <tr>
                      <th>Student Name</th>
                      <th>Email Address</th>
                      <th>College & Year</th>
                      <th>Phone</th>
                      <th>Target Event</th>
                      <th>Registered At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRegistrations.map((reg) => (
                      <tr key={reg.id}>
                        <td>
                          <strong>{reg.name}</strong>
                          <div className="table-subtext">{reg.branch || "Engineering"}</div>
                        </td>
                        <td>
                          <span className="code-tag">{reg.email}</span>
                        </td>
                        <td>{reg.collegeYear}</td>
                        <td>{reg.phone}</td>
                        <td>
                          <span className="event-pill-text">{reg.eventTitle}</span>
                        </td>
                        <td className="table-time">
                          {reg.registeredAt
                            ? new Date(reg.registeredAt).toLocaleDateString()
                            : "Recently"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state-card">
                <p>No student registrations found matching your filter criteria.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
