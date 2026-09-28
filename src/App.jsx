// App.jsx - Main Application & Routing Configuration
// Here we define all client-side routes using react-router-dom.

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Page imports
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import RegisterPage from "./pages/RegisterPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      {/* 
        Routes looks at the current browser URL and renders 
        the matching Route's element component.
      */}
      <Routes>
        {/* Public Student Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        {/* :eventId? is an optional parameter so students can register with or without a preselected event */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/:eventId" element={<RegisterPage />} />

        {/* Club Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />

        {/* Catch-all route for any undefined URLs */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
