import { SubjectContent } from "../types";

const content: SubjectContent = {
  code: "24ERJ502",
  name: "Database Management Systems",
  semester: "s5",
  category: "computer",
  credits: 5,
  ltpj: "2-0-2-2",
  modules: [
    {
      id: "m1",
      number: 1,
      title: "Introduction & Entity Relationship Model (4hrs",
      topics: [
        { title: "Concept & Overview of Database Management Systems (DBMS) - Characteristics of Database system, Database Users, structured, semi-structured and unstructured data" },
        { title: "Data Models and Schema - Three Schema architecture" },
        { title: "Database Languages, Database architectures, and classification.ER model - Basic concepts, entity set and attributes, notations, Relationships and constraints, cardinality, participation, notations, weak entities, relationships of degree 3" },
      ],
      overview: {
        summary: "Syllabus module 1: Introduction & Entity Relationship Model (4hrs. Detailed exam-focused notes are not written yet; the official syllabus topics are listed below.",
        whyItMatters: "Part of the official Database Management Systems (24ERJ502) — Semester 5. Use the topics below with the AI study prompts while detailed notes are being written.",
      },
      coreConcepts: [
        "Concept & Overview of Database Management Systems (DBMS) - Characteristics of Database system, Database Users, structured, semi-structured and unstructured data",
        "Data Models and Schema - Three Schema architecture",
        "Database Languages, Database architectures, and classification.ER model - Basic concepts, entity set and attributes, notations, Relationships and constraints, cardinality, participation, notations, weak entities, relationships of degree 3",
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
      title: "Relational Model and SQL DDL (5hrs",
      topics: [
        { title: "Structure of Relational Databases - Integrity Constraints, Synthesizing ER diagram to relational schema" },
        { title: "Introduction to Relational Algebra - select, project, cartesian product operations, join - Equi-join, natural join. query examples, introduction to Structured Query Language (SQL), SQL data types, Data Definition Language (DDL), Table definitions and operations – CREATE, DROP, ALTER, INSERT, DELETE, UPDATE" },
      ],
      overview: {
        summary: "Syllabus module 2: Relational Model and SQL DDL (5hrs. Detailed exam-focused notes are not written yet; the official syllabus topics are listed below.",
        whyItMatters: "Part of the official Database Management Systems (24ERJ502) — Semester 5. Use the topics below with the AI study prompts while detailed notes are being written.",
      },
      coreConcepts: [
        "Structure of Relational Databases - Integrity Constraints, Synthesizing ER diagram to relational schema",
        "Introduction to Relational Algebra - select, project, cartesian product operations, join - Equi-join, natural join. query examples, introduction to Structured Query Language (SQL), SQL data types, Data Definition Language (DDL), Table definitions and operations – CREATE, DROP, ALTER, INSERT, DELETE, UPDATE",
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
      title: "SQL DML and Physical Data Organization (5hrs",
      topics: [
        { title: "SQL DML (Data Manipulation Language) - SQL queries on single and multiple tables, Nested queries (correlated and non-correlated), Aggregation and grouping, Views, and Assertions" },
        { title: "PL/SQL-Functions, Procedures, Triggers, and Cursors" },
        { title: "Physical Data Organization - Review of terms: physical and logical records, blocking factor, pinned and unpinned organization" },
        { title: "Heap files, Indexing, Singe level indices, numerical examples, Multi-level indices, numerical examples, B- Trees & B+-Trees (structure only, algorithms not required), Extendible Hashing" },
      ],
      overview: {
        summary: "Syllabus module 3: SQL DML and Physical Data Organization (5hrs. Detailed exam-focused notes are not written yet; the official syllabus topics are listed below.",
        whyItMatters: "Part of the official Database Management Systems (24ERJ502) — Semester 5. Use the topics below with the AI study prompts while detailed notes are being written.",
      },
      coreConcepts: [
        "SQL DML (Data Manipulation Language) - SQL queries on single and multiple tables, Nested queries (correlated and non-correlated), Aggregation and grouping, Views, and Assertions",
        "PL/SQL-Functions, Procedures, Triggers, and Cursors",
        "Physical Data Organization - Review of terms: physical and logical records, blocking factor, pinned and unpinned organization",
        "Heap files, Indexing, Singe level indices, numerical examples, Multi-level indices, numerical examples, B- Trees & B+-Trees (structure only, algorithms not required), Extendible Hashing",
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
      title: "Database Normalization (4hrs",
      topics: [
        { title: "Different anomalies in designing a database, The idea of normalization, Functional dependency, Armstrong’s Axioms (proofs not required), Closures and their computation, Equivalence of functional Dependencies (FD), and Minimal Cover (proofs not required)" },
        { title: "First Normal Form (1NF), Second Normal Form (2NF), Third Normal Form (3NF), Boyce Codd Normal Form (BCNF)" },
      ],
      overview: {
        summary: "Syllabus module 4: Database Normalization (4hrs. Detailed exam-focused notes are not written yet; the official syllabus topics are listed below.",
        whyItMatters: "Part of the official Database Management Systems (24ERJ502) — Semester 5. Use the topics below with the AI study prompts while detailed notes are being written.",
      },
      coreConcepts: [
        "Different anomalies in designing a database, The idea of normalization, Functional dependency, Armstrong’s Axioms (proofs not required), Closures and their computation, Equivalence of functional Dependencies (FD), and Minimal Cover (proofs not required)",
        "First Normal Form (1NF), Second Normal Form (2NF), Third Normal Form (3NF), Boyce Codd Normal Form (BCNF)",
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
      title: "Transactions, Concurrency and Recovery, NoSQL, JDBC",
      topics: [
        { title: "(6hrs) Transaction Processing Concepts - Overview of concurrency control, Transaction Model, Significance of concurrency control and recovery, Transaction States, System Log, and Desirable Properties of Transactions" },
        { title: "Serial schedules, Concurrent and Serializable Schedules, Conflict equivalence and conflict serializability, Recoverable and cascade-less schedules, Locking, Two-phase locking, and its variations" },
        { title: "Log-based recovery, Deferred database modification, check-pointing" },
        { title: "Introduction to NoSQL Databases, Main characteristics of Key-value DB (examples from Redis), Document DB (examples from MongoDB) Main characteristics of Column-Family DB (examples from Cassandra), and Graph DB (examples from: Arango DB) Java Database Connectivity (JDBC) - JDBC overview, Creating and Executing Queries – create table, delete, insert, select" },
      ],
      overview: {
        summary: "Syllabus module 5: Transactions, Concurrency and Recovery, NoSQL, JDBC. Detailed exam-focused notes are not written yet; the official syllabus topics are listed below.",
        whyItMatters: "Part of the official Database Management Systems (24ERJ502) — Semester 5. Use the topics below with the AI study prompts while detailed notes are being written.",
      },
      coreConcepts: [
        "(6hrs) Transaction Processing Concepts - Overview of concurrency control, Transaction Model, Significance of concurrency control and recovery, Transaction States, System Log, and Desirable Properties of Transactions",
        "Serial schedules, Concurrent and Serializable Schedules, Conflict equivalence and conflict serializability, Recoverable and cascade-less schedules, Locking, Two-phase locking, and its variations",
        "Log-based recovery, Deferred database modification, check-pointing",
        "Introduction to NoSQL Databases, Main characteristics of Key-value DB (examples from Redis), Document DB (examples from MongoDB) Main characteristics of Column-Family DB (examples from Cassandra), and Graph DB (examples from: Arango DB) Java Database Connectivity (JDBC) - JDBC overview, Creating and Executing Queries – create table, delete, insert, select",
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
