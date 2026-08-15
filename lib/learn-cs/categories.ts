import { LearnCategory, LearnStage } from "./types";

export const LEARN_CATEGORIES: LearnCategory[] = [
  {
    id: "programming",
    order: 1,
    label: "Programming",
    shortLabel: "CODE",
    description: "The languages every computer scientist starts with.",
  },
  {
    id: "cs-fundamentals",
    order: 2,
    label: "Computer Science Fundamentals",
    shortLabel: "CS",
    description: "DSA, systems, databases, networks — the core of the field.",
  },
  {
    id: "math",
    order: 3,
    label: "Mathematics for CS",
    shortLabel: "MATH",
    description: "The math that powers algorithms, data and AI.",
  },
  {
    id: "development",
    order: 4,
    label: "Development",
    shortLabel: "DEV",
    description: "Ship real products: web, tools, workflows and databases.",
  },
  {
    id: "ai-data",
    order: 5,
    label: "AI & Data",
    shortLabel: "AI",
    description: "Data science, machine learning and generative AI.",
  },
  {
    id: "advanced",
    order: 6,
    label: "Advanced",
    shortLabel: "ADV",
    description: "System design, distributed systems, cloud and security.",
  },
];

export function getLearnCategory(id: string): LearnCategory | undefined {
  return LEARN_CATEGORIES.find((c) => c.id === id);
}

// The 7-stage learning path every subject follows. Not giant cards — compact
// progress markers that make it obvious where a student is.
export const LEARN_STAGES: LearnStage[] = [
  {
    id: "fundamentals",
    order: 1,
    title: "Fundamentals",
    subtitle: "Start from zero. Build the vocabulary.",
  },
  {
    id: "core",
    order: 2,
    title: "Core Concepts",
    subtitle: "The ideas you cannot skip.",
  },
  {
    id: "intermediate",
    order: 3,
    title: "Intermediate",
    subtitle: "Connect ideas and go deeper.",
  },
  {
    id: "advanced",
    order: 4,
    title: "Advanced",
    subtitle: "Beyond the basics.",
  },
  {
    id: "practice",
    order: 5,
    title: "Practice",
    subtitle: "Solve problems until it sticks.",
  },
  {
    id: "projects",
    order: 6,
    title: "Projects",
    subtitle: "Apply everything in real work.",
  },
  {
    id: "interview",
    order: 7,
    title: "Interview Prep",
    subtitle: "Convert knowledge into offers.",
  },
];

export function getLearnStage(id: string): LearnStage | undefined {
  return LEARN_STAGES.find((s) => s.id === id);
}

// Recommended order to study subjects across categories. Students follow this
// roadmap when they do not already know what to learn next.
export const RECOMMENDED_ROADMAP: string[] = [
  "programming-with-c",
  "python-programming",
  "c-plus-plus",
  "java-programming",
  "javascript",
  "data-structures-and-algorithms",
  "object-oriented-programming",
  "discrete-mathematics",
  "linear-algebra",
  "git-and-github",
  "html-and-css",
  "databases",
  "computer-networks",
  "operating-systems",
  "computer-organization-and-architecture",
  "apis",
  "frontend-development",
  "backend-development",
  "probability",
  "statistics",
  "dbms",
  "software-engineering",
  "data-science",
  "machine-learning",
  "deep-learning",
  "generative-ai",
  "cloud-computing",
  "distributed-systems",
  "system-design",
  "cybersecurity",
];