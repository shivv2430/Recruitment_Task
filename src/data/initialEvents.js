// Sample initial events for CodeChef ABESEC Chapter
// Kept in a separate file so we can initialize localStorage cleanly

export const initialEvents = [
  {
    id: "event-1",
    title: "Beginner's CP Workshop: Master C++ and STL",
    category: "Workshop",
    date: "2026-10-05",
    time: "3:30 PM - 5:30 PM",
    venue: "Lab 3, Ramanujan Block, ABESEC",
    shortDescription: "A hands-on session on vectors, maps, sorting, and time complexity. Perfect if you know basic C/C++ and want to start solving problems on CodeChef.",
    fullDescription: "We will cover the must-know Standard Template Library (STL) containers: vectors, sets, maps, pair, and iterators. We will also solve 3 CodeChef division 4 problems live on the projector. Bring your laptop and your college ID card.",
    featured: true,
    capacity: 60,
    tags: ["C++", "STL", "Problem Solving"]
  },
  {
    id: "event-2",
    title: "Git & GitHub Crash Course: From Clone to PR",
    category: "Workshop",
    date: "2026-10-12",
    time: "4:00 PM - 6:00 PM",
    venue: "Seminar Hall 2, Bhabha Block",
    shortDescription: "Stop emailing zip files to your project partners. Learn how to branch, commit, push, and resolve merge conflicts together.",
    fullDescription: "Version control is the first thing company interviewers look for on your resume. We will set up your GitHub profile, make your first open-source pull request, and practice handling conflicts on real repositories.",
    featured: false,
    capacity: 80,
    tags: ["Git", "GitHub", "Open Source"]
  },
  {
    id: "event-3",
    title: "CodeChef ABESEC Chapter Contest #1",
    category: "Contest",
    date: "2026-10-18",
    time: "7:00 PM - 9:30 PM",
    venue: "Online (CodeChef Platform)",
    shortDescription: "Our first intra-college rated contest of the semester. 6 problems ranging from beginner friendly to tricky graphs and DP.",
    fullDescription: "Compete with your batchmates and seniors. Top 5 first and second year coders get CodeChef goodies, chapter certificates, and direct shortlisting for the club core team recruitment rounds.",
    featured: false,
    capacity: 200,
    tags: ["Contest", "Ratings", "Competitive Programming"]
  },
  {
    id: "event-4",
    title: "Web Dev HackNight: Build in 6 Hours",
    category: "Hackathon",
    date: "2026-10-24",
    time: "10:00 AM - 4:00 PM",
    venue: "CS Department Incubation Center",
    shortDescription: "Form teams of 2 to 3, pick a problem statement from campus life, and build a working prototype before the pizza arrives.",
    fullDescription: "No heavy pressure, just practical building. Mentors from 3rd and 4th year will be walking around the room to help with bugs, deployment, and API integration. Free snacks and stickers for everyone who ships a live link.",
    featured: false,
    capacity: 50,
    tags: ["Web Dev", "Hackathon", "Teamwork"]
  },
  {
    id: "event-5",
    title: "Senior Talk: Cracking Off-Campus Coding Rounds",
    category: "Talk",
    date: "2026-10-29",
    time: "4:30 PM - 6:00 PM",
    venue: "Audi 1, ABESEC",
    shortDescription: "Final year seniors placed at top tech firms share their honest prep roadmap, resume mistakes, and how they cleared OA rounds.",
    fullDescription: "An open Q&A session with our 4th-year club alumni. We will talk about when to start DSA, how many questions are actually enough, how to build standout projects, and how to get referrals on LinkedIn without sounding spammy.",
    featured: false,
    capacity: 120,
    tags: ["Placement", "Interview Prep", "Mentorship"]
  }
];
