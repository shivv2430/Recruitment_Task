// Utility functions for interacting with browser localStorage
// We use localStorage as our temporary database until we connect a real backend like Firebase.

import { initialEvents } from "../data/initialEvents";

const EVENTS_KEY = "codechef_abesec_events";
const REGISTRATIONS_KEY = "codechef_abesec_registrations";
const ADMIN_AUTH_KEY = "codechef_abesec_admin_logged_in";

/**
 * Loads events from localStorage.
 * If running for the first time, it seeds localStorage with our 5 sample events.
 */
export function getEvents() {
  try {
    const stored = localStorage.getItem(EVENTS_KEY);
    if (!stored) {
      localStorage.setItem(EVENTS_KEY, JSON.stringify(initialEvents));
      return initialEvents;
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error("Error reading events from localStorage:", error);
    return initialEvents;
  }
}

/**
 * Saves the full events array to localStorage.
 */
export function saveEvents(events) {
  try {
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  } catch (error) {
    console.error("Error saving events to localStorage:", error);
  }
}

/**
 * Loads all registrations from localStorage.
 */
export function getRegistrations() {
  try {
    const stored = localStorage.getItem(REGISTRATIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading registrations from localStorage:", error);
    return [];
  }
}

/**
 * Saves all registrations to localStorage.
 */
export function saveRegistrations(registrations) {
  try {
    localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations));
  } catch (error) {
    console.error("Error saving registrations to localStorage:", error);
  }
}

/**
 * Registers a student for an event.
 * Checks for duplicates (same email + same eventId) to prevent spam.
 */
export function registerStudent(registration) {
  const current = getRegistrations();

  // Check if this student already registered for this specific event
  const isDuplicate = current.some(
    (item) =>
      item.eventId === registration.eventId &&
      item.email.trim().toLowerCase() === registration.email.trim().toLowerCase()
  );

  if (isDuplicate) {
    return {
      success: false,
      message: "You are already registered for this event with this email address."
    };
  }

  // Create new registration object with an ID and timestamp
  const newRecord = {
    id: "reg-" + Date.now(),
    ...registration,
    registeredAt: new Date().toISOString()
  };

  const updated = [newRecord, ...current];
  saveRegistrations(updated);

  return {
    success: true,
    message: "Registration successful! See you at the event.",
    data: newRecord
  };
}

/**
 * Admin authentication helpers (using localStorage for simple state persistence)
 */
export function isAdminAuthenticated() {
  return localStorage.getItem(ADMIN_AUTH_KEY) === "true";
}

export function setAdminAuthenticated(status) {
  if (status) {
    localStorage.setItem(ADMIN_AUTH_KEY, "true");
  } else {
    localStorage.removeItem(ADMIN_AUTH_KEY);
  }
}
