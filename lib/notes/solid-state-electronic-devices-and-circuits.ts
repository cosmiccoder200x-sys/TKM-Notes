import { SubjectContent } from "../types";

const content: SubjectContent = {
  code: "24ERJ404",
  name: "Solid State Electronic Devices and Circuits",
  semester: "s4",
  category: "electronics",
  credits: 5,
  ltpj: "2-0-2-2",
  modules: [
    {
      id: "m1",
      number: 1,
      title: "h-parameter model of CE amplifier, Biasing of JFET and MOSFET",
      topics: [
        { title: "amplifiers Review of BJT characteristics-Operating point of a BJT-Transistor Biasing circuits: Fixed bias, Collector to base bias, Voltage divider biasing-Derivation of stability factor for voltage divider biasing-h parameter model of BJT in CE configuration-small signal low frequency ac equivalent circuit of CE amplifier- Calculation of amplifier gains and impedances using h parameter equivalent circuit" },
        { title: "Field Effect Transistors: Review of JFET and MOSFET (enhancement mode only) JFET and MOSFET common source amplifier-Design using voltage divider biasing" },
      ],
      overview: {
        summary: "Syllabus module 1: h-parameter model of CE amplifier, Biasing of JFET and MOSFET. Detailed exam-focused notes are not written yet; the official syllabus topics are listed below.",
        whyItMatters: "Part of the official Solid State Electronic Devices and Circuits (24ERJ404) — Semester 4. Use the topics below with the AI study prompts while detailed notes are being written.",
      },
      coreConcepts: [
        "amplifiers Review of BJT characteristics-Operating point of a BJT-Transistor Biasing circuits: Fixed bias, Collector to base bias, Voltage divider biasing-Derivation of stability factor for voltage divider biasing-h parameter model of BJT in CE configuration-small signal low frequency ac equivalent circuit of CE amplifier- Calculation of amplifier gains and impedances using h parameter equivalent circuit",
        "Field Effect Transistors: Review of JFET and MOSFET (enhancement mode only) JFET and MOSFET common source amplifier-Design using voltage divider biasing",
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
      title: "Frequency response of Amplifiers, Multistage amplifiers and Power",
      topics: [
        { title: "amplifiers Frequency response of Amplifiers: Low and high frequency response of common emitter amplifier - Role of coupling capacitors and emitter bypass capacitor-Internal Capacitances at high frequency operations of BJT-Hybrid pi model of BJT-Gain bandwidth product" },
        { title: "Multistage amplifiers: Direct, RC, transformer coupled Amplifiers, Applications" },
        { title: "Power amplifiers using BJT: Class A, Class B, Class AB - Conversion efficiency derivation (Class A and Class B)-Distortion in power amplifiers" },
      ],
      overview: {
        summary: "Syllabus module 2: Frequency response of Amplifiers, Multistage amplifiers and Power. Detailed exam-focused notes are not written yet; the official syllabus topics are listed below.",
        whyItMatters: "Part of the official Solid State Electronic Devices and Circuits (24ERJ404) — Semester 4. Use the topics below with the AI study prompts while detailed notes are being written.",
      },
      coreConcepts: [
        "amplifiers Frequency response of Amplifiers: Low and high frequency response of common emitter amplifier - Role of coupling capacitors and emitter bypass capacitor-Internal Capacitances at high frequency operations of BJT-Hybrid pi model of BJT-Gain bandwidth product",
        "Multistage amplifiers: Direct, RC, transformer coupled Amplifiers, Applications",
        "Power amplifiers using BJT: Class A, Class B, Class AB - Conversion efficiency derivation (Class A and Class B)-Distortion in power amplifiers",
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
      title: "Feedback in amplifiers and basics of OPAMP",
      topics: [
        { title: "Feedback in Amplifiers-Effect of positive and negative feedbacks" },
        { title: "Oscillators: Barkhausen criterion–RC oscillators (RC Phase shift oscillator)" },
        { title: "Operational Amplifiers: Fundamental differential amplifier- Modes of operation" },
        { title: "Properties of ideal and practical Op-amp - Gain, CMRR and Slew rate" },
        { title: "Parameters of a typical Op-amp IC 741" },
      ],
      overview: {
        summary: "Syllabus module 3: Feedback in amplifiers and basics of OPAMP. Detailed exam-focused notes are not written yet; the official syllabus topics are listed below.",
        whyItMatters: "Part of the official Solid State Electronic Devices and Circuits (24ERJ404) — Semester 4. Use the topics below with the AI study prompts while detailed notes are being written.",
      },
      coreConcepts: [
        "Feedback in Amplifiers-Effect of positive and negative feedbacks",
        "Oscillators: Barkhausen criterion–RC oscillators (RC Phase shift oscillator)",
        "Operational Amplifiers: Fundamental differential amplifier- Modes of operation",
        "Properties of ideal and practical Op-amp - Gain, CMRR and Slew rate",
        "Parameters of a typical Op-amp IC 741",
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
      title: "Operational amplifier circuits",
      topics: [
        { title: "Open loop and Closed loop Configurations, Concept of virtual ground" },
        { title: "Negative feedback in Op-amps" },
        { title: "Inverting and non- inverting amplifier circuits" },
        { title: "Summing and difference amplifiers, Instrumentation amplifier" },
        { title: "OP-AMP Circuits: Differentiator and Integrator circuits-practical circuits – Design – Comparators: Zero crossing and voltage level detectors, Schmitt trigger" },
        { title: "Comparator IC: LM311" },
        { title: "Simulation examples using LTSpice" },
      ],
      overview: {
        summary: "Syllabus module 4: Operational amplifier circuits. Detailed exam-focused notes are not written yet; the official syllabus topics are listed below.",
        whyItMatters: "Part of the official Solid State Electronic Devices and Circuits (24ERJ404) — Semester 4. Use the topics below with the AI study prompts while detailed notes are being written.",
      },
      coreConcepts: [
        "Open loop and Closed loop Configurations, Concept of virtual ground",
        "Negative feedback in Op-amps",
        "Inverting and non- inverting amplifier circuits",
        "Summing and difference amplifiers, Instrumentation amplifier",
        "OP-AMP Circuits: Differentiator and Integrator circuits-practical circuits – Design – Comparators: Zero crossing and voltage level detectors, Schmitt trigger",
        "Comparator IC: LM311",
        "Simulation examples using LTSpice",
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
      title: "Waveform generation and Introduction to CMOS",
      topics: [
        { title: "Waveform generation using Op-Amps: Square, triangular and ramp generator circuits using Op-Amp- Effect of slew rate on waveform generation - Timer 555 IC-internal diagram- Astable and monostable multivibrators using 555 IC" },
        { title: "Simulation examples using LTSpice Introduction to CMOS circuits- Advantages of CMOS – CMOS logic gates- CMOS NOR- Basics of CMOS opamp" },
      ],
      overview: {
        summary: "Syllabus module 5: Waveform generation and Introduction to CMOS. Detailed exam-focused notes are not written yet; the official syllabus topics are listed below.",
        whyItMatters: "Part of the official Solid State Electronic Devices and Circuits (24ERJ404) — Semester 4. Use the topics below with the AI study prompts while detailed notes are being written.",
      },
      coreConcepts: [
        "Waveform generation using Op-Amps: Square, triangular and ramp generator circuits using Op-Amp- Effect of slew rate on waveform generation - Timer 555 IC-internal diagram- Astable and monostable multivibrators using 555 IC",
        "Simulation examples using LTSpice Introduction to CMOS circuits- Advantages of CMOS – CMOS logic gates- CMOS NOR- Basics of CMOS opamp",
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
