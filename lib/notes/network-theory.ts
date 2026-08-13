import { SubjectContent } from "../types";

const content: SubjectContent = {
  code: "24EST332",
  name: "Network Theory",
  semester: "s3",
  category: "electronics",
  credits: 2,
  ltpj: "2-0-0-0",
  modules: [
    // ---------------------------------------------------------------
    // MODULE I — Steady State Analysis Using Circuit Theorems
    // ---------------------------------------------------------------
    {
      id: "m1",
      title: "Steady State Analysis Using Circuit Theorems",
      number: 1,
      topics: [
        { title: "Steady state analysis of AC and DC circuits with dependent and independent sources; Source transformation; Superposition, Thevenin’s, Norton’s, and Maximum Power Transfer theorems; Problems from DC circuits only" },
      ],
      overview: {
        summary:
          "This chapter covers the network theorems used to simplify and solve DC circuits containing dependent and independent sources: source transformation, superposition, Thevenin's theorem, Norton's theorem, and Maximum Power Transfer theorem.",
        whyItMatters:
          "Finding the Thevenin/Norton equivalent of a given DC network, or verifying maximum power transfer, is the single most reliable numerical (Part B) question in this subject — it appears almost every semester and is worth practicing until it's automatic.",
      },
      coreConcepts: [
        "Independent sources have a fixed value; dependent sources (VCVS, VCCS, CCVS, CCCS) have a value controlled by some other voltage/current in the circuit.",
        "Source transformation: a voltage source V in series with resistance R can be replaced by an equivalent current source I = V/R in parallel with the same R, and vice versa — used purely to simplify a circuit's topology before solving.",
        "Superposition theorem: in any linear circuit with multiple independent sources, the response (current or voltage) at any element equals the sum of the responses caused by each source acting alone, with all other independent sources turned off (voltage sources shorted, current sources opened).",
        "Superposition does NOT apply directly to power, since power is a nonlinear (squared) function of current/voltage — compute power only after summing the actual current/voltage.",
        "Thevenin's theorem: any linear two-terminal network can be replaced, as seen from those two terminals, by a single voltage source Vth in series with a resistance Rth.",
        "Norton's theorem: the dual of Thevenin's — the same network can be replaced by a single current source IN in parallel with a resistance RN.",
        "Vth and IN are related through the same equivalent resistance: IN = Vth / Rth and RN = Rth — so once you find one equivalent, the other is immediate.",
        "Rth/RN is found by deactivating all independent sources (short voltage sources, open current sources) and finding the resistance looking into the two terminals; Vth is the open-circuit voltage; IN is the short-circuit current.",
        "Maximum Power Transfer theorem: a load resistance RL draws maximum power from a source network when RL = Rth (the Thevenin resistance of the source as seen by the load).",
        "Maximum power delivered under this matched condition: Pmax = Vth² / (4Rth).",
      ],
      definitions: [
        { term: "Dependent Source", definition: "A voltage or current source whose value is controlled by another voltage or current elsewhere in the circuit, as opposed to an independent source whose value is fixed." },
        { term: "Source Transformation", definition: "The technique of converting a voltage source in series with a resistance into an equivalent current source in parallel with the same resistance (or vice versa), without changing the terminal behaviour of the rest of the circuit." },
        { term: "Superposition Theorem", definition: "In a linear circuit with multiple independent sources, the voltage or current in any branch equals the algebraic sum of the contributions from each independent source acting alone, with all other independent sources deactivated." },
        { term: "Thevenin's Theorem", definition: "Any linear two-terminal network can be replaced by an equivalent circuit consisting of a single voltage source Vth in series with a single resistance Rth, without affecting the behaviour at those terminals." },
        { term: "Norton's Theorem", definition: "Any linear two-terminal network can be replaced by an equivalent circuit consisting of a single current source IN in parallel with a single resistance RN." },
        { term: "Maximum Power Transfer Theorem", definition: "A load resistance connected to a linear source network draws maximum power when its resistance equals the Thevenin resistance of the source network as seen from the load terminals." },
      ],
      diagrams: [
        { title: "Thevenin and Norton equivalents of the same network", svgKey: "thevenin-norton-equivalent", caption: "Both equivalents represent the exact same two-terminal behaviour — Vth/Rth in series, or IN/RN in parallel, related by IN = Vth/Rth." },
        { title: "Superposition: split into single-source circuits", svgKey: "superposition-steps", caption: "Each independent source is solved on its own (others deactivated), then the individual responses are added." },
      ],
      formulas: [
        { name: "Source transformation", expression: "V (series with R)  ⇔  I = V/R (parallel with R)" },
        { name: "Norton from Thevenin", expression: "IN = Vth / Rth   ,   RN = Rth" },
        { name: "Maximum power transfer condition", expression: "RL = Rth" },
        { name: "Maximum power delivered", expression: "Pmax = Vth² / (4·Rth)" },
      ],
      examFocus: [
        { question: "Find the Thevenin's equivalent (Vth and Rth) of a given DC network across specified terminals.", weightage: "high", note: "Find Rth by deactivating sources, Vth as the open-circuit voltage — show both clearly." },
        { question: "Find the Norton's equivalent of a given DC network.", weightage: "high", note: "Either derive directly (short-circuit current) or convert from the Thevenin equivalent you already found." },
        { question: "Verify / apply the maximum power transfer theorem for a given circuit — find RL for max power and compute Pmax.", weightage: "high" },
        { question: "Use the superposition theorem to find the current/voltage in a given branch with two or more sources.", weightage: "high", note: "Show each single-source sub-circuit explicitly before adding results." },
        { question: "Use source transformation to simplify a given circuit before solving it.", weightage: "medium" },
      ],
      revisionNotes: [
        "Dependent source value depends on another circuit variable; independent does not.",
        "Source transform: V series R ⇔ I=V/R parallel R.",
        "Superposition: one source at a time, others OFF (V-source→short, I-source→open). Never apply to power directly.",
        "Thevenin: Vth (open-circuit V) in series with Rth (deactivated-source resistance).",
        "Norton: IN (short-circuit I) in parallel with RN = Rth.",
        "IN = Vth/Rth — Thevenin and Norton are always interconvertible.",
        "Max power transfer: RL = Rth, and Pmax = Vth²/(4Rth).",
      ],
      intuition:
        "Thevenin's theorem says: no matter how messy the network behind two terminals is, from the outside it behaves exactly like one battery and one resistor. You're not simplifying the circuit — you're proving the rest of the world can't tell the difference.",
      workedExamples: [
        {
          title: "Find the Thevenin equivalent of a simple source network",
          problem: "A 12V source in series with a 4Ω resistor feeds two terminals A-B, with a 6Ω resistor also connected in parallel across A-B (load removed). Find Vth and Rth.",
          steps: [
            { label: "Step 1: Find Vth (open-circuit voltage)", content: "With the terminals open, no current flows through the 6Ω (it's just sitting in parallel with the open terminals, in series with nothing else) — actually here the 6Ω is the only path, so current flows through 4Ω and 6Ω in series: I = 12/(4+6) = 1.2A. Vth = voltage across the 6Ω = 1.2 × 6 = 7.2V." },
            { label: "Step 2: Find Rth (deactivate the source)", content: "Replace the 12V source with a short. Now 4Ω and 6Ω are in series as seen from A-B: Rth = 4 + 6 = 10Ω." },
          ],
          answer: "Vth = 7.2V, Rth = 10Ω",
        },
      ],
      comparisons: [
        {
          title: "Thevenin's Theorem vs Norton's Theorem",
          scenario: "Both replace a complicated two-terminal network with one simple equivalent — the question is just which form is more convenient for what you're solving next.",
          a: { label: "Thevenin", body: "One voltage source Vth in series with Rth. Natural when you're about to add a load in series, or want open-circuit behaviour directly." },
          b: { label: "Norton", body: "One current source IN in parallel with RN (=Rth). Natural when you're about to add a load in parallel, or want short-circuit behaviour directly." },
          takeaway: "They're mathematically interchangeable (IN=Vth/Rth) — pick whichever form makes the NEXT step of your calculation easier.",
        },
      ],
      selfCheck: [
        { question: "Why can't you apply the superposition theorem directly to find power?", answer: "Power is proportional to the square of current/voltage (P=I²R), which is a nonlinear function. Superposition only holds for linear quantities, so you must first sum the actual currents/voltages from each source, then compute power from that final sum." },
        { question: "If Rth = 5Ω for a source network, what load resistance draws maximum power, and what determines Rth in the first place?", answer: "RL = Rth = 5Ω draws maximum power. Rth is found by deactivating all independent sources (short voltage sources, open current sources) and computing the resistance seen looking into the two terminals." },
      ],
    },

    // ---------------------------------------------------------------
    // MODULE II — Transient Analysis of Circuits in s-domain
    // ---------------------------------------------------------------
    {
      id: "m2",
      title: "Transient Analysis of Circuits in s-domain",
      number: 2,
      topics: [
        { title: "Review of Laplace Transform" },
        { title: "Transformation of a circuit into s-domain" },
        { title: "Transform impedance of passive circuit elements - R, L and C" },
        { title: "Transient Analysis: Formulation and solution of dynamic equations of RL and RC series networks with DC excitation and initial conditions using Laplace Transforms, Time constant; Complete solution of RL and RC series circuits with sinusoidal excitation using Laplace Transforms" },
        { title: "Simple Numerical Problems" },
      ],
      overview: {
        summary:
          "This chapter uses the Laplace Transform to move RL and RC circuits from the time domain into the s-domain, where differential equations become algebra — letting you solve for the transient and complete response of these circuits under DC and sinusoidal excitation.",
        whyItMatters:
          "Deriving the complete current/voltage response of an RL or RC series circuit using Laplace transforms is a guaranteed numerical question, and the s-domain transform impedances of R, L, C (with initial conditions) are needed throughout the rest of the subject too.",
      },
      coreConcepts: [
        "The Laplace Transform converts a time-domain differential equation into an algebraic equation in the variable s, which is solved with ordinary algebra and then converted back using the inverse Laplace Transform.",
        "Transform impedance: a resistor R stays R in the s-domain; an inductor L becomes sL in series with a voltage source Li(0) representing its initial current; a capacitor C becomes 1/sC in series with a voltage source v(0)/s representing its initial voltage.",
        "To analyse a transient circuit: redraw it as its s-domain equivalent (replacing each element with its transform impedance plus any initial-condition source), solve using normal KVL/KCL/Ohm's law in s, then take the inverse Laplace transform to return to i(t) or v(t).",
        "RL series circuit, DC excitation, zero initial current: i(t) = (V/R)(1 − e^(−t/τ)), with time constant τ = L/R.",
        "RC series circuit, DC excitation, zero initial voltage: vC(t) = V(1 − e^(−t/τ)), with time constant τ = RC.",
        "Time constant (τ): the time taken for the response to reach about 63.2% of its final value (charging) or fall to about 36.8% of its initial value (decaying) — practically, the circuit is considered to have settled after about 5τ.",
        "Complete response = natural (transient) response + forced (steady-state) response. For sinusoidal excitation, the Laplace transform of the source is used and the resulting s-domain expression is split using partial fractions before inverting.",
      ],
      definitions: [
        { term: "Laplace Transform (circuit context)", definition: "An integral transform that converts a time-domain circuit differential equation into an algebraic equation in the complex variable s, simplifying circuit analysis." },
        { term: "Transform Impedance", definition: "The s-domain equivalent of a circuit element: R → R, L → sL (with a Li(0) source), C → 1/sC (with a v(0)/s source), used to redraw a circuit for Laplace-based analysis." },
        { term: "Time Constant (τ)", definition: "For a first-order RL or RC circuit, the time required for the response to reach 63.2% of its final value (or decay to 36.8% of its initial value); τ = L/R for RL, τ = RC for RC." },
        { term: "Transient Response", definition: "The temporary part of a circuit's response that decays with time after a switching action, eventually vanishing once steady state is reached." },
        { term: "Steady-State (Forced) Response", definition: "The part of a circuit's response that persists indefinitely, matching the form of the applied excitation, once all transient effects have decayed." },
      ],
      diagrams: [
        { title: "R, L, C transform impedances in the s-domain", svgKey: "rl-rc-transform-impedance", caption: "Each element's s-domain model includes an extra source representing its initial condition — this is what lets Laplace methods handle non-zero initial current/voltage." },
        { title: "RL circuit step response (drag R, L)", svgKey: "interactive-rl-step", interactive: true, caption: "Current rises from 0 toward V/R; one time constant τ = L/R marks where it reaches 63.2% of the final value. Drag the sliders and watch τ actually stretch or compress." },
      ],
      formulas: [
        { name: "s-domain transform of R, L, C", expression: "R → R   |   L → sL (+ Li(0))   |   C → 1/sC (+ v(0)/s)" },
        { name: "RL series, DC excitation (i(0)=0)", expression: "i(t) = (V/R)(1 − e^(−t/τ)),  τ = L/R" },
        { name: "RC series, DC excitation (vC(0)=0)", expression: "vC(t) = V(1 − e^(−t/τ)),  τ = RC" },
        { name: "General first-order response", expression: "x(t) = x_final + (x_initial − x_final)·e^(−t/τ)" },
      ],
      examFocus: [
        { question: "Draw the s-domain equivalent circuit of a given RL/RC network, including initial-condition sources.", weightage: "high" },
        { question: "Derive the complete current/voltage response of an RL or RC series circuit with DC excitation using the Laplace transform method.", weightage: "high", note: "Show: time-domain KVL → Laplace transform → solve for I(s) or V(s) → inverse Laplace." },
        { question: "Derive the transient response of an RL/RC series circuit under sinusoidal excitation.", weightage: "medium", note: "Needs partial fraction expansion before the inverse Laplace step." },
        { question: "Define time constant and explain its physical significance for an RL or RC circuit.", weightage: "medium" },
      ],
      revisionNotes: [
        "L → sL + Li(0) source.  C → 1/sC + v(0)/s source.  R → R (unchanged).",
        "Method: time-domain KVL → Laplace → algebra in s → inverse Laplace.",
        "RL (DC): i(t)=(V/R)(1−e^{−t/τ}), τ=L/R.",
        "RC (DC): v(t)=V(1−e^{−t/τ}), τ=RC.",
        "τ = time to reach 63.2% of final value; circuit ~settled after 5τ.",
        "Complete response = transient (dies out) + steady-state (persists).",
      ],
      intuition:
        "An inductor is a 'current snob' — it resists any change to its current, so right after a switch closes it briefly insists on keeping whatever current it had before (often zero). A capacitor is the opposite: a 'voltage snob' that insists on keeping its voltage. That single idea is the entire reason transient analysis exists.",
      workedExamples: [
        {
          title: "Find the time constant and final current of an RL circuit",
          problem: "A 20V DC source is switched onto a series circuit with R=5Ω and L=2H, starting from zero current. Find τ and the current at t=τ.",
          steps: [
            { label: "Step 1: Compute τ", content: "τ = L/R = 2/5 = 0.4 s." },
            { label: "Step 2: Compute the final (steady-state) current", content: "As t→∞, i(t) → V/R = 20/5 = 4A." },
            { label: "Step 3: Compute i(τ)", content: "i(τ) = (V/R)(1 − e⁻¹) = 4 × (1 − 0.368) = 4 × 0.632 = 2.528A — exactly 63.2% of the final value, as expected at t=τ." },
          ],
          answer: "τ = 0.4 s, final current = 4A, current at t=τ ≈ 2.53A",
        },
      ],
      comparisons: [
        {
          title: "Transient Response vs Steady-State Response",
          scenario: "Every complete response to a switching event is built from these two pieces — the question is which one you're being asked about.",
          a: { label: "Transient", body: "The temporary part that decays toward zero (the e⁻ᵗ/τ term). Dominates right after switching, vanishes after ~5τ." },
          b: { label: "Steady-State", body: "The permanent part that matches the source's own behaviour (constant for DC, sinusoidal for AC). What's left once the transient has died out." },
          takeaway: "Complete response = transient + steady-state, always. If a question only wants the 'final value', it's asking for steady-state alone.",
        },
      ],
      selfCheck: [
        { question: "Right at the instant a switch closes on an RL circuit with zero initial current, what is the current, and why?", answer: "Zero. An inductor opposes any sudden change in current, so the current must continue smoothly from its pre-switch value (0) — it cannot jump instantaneously." },
        { question: "Why does C transform to 1/sC PLUS a v(0)/s source, instead of just 1/sC?", answer: "1/sC alone only describes a capacitor starting at zero voltage. The extra v(0)/s source accounts for whatever charge (and therefore voltage) was already stored on the capacitor before t=0 — without it, the s-domain model would silently assume the capacitor started uncharged." },
      ],
    },

    // ---------------------------------------------------------------
    // MODULE III — Resonance & Analysis of Transformed Circuits
    // ---------------------------------------------------------------
    {
      id: "m3",
      title: "Resonance in Series Circuits & Transformed Circuit Analysis",
      number: 3,
      topics: [
        { title: "Resonance in Series circuits – Quality factor – Bandwidth – Simple Numerical Problems Steady state Analysis: Mesh analysis and node analysis of transformed circuits in -domain" },
        { title: "Numerical Problems" },
      ],
      overview: {
        summary:
          "This chapter covers resonance in a series RLC circuit — quality factor and bandwidth — followed by mesh and node analysis applied to circuits that have already been transformed into the s-domain.",
        whyItMatters:
          "Computing resonant frequency, Q-factor and bandwidth for a given series RLC circuit is a standard numerical question, and mesh/node analysis in the s-domain is simply your familiar DC circuit techniques applied with impedances instead of resistances — easy marks if Module II's transforms are solid.",
      },
      coreConcepts: [
        "Resonance in a series RLC circuit occurs when the inductive and capacitive reactances cancel (XL = XC), making the net impedance purely resistive — at this point current is maximum and the circuit's power factor is unity.",
        "Resonant frequency f0 = 1/(2π√(LC)) — the frequency at which resonance occurs.",
        "Quality factor Q measures how 'sharp' or selective the resonance peak is; a higher Q means a narrower bandwidth and a more selective circuit (important in filter/tuning applications).",
        "Bandwidth (BW) is the range of frequencies around f0 over which the power delivered stays at or above half of the maximum power — bounded by the lower and upper half-power frequencies f1 and f2.",
        "Q and BW are inversely related: BW = f0/Q — a sharper (higher-Q) circuit has a narrower bandwidth.",
        "Mesh analysis (based on KVL and loop currents) and Node analysis (based on KCL and node voltages) work exactly the same way on an s-domain transformed circuit as they do on a resistive DC circuit — the only difference is that impedances Z(s) replace plain resistances.",
      ],
      definitions: [
        { term: "Resonance (series RLC)", definition: "The condition in a series RLC circuit where the inductive reactance equals the capacitive reactance (XL = XC), making the circuit purely resistive with maximum current and unity power factor." },
        { term: "Quality Factor (Q)", definition: "A dimensionless measure of how selective a resonant circuit is, defined as Q = ω0L/R = (1/R)√(L/C); a higher Q means a sharper resonance peak and narrower bandwidth." },
        { term: "Bandwidth (BW)", definition: "The range of frequencies, between the lower and upper half-power frequencies, over which a resonant circuit delivers at least half its maximum power; BW = f0/Q." },
        { term: "Half-Power Frequency", definition: "Either of the two frequencies (f1 below and f2 above resonance) at which the power delivered by the circuit falls to exactly half its maximum (resonant) value." },
      ],
      diagrams: [
        { title: "Series RLC resonance curve (drag R, L, C)", svgKey: "interactive-resonance", interactive: true, caption: "Current peaks sharply at f0; the bandwidth is the width between the two half-power points where current = Imax/√2. Drag R down and watch Q rise and the peak sharpen in real time." },
      ],
      formulas: [
        { name: "Resonant frequency", expression: "f₀ = 1 / (2π√(LC))" },
        { name: "Quality factor", expression: "Q = ω₀L/R = (1/R)√(L/C) = 1/(ω₀RC)" },
        { name: "Bandwidth", expression: "BW = f₀ / Q = R / (2πL)" },
        { name: "Half-power frequencies (high-Q approx.)", expression: "f₁ = f₀ − BW/2   ,   f₂ = f₀ + BW/2" },
      ],
      examFocus: [
        { question: "Calculate the resonant frequency, quality factor and bandwidth for a given series RLC circuit.", weightage: "high", note: "Plug straight into the formulas — these numbers come almost every semester." },
        { question: "Derive the expression for quality factor and bandwidth of a series resonant circuit.", weightage: "medium" },
        { question: "Solve a given s-domain transformed circuit using mesh analysis or node analysis.", weightage: "high", note: "Treat it exactly like a resistive DC circuit, but with Z(s) in place of R." },
        { question: "Explain the practical significance of quality factor in tuning/filter circuits.", weightage: "medium" },
      ],
      revisionNotes: [
        "Resonance: XL = XC, impedance purely resistive, current max, p.f. = 1.",
        "f₀ = 1/(2π√(LC))",
        "Q = ω₀L/R = (1/R)√(L/C) — higher Q = sharper, more selective.",
        "BW = f₀/Q — higher Q means narrower bandwidth.",
        "Mesh/node analysis in s-domain = same KVL/KCL technique, just with Z(s) instead of R.",
      ],
      intuition:
        "Think of a swing being pushed: push at exactly its natural rhythm (resonance) and a tiny push builds huge amplitude. Q is just how little friction (resistance) there is in the swing's pivot — less friction means a much bigger response at exactly the right frequency, and almost nothing anywhere else.",
      workedExamples: [
        {
          title: "Find f₀, Q and bandwidth for a series RLC circuit",
          problem: "A series RLC circuit has R=10Ω, L=0.1H, C=10µF. Find the resonant frequency, quality factor, and bandwidth.",
          steps: [
            { label: "Step 1: Resonant frequency", content: "f₀ = 1/(2π√(LC)) = 1/(2π√(0.1 × 10×10⁻⁶)) = 1/(2π√(10⁻⁶)) = 1/(2π × 10⁻³) ≈ 159.2 Hz." },
            { label: "Step 2: Quality factor", content: "Q = (1/R)√(L/C) = (1/10)√(0.1/10×10⁻⁶) = (1/10)√(10000) = (1/10)(100) = 10." },
            { label: "Step 3: Bandwidth", content: "BW = f₀/Q = 159.2/10 ≈ 15.92 Hz." },
          ],
          answer: "f₀ ≈ 159.2 Hz, Q = 10, BW ≈ 15.92 Hz",
        },
      ],
      comparisons: [
        {
          title: "High-Q vs Low-Q Resonant Circuit",
          scenario: "Same f₀, but R is different — what actually changes in behaviour?",
          a: { label: "High Q (low R)", body: "Sharp, tall, narrow peak. Very selective — picks out a tight band of frequencies near f₀. Used in radio tuning where you want one station, not its neighbours." },
          b: { label: "Low Q (high R)", body: "Broad, shallow peak. Passes a wide range of frequencies around f₀ with little discrimination." },
          takeaway: "Q is entirely a resistance story for a fixed L and C — less resistance, sharper and more selective resonance.",
        },
      ],
      selfCheck: [
        { question: "At resonance, what is the circuit's power factor, and why?", answer: "Power factor is 1 (unity). At resonance XL=XC, so the net reactance is zero and the impedance is purely resistive — voltage and current are perfectly in phase." },
        { question: "If you double R while keeping L and C fixed, what happens to Q and bandwidth?", answer: "Q is inversely proportional to R, so Q halves. Bandwidth = f₀/Q, and since f₀ is unchanged but Q halved, bandwidth doubles — the resonance peak becomes shorter and wider." },
      ],
    },

    // ---------------------------------------------------------------
    // MODULE IV — Steady State Analysis of Three Phase Network
    // ---------------------------------------------------------------
    {
      id: "m4",
      title: "Steady State Analysis of Three Phase Network",
      number: 4,
      topics: [
        { title: "Complex Power in sinusoidal steady state, Steady state analysis of - three-phase three- wire and four-wire unbalanced Y circuits, Unbalanced Delta circuit, Neutral shift" },
        { title: "Complex Power" },
      ],
      overview: {
        summary:
          "This chapter covers complex power and the steady-state analysis of three-phase circuits — three-wire and four-wire unbalanced star (Y) systems, unbalanced delta systems, and the phenomenon of neutral shift.",
        whyItMatters:
          "Unbalanced three-phase numerical problems (finding phase/line currents, or the neutral-shift voltage) are dense, high-mark questions — practicing the 3-wire vs 4-wire distinction carefully is what separates a full-marks answer from a half-marks one.",
      },
      coreConcepts: [
        "Complex power S = V·I* (V and I as phasors) = P + jQ, where P is real/active power (W) and Q is reactive power (VAR); |S| is apparent power (VA) and power factor = P/|S| = cos φ.",
        "A three-phase system has three sinusoidal sources/loads 120° apart, connected in either star (Y) or delta (Δ) configuration.",
        "Balanced system: all three phase loads/sources are identical — can be analysed using a single-phase equivalent. Unbalanced system: loads differ across phases — requires full three-phase analysis, no shortcuts.",
        "Four-wire Y system (with neutral): the neutral wire fixes each phase's voltage reference, so each phase current is simply (phase voltage)/(phase impedance), computed completely independently of the other phases; any imbalance current flows through the neutral wire.",
        "Three-wire Y system (no neutral): without a neutral wire to fix the reference, an unbalanced load causes the load's star point to shift away from the source's neutral potential — this is 'neutral shift', and must be calculated (typically via Millman's theorem) before phase currents can be found.",
        "Unbalanced Delta circuit: each phase (branch) of the delta sees the full line voltage directly across it regardless of the other branches, so each phase current = (line voltage)/(branch impedance) is computed independently; line currents are then found via KCL at each corner.",
      ],
      definitions: [
        { term: "Complex Power", definition: "S = V·I* = P + jQ, a complex quantity whose real part P is the active power delivered and imaginary part Q is the reactive power exchanged in an AC circuit." },
        { term: "Balanced Three-Phase System", definition: "A three-phase system in which all three phases carry identical loads (same magnitude and phase angle of impedance), allowing single-phase-equivalent analysis." },
        { term: "Unbalanced Three-Phase System", definition: "A three-phase system in which the loads on the three phases are not identical, requiring each phase to be analysed individually rather than by symmetry." },
        { term: "Neutral Shift", definition: "In an unbalanced star-connected load with no neutral wire (3-wire system), the displacement of the load's star point voltage away from the source's neutral potential, caused by the unequal phase impedances." },
      ],
      diagrams: [
        { title: "Star (Y) vs Delta (Δ) connection", svgKey: "three-phase-y-delta", caption: "Star has a common neutral point (with or without a neutral wire); delta has no neutral at all — each branch sees the full line voltage directly." },
        { title: "Neutral shift in an unbalanced 3-wire star load", svgKey: "neutral-shift-phasor", caption: "Without a neutral wire, the load's star point N' is pulled away from the source neutral N when the load is unbalanced." },
      ],
      formulas: [
        { name: "Complex power", expression: "S = V·I* = P + jQ   ,   p.f. = cos φ = P / |S|" },
        { name: "4-wire unbalanced Y — phase current", expression: "I_phase = V_phase / Z_phase   (each phase independent)" },
        { name: "3-wire unbalanced Y — neutral shift (Millman's theorem)", expression: "V_N'N = (V_aN/Z_a + V_bN/Z_b + V_cN/Z_c) / (1/Z_a + 1/Z_b + 1/Z_c)" },
        { name: "Unbalanced Delta — phase current", expression: "I_phase = V_line / Z_branch   (each branch independent)" },
      ],
      examFocus: [
        { question: "Analyze a given unbalanced 4-wire star load to find each phase current and the neutral current.", weightage: "high" },
        { question: "Analyze a given unbalanced 3-wire star load — compute the neutral shift voltage, then find the phase currents.", weightage: "high", note: "Always compute the neutral shift first using Millman's theorem before anything else." },
        { question: "Analyze a given unbalanced delta-connected load to find phase and line currents.", weightage: "high" },
        { question: "Compute the complex power (and power factor) drawn by a given three-phase load.", weightage: "medium" },
      ],
      revisionNotes: [
        "S = VI* = P + jQ. p.f. = P/|S|.",
        "Balanced → single-phase shortcut works. Unbalanced → analyse all 3 phases fully.",
        "4-wire Y: each phase independent (neutral fixes reference). Neutral carries imbalance.",
        "3-wire Y: no neutral wire → neutral shift exists → find V_N'N (Millman's) FIRST.",
        "Unbalanced Delta: each branch sees full line voltage directly, independent of others.",
      ],
      intuition:
        "A neutral wire is like a referee fixing the rules for each phase independently — with it, each phase plays its own game regardless of what the others do. Pull the referee out (3-wire) and the three unbalanced phases start fighting over where 'zero' even is — that fight is exactly what neutral shift measures.",
      comparisons: [
        {
          title: "4-Wire vs 3-Wire Unbalanced Star Load",
          scenario: "Same unbalanced star load, but the presence of a neutral wire completely changes how you must solve it.",
          a: { label: "4-Wire (neutral present)", body: "Each phase voltage is fixed by the neutral. Solve each phase current independently: I = V_phase/Z_phase. Simple, no extra step." },
          b: { label: "3-Wire (no neutral)", body: "The load's star point floats away from the source neutral. Must find the neutral shift voltage (Millman's theorem) FIRST, before phase currents mean anything." },
          takeaway: "The presence of a neutral wire is the single fact that decides whether you need Millman's theorem at all.",
        },
      ],
      selfCheck: [
        { question: "In a balanced three-phase system, why can you get away with analysing just one phase?", answer: "By symmetry, all three phases carry identical magnitude currents/voltages, 120° apart — so one phase's behaviour fully describes the other two; there's nothing new to calculate." },
        { question: "What physically happens if you remove the neutral wire from an UNBALANCED 4-wire star load?", answer: "Without the neutral fixing the reference point, the load's star point is no longer pinned to the source neutral's potential — it shifts to a new voltage (neutral shift), and you can no longer treat each phase as independent; Millman's theorem is needed to find that shifted point first." },
      ],
    },

    // ---------------------------------------------------------------
    // MODULE V — Two Port Networks
    // ---------------------------------------------------------------
    {
      id: "m5",
      title: "Two Port Networks",
      number: 5,
      topics: [
        { title: "Two-port network parameters - Z, Y, h and T parameter, Conditions for symmetry & reciprocity" },
      ],
      overview: {
        summary:
          "This chapter introduces two-port networks — circuits with two pairs of terminals — and the four standard parameter sets (Z, Y, h, T/ABCD) used to characterize them, along with the conditions for reciprocity and symmetry.",
        whyItMatters:
          "Computing one (or converting between) parameter sets for a given two-port network is a guaranteed numerical question, and the reciprocity/symmetry conditions are a frequent short-answer pairing with it.",
      },
      coreConcepts: [
        "A two-port network has two terminal pairs (ports) — an input port (V1, I1) and an output port (V2, I2) — and is characterized by two independent linear equations relating these four variables.",
        "Z-parameters (impedance): V1 = Z11·I1 + Z12·I2, V2 = Z21·I1 + Z22·I2 — found by open-circuiting one port at a time and measuring the resulting voltages/currents.",
        "Y-parameters (admittance): I1 = Y11·V1 + Y12·V2, I2 = Y21·V1 + Y22·V2 — found by short-circuiting one port at a time.",
        "h-parameters (hybrid): V1 = h11·I1 + h12·V2, I2 = h21·I1 + h22·V2 — a mix of open- and short-circuit conditions; widely used to model transistors.",
        "T-parameters (ABCD/transmission parameters): V1 = A·V2 − B·I2, I1 = C·V2 − D·I2 — particularly convenient for networks connected in cascade, since the overall ABCD matrix is just the product of the individual matrices.",
        "Reciprocity condition: a network built only from passive linear elements (no dependent sources) is reciprocal, meaning interchanging an ideal source and an ideal meter between the two ports gives the same reading. Reciprocity shows up as Z12 = Z21, Y12 = Y21, h12 = −h21, or AD − BC = 1.",
        "Symmetry condition: a network is symmetric if input and output ports can be swapped with no change in behaviour — shown as Z11 = Z22, Y11 = Y22, h11h22 − h12h21 = 1, or A = D.",
      ],
      definitions: [
        { term: "Two-Port Network", definition: "A network with exactly two pairs of accessible terminals (an input port and an output port), described by two independent linear equations relating the four port variables V1, I1, V2, I2." },
        { term: "Z-parameters", definition: "Impedance parameters relating port voltages to port currents (V1, V2 in terms of I1, I2), obtained experimentally by open-circuiting one port at a time." },
        { term: "Y-parameters", definition: "Admittance parameters relating port currents to port voltages (I1, I2 in terms of V1, V2), obtained experimentally by short-circuiting one port at a time." },
        { term: "h-parameters", definition: "Hybrid parameters relating V1 and I2 to I1 and V2, obtained using a mix of open- and short-circuit conditions; the standard parameter set for transistor small-signal models." },
        { term: "T (ABCD) parameters", definition: "Transmission parameters relating the input port variables to the output port variables (V1, I1 in terms of V2, I2), chosen so that cascaded two-port networks combine by simple matrix multiplication." },
        { term: "Reciprocal Network", definition: "A two-port network containing only passive linear elements, for which interchanging an ideal source and an ideal ammeter/voltmeter between the two ports produces an identical reading." },
      ],
      diagrams: [
        { title: "Two-port network as a black box", svgKey: "two-port-network-block", caption: "Whatever sits inside, its terminal behaviour is fully captured by any one of the Z, Y, h, or ABCD parameter sets." },
      ],
      formulas: [
        { name: "Z-parameters", expression: "V1 = Z11·I1 + Z12·I2   ,   V2 = Z21·I1 + Z22·I2" },
        { name: "Y-parameters", expression: "I1 = Y11·V1 + Y12·V2   ,   I2 = Y21·V1 + Y22·V2" },
        { name: "h-parameters", expression: "V1 = h11·I1 + h12·V2   ,   I2 = h21·I1 + h22·V2" },
        { name: "T (ABCD) parameters", expression: "V1 = A·V2 − B·I2   ,   I1 = C·V2 − D·I2" },
        { name: "Reciprocity conditions", expression: "Z12=Z21  |  Y12=Y21  |  h12=−h21  |  AD−BC=1" },
        { name: "Symmetry conditions", expression: "Z11=Z22  |  Y11=Y22  |  h11h22−h12h21=1  |  A=D" },
      ],
      examFocus: [
        { question: "Determine the Z-parameters (or Y/h/T-parameters) of a given two-port network.", weightage: "high", note: "State which ports you're opening/shorting before computing each parameter — examiners check the method, not just the final numbers." },
        { question: "Verify whether a given two-port network is reciprocal and/or symmetric.", weightage: "high" },
        { question: "Convert a given set of Z-parameters into the equivalent Y-parameters (or another set).", weightage: "medium" },
        { question: "Explain the physical/experimental significance of each two-port parameter set.", weightage: "medium" },
      ],
      revisionNotes: [
        "Z: open-circuit one port at a time. Y: short-circuit one port at a time.",
        "h: mixed open/short — used for transistor models.",
        "ABCD/T: best for cascaded networks — matrices just multiply.",
        "Reciprocity (passive, no dependent sources): Z12=Z21 | Y12=Y21 | h12=−h21 | AD−BC=1.",
        "Symmetry (ports interchangeable): Z11=Z22 | Y11=Y22 | A=D.",
      ],
      intuition:
        "Each parameter set is just a different question asked at the same two doors: Z asks 'what voltage shows up if I push a known current in?' (open the other door), Y asks 'what current shows up if I push a known voltage in?' (short the other door). Same box, different probing question, different convenient algebra.",
      workedExamples: [
        {
          title: "Find the Z-parameters of a simple T-network",
          problem: "A network has a 2Ω resistor from port-1 to a middle node, a 3Ω resistor from the middle node to port-2, and a 5Ω resistor from the middle node to the common ground (a T-network). Find Z11, Z12, Z21, Z22.",
          steps: [
            { label: "Step 1: Find Z11 and Z21 (port 2 open, I2=0)", content: "Drive I1 into port 1 with port 2 open (I2=0). All of I1 flows through 2Ω then through 5Ω to ground. V1 = I1(2+5) = 7I1 → Z11 = 7Ω. V2 = voltage at the middle node (since no current flows through the 3Ω) = I1×5 → Z21 = 5Ω." },
            { label: "Step 2: Find Z12 and Z22 (port 1 open, I1=0)", content: "Drive I2 into port 2 with port 1 open. By the same logic: V2 = I2(3+5) = 8I2 → Z22 = 8Ω. V1 = I2×5 → Z12 = 5Ω." },
          ],
          answer: "Z11=7Ω, Z12=5Ω, Z21=5Ω, Z22=8Ω — note Z12=Z21, confirming the network is reciprocal (as expected for a passive resistor network).",
        },
      ],
      selfCheck: [
        { question: "Why are ABCD (T) parameters specifically preferred for networks connected in cascade?", answer: "When two-port networks are cascaded (output of one feeds input of the next), the overall ABCD matrix of the combination is simply the matrix product of the individual ABCD matrices — no other parameter set combines this simply under cascading." },
        { question: "If Z12 ≠ Z21 for a given two-port network, what does that immediately tell you?", answer: "The network is NOT reciprocal — it must contain a dependent source (active element), since a purely passive linear network is always reciprocal (Z12=Z21)." },
      ],
    },
  ],
};

export default content;
