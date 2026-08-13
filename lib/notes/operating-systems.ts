import { SubjectContent } from "../types";

const content: SubjectContent = {
  code: "24ERP504",
  name: "Operating Systems",
  semester: "s5",
  category: "computer",
  credits: 4,
  ltpj: "2-1-2-0",
  modules: [
    {
      id: "m1",
      number: 1,
      title: "Introduction to Operating Systems",
      topics: [
        { title: "Introduction to Operating Systems: Virtualizing the CPU, Virtualizing the memory, Concurrency, Persistence, Design Goals" },
        { title: "Components of an OS, Types of OS, Operating System structure - Simple structure, Layered approach, Microkernel, Modules, Generalized view of System Calls, System boot process" },
      ],
      overview: {
        summary: "Syllabus module 1: Introduction to Operating Systems. Detailed exam-focused notes are not written yet; the official syllabus topics are listed below.",
        whyItMatters: "Part of the official Operating Systems (24ERP504) — Semester 5. Use the topics below with the AI study prompts while detailed notes are being written.",
      },
      coreConcepts: [
        "Introduction to Operating Systems: Virtualizing the CPU, Virtualizing the memory, Concurrency, Persistence, Design Goals",
        "Components of an OS, Types of OS, Operating System structure - Simple structure, Layered approach, Microkernel, Modules, Generalized view of System Calls, System boot process",
      ],
      definitions: [],
      diagrams: [],
      formulas: [],
      examFocus: [],
      revisionNotes: [],
    },
    {
      id: "m2",
      number: 2,
      title: "Process Management",
      topics: [
        { title: "Process Abstraction-Process, Process Creation, Process states, Process control block and Context Switch, Process control system calls -fork, wait, exec, getpid, getppid and variants" },
        { title: "The limited direct execution model" },
        { title: "Process Scheduling- Basic concepts, Scheduling queues, Schedulers, Scheduling algorithms- First come First Served, Shortest Job First, Priority scheduling, Round robin scheduling, Inter-process communication - shared memory systems, Message passing systems" },
      ],
      overview: {
        summary: "Syllabus module 2: Process Management. Detailed exam-focused notes are not written yet; the official syllabus topics are listed below.",
        whyItMatters: "Part of the official Operating Systems (24ERP504) — Semester 5. Use the topics below with the AI study prompts while detailed notes are being written.",
      },
      coreConcepts: [
        "Process Abstraction-Process, Process Creation, Process states, Process control block and Context Switch, Process control system calls -fork, wait, exec, getpid, getppid and variants",
        "The limited direct execution model",
        "Process Scheduling- Basic concepts, Scheduling queues, Schedulers, Scheduling algorithms- First come First Served, Shortest Job First, Priority scheduling, Round robin scheduling, Inter-process communication - shared memory systems, Message passing systems",
      ],
      definitions: [],
      diagrams: [],
      formulas: [],
      examFocus: [],
      revisionNotes: [],
    },
    {
      id: "m3",
      number: 3,
      title: "Process Synchronization and Deadlocks",
      topics: [
        { title: "Concurrency - Threads, Single threaded and multithreaded programming, Thread API, Process Synchronization – critical-section problem, Synchronization hardware, Mutex locks, Semaphores, Critical regions, Monitors" },
        { title: "Deadlock – System model, Deadlock characterization, Methods for handling deadlocks, Deadlock prevention, Deadlock avoidance, Detection, Recovery" },
      ],
      overview: {
        summary: "Syllabus module 3: Process Synchronization and Deadlocks. Detailed exam-focused notes are not written yet; the official syllabus topics are listed below.",
        whyItMatters: "Part of the official Operating Systems (24ERP504) — Semester 5. Use the topics below with the AI study prompts while detailed notes are being written.",
      },
      coreConcepts: [
        "Concurrency - Threads, Single threaded and multithreaded programming, Thread API, Process Synchronization – critical-section problem, Synchronization hardware, Mutex locks, Semaphores, Critical regions, Monitors",
        "Deadlock – System model, Deadlock characterization, Methods for handling deadlocks, Deadlock prevention, Deadlock avoidance, Detection, Recovery",
      ],
      definitions: [],
      diagrams: [],
      formulas: [],
      examFocus: [],
      revisionNotes: [],
    },
    {
      id: "m4",
      number: 4,
      title: "Memory Management",
      topics: [
        { title: "Address spaces, Memory view of a process -heap, stack, code, data Review of malloc and free system calls" },
        { title: "Address Translation – Introduction to Dynamic Relocation Hardware Support" },
        { title: "Segmentation, Free space Management, Paging, Virtual Memory – Demand Paging, Page Replacement Algorithms, Allocation, Thrashing" },
      ],
      overview: {
        summary: "Syllabus module 4: Memory Management. Detailed exam-focused notes are not written yet; the official syllabus topics are listed below.",
        whyItMatters: "Part of the official Operating Systems (24ERP504) — Semester 5. Use the topics below with the AI study prompts while detailed notes are being written.",
      },
      coreConcepts: [
        "Address spaces, Memory view of a process -heap, stack, code, data Review of malloc and free system calls",
        "Address Translation – Introduction to Dynamic Relocation Hardware Support",
        "Segmentation, Free space Management, Paging, Virtual Memory – Demand Paging, Page Replacement Algorithms, Allocation, Thrashing",
      ],
      definitions: [],
      diagrams: [],
      formulas: [],
      examFocus: [],
      revisionNotes: [],
    },
    {
      id: "m5",
      number: 5,
      title: "File and Storage Management",
      topics: [
        { title: "File System: File concept - Attributes, Operations, types, structure – Access methods, Protection" },
        { title: "File system implementation, Directory implementation" },
        { title: "Allocation methods" },
        { title: "Storage Management: Magnetic disks, Solid-state disks, Disk Structure, Disk scheduling, Disk formatting" },
      ],
      overview: {
        summary: "Syllabus module 5: File and Storage Management. Detailed exam-focused notes are not written yet; the official syllabus topics are listed below.",
        whyItMatters: "Part of the official Operating Systems (24ERP504) — Semester 5. Use the topics below with the AI study prompts while detailed notes are being written.",
      },
      coreConcepts: [
        "File System: File concept - Attributes, Operations, types, structure – Access methods, Protection",
        "File system implementation, Directory implementation",
        "Allocation methods",
        "Storage Management: Magnetic disks, Solid-state disks, Disk Structure, Disk scheduling, Disk formatting",
      ],
      definitions: [],
      diagrams: [],
      formulas: [],
      examFocus: [],
      revisionNotes: [],
    }
  ],
};

export default content;
