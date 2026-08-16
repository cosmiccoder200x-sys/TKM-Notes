// Learn CS — category, stage, roadmap-level and goal metadata.
// Categories are the broad grouping (LearnCategory); fine categories (17) are
// the browse-level taxonomy shown on the catalog. The roadmap is expressed in
// levels (0–5) so students always know where a subject sits and what it needs.

import {
  LearnCategory,
  LearnStage,
  LearnFineCategory,
  LearnFineCategoryId,
  LearnRoadmapLevel,
  LearnGoal,
} from "./types";

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

// 17 fine categories for browsing. Difficulty + estimated hours are per-area
// so the catalog communicates "how hard" and "how long" before clicking in.
export const LEARN_FINE_CATEGORIES: LearnFineCategory[] = [
  {
    id: "programming",
    order: 1,
    label: "Programming",
    shortLabel: "CODE",
    description: "Languages: C, C++, Python, Java, JavaScript — and the OOP mindset.",
    difficulty: "beginner",
    estimatedHours: 120,
    whyItMatters: "Every CS skill sits on top of writing and reading code fluently in at least one language.",
  },
  {
    id: "dsa",
    order: 2,
    label: "Data Structures & Algorithms",
    shortLabel: "DSA",
    description: "Arrays to graphs, Big-O to DP — the foundation of interviews and systems.",
    difficulty: "intermediate",
    estimatedHours: 60,
    whyItMatters: "Choosing the right structure and algorithm is the difference between a program that works and one that works at scale.",
  },
  {
    id: "algorithms",
    order: 3,
    label: "Algorithms",
    shortLabel: "ALGO",
    description: "Analysis, sorting, search, DP, greedy and graph algorithms in depth.",
    difficulty: "advanced",
    estimatedHours: 40,
    whyItMatters: "Algorithmic thinking is what lets you prove an approach is correct and fast before you write it.",
  },
  {
    id: "dbms",
    order: 4,
    label: "Databases & DBMS",
    shortLabel: "DB",
    description: "SQL, normalization, transactions, indexing and NoSQL.",
    difficulty: "intermediate",
    estimatedHours: 40,
    whyItMatters: "Nearly every real system is data-backed; understanding storage and querying decides how well it scales.",
  },
  {
    id: "os",
    order: 5,
    label: "Operating Systems",
    shortLabel: "OS",
    description: "Processes, scheduling, memory, virtualization and file systems.",
    difficulty: "intermediate",
    estimatedHours: 45,
    whyItMatters: "The OS is the contract between your program and the machine — debugging and design both depend on it.",
  },
  {
    id: "networks",
    order: 6,
    label: "Computer Networks",
    shortLabel: "NET",
    description: "From IP addressing to HTTP, DNS, routing and network security.",
    difficulty: "intermediate",
    estimatedHours: 40,
    whyItMatters: "The internet is the platform of modern software; knowing the layers explains how data really travels.",
  },
  {
    id: "coa",
    order: 7,
    label: "Computer Organization & Architecture",
    shortLabel: "COA",
    description: "Number systems, CPU, instruction cycle, memory hierarchy and pipelining.",
    difficulty: "intermediate",
    estimatedHours: 35,
    whyItMatters: "Seeing how a CPU executes instructions makes performance intuition concrete instead of magical.",
  },
  {
    id: "se",
    order: 8,
    label: "Software Engineering",
    shortLabel: "SE",
    description: "Lifecycle, requirements, architecture, testing, CI/CD and maintenance.",
    difficulty: "intermediate",
    estimatedHours: 40,
    whyItMatters: "Most code lives for years and is read by many — engineering practice is what keeps it alive.",
  },
  {
    id: "web",
    order: 9,
    label: "Web Development",
    shortLabel: "WEB",
    description: "HTML/CSS, frontend, backend, APIs — the full-stack path.",
    difficulty: "intermediate",
    estimatedHours: 80,
    whyItMatters: "The web is where most CS jobs start; shipping a real full-stack app proves you can build end to end.",
  },
  {
    id: "security",
    order: 10,
    label: "Cybersecurity",
    shortLabel: "SEC",
    description: "Crypto, web attacks, network security, auth and secure coding.",
    difficulty: "advanced",
    estimatedHours: 40,
    whyItMatters: "Security is a property of every system you ship, not a feature you add later.",
  },
  {
    id: "cloud",
    order: 11,
    label: "Cloud Computing",
    shortLabel: "CLOUD",
    description: "Compute, containers, Kubernetes, serverless and observability.",
    difficulty: "advanced",
    estimatedHours: 35,
    whyItMatters: "Production systems run on cloud infrastructure; deploying there is now a baseline skill.",
  },
  {
    id: "ai",
    order: 12,
    label: "Artificial Intelligence",
    shortLabel: "AI",
    description: "The ideas behind intelligent systems and generative AI.",
    difficulty: "advanced",
    estimatedHours: 35,
    whyItMatters: "AI is reshaping what software can do — understanding its limits and uses is a modern CS essential.",
  },
  {
    id: "ml",
    order: 13,
    label: "Machine Learning",
    shortLabel: "ML",
    description: "Regression to deep learning — models, training and evaluation.",
    difficulty: "advanced",
    estimatedHours: 60,
    whyItMatters: "ML turns data into predictions; knowing how models are built and evaluated lets you use them honestly.",
  },
  {
    id: "ds",
    order: 14,
    label: "Data Science",
    shortLabel: "DS",
    description: "Pandas, NumPy, EDA, visualization and the data workflow.",
    difficulty: "intermediate",
    estimatedHours: 35,
    whyItMatters: "Wrangling and reading data well is the common core of analytics, ML and research.",
  },
  {
    id: "math",
    order: 15,
    label: "Mathematics for CS",
    shortLabel: "MATH",
    description: "Discrete math, linear algebra, probability and statistics.",
    difficulty: "intermediate",
    estimatedHours: 70,
    whyItMatters: "CS proofs, algorithms and ML are all math under the hood; the notation pays off everywhere.",
  },
  {
    id: "toc",
    order: 16,
    label: "Theory of Computation",
    shortLabel: "TOC",
    description: "Automata, computability and complexity — the boundaries of computation.",
    difficulty: "advanced",
    estimatedHours: 30,
    whyItMatters: "Knowing what computers fundamentally can and cannot do frames every harder CS decision.",
  },
  {
    id: "distributed",
    order: 17,
    label: "Distributed Systems",
    shortLabel: "DIST",
    description: "System design, consensus, replication and distributed storage.",
    difficulty: "advanced",
    estimatedHours: 45,
    whyItMatters: "Large-scale services fail in new ways; distributed thinking is what keeps them consistent and available.",
  },
];

// Subject slug -> fine category. Kept separate from subject data so the catalog
// stays stable while fine categorization can evolve without editing subjects.
const SUBJECT_FINE_CATEGORY: Record<string, LearnFineCategoryId> = {
  "programming-with-c": "programming",
  "c-plus-plus": "programming",
  "python-programming": "programming",
  "java-programming": "programming",
  javascript: "programming",
  "data-structures-and-algorithms": "dsa",
  "object-oriented-programming": "programming",
  dbms: "dbms",
  "operating-systems": "os",
  "computer-networks": "networks",
  "computer-organization-and-architecture": "coa",
  "software-engineering": "se",
  "git-and-github": "se",
  "html-and-css": "web",
  "frontend-development": "web",
  "backend-development": "web",
  apis: "web",
  databases: "dbms",
  "discrete-mathematics": "math",
  "linear-algebra": "math",
  probability: "math",
  statistics: "math",
  "data-science": "ds",
  "machine-learning": "ml",
  "deep-learning": "ml",
  "generative-ai": "ai",
  "cloud-computing": "cloud",
  "distributed-systems": "distributed",
  "system-design": "distributed",
  cybersecurity: "security",
};

export function getLearnFineCategory(subjectSlug: string): LearnFineCategory | undefined {
  const id = SUBJECT_FINE_CATEGORY[subjectSlug];
  if (!id) return undefined;
  return LEARN_FINE_CATEGORIES.find((c) => c.id === id);
}

export function fineCategoryForId(id: LearnFineCategoryId): LearnFineCategory | undefined {
  return LEARN_FINE_CATEGORIES.find((c) => c.id === id);
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

// Roadmap levels 0–5 (spec). Each subject appears once; levels build on each
// other. The flat RECOMMENDED_ROADMAP below is the level-ordered flattening.
export const LEARN_ROADMAP_LEVELS: LearnRoadmapLevel[] = [
  {
    level: 0,
    title: "Foundations",
    description: "Write code before you study the theory. C, Python and the tooling that makes you productive.",
    subjects: ["programming-with-c", "python-programming", "git-and-github"],
  },
  {
    level: 1,
    title: "Language Depth",
    description: "A second and third language build transferable intuition. OOP turns code into systems.",
    subjects: ["c-plus-plus", "java-programming", "javascript", "object-oriented-programming"],
  },
  {
    level: 2,
    title: "Core CS Theory",
    description: "The subjects every interview and every system assumes: DSA, discrete math and linear algebra.",
    subjects: ["data-structures-and-algorithms", "discrete-mathematics", "linear-algebra"],
  },
  {
    level: 3,
    title: "Systems",
    description: "How computers, operating systems, networks and databases actually work.",
    subjects: [
      "computer-organization-and-architecture",
      "operating-systems",
      "computer-networks",
      "dbms",
      "databases",
    ],
  },
  {
    level: 4,
    title: "Build & Engineer",
    description: "Turn knowledge into shipped products: web, APIs, and disciplined software engineering.",
    subjects: ["html-and-css", "frontend-development", "backend-development", "apis", "software-engineering"],
  },
  {
    level: 5,
    title: "Specialize",
    description: "Pick a track: probability + statistics + data science, ML/AI, or scale via cloud + distributed systems.",
    subjects: [
      "probability",
      "statistics",
      "data-science",
      "machine-learning",
      "deep-learning",
      "generative-ai",
      "cloud-computing",
      "distributed-systems",
      "system-design",
      "cybersecurity",
    ],
  },
];

export function roadmapLevelFor(subjectSlug: string): number {
  for (const level of LEARN_ROADMAP_LEVELS) {
    if (level.subjects.includes(subjectSlug)) return level.level;
  }
  return -1;
}

// Flat recommended order = levels flattened (kept for legacy callers that read
// RECOMMENDED_ROADMAP as a single ordered list).
export const RECOMMENDED_ROADMAP: string[] = LEARN_ROADMAP_LEVELS.flatMap((l) => l.subjects);

// Nine goals a student can choose from on /learn-cs/roadmap. Each is an ordered
// subset of the full roadmap tuned to a career outcome.
export const LEARN_GOALS: LearnGoal[] = [
  {
    id: "foundations",
    label: "CS Foundations",
    description: "The core every engineer needs, no matter the specialization.",
    roadmap: [
      "programming-with-c",
      "python-programming",
      "git-and-github",
      "data-structures-and-algorithms",
      "discrete-mathematics",
      "computer-organization-and-architecture",
    ],
  },
  {
    id: "software-engineer",
    label: "Software Engineer",
    description: "Languages, DSA, engineering discipline and systems depth.",
    roadmap: [
      "programming-with-c",
      "python-programming",
      "java-programming",
      "object-oriented-programming",
      "data-structures-and-algorithms",
      "software-engineering",
      "operating-systems",
      "computer-networks",
    ],
  },
  {
    id: "web-developer",
    label: "Web Developer",
    description: "Ship real products end-to-end: frontend, backend and APIs.",
    roadmap: [
      "programming-with-c",
      "javascript",
      "html-and-css",
      "frontend-development",
      "backend-development",
      "apis",
      "databases",
    ],
  },
  {
    id: "data-scientist",
    label: "Data Scientist",
    description: "The math + tooling path to working with data.",
    roadmap: [
      "python-programming",
      "linear-algebra",
      "probability",
      "statistics",
      "data-science",
      "machine-learning",
    ],
  },
  {
    id: "ml-engineer",
    label: "ML Engineer",
    description: "Model building, training, evaluation and deployment.",
    roadmap: [
      "python-programming",
      "linear-algebra",
      "probability",
      "statistics",
      "machine-learning",
      "deep-learning",
      "cloud-computing",
    ],
  },
  {
    id: "ai-engineer",
    label: "AI Engineer",
    description: "Deep learning and generative AI, including RAG and agents.",
    roadmap: [
      "python-programming",
      "machine-learning",
      "deep-learning",
      "generative-ai",
      "databases",
      "apis",
    ],
  },
  {
    id: "systems-engineer",
    label: "Systems Engineer",
    description: "Operating systems, networks, databases and distributed systems.",
    roadmap: [
      "c-plus-plus",
      "computer-organization-and-architecture",
      "operating-systems",
      "computer-networks",
      "dbms",
      "distributed-systems",
    ],
  },
  {
    id: "security-engineer",
    label: "Security Engineer",
    description: "Networks, secure coding and offensive + defensive security.",
    roadmap: [
      "python-programming",
      "computer-networks",
      "operating-systems",
      "cybersecurity",
      "distributed-systems",
    ],
  },
  {
    id: "cloud-architect",
    label: "Cloud Architect",
    description: "Design systems that scale: architecture, cloud and distributed systems.",
    roadmap: [
      "object-oriented-programming",
      "dbms",
      "computer-networks",
      "system-design",
      "cloud-computing",
      "distributed-systems",
    ],
  },
];

export function getLearnGoal(id: string): LearnGoal | undefined {
  return LEARN_GOALS.find((g) => g.id === id);
}