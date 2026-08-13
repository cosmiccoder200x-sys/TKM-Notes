import { SubjectContent } from "../types";

const content: SubjectContent = {
  code: "24HUT310",
  name: "Life Skills and Professional Ethics",
  semester: "s3",
  category: "core",
  credits: 3,
  ltpj: "3-0-0-0",
  modules: [
    // ---------------------------------------------------------------
    // MODULE I — Foundation of Life Skills
    // ---------------------------------------------------------------
    {
      id: "m1",
      title: "Foundation of Life Skills",
      number: 1,
      topics: [
        { title: "Understanding Life Skills: Meaning and Significance of Life Skills-WHO-Identified Life Skills- Life skills for professionals Self-awareness: Definition and Need-Tools and Techniques of Self-awareness Stress Management: Stress, reasons and effects- stress diaries- Four A's of stress management Coping with emotions: Identifying and managing emotions- PATH method and relaxation techniques (Group activities for self awareness and stress management)" },
      ],
      overview: {
        summary:
          "This module introduces what life skills are (per WHO's framework) and why they matter for a professional, then covers self-awareness, stress management (the Four A's), and coping with emotions (the PATH method and relaxation techniques).",
        whyItMatters:
          "This subject is assessed through explain/discuss-style questions rather than numericals, so the highest-value move is memorizing the exact frameworks and acronyms (WHO's 10 life skills, the Four A's, PATH) — naming and correctly explaining a framework is what separates a full-marks answer from a vague one.",
      },
      coreConcepts: [
        "Life skills are abilities that help a person deal effectively with the demands and challenges of everyday life — they are learnable and improvable, not fixed traits.",
        "WHO identifies 10 core life skills, grouped in 5 complementary pairs: Self-awareness & Empathy, Critical thinking & Creative thinking, Decision-making & Problem-solving, Effective communication & Interpersonal relationship, Coping with stress & Coping with emotions.",
        "For professionals/engineers specifically, life skills translate directly into workplace effectiveness: self-awareness drives better self-management, stress/emotion coping sustains performance under deadline pressure, and communication/interpersonal skills drive teamwork and leadership.",
        "Self-awareness is the ability to accurately recognize one's own emotions, strengths, weaknesses, values, and motivations — needed as the foundation for every other life skill, since you can't manage what you don't first notice.",
        "Tools and techniques to build self-awareness include self-reflection journaling, seeking honest feedback from others, personality/strengths assessments, and mindfulness practices.",
        "Stress arises from a perceived gap between demands and one's ability to cope; common causes include workload, deadlines, relationships, and uncertainty; effects span physical (fatigue, illness), emotional (anxiety, irritability), and behavioral (poor decisions, withdrawal) domains.",
        "A stress diary records stressful incidents, the trigger, the reaction, and the coping response over time — making patterns visible so they can be addressed deliberately rather than reactively.",
        "The Four A's of stress management are a quick decision framework for any stressor: Avoid the stressor when possible, Alter the situation if you can't avoid it, Accept what you genuinely cannot change, and Adapt your own response/expectations to the stressor.",
        "Coping with emotions starts with accurately identifying what you're feeling (rather than acting on it unexamined) before choosing a management strategy; the PATH method offers one such structured approach to working through an emotional reaction step by step; relaxation techniques (deep breathing, progressive muscle relaxation, mindfulness) help regulate the body's physical stress response directly.",
      ],
      definitions: [
        { term: "Life Skills", definition: "A set of learnable psychosocial abilities (per WHO) that enable a person to deal effectively with the demands and challenges of everyday life." },
        { term: "Self-Awareness", definition: "The ability to accurately recognize one's own emotions, strengths, weaknesses, values, and motivations, forming the foundation for managing oneself and relating to others." },
        { term: "Stress", definition: "A physical and psychological response arising from a perceived gap between the demands placed on a person and their perceived ability to cope with those demands." },
        { term: "Four A's of Stress Management", definition: "A decision framework for responding to a stressor: Avoid it if possible, Alter the situation, Accept what cannot be changed, or Adapt your response to it." },
      ],
      diagrams: [
        { title: "The Four A's of stress management", svgKey: "four-as-stress", caption: "A quick decision flow: can you avoid it? If not, can you alter it? If not, accept it — and adapt how you respond." },
      ],
      formulas: [
        { name: "WHO's 10 Life Skills (5 complementary pairs)", expression: "Self-awareness ↔ Empathy | Critical thinking ↔ Creative thinking | Decision-making ↔ Problem-solving | Effective communication ↔ Interpersonal relationship | Coping with stress ↔ Coping with emotions" },
        { name: "Four A's of stress management", expression: "Avoid → Alter → Accept → Adapt" },
      ],
      examFocus: [
        { question: "List and explain the WHO-identified life skills, grouped in their complementary pairs.", weightage: "high" },
        { question: "Explain the Four A's of stress management with a practical example for each.", weightage: "high" },
        { question: "Explain self-awareness, its need, and the tools/techniques used to build it.", weightage: "medium" },
        { question: "Explain the role of a stress diary in managing stress.", weightage: "medium" },
        { question: "Explain the PATH method and relaxation techniques for coping with emotions.", weightage: "medium" },
      ],
      revisionNotes: [
        "WHO: 10 life skills in 5 pairs — self-awareness/empathy, critical/creative thinking, decision-making/problem-solving, communication/interpersonal, stress/emotion coping.",
        "Self-awareness = foundation skill — recognize emotions, strengths, weaknesses, values first.",
        "Stress diary: trigger → reaction → coping response, tracked over time to spot patterns.",
        "Four A's: Avoid → Alter → Accept → Adapt.",
        "Coping with emotions: identify the emotion first, then apply PATH / relaxation techniques.",
      ],
      intuition:
        "The Four A's are really a triage order, not four equal options — you ask them in sequence. Can I just not deal with this (Avoid)? If not, can I change the situation (Alter)? If not, can I make peace with it (Accept)? Whatever's left, I adjust myself to handle (Adapt). Most people jump straight to 'just deal with it' and skip the cheaper first two questions.",
      comparisons: [
        {
          title: "Avoid vs Accept (the two ends of the Four A's)",
          scenario: "Both are valid responses to a stressor — but applying the wrong one at the wrong time backfires.",
          a: { label: "Avoid", body: "Removing yourself from the stressor entirely, when that's genuinely possible (e.g. skipping a non-essential commitment). Useless when the stressor is unavoidable (e.g. exams)." },
          b: { label: "Accept", body: "Acknowledging a stressor you truly cannot change or escape (e.g. a past mistake), so energy goes into managing your reaction instead of fighting the unchangeable." },
          takeaway: "Using Avoid on something unavoidable is denial. Using Accept on something you could actually change is giving up too early — the Four A's only work in their proper order.",
        },
      ],
      selfCheck: [
        { question: "Why is self-awareness considered the 'foundation' skill among WHO's 10 life skills rather than just one skill among equals?", answer: "Every other skill — managing stress, communicating effectively, making decisions — requires first noticing your own emotional/mental state accurately. Without that baseline awareness, you can't tell when stress management or emotional coping is even needed." },
        { question: "What's the practical purpose of keeping a stress diary, beyond just venting about a bad day?", answer: "Tracking trigger → reaction → coping response over time reveals PATTERNS — recurring triggers or consistently unhelpful reactions — that aren't visible from any single incident alone, letting you address the root cause deliberately." },
      ],
    },

    // ---------------------------------------------------------------
    // MODULE II — 21st Century Skills and Problem-Solving Techniques
    // ---------------------------------------------------------------
    {
      id: "m2",
      title: "21st Century Skills and Problem-Solving Techniques",
      number: 2,
      topics: [
        { title: "21st Century Skills: Creativity, Critical Thinking, Collaboration, Problem Solving, Decision Making- Lateral Thinking- Critical thinking Vs Creative thinking Problem Solving Techniques: Six Thinking Hats- Mind Mapping- Forced Connections- Scientific temperament and Logical thinking with case studies" },
        { title: "(Activity based learning)" },
      ],
      overview: {
        summary:
          "This module covers the core 21st century skills (creativity, critical thinking, collaboration, problem solving, decision making, lateral thinking) and structured problem-solving techniques: Six Thinking Hats, Mind Mapping, Forced Connections, and scientific/logical temperament.",
        whyItMatters:
          "Six Thinking Hats and the critical-vs-creative-thinking distinction are the two most consistently asked items in this module — both are easy to score well on if you can name and briefly describe every component rather than just the general idea.",
      },
      coreConcepts: [
        "21st Century Skills are the capabilities considered essential for success in a fast-changing, technology-driven world: creativity, critical thinking, collaboration, problem solving, and decision making, often summarized as the '4Cs' (Critical thinking, Creativity, Collaboration, Communication).",
        "Critical thinking is analytical and evaluative — breaking down a problem, judging evidence, and reasoning toward a sound conclusion. Creative thinking is generative — producing novel ideas and possibilities without immediately judging them. Effective problem-solving uses creative thinking to generate options and critical thinking to evaluate and select among them.",
        "Lateral thinking approaches a problem indirectly and non-obviously, deliberately stepping outside the usual logical step-by-step path to find an unconventional solution.",
        "Six Thinking Hats (Edward de Bono): a technique where each metaphorical 'hat' represents a distinct mode of thinking, deliberately adopted one at a time to fully explore a problem from every angle: White (facts and information), Red (feelings and intuition), Black (caution, risks, critical judgment), Yellow (optimism, benefits, value), Green (creativity, new ideas), Blue (process control, managing the thinking itself).",
        "Mind Mapping: a visual technique that starts from a central idea and branches outward into related sub-topics and details, helping organize and connect ideas non-linearly.",
        "Forced Connections: a creativity technique that deliberately links the problem to a random, unrelated object or idea, using the unusual connection to spark a fresh angle of solution that conventional thinking wouldn't reach.",
        "Scientific temperament and logical thinking: approaching problems with evidence-based reasoning, skepticism toward unverified claims, and systematic step-by-step deduction — typically illustrated through case studies showing engineering or real-world problem analysis.",
      ],
      definitions: [
        { term: "Critical Thinking", definition: "The ability to analyze information objectively, evaluate evidence, and reason systematically toward a sound, well-justified conclusion." },
        { term: "Creative Thinking", definition: "The ability to generate novel ideas and possibilities, deferring judgment to allow unconventional options to surface before they are evaluated." },
        { term: "Lateral Thinking", definition: "An indirect, non-obvious approach to problem-solving that deliberately departs from the usual step-by-step logical path to discover an unconventional solution." },
        { term: "Six Thinking Hats", definition: "A structured thinking technique (Edward de Bono) in which six metaphorical hats — White, Red, Black, Yellow, Green, Blue — each represent a distinct mode of thinking, applied deliberately one at a time to examine a problem from multiple angles." },
        { term: "Mind Mapping", definition: "A visual brainstorming and organizing technique that starts from a central idea and branches outward into related sub-topics, helping represent and connect ideas non-linearly." },
      ],
      diagrams: [
        { title: "Six Thinking Hats", svgKey: "six-thinking-hats", caption: "Each hat is worn deliberately, one at a time, so the group examines facts, feelings, risks, benefits, ideas, and process separately instead of all at once." },
      ],
      formulas: [
        { name: "Six Thinking Hats", expression: "White=facts | Red=feelings | Black=caution/risk | Yellow=optimism/benefit | Green=creativity | Blue=process control" },
        { name: "4Cs of 21st century skills", expression: "Critical thinking + Creativity + Collaboration + Communication" },
      ],
      examFocus: [
        { question: "Explain the Six Thinking Hats technique, describing what each hat represents.", weightage: "high", note: "Name all six colors correctly with their exact meaning — partial lists lose easy marks." },
        { question: "Differentiate critical thinking and creative thinking, with examples of when each is used in problem-solving.", weightage: "high" },
        { question: "Explain Mind Mapping and Forced Connections as problem-solving/creativity techniques.", weightage: "medium" },
        { question: "Explain lateral thinking with an example, differentiating it from conventional (vertical) thinking.", weightage: "medium" },
        { question: "Discuss a case study illustrating scientific temperament and logical thinking in problem analysis.", weightage: "low" },
      ],
      revisionNotes: [
        "21st century skills ≈ 4Cs: Critical thinking, Creativity, Collaboration, Communication.",
        "Critical thinking = analyze/evaluate. Creative thinking = generate, without judging yet.",
        "Six Hats: White=facts, Red=feelings, Black=risk, Yellow=benefit, Green=ideas, Blue=process.",
        "Mind mapping = central idea branching outward. Forced connections = link to a random object for fresh ideas.",
        "Lateral thinking = unconventional, indirect path to a solution.",
      ],
      intuition:
        "Six Thinking Hats works because normal group discussions secretly mix all six modes at once — someone states a fact, someone else reacts emotionally, a third person raises a risk, all in the same breath, and they talk past each other. Wearing one hat at a time forces the WHOLE group through the same mode together, so nobody's critique (Black) drowns out someone else's half-formed idea (Green) before it's even been heard.",
      comparisons: [
        {
          title: "Critical Thinking vs Creative Thinking",
          scenario: "Effective problem-solving needs both — but doing them at the same time actively hurts each other.",
          a: { label: "Critical thinking", body: "Analytical, evaluative — judges ideas against evidence and logic. Best used AFTER options exist, to narrow them down." },
          b: { label: "Creative thinking", body: "Generative — produces new possibilities, deliberately withholding judgment. Best used FIRST, to maximize the raw material to choose from." },
          takeaway: "Judging ideas while you're still generating them (mixing the two) is the single most common way brainstorming sessions quietly kill good ideas before they're fully formed.",
        },
      ],
      selfCheck: [
        { question: "Why does the Black Hat in Six Thinking Hats get its own dedicated turn instead of just letting people raise concerns whenever they come up?", answer: "If criticism is allowed at any point, it tends to suppress the Green Hat's idea generation (people stop proposing ideas for fear of immediate shutdown). Giving Black Hat its own dedicated slot means ideas get a fair, judgment-free hearing first, and risks get a fair, focused hearing later." },
        { question: "How does lateral thinking differ from just 'thinking harder' about a problem using normal logic?", answer: "Lateral thinking deliberately departs from the obvious, step-by-step logical path — it looks for an indirect or unconventional angle rather than pushing harder along the same reasoning route that normal (vertical) thinking would follow." },
      ],
    },

    // ---------------------------------------------------------------
    // MODULE III — Group Dynamics and Leadership
    // ---------------------------------------------------------------
    {
      id: "m3",
      title: "Group Dynamics and Leadership",
      number: 3,
      topics: [
        { title: "Group and Team Dynamics: Composition, Formation-Problem Solving in Groups-Group vs Team, Team Dynamics- Managing team performance(Activity based learning) Leadership: Leadership Framework -Types of Leadership- VUCA Leadership- Transactional vs Transformational Leaders" },
      ],
      overview: {
        summary:
          "This module covers how groups and teams form and function (group vs team, composition, managing team performance) and leadership frameworks — types of leadership, VUCA leadership, and transactional vs transformational leaders.",
        whyItMatters:
          "Differentiating 'group vs team' and 'transactional vs transformational leadership' are the two question types most likely to appear, both rewarding a clean side-by-side comparison rather than a long essay.",
      },
      coreConcepts: [
        "Group: a collection of individuals who interact but work fairly independently toward their own goals. Team: a group with a shared goal, mutual accountability, and interdependent roles — the key difference is interdependence and shared accountability for a common outcome.",
        "Group/team composition and formation: groups typically form through stages (commonly summarized as forming, storming, norming, performing) as members move from initial orientation through conflict to settled, productive collaboration.",
        "Problem solving in groups benefits from diverse perspectives and shared workload, but can suffer from groupthink (suppressing dissent for conformity) or social loafing (reduced individual effort in a group setting) if not actively managed.",
        "Managing team performance involves setting clear shared goals, defining roles, enabling open communication, and providing regular feedback to keep the team aligned and accountable.",
        "Leadership framework: leadership is broadly about influencing and guiding a group toward a goal; common types include autocratic (leader decides alone), democratic (group participates in decisions), and laissez-faire (minimal direct interference) leadership styles.",
        "VUCA Leadership: a leadership approach suited to Volatile, Uncertain, Complex, and Ambiguous environments — emphasizing adaptability, clear vision, and decisive action despite incomplete information.",
        "Transactional leadership: based on clear structure, rewards, and penalties tied to performance against set expectations — effective for stable, well-defined tasks. Transformational leadership: inspires and motivates followers toward a shared vision beyond their immediate self-interest, driving change and innovation — effective for growth and change-heavy contexts.",
      ],
      definitions: [
        { term: "Group", definition: "A collection of individuals who interact with one another but largely pursue their own individual goals, without strong mutual accountability." },
        { term: "Team", definition: "A group of individuals working interdependently toward a shared goal, with mutual accountability for the team's collective outcome." },
        { term: "VUCA Leadership", definition: "A leadership approach designed for Volatile, Uncertain, Complex, and Ambiguous environments, emphasizing adaptability and decisive action despite incomplete information." },
        { term: "Transactional Leadership", definition: "A leadership style based on clear expectations, structured rewards, and penalties tied directly to performance against defined goals." },
        { term: "Transformational Leadership", definition: "A leadership style that inspires and motivates followers toward a shared vision, driving change and going beyond simple transactional reward/penalty structures." },
      ],
      diagrams: [
        { title: "Group vs Team", svgKey: "group-vs-team", caption: "The defining difference is interdependence — a team's members succeed or fail together on a shared goal; a group's members largely don't." },
      ],
      formulas: [
        { name: "Stages of group/team formation", expression: "Forming → Storming → Norming → Performing" },
        { name: "VUCA", expression: "Volatile + Uncertain + Complex + Ambiguous" },
      ],
      examFocus: [
        { question: "Differentiate group and team, with examples of each.", weightage: "high" },
        { question: "Differentiate transactional and transformational leadership, with examples of contexts suited to each.", weightage: "high" },
        { question: "Explain VUCA leadership and why it suits modern organizational environments.", weightage: "medium" },
        { question: "Explain the stages of team formation and common challenges in group problem-solving (groupthink, social loafing).", weightage: "medium" },
        { question: "Discuss strategies for managing and improving team performance.", weightage: "low" },
      ],
      revisionNotes: [
        "Group = independent goals. Team = shared goal + mutual accountability.",
        "Team formation: Forming → Storming → Norming → Performing.",
        "Groupthink = suppresses dissent. Social loafing = reduced individual effort in a group.",
        "VUCA = Volatile, Uncertain, Complex, Ambiguous — leadership built for unpredictable conditions.",
        "Transactional = reward/penalty for performance. Transformational = inspires shared vision, drives change.",
      ],
      intuition:
        "Storming isn't a sign your team is failing — it's a sign it's actually becoming a team. A group of strangers who never disagree was never negotiating real shared stakes in the first place; Storming is what happens when people start caring enough about the shared outcome to push back on each other.",
      comparisons: [
        {
          title: "Transactional vs Transformational Leadership",
          scenario: "Two leaders, two very different answers to 'how do I get my team to perform?'",
          a: { label: "Transactional", body: "Clear expectations, clear rewards/penalties tied to hitting them. Effective for stable, well-defined, repeatable tasks." },
          b: { label: "Transformational", body: "Inspires a shared vision that goes beyond immediate self-interest. Effective for driving change, innovation, and growth-heavy contexts." },
          takeaway: "Running a stable factory line favors transactional leadership. Launching a risky new product favors transformational — match the style to whether the work is routine or requires genuine change.",
        },
      ],
      selfCheck: [
        { question: "A team of five people each work on unrelated personal tasks in the same office, rarely interacting. Are they a 'team' by this module's definition?", answer: "No — they're better described as a group. A team requires a SHARED goal and mutual accountability for a collective outcome; working independently in the same space, without interdependence, doesn't meet that bar." },
        { question: "Why does VUCA leadership specifically emphasize adaptability over having a single fixed long-term plan?", answer: "VUCA environments (Volatile, Uncertain, Complex, Ambiguous) change too unpredictably for a rigid long-term plan to stay accurate. Adaptability lets a leader adjust decisions as conditions shift, rather than clinging to assumptions that the environment has already outdated." },
      ],
    },

    // ---------------------------------------------------------------
    // MODULE IV — Human Values
    // ---------------------------------------------------------------
    {
      id: "m4",
      title: "Human Values",
      number: 4,
      topics: [
        { title: "Morals, values and Ethics -- Integrity- Academic integrity-Work Ethics- Service Learning- Civic Virtue- Respect for others- Living peacefully- Caring and Sharing- Honestly- courage-Cooperation commitment- Empathy-Self Confidence -Social Expectations" },
        { title: "Case study on Civil Engineering disasters (Include study of Ethical issues in a recent disaster) Code of Conduct in Engineering profession" },
      ],
      overview: {
        summary:
          "This module covers the foundational vocabulary of ethics (morals, values, ethics, integrity) and a set of core human values relevant to professional life, alongside a case study lens on engineering disasters and the engineering profession's code of conduct.",
        whyItMatters:
          "Differentiating morals, values, and ethics (a deceptively simple-sounding question) is the most commonly missed easy mark in this module — get the precise distinction down and back every value (integrity, empathy, etc.) with a one-line workplace example.",
      },
      coreConcepts: [
        "Morals are an individual's personal sense of right and wrong, shaped by upbringing and culture; Values are the underlying principles/priorities a person holds (e.g. honesty, respect) that guide choices; Ethics are the systematic, often externally codified, principles governing right conduct within a profession or society — morals are personal, ethics are typically more formal/professional/codified.",
        "Integrity is consistently acting in accordance with one's stated values and principles, even without supervision; Academic integrity applies this specifically to honest, original academic work (no plagiarism, no unauthorized assistance).",
        "Work ethics: a commitment to professionalism, reliability, and diligence in one's job — showing up prepared, meeting commitments, and taking ownership of outcomes.",
        "Service learning combines community service with structured learning/reflection, building civic virtue (active, responsible participation in civic/community life) alongside academic or professional skill.",
        "Respect for others, living peacefully, caring and sharing, honesty, courage, cooperation, commitment, empathy, self-confidence, and meeting social expectations are presented as a connected set of personal values that collectively shape ethical, constructive professional behaviour — each value reinforces the others (e.g. empathy supports cooperation, honesty supports integrity).",
        "Case studies of engineering disasters (e.g. structural failures) are used to surface the ethical dimension behind technical failures — questions like whether warnings were ignored, whether cost was prioritized over safety, and who bore responsibility, showing that ethical lapses (not just technical error) often underlie major engineering failures.",
        "A professional Code of Conduct for engineers typically includes obligations like: holding public safety paramount, performing work only within one's competence, avoiding conflicts of interest, and maintaining honesty in all professional representations.",
      ],
      definitions: [
        { term: "Morals", definition: "An individual's personal sense of right and wrong, shaped largely by upbringing, culture, and personal experience." },
        { term: "Values", definition: "The underlying principles or priorities (e.g. honesty, respect, fairness) that a person holds and that guide their decisions and behaviour." },
        { term: "Ethics", definition: "A systematic set of principles governing right conduct, often formally codified for a profession or society, distinguishing acceptable from unacceptable behaviour." },
        { term: "Integrity", definition: "The quality of consistently acting in accordance with one's stated moral and ethical principles, even in the absence of supervision or external pressure." },
        { term: "Civic Virtue", definition: "The disposition to actively and responsibly participate in community and civic life, prioritizing the common good alongside individual interest." },
      ],
      diagrams: [],
      formulas: [
        { name: "Morals vs Values vs Ethics (quick distinction)", expression: "Morals = personal right/wrong | Values = guiding principles/priorities | Ethics = formal, codified rules of conduct (often professional)" },
      ],
      examFocus: [
        { question: "Differentiate morals, values, and ethics with examples.", weightage: "high", note: "State the personal-vs-codified distinction explicitly — this is the part most answers miss." },
        { question: "Discuss a case study of an engineering disaster, identifying the ethical issues involved.", weightage: "high", note: "Structure your answer as: what happened (briefly) → what ethical principle was violated → what should have happened instead." },
        { question: "Explain the Code of Conduct expected of an engineering professional.", weightage: "medium" },
        { question: "Explain integrity and academic integrity, with examples of violations to avoid.", weightage: "medium" },
        { question: "Discuss any three human values (e.g. empathy, honesty, cooperation) and their relevance in a professional setting.", weightage: "low" },
      ],
      revisionNotes: [
        "Morals = personal. Values = guiding principles. Ethics = formal/codified conduct rules.",
        "Integrity = walking the talk, even unsupervised. Academic integrity = no plagiarism/cheating.",
        "Service learning = community service + structured reflection → builds civic virtue.",
        "Engineering disaster case studies: look for the ethical failure behind the technical one.",
        "Code of conduct core idea: public safety first, work within competence, avoid conflicts of interest, stay honest.",
      ],
      intuition:
        "Integrity is what you do when literally nobody is checking. That's the entire test — not whether you can recite the right values when asked, but whether they survive contact with a moment where cutting a corner would be easy and invisible.",
      comparisons: [
        {
          title: "Morals vs Ethics",
          scenario: "These two get used almost interchangeably in casual speech, but the exam wants the precise distinction.",
          a: { label: "Morals", body: "An individual's personal sense of right and wrong, shaped by upbringing and culture. Internal, varies person to person." },
          b: { label: "Ethics", body: "A systematic, often formally codified set of conduct rules for a profession or society. External, meant to apply consistently to everyone in that role." },
          takeaway: "Your morals might tolerate something your profession's ethics code explicitly forbids (or vice versa) — they're related but genuinely different things.",
        },
      ],
      selfCheck: [
        { question: "When analyzing an engineering disaster case study, why is it usually wrong to treat it as 'just a technical failure'?", answer: "Most major engineering disasters trace back to an ethical lapse enabling the technical failure — warnings ignored, cost prioritized over safety, or responsibility unclear. Treating it as purely technical misses the actual lesson the case study is meant to teach." },
        { question: "A student copies a friend's assignment with minor wording changes. Which specific value/principle from this module does this violate, and why does changing the wording not fix it?", answer: "It violates academic integrity — submitting work that isn't genuinely your own, regardless of surface-level rewording, since the underlying ideas/work were not independently produced." },
      ],
    },

    // ---------------------------------------------------------------
    // MODULE V — Responsibilities & Rights
    // ---------------------------------------------------------------
    {
      id: "m5",
      title: "Responsibilities & Rights",
      number: 5,
      topics: [
        { title: "Collegiality and loyalty -- Managing conflict- Respect for authority- Collective bargaining- Confidentiality-Role of confidentiality in moral integrity-Conflicts of interest- Occupational crime- Professional rights-Employee right- IPR Discrimination Global ethical issues- Business ethics, Computer Ethics, Environment ethics -- Role in technological development-Engineers as Managers- Consulting Engineers- Engineers as Expert witnesses and advisors" },
      ],
      overview: {
        summary:
          "This module covers professional responsibilities (collegiality, loyalty, conflict management, confidentiality, conflicts of interest), employee/professional rights (including IPR and discrimination), and global ethical issues — business, computer, and environmental ethics — including the engineer's role as manager, consultant, or expert witness.",
        whyItMatters:
          "'Conflicts of interest' and 'confidentiality's role in moral integrity' are the two concepts most likely to be asked directly, since they're the ones with the clearest real-world professional consequences — be ready with a concrete workplace example for each.",
      },
      coreConcepts: [
        "Collegiality and loyalty: maintaining respectful, cooperative relationships with colleagues and a reasonable commitment to one's organization/profession, balanced against not compromising ethical principles purely to maintain that loyalty.",
        "Managing conflict and respect for authority: resolving workplace disagreements constructively while still respecting legitimate organizational hierarchy and decision-making authority — though authority does not override ethical obligations (e.g. safety).",
        "Collective bargaining: the process by which employees (often via a union) negotiate collectively with employers over wages, conditions, and rights, rather than individually.",
        "Confidentiality and its role in moral integrity: protecting sensitive information (client, employer, or proprietary data) that one has access to in a professional capacity — breaching confidentiality is treated as both an ethical and often legal failure, since trust is foundational to professional relationships.",
        "Conflicts of interest: situations where a professional's personal interests (financial, relational) could improperly influence their professional judgment or duties — professionals are expected to disclose and avoid acting on such conflicts.",
        "Occupational crime: illegal acts committed in the course of one's job (e.g. fraud, embezzlement, falsifying data) — distinct from personal crime, since it specifically abuses professional position/access.",
        "Professional rights and employee rights: the right to exercise professional judgment, to refuse unethical/unsafe directives, to fair compensation, and protection from discrimination; Intellectual Property Rights (IPR) protect an individual's or organization's inventions, designs, and original work from unauthorized use.",
        "Global ethical issues span: Business ethics (fair dealing, honest marketing, anti-corruption), Computer ethics (data privacy, responsible use of technology, cybersecurity responsibility), and Environmental ethics (sustainable practices, minimizing harm to ecosystems) — all increasingly central to engineering's broader societal role.",
        "Engineers take on varied professional roles beyond pure technical work: as Managers (balancing technical and organizational/people responsibilities), Consulting Engineers (providing independent expert advice to clients), and Expert Witnesses/Advisors (providing technical testimony or guidance in legal/regulatory contexts) — each role carries its own specific ethical obligations around independence and honesty.",
      ],
      definitions: [
        { term: "Confidentiality", definition: "The professional obligation to protect sensitive information acquired in the course of one's work from unauthorized disclosure, foundational to maintaining trust in professional relationships." },
        { term: "Conflict of Interest", definition: "A situation in which a professional's personal interests could improperly influence, or appear to influence, their professional judgment or duties, requiring disclosure and avoidance." },
        { term: "Occupational Crime", definition: "An illegal act committed by a person in the course of their employment, abusing their professional position or access (e.g. fraud, embezzlement, data falsification)." },
        { term: "Intellectual Property Rights (IPR)", definition: "Legal rights protecting an individual's or organization's inventions, designs, written works, and other original creations from unauthorized use." },
        { term: "Collective Bargaining", definition: "The process by which a group of employees, typically through a union, negotiates collectively with an employer over wages, working conditions, and rights." },
      ],
      diagrams: [],
      formulas: [
        { name: "Global ethical issue domains", expression: "Business ethics + Computer ethics + Environmental ethics" },
        { name: "Engineer's professional roles (ethics varies by role)", expression: "Manager | Consulting Engineer | Expert Witness/Advisor" },
      ],
      examFocus: [
        { question: "Explain conflict of interest with a professional example, and how it should be handled.", weightage: "high" },
        { question: "Explain confidentiality and its role in maintaining moral/professional integrity.", weightage: "high" },
        { question: "Discuss business ethics, computer ethics, and environmental ethics as global ethical issues relevant to engineers.", weightage: "high" },
        { question: "Differentiate the ethical responsibilities of an engineer as a manager, consulting engineer, and expert witness.", weightage: "medium" },
        { question: "Explain professional and employee rights, including IPR and protection from discrimination.", weightage: "medium" },
        { question: "Explain occupational crime with examples, distinguishing it from general crime.", weightage: "low" },
      ],
      revisionNotes: [
        "Confidentiality = trust foundation; breach = ethical AND often legal failure.",
        "Conflict of interest = personal interest vs professional duty — must disclose & avoid.",
        "Occupational crime = crime committed via abuse of one's job/position.",
        "IPR protects inventions/designs/original work from unauthorized use.",
        "Global ethics = Business + Computer + Environmental ethics.",
        "Engineer roles (manager / consultant / expert witness) each carry distinct ethical duties around independence & honesty.",
      ],
      intuition:
        "A conflict of interest isn't the same as actual wrongdoing — it's a SITUATION where your judgment COULD be compromised, even if you'd never actually act on it. That's exactly why the rule is 'disclose it' rather than 'only act on it if you'd cheat' — the appearance of bias damages trust just as much as real bias would.",
      comparisons: [
        {
          title: "Confidentiality Breach vs Occupational Crime",
          scenario: "Both involve a professional misusing their position — but they're not the same severity or category of violation.",
          a: { label: "Confidentiality breach", body: "Disclosing sensitive information you had legitimate access to. Primarily an ethical failure, though it can carry legal consequences too." },
          b: { label: "Occupational crime", body: "An outright illegal act (fraud, embezzlement, falsifying data) committed by abusing your job position. Always a legal violation, not just an ethical lapse." },
          takeaway: "Every occupational crime is a serious ethical failure, but not every ethical failure (like a careless confidentiality slip) rises to the level of a crime.",
        },
      ],
      selfCheck: [
        { question: "An engineer is asked to review a project proposal submitted by a company owned by their spouse. What should they do, and why?", answer: "Disclose the conflict of interest immediately and recuse themselves from the review, rather than simply trying to be 'extra fair'. The expectation is to avoid even the appearance of compromised judgment, not just to privately ensure good intentions." },
        { question: "Why are business ethics, computer ethics, and environmental ethics grouped together as 'global ethical issues' for engineers specifically?", answer: "Modern engineering work routinely touches all three — commercial dealings (business ethics), data/technology use (computer ethics), and environmental impact (environmental ethics) — making them recurring, society-wide concerns relevant to almost any engineering role, not niche specialist topics." },
      ],
    },
  ],
};

export default content;
