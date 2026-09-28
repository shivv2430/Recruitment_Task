import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";

// Shared Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Page Views
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import RegisterPage from "./pages/RegisterPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import NotFoundPage from "./pages/NotFoundPage";

import "./App.css";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="app-layout">
        {/* Navigation Bar stays fixed/sticky at the top */}
        <Navbar />

        {/* Main Content Area renders whichever page route is active */}
        <main className="app-main">
          <Routes>
            {/* Student Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/register/:eventId" element={<RegisterPage />} />

            {/* Admin Portal Pages */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />

            {/* 404 Fallback */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Global Club Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  </ThemeProvider>
  );
}
