# CodeChef ABESEC Chapter - Event Management Portal 🚀

A modern, responsive, and student-focused web portal built for the **CodeChef ABESEC Student Chapter** at ABES Engineering College, Ghaziabad. Designed and engineered by a 2nd-year B.Tech student to manage campus workshops, competitive programming contests, hackathons, and student event registrations.

---

## 📌 Project Overview

This portal serves as the single source of truth for all technical events, hands-on labs, and contests hosted by the CodeChef chapter at ABESEC. It provides a seamless student experience for discovering events and registering in seconds, alongside an admin dashboard for club leads to manage events and review attendee rosters.

- **Developer**: Shivani Pal (2nd Year B.Tech, ABESEC)
- **Tech Stack**: React 19, Vite, React Router v7, Plain CSS (CSS Variables), Browser LocalStorage
- **Repository**: [https://github.com/shivv2430/Recruitment_Task](https://github.com/shivv2430/Recruitment_Task)

---

## ✨ Key Features

### 🎓 Student Experience
1. **Interactive Home Page**:
   - Clean hero introduction tailored specifically for ABESEC engineering students.
   - Real-time chapter statistics strip (500+ student coders, 20+ campus sessions, Lab 3 hub).
   - **Spotlight Workshop Card**: Prominent featured card for the primary upcoming workshop.
   - **Next Up on Campus Grid**: Displays the next 3 upcoming club events.
   - **Junior Roadmap (3-Step Beginner Guide)**: Friendly guidance for 1st and 2nd years starting CP (C++ STL selection, CodeChef handle creation, Wednesday lab meetups).
2. **Events Discovery Page**:
   - **Live Real-Time Search**: Instant keyword search across event titles, descriptions, venues, and topic tags (`#C++`, `#STL`, `#Git`, etc.).
   - **Category Filter Pills**: Filter dynamically by `All`, `Workshop`, `Contest`, `Hackathon`, and `Talk` with live counts.
   - **Friendly Empty State**: Humanized message encouraging students to pitch ideas or clear filters if zero search results match.
   - **Campus Guidelines Section**: Transparent details on equipment to bring, departmental On-Duty (OD) attendance slips, and talk proposals.
3. **Event Registration with Validation**:
   - Seamless routing with automatic event pre-selection via URL parameters (`/register/:eventId`).
   - Strict field-level validation (full name, email format, 10-digit mobile number, college year).
   - **Duplicate Registration Blocker**: Prevents students from registering twice for the same event using the same email.
   - **Digital Ticket Summary**: Generates a confirmed attendee pass with unique Registration ID (`reg-xxxxx`) and campus venue instructions.
   - Student FAQs answering questions on laptop availability, 1st-year eligibility, and free entry.
4. **Light & Dark Theme Toggle**:
   - Built with React Context (`ThemeContext`) and CSS custom properties.
   - Persists student preferences across sessions using `localStorage`.
   - Accessible Sun / Moon toggle button located right in the navigation bar.
5. **Top-Left Breadcrumb Navigation**:
   - Standardized `BackLink` component located at the top-left below the navbar on every sub-view for quick navigation.

---

### 🛡️ Club Lead Admin Portal
1. **Educational Passcode Login Gate**:
   - Secured route with educational disclaimer explaining local state vs. production backend authentication.
   - Demo credentials provided directly on the login card (`abesec2026` or `admin123`).
2. **Operations Dashboard**:
   - Top summary counters: Total Events, Total Student Registrations, Active Contests, and Workshops.
   - **Manage Events Tab**:
     - Modal form to create new events with seat limits, categories, and featured toggles.
     - Edit existing events inline.
     - Delete events with a custom confirmation safety dialog.
   - **Attendee Roster Tab**:
     - Complete table of registered students with student name, email, phone, branch, target event, and registration timestamps.
     - Live search by student name/email and dropdown filter by event.

---

## 🛠️ Technology Stack & Architecture Decisions

| Technology | Purpose | Why We Chose It |
| :--- | :--- | :--- |
| **React 19** | Component-based UI | Enables modular, reusable UI components (`Navbar`, `Footer`, `EventCard`, `BackLink`). |
| **Vite** | Build Tool & Dev Server | Ultra-fast Hot Module Replacement (HMR) and optimized production bundling under 200ms. |
| **Plain CSS** | Styling System | No Tailwind or component libraries, enabling full mastery of CSS variables, Flexbox, Grid, transitions, and media queries. |
| **React Router v7** | Client-Side Routing | Smooth single-page application (SPA) navigation without page reloads; dynamic route parameters (`:eventId`). |
| **Theme Context** | Global Theme State | Manages light/dark mode without prop drilling, dynamically setting root `data-theme` attributes. |
| **LocalStorage** | Temporary Database | Zero-dependency persistence for events and student registrations until cloud backend integration. |

---

## 📂 Project Structure

```text
Recruitment_Task/
├── index.html                   # HTML entry point with Google Fonts (Outfit & JetBrains Mono)
├── vercel.json                  # Single-page application rewrites for Vercel deployment
├── package.json                 # Project dependencies & scripts
├── vite.config.js               # Vite bundler configuration
└── src/
    ├── main.jsx                 # Application DOM mount
    ├── App.jsx                  # Route definitions and layout shell
    ├── App.css                  # Component and page layout styling
    ├── index.css                # Global design system, CSS variables, and resets
    │
    ├── context/
    │   └── ThemeContext.jsx     # Global theme provider (Light / Dark mode)
    │
    ├── components/
    │   ├── Navbar.jsx           # Sticky navigation header with theme toggle & mobile menu
    │   ├── Footer.jsx           # Student chapter footer with campus info
    │   ├── BackLink.jsx         # Standard top-left back navigation link
    │   └── EventCard.jsx        # Reusable event card with category tags & register buttons
    │
    ├── pages/
    │   ├── HomePage.jsx         # Hero, chapter stats, featured workshop & junior guide
    │   ├── EventsPage.jsx       # Event listing with search, category filters & guidelines
    │   ├── RegisterPage.jsx     # Registration form with validation & duplicate check
    │   ├── AdminLoginPage.jsx   # Club lead authentication gate
    │   ├── AdminDashboardPage.jsx # Event management and student attendee table
    │   └── NotFoundPage.jsx     # Friendly 404 fallback page
    │
    ├── data/
    │   └── initialEvents.js     # 5 realistic campus seed events
    │
    └── utils/
        └── storage.js           # LocalStorage helpers for events, registrations & auth
```

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0 or higher recommended)
- `npm` (bundled with Node.js)

### Installation & Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/shivv2430/Recruitment_Task.git
   cd Recruitment_Task
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```text
   http://localhost:5173
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

---


## 💡 5 Ideas to Scale This Project in the Future

1. **Backend & Cloud Database Integration**:
   - Replace `localStorage` with **Firebase Firestore** or **Supabase (PostgreSQL)** to allow registrations from different devices to sync in real time.
2. **Automated WhatsApp / Email Confirmations**:
   - Integrate the **Twilio WhatsApp API** or **Resend Email API** to instantly send attendees a QR code ticket right after registration.
3. **QR Code Attendance Scanner in Admin**:
   - Add a camera-based QR code scanner to the Admin Dashboard so core team members can scan student tickets at the door to mark attendance automatically.
4. **CodeChef Campus Leaderboard Sync**:
   - Connect to the official CodeChef API or scrape chapter ratings to display a live monthly leaderboard of top-rated coders from ABESEC.
5. **Team Registration Mode for Hackathons**:
   - Expand the registration form to support multi-member teams with leader details and GitHub repo submission links.

---

## 🤝 Community & Support

Have questions about the project or want to collaborate on college events?
- **GitHub**: [@shivv2430](https://github.com/shivv2430)
