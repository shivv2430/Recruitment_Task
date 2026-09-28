// ThemeContext.jsx - Global Light / Dark Mode State
// We use React Context so any component (like Navbar) can toggle or read the current theme.

import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Check if user previously saved a theme preference in localStorage
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("codechef_theme");
    return savedTheme ? savedTheme : "dark"; // Default to dark theme
  });

  useEffect(() => {
    // Apply data-theme attribute on the root <html> element
    document.documentElement.setAttribute("data-theme", theme);
    // Save current theme to localStorage
    localStorage.setItem("codechef_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to easily use the theme in any component
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
