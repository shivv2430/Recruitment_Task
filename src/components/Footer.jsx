// Footer.jsx - Student-friendly footer for CodeChef ABESEC Chapter
// Genuine, human copy without corporate buzzwords or em dashes.

import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="container footer-container">
        {/* Left Column: Club Info */}
        <div className="footer-col brand-col">
          <div className="footer-brand">
            <span className="footer-brand-title">CodeChef ABESEC</span>
            <span className="footer-brand-tag">Student Chapter</span>
          </div>
          <p className="footer-desc">
            A student-run coding community at ABES Engineering College, Ghaziabad. We host regular workshops, competitive programming contests, and hackathons to help each other get better at problem solving.
          </p>
          <div className="footer-human-note">
            Built with curiosity, late night debugging, and React by 2nd year students.
          </div>
        </div>

        {/* Center Column: Quick Navigation */}
        <div className="footer-col">
          <h4 className="footer-heading">Navigation</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/events">All Events</Link></li>
            <li><Link to="/register">Register for an Event</Link></li>
            <li><Link to="/admin">Lead & Admin Portal</Link></li>
          </ul>
        </div>

        {/* Right Column: Campus & Community */}
        <div className="footer-col">
          <h4 className="footer-heading">Meet Us On Campus</h4>
          <p className="footer-campus-info">
            Computer Science Department, Ramanujan Block<br />
            ABES Engineering College, NH-24, Ghaziabad, UP (201009)
          </p>
          <div className="footer-social-hints">
            <span className="code-tag">#CodeChefABESEC</span>
            <span className="code-tag">#KeepPracticing</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>&copy; {new Date().getFullYear()} CodeChef ABESEC Chapter. Open to all students passionate about coding.</p>
          <p className="footer-quote">
            "Write code, run into test cases, debug, repeat."
          </p>
        </div>
      </div>
    </footer>
  );
}
