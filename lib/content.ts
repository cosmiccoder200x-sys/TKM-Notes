import { Semester, Subject, ProgramId } from "./types";

export const semesters: Semester[] = [
  { id: "s3", label: "Semester 3" },
  { id: "s4", label: "Semester 4" },
  { id: "s5", label: "Semester 5" },
  { id: "s6", label: "Semester 6" },
  { id: "s7", label: "Semester 7" },
  { id: "s8", label: "Semester 8" },
];

const erSubjects: Subject[] = [
  // Semester 3
  { code: "24MAP301", slug: "advanced-linear-algebra-complex-analysis-pde", name: "Advanced Linear Algebra, Complex Analysis & PDE", credits: 5, semesterId: "s3", programId: "ER" },
  { code: "24EST332", slug: "network-theory", name: "Network Theory", credits: 2, semesterId: "s3", programId: "ER" },
  { code: "24ERJ303", slug: "digital-electronics-and-logic-design", name: "Digital Electronics and Logic Design", credits: 5, semesterId: "s3", programId: "ER" },
  { code: "24ERP304", slug: "data-structures-and-algorithms", name: "Data Structures and Algorithms", credits: 4, semesterId: "s3", programId: "ER" },
  { code: "24ERT305", slug: "sensor-and-sensor-circuits", name: "Sensor & Sensor Circuits", credits: 3, semesterId: "s3", programId: "ER" },
  { code: "24HUT310", slug: "life-skills-and-professional-ethics", name: "Life Skills and Professional Ethics", credits: 3, semesterId: "s3", programId: "ER" },
  { code: "24ESP307", slug: "system-simulation-and-virtual-instrumentation-lab", name: "System Simulation & Virtual Instrumentation Lab", credits: 2, semesterId: "s3", programId: "ER" },

  // Semester 4
  { code: "24ERT401", slug: "computer-organization-and-architecture", name: "Computer Organization and Architecture", credits: 4, semesterId: "s4", programId: "ER" },
  { code: "24ERT402", slug: "signals-and-systems", name: "Signals & Systems", credits: 3, semesterId: "s4", programId: "ER" },
  { code: "24ERP403", slug: "electrical-technology", name: "Electrical Technology", credits: 4, semesterId: "s4", programId: "ER" },
  { code: "24ERJ404", slug: "solid-state-electronic-devices-and-circuits", name: "Solid State Electronic Devices and Circuits", credits: 5, semesterId: "s4", programId: "ER" },
  { code: "24HUT435", slug: "engineering-economics", name: "Engineering Economics", credits: 3, semesterId: "s4", programId: "ER" },
  { code: "24MCT406", slug: "environmental-sciences", name: "Environmental Sciences", credits: 0, semesterId: "s4", programId: "ER" },
  { code: "24ERP407", slug: "object-oriented-programming-using-java", name: "Object Oriented Programming Using Java", credits: 2, semesterId: "s4", programId: "ER" },

  // Semester 5
  { code: "24ERT501", slug: "control-systems", name: "Control Systems", credits: 3, semesterId: "s5", programId: "ER" },
  { code: "24ERJ502", slug: "database-management-systems", name: "Database Management Systems", credits: 5, semesterId: "s5", programId: "ER" },
  { code: "24ERT503", slug: "artificial-intelligence-theory-and-applications", name: "Artificial Intelligence: Theory and Applications", credits: 3, semesterId: "s5", programId: "ER" },
  { code: "24ERP504", slug: "operating-systems", name: "Operating Systems", credits: 4, semesterId: "s5", programId: "ER" },
  { code: "24HUT535", slug: "project-management-and-finance", name: "Project Management and Finance", credits: 3, semesterId: "s5", programId: "ER" },
  { code: "24MCT506", slug: "constitution-of-india", name: "Constitution of India", credits: "MOOC", semesterId: "s5", programId: "ER" },
  { code: "24ERT507", slug: "software-engineering", name: "Software Engineering", credits: 2, semesterId: "s5", programId: "ER" },

  // Semester 6
  { code: "24ERP601", slug: "computer-networks", name: "Computer Networks", credits: 3, semesterId: "s6", programId: "ER" },
  { code: "24ERP602", slug: "embedded-system-design-and-iot", name: "Embedded System Design and IoT", credits: 3, semesterId: "s6", programId: "ER" },
  { code: "24ERT603", slug: "power-electronics-and-drives", name: "Power Electronics & Drives", credits: 3, semesterId: "s6", programId: "ER" },
  { code: "24ERE6X4", slug: "professional-elective-1", name: "Professional Elective-I", credits: 3, semesterId: "s6", programId: "ER" },
  { code: "24ERE6X5", slug: "professional-elective-2-industry-elective", name: "Professional Elective-II / Industry Elective", credits: 3, semesterId: "s6", programId: "ER" },
  { code: "24ERS606", slug: "seminar", name: "Seminar", credits: 2, semesterId: "s6", programId: "ER" },
  { code: "24SPJ607", slug: "socially-relevant-project", name: "Socially Relevant Project", credits: 1, semesterId: "s6", programId: "ER" },
  { code: "24ESP608", slug: "cyber-physical-systems", name: "Cyber Physical Systems", credits: 2, semesterId: "s6", programId: "ER" },

  // Semester 7
  { code: "24ERP701", slug: "computer-vision", name: "Computer Vision", credits: 4, semesterId: "s7", programId: "ER" },
  { code: "24ERP702", slug: "energy-systems", name: "Energy Systems", credits: 4, semesterId: "s7", programId: "ER" },
  { code: "24ERE7X3", slug: "professional-elective-3-mooc", name: "Professional Elective-III (MOOC)", credits: 3, semesterId: "s7", programId: "ER" },
  { code: "24ERO7X4", slug: "open-elective-1-industry-elective", name: "Open Elective-I / Industry Elective", credits: 3, semesterId: "s7", programId: "ER" },
  { code: "24ERD705", slug: "major-project-phase-1-internship", name: "Major Project Phase-I / Internship", credits: 7, semesterId: "s7", programId: "ER" },

  // Semester 8
  { code: "24ERE8X1", slug: "professional-elective-4-mooc", name: "Professional Elective-IV / MOOC", credits: 3, semesterId: "s8", programId: "ER" },
  { code: "24ERO8X2", slug: "open-elective-2-mooc", name: "Open Elective-II / MOOC", credits: 3, semesterId: "s8", programId: "ER" },
  { code: "24ERO8X3", slug: "open-elective-3-mooc", name: "Open Elective-III / MOOC", credits: 3, semesterId: "s8", programId: "ER" },
  { code: "24ERD804", slug: "major-project-internship", name: "Major Project / Internship", credits: 7, semesterId: "s8", programId: "ER" },
];

const csSubjects: Subject[] = [
  // Semester 3
  { code: "24MAP301", slug: "advanced-linear-algebra-complex-analysis-pde-cs", name: "Advanced Linear Algebra, Complex Analysis & PDE", credits: 5, semesterId: "s3", programId: "CS" },
  { code: "24EST352", slug: "probability-statistics-and-introduction-cs", name: "Probability, Statistics and Introduction", credits: 3, semesterId: "s3", programId: "CS" },
  { code: "24CSJ303", slug: "advanced-programming", name: "Advanced Programming", credits: 4, semesterId: "s3", programId: "CS" },
  { code: "24CSP304", slug: "algorithms", name: "Algorithms", credits: 4, semesterId: "s3", programId: "CS" },
  { code: "24CSP305", slug: "computer-organization-and-architecture-cs", name: "Computer Organization and Architecture", credits: 4, semesterId: "s3", programId: "CS" },
  { code: "24CSM309", slug: "python-for-machine-learning", name: "Python for Machine Learning", credits: 3, semesterId: "s3", programId: "CS" },
  { code: "24CSM310", slug: "object-oriented-programming", name: "Object Oriented Programming", credits: 4, semesterId: "s3", programId: "CS" },
  { code: "24EST322", slug: "basic-engineering-mechanics", name: "Basic Engineering Mechanics", credits: 4, semesterId: "s3", programId: "CS" },

  // Semester 4
  { code: "24BYT407", slug: "biology-for-engineers", name: "Biology for Engineers", credits: 2, semesterId: "s4", programId: "CS" },
  { code: "24CST401", slug: "discrete-mathematics", name: "Discrete Mathematics", credits: 4, semesterId: "s4", programId: "CS" },
  { code: "24CSP402", slug: "computer-networks-cs", name: "Computer Networks", credits: 4, semesterId: "s4", programId: "CS" },
  { code: "24CSP403", slug: "operating-systems-cs", name: "Operating Systems", credits: 4, semesterId: "s4", programId: "CS" },
  { code: "24CSM409", slug: "mathematics-for-machine-learning", name: "Mathematics for Machine Learning", credits: 4, semesterId: "s4", programId: "CS" },
  { code: "24CSM410", slug: "software-engineering-cs", name: "Software Engineering", credits: 4, semesterId: "s4", programId: "CS" },
  { code: "24MCT406", slug: "environmental-sciences-cs", name: "Environmental Sciences", credits: 0, semesterId: "s4", programId: "CS" },

  // Semester 5
  { code: "24CST501", slug: "design-and-analysis-of-algorithms", name: "Design and Analysis of Algorithms", credits: 4, semesterId: "s5", programId: "CS" },
  { code: "24CST502", slug: "software-engineering-2-cs", name: "Software Engineering", credits: 4, semesterId: "s5", programId: "CS" },
  { code: "24HUT555", slug: "finance-and-accounting", name: "Finance and Accounting", credits: 3, semesterId: "s5", programId: "CS" },
  { code: "24MCT506", slug: "constitution-of-india-cs", name: "Constitution of India", credits: "MOOC", semesterId: "s5", programId: "CS" },
  { code: "24CSM509", slug: "concepts-in-machine-learning", name: "Concepts in Machine Learning", credits: 4, semesterId: "s5", programId: "CS" },
  { code: "24CSJ504", slug: "advanced-web-technologies", name: "Advanced Web Technologies", credits: 4, semesterId: "s5", programId: "CS" },

  // Semester 6
  { code: "24CST601", slug: "theory-of-computation", name: "Theory of Computation", credits: 4, semesterId: "s6", programId: "CS" },
  { code: "24CSP602", slug: "introductory-cyber-security", name: "Introductory Cyber Security", credits: 3, semesterId: "s6", programId: "CS" },
  { code: "24EST608", slug: "digital-image-processing", name: "Digital Image Processing", credits: 3, semesterId: "s6", programId: "CS" },
  { code: "24HUT609", slug: "entrepreneurship-and-startups", name: "Entrepreneurship and Startups", credits: 3, semesterId: "s6", programId: "CS" },
  { code: "24CSM609", slug: "concepts-in-deep-learning", name: "Concepts in Deep Learning", credits: 4, semesterId: "s6", programId: "CS" },
  { code: "24CSM610", slug: "software-project-management", name: "Software Project Management", credits: 3, semesterId: "s6", programId: "CS" },
  { code: "24CSI625", slug: "blockchain-technology", name: "Blockchain Technology", credits: 3, semesterId: "s6", programId: "CS" },
  { code: "24CSE624", slug: "wireless-sensor-networks", name: "Wireless Sensor Networks", credits: 3, semesterId: "s6", programId: "CS" },

  // Semester 7
  { code: "24CSP701", slug: "compiler-design", name: "Compiler Design", credits: 4, semesterId: "s7", programId: "CS" },
  { code: "24CSP702", slug: "cloud-computing", name: "Cloud Computing", credits: 3, semesterId: "s7", programId: "CS" },
  { code: "24CSI714", slug: "cyber-laws-and-ethics", name: "Cyber Laws and Ethics", credits: 3, semesterId: "s7", programId: "CS" },
  { code: "24CSO714", slug: "data-structures", name: "Data Structures", credits: 3, semesterId: "s7", programId: "CS" },
  { code: "24CSO724", slug: "introduction-to-soft-computing", name: "Introduction to Soft Computing", credits: 3, semesterId: "s7", programId: "CS" },
  { code: "24CSO734", slug: "development-of-mobile-apps", name: "Development of Mobile Apps", credits: 3, semesterId: "s7", programId: "CS" },
  { code: "24CSE7123", slug: "ethical-hacking", name: "Ethical Hacking", credits: 3, semesterId: "s7", programId: "CS" },
  { code: "24CSE763", slug: "big-data-analytics", name: "Big Data Analytics", credits: 3, semesterId: "s7", programId: "CS" },

  // Semester 8
  { code: "24CSE811", slug: "reinforcement-learning", name: "Reinforcement Learning", credits: 3, semesterId: "s8", programId: "CS" },
  { code: "24CSE8111", slug: "cloud-security", name: "Cloud Security", credits: 3, semesterId: "s8", programId: "CS" },
  { code: "24CSE8121", slug: "cyber-forensics", name: "Cyber Forensics", credits: 3, semesterId: "s8", programId: "CS" },
  { code: "24CSE8101", slug: "data-compression", name: "Data Compression", credits: 3, semesterId: "s8", programId: "CS" },
  { code: "24CSE8141", slug: "introduction-to-devops", name: "Introduction to DevOps", credits: 3, semesterId: "s8", programId: "CS" },
  { code: "24CSE8151", slug: "augmented-and-virtual-reality", name: "Augmented and Virtual Reality", credits: 3, semesterId: "s8", programId: "CS" },
  { code: "24CSE841", slug: "total-quality-management", name: "Total Quality Management", credits: 3, semesterId: "s8", programId: "CS" },
];

const csAiSubjects: Subject[] = [
  // Semester 3
  { code: "24MAP300", slug: "advanced-linear-algebra-complex-analysis-pde-ai", name: "Advanced Linear Algebra, Complex Analysis & PDE [AI]", credits: 5, semesterId: "s3", programId: "CS_AI" },
  { code: "24EST352", slug: "probability-statistics-and-introduction", name: "Probability, Statistics and Introduction [AI]", credits: 3, semesterId: "s3", programId: "CS_AI" },
  { code: "24ERJ303", slug: "digital-electronics-and-logic-design-ai", name: "Digital Electronics and Logic Design [AI]", credits: 5, semesterId: "s3", programId: "CS_AI" },
  { code: "24ERP304", slug: "data-structures-and-algorithms-ai", name: "Data Structures and Algorithms [AI]", credits: 4, semesterId: "s3", programId: "CS_AI" },
  { code: "24ERT305", slug: "sensor-and-sensor-circuits-ai", name: "Sensor & Sensor Circuits [AI]", credits: 3, semesterId: "s3", programId: "CS_AI" },
  { code: "24HUT310", slug: "life-skills-and-professional-ethics-ai", name: "Life Skills and Professional Ethics [AI]", credits: 3, semesterId: "s3", programId: "CS_AI" },
  { code: "24ESP307", slug: "system-simulation-and-virtual-instrumentation-lab-ai", name: "System Simulation & Virtual Instrumentation Lab [AI]", credits: 2, semesterId: "s3", programId: "CS_AI" },

  // Semester 4
  { code: "24ERT401", slug: "computer-organization-and-architecture-ai", name: "Computer Organization and Architecture [AI]", credits: 4, semesterId: "s4", programId: "CS_AI" },
  { code: "24ERT402", slug: "signals-and-systems-ai", name: "Signals & Systems [AI]", credits: 3, semesterId: "s4", programId: "CS_AI" },
  { code: "24ERP403", slug: "electrical-technology-ai", name: "Electrical Technology [AI]", credits: 4, semesterId: "s4", programId: "CS_AI" },
  { code: "24ERJ404", slug: "solid-state-electronic-devices-and-circuits-ai", name: "Solid State Electronic Devices and Circuits [AI]", credits: 5, semesterId: "s4", programId: "CS_AI" },
  { code: "24HUT435", slug: "engineering-economics-ai", name: "Engineering Economics [AI]", credits: 3, semesterId: "s4", programId: "CS_AI" },
  { code: "24MCT406", slug: "environmental-sciences-ai", name: "Environmental Sciences [AI]", credits: 0, semesterId: "s4", programId: "CS_AI" },
  { code: "24ERP407", slug: "object-oriented-programming-using-java-ai", name: "Object Oriented Programming Using Java [AI]", credits: 2, semesterId: "s4", programId: "CS_AI" },

  // Semester 5
  { code: "24ERT501", slug: "control-systems-ai", name: "Control Systems [AI]", credits: 3, semesterId: "s5", programId: "CS_AI" },
  { code: "24ERJ502", slug: "database-management-systems-ai", name: "Database Management Systems [AI]", credits: 5, semesterId: "s5", programId: "CS_AI" },
  { code: "24ERT503", slug: "artificial-intelligence-theory-and-applications-ai", name: "Artificial Intelligence: Theory and Applications [AI]", credits: 3, semesterId: "s5", programId: "CS_AI" },
  { code: "24ERP504", slug: "operating-systems-ai", name: "Operating Systems [AI]", credits: 4, semesterId: "s5", programId: "CS_AI" },
  { code: "24HUT535", slug: "project-management-and-finance-ai", name: "Project Management and Finance [AI]", credits: 3, semesterId: "s5", programId: "CS_AI" },
  { code: "24MCT506", slug: "constitution-of-india-ai", name: "Constitution of India [AI]", credits: "MOOC", semesterId: "s5", programId: "CS_AI" },
  { code: "24ERT507", slug: "software-engineering-ai", name: "Software Engineering [AI]", credits: 2, semesterId: "s5", programId: "CS_AI" },

  // Semester 6
  { code: "24ERP601", slug: "computer-networks-ai", name: "Computer Networks [AI]", credits: 3, semesterId: "s6", programId: "CS_AI" },
  { code: "24ERP602", slug: "embedded-system-design-and-iot-ai", name: "Embedded System Design and IoT [AI]", credits: 3, semesterId: "s6", programId: "CS_AI" },
  { code: "24ERT603", slug: "power-electronics-and-drives-ai", name: "Power Electronics & Drives [AI]", credits: 3, semesterId: "s6", programId: "CS_AI" },
  { code: "24ERE6X4", slug: "professional-elective-1-ai", name: "Professional Elective-I [AI]", credits: 3, semesterId: "s6", programId: "CS_AI" },
  { code: "24ERE6X5", slug: "professional-elective-2-industry-elective-ai", name: "Professional Elective-II / Industry Elective [AI]", credits: 3, semesterId: "s6", programId: "CS_AI" },
  { code: "24ERS606", slug: "seminar-ai", name: "Seminar [AI]", credits: 2, semesterId: "s6", programId: "CS_AI" },
  { code: "24SPJ607", slug: "socially-relevant-project-ai", name: "Socially Relevant Project [AI]", credits: 1, semesterId: "s6", programId: "CS_AI" },
  { code: "24ESP608", slug: "cyber-physical-systems-ai", name: "Cyber Physical Systems [AI]", credits: 2, semesterId: "s6", programId: "CS_AI" },

  // Semester 7
  { code: "24ERP701", slug: "computer-vision-ai", name: "Computer Vision [AI]", credits: 4, semesterId: "s7", programId: "CS_AI" },
  { code: "24ERP702", slug: "energy-systems-ai", name: "Energy Systems [AI]", credits: 4, semesterId: "s7", programId: "CS_AI" },
  { code: "24ERE7X3", slug: "professional-elective-3-mooc-ai", name: "Professional Elective-III (MOOC) [AI]", credits: 3, semesterId: "s7", programId: "CS_AI" },
  { code: "24ERO7X4", slug: "open-elective-1-industry-elective-ai", name: "Open Elective-I / Industry Elective [AI]", credits: 3, semesterId: "s7", programId: "CS_AI" },
  { code: "24ERD705", slug: "major-project-phase-1-internship-ai", name: "Major Project Phase-I / Internship [AI]", credits: 7, semesterId: "s7", programId: "CS_AI" },

  // Semester 8
  { code: "24ERE8X1", slug: "professional-elective-4-mooc-ai", name: "Professional Elective-IV / MOOC [AI]", credits: 3, semesterId: "s8", programId: "CS_AI" },
  { code: "24ERO8X2", slug: "open-elective-2-mooc-ai", name: "Open Elective-II / MOOC [AI]", credits: 3, semesterId: "s8", programId: "CS_AI" },
  { code: "24ERO8X3", slug: "open-elective-3-mooc-ai", name: "Open Elective-III / MOOC [AI]", credits: 3, semesterId: "s8", programId: "CS_AI" },
  { code: "24ERD804", slug: "major-project-internship-ai", name: "Major Project / Internship [AI]", credits: 7, semesterId: "s8", programId: "CS_AI" },
];

export const subjects: Subject[] = [...erSubjects, ...csSubjects, ...csAiSubjects];

export function subjectsForSemester(semesterId: string, programId?: ProgramId): Subject[] {
  const list = subjects.filter((s) => s.semesterId === semesterId);
  if (programId) return list.filter((s) => s.programId === programId);
  return list;
}

export function findSubject(semesterId: string, slug: string, programId?: ProgramId): Subject | undefined {
  const matches = subjects.filter((s) => s.semesterId === semesterId && s.slug === slug);
  if (programId) return matches.find((s) => s.programId === programId);
  return matches[0];
}

export function subjectsForProgram(programId: ProgramId): Subject[] {
  return subjects.filter((s) => s.programId === programId);
}


