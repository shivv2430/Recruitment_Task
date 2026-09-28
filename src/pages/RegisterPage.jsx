// RegisterPage.jsx - Event Registration Form with Validation & Duplicate Checking
// Includes top-left back navigation, live field validation, and student FAQs.

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getEvents, registerStudent } from "../utils/storage";
import BackLink from "../components/BackLink";

export default function RegisterPage() {
  const { eventId: urlEventId } = useParams();

  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(urlEventId || "");

  // Form Fields State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    collegeYear: "ABESEC - 2nd Year",
    phone: "",
    branch: "Computer Science & Engineering"
  });

  // Validation Errors State
  const [errors, setErrors] = useState({});

  // Submission Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null); // holds registration data when done
  const [duplicateError, setDuplicateError] = useState("");

  // Load events
  useEffect(() => {
    const list = getEvents();
    setEvents(list);

    // If an eventId was in URL and exists in events list, select it
    if (urlEventId && list.some((e) => e.id === urlEventId)) {
      setSelectedEventId(urlEventId);
    } else if (list.length > 0 && !selectedEventId) {
      setSelectedEventId(list[0].id);
    }
  }, [urlEventId]);

  // Current selected event object
  const currentEvent = events.find((e) => e.id === selectedEventId);

  // Field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-specific error as student types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (duplicateError) {
      setDuplicateError("");
    }
  };

  // Form validation function
  const validateForm = () => {
    const newErrors = {};

    // 1. Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }

    // 2. Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email format (e.g. name@abes.ac.in or gmail.com)";
    }

    // 3. College & Year validation
    if (!formData.collegeYear.trim()) {
      newErrors.collegeYear = "Please select your college and year";
    }

    // 4. Phone Number validation (10 digits)
    const cleanPhone = formData.phone.replace(/[\s-]/g, "");
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your 10-digit WhatsApp/phone number";
    } else if (!phoneRegex.test(cleanPhone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    // 5. Event selection validation
    if (!selectedEventId) {
      newErrors.event = "Please select an event to register for";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setDuplicateError("");

    // Package registration data
    const registrationPayload = {
      eventId: selectedEventId,
      eventTitle: currentEvent ? currentEvent.title : "College Event",
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      collegeYear: formData.collegeYear,
      phone: formData.phone.trim(),
      branch: formData.branch
    };

    // Save using our storage helper with built-in duplicate check
    const result = registerStudent(registrationPayload);

    setIsSubmitting(false);

    if (result.success) {
      setSubmitSuccess(result.data);
    } else {
      setDuplicateError(result.message);
    }
  };

  const handleResetForAnother = () => {
    setSubmitSuccess(null);
    setFormData({
      name: "",
      email: "",
      collegeYear: "ABESEC - 2nd Year",
      phone: "",
      branch: "Computer Science & Engineering"
    });
    setErrors({});
    setDuplicateError("");
  };

  return (
    <div className="register-page">
      {/* Top Left Back Navigation below Navbar */}
      <BackLink to="/events" label="Back to Events" />

      <div className="container">
        {/* Page Header */}
        <div className="page-header-box">
          <span className="section-eyebrow">Student Pass &bull; No Fees</span>
          <h1 className="page-title">Event Registration</h1>
          <p className="page-subtitle">
            Secure your seat for upcoming CodeChef ABESEC workshops, talks, or contests. Fill out your details below.
          </p>
        </div>

        {submitSuccess ? (
          /* Success Card */
          <div className="registration-success-card">
            <div className="success-icon-badge">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="success-title">You are registered!</h2>
            <p className="success-message">
              Awesome, <strong>{submitSuccess.name}</strong>. Your seat for <strong>{submitSuccess.eventTitle}</strong> is confirmed.
            </p>

            <div className="ticket-summary-box">
              <div className="ticket-row">
                <span className="ticket-label">Registration ID</span>
                <span className="ticket-val code-tag">{submitSuccess.id}</span>
              </div>
              <div className="ticket-row">
                <span className="ticket-label">Registered Email</span>
                <span className="ticket-val">{submitSuccess.email}</span>
              </div>
              <div className="ticket-row">
                <span className="ticket-label">College & Year</span>
                <span className="ticket-val">{submitSuccess.collegeYear}</span>
              </div>
              {currentEvent && (
                <>
                  <div className="ticket-row">
                    <span className="ticket-label">Date & Time</span>
                    <span className="ticket-val">{currentEvent.date} &bull; {currentEvent.time}</span>
                  </div>
                  <div className="ticket-row">
                    <span className="ticket-label">Venue</span>
                    <span className="ticket-val">{currentEvent.venue}</span>
                  </div>
                </>
              )}
            </div>

            <div className="success-notes">
              <p>
                <strong>Pro tip for campus entry:</strong> Save a screenshot of this page or note down your registration ID ({submitSuccess.id}). Show it at the lab door to get your attendee sticker and seat.
              </p>
            </div>

            <div className="success-actions">
              <Link to="/events" className="btn btn-primary">
                Browse More Events
              </Link>
              <button onClick={handleResetForAnother} className="btn btn-outline">
                Register Another Batchmate
              </button>
            </div>
          </div>
        ) : (
          /* Form & Side Info Layout */
          <div className="register-layout-grid">
            {/* Form Column */}
            <div className="register-form-card">
              <form onSubmit={handleSubmit} noValidate>
                {/* Event Selector Dropdown */}
                <div className="form-group">
                  <label className="form-label" htmlFor="eventId">
                    Select Event <span className="required">*</span>
                  </label>
                  <select
                    id="eventId"
                    className={`form-select ${errors.event ? "error" : ""}`}
                    value={selectedEventId}
                    onChange={(e) => setSelectedEventId(e.target.value)}
                  >
                    {events.map((ev) => (
                      <option key={ev.id} value={ev.id}>
                        {ev.title} ({ev.category} &bull; {ev.date})
                      </option>
                    ))}
                  </select>
                  {errors.event && <span className="error-text">{errors.event}</span>}
                </div>

                {/* Duplicate Error Alert */}
                {duplicateError && (
                  <div className="form-alert-danger">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>{duplicateError}</span>
                  </div>
                )}

                {/* Full Name Field */}
                <div className="form-group">
                  <label className="form-label" htmlFor="name">
                    Full Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="e.g. Rahul Sharma"
                    className={`form-input ${errors.name ? "error" : ""}`}
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                {/* Email Field */}
                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    Email Address <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="e.g. rahul.sharma@abes.ac.in or personal email"
                    className={`form-input ${errors.email ? "error" : ""}`}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                {/* Two-column Row: College & Year + Branch */}
                <div className="form-row-2col">
                  <div className="form-group">
                    <label className="form-label" htmlFor="collegeYear">
                      College & Year <span className="required">*</span>
                    </label>
                    <select
                      id="collegeYear"
                      name="collegeYear"
                      className={`form-select ${errors.collegeYear ? "error" : ""}`}
                      value={formData.collegeYear}
                      onChange={handleChange}
                    >
                      <option value="ABESEC - 1st Year">ABESEC &bull; 1st Year (Fresher)</option>
                      <option value="ABESEC - 2nd Year">ABESEC &bull; 2nd Year (Sophomore)</option>
                      <option value="ABESEC - 3rd Year">ABESEC &bull; 3rd Year (Junior)</option>
                      <option value="ABESEC - 4th Year">ABESEC &bull; 4th Year (Senior)</option>
                      <option value="Other College">Other Engineering College</option>
                    </select>
                    {errors.collegeYear && (
                      <span className="error-text">{errors.collegeYear}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="branch">
                      Branch / Department
                    </label>
                    <select
                      id="branch"
                      name="branch"
                      className="form-select"
                      value={formData.branch}
                      onChange={handleChange}
                    >
                      <option value="Computer Science & Engineering">CSE</option>
                      <option value="CSE (Artificial Intelligence & ML)">CSE (AIML)</option>
                      <option value="CSE (Data Science)">CSE (Data Science)</option>
                      <option value="Information Technology">IT</option>
                      <option value="Electronics & Communication">ECE</option>
                      <option value="Mechanical / Civil / Other">Other Branch</option>
                    </select>
                  </div>
                </div>

                {/* WhatsApp / Phone Number */}
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">
                    WhatsApp / Phone Number <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="10-digit mobile number for event WhatsApp updates"
                    className={`form-input ${errors.phone ? "error" : ""}`}
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength="10"
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>

                <div className="form-submit-box">
                  <button
                    type="submit"
                    className="btn btn-primary btn-submit-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Confirming Seat..." : "Submit Registration"}
                  </button>
                  <p className="form-disclaimer">
                    By submitting, your seat is reserved in localStorage. No hidden fees or charges.
                  </p>
                </div>
              </form>
            </div>

            {/* Sidebar Column: Selected Event Brief & Student FAQs */}
            <div className="register-sidebar">
              {currentEvent ? (
                <div className="selected-event-card">
                  <span className="section-eyebrow">Selected Session</span>
                  <h3 className="sidebar-event-title">{currentEvent.title}</h3>
                  <div className="sidebar-event-meta">
                    <div className="meta-item">
                      <span>{currentEvent.date} &bull; {currentEvent.time}</span>
                    </div>
                    <div className="meta-item">
                      <span>{currentEvent.venue}</span>
                    </div>
                  </div>
                  <p className="sidebar-event-desc">
                    {currentEvent.shortDescription}
                  </p>
                </div>
              ) : (
                <div className="selected-event-card">
                  <p>Please select an event from the form to view schedule details.</p>
                </div>
              )}

              {/* Informative FAQs Box */}
              <div className="student-faqs-box">
                <h4 className="faqs-heading">Quick Student FAQs</h4>
                <div className="faq-item">
                  <strong>Is this open to 1st year students?</strong>
                  <p>Yes! In fact, most of our workshop examples start from absolute basics like C++ syntax and arrays.</p>
                </div>
                <div className="faq-item">
                  <strong>What if I cannot bring a laptop?</strong>
                  <p>Lab 3 has college desktop computers with Linux/Windows and C++/Java compilers ready to use.</p>
                </div>
                <div className="faq-item">
                  <strong>Will I get an official attendance slip?</strong>
                  <p>Yes. Club mentors will hand over signed On-Duty attendance slips after the session ends.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
