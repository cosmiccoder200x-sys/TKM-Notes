import { SubjectContent } from "../types";

const content: SubjectContent = {
  code: "24ERJ303",
  name: "Digital Electronics and Logic Design",
  semester: "s3",
  category: "electronics",
  credits: 5,
  ltpj: "2-0-2-2",
  modules: [
    // ---------------------------------------------------------------
    // MODULE I — Number Systems and Logic Gate Fundamentals
    // ---------------------------------------------------------------
    {
      id: "m1",
      title: "Number Systems and Logic Gate Fundamentals",
      number: 1,
      topics: [
        { title: "Number Systems and Codes: Binary, Octal and hexadecimal conversions- ASCII code, Excess -3 code, Gray code, BCD, Error detection codes-Parity code" },
        { title: "Signed numbers- representation, addition and subtraction, Fixed point and floating-point representation" },
        { title: "TTL and CMOS logic families-Internal diagram of TTL NAND gate and CMOS NOR gate" },
      ],
      overview: {
        summary:
          "This module covers number system conversions and codes (binary, octal, hex, ASCII, Excess-3, Gray, BCD, parity), signed number representation and arithmetic, fixed/floating point representation, and the basics of TTL and CMOS logic families.",
        whyItMatters:
          "Number system conversions and signed-number arithmetic (especially 2's complement) are 'free marks' questions that come up almost every semester — they're mechanical and fast once practiced, so they're worth nailing down completely before anything else.",
      },
      coreConcepts: [
        "Binary ↔ Octal ↔ Hexadecimal conversions go fastest via binary as the common intermediate: group binary digits in 3s for octal, in 4s for hex.",
        "ASCII code represents characters using 7 (or 8) bits; Excess-3 code represents a BCD digit by adding 3 to its binary value (makes 9's complement arithmetic easier); Gray code changes only one bit between successive values (eliminates glitches in mechanical/rotary encoders); BCD encodes each decimal digit separately in 4-bit binary.",
        "Parity code (error detection): an extra parity bit is added so the total number of 1s is even (even parity) or odd (odd parity) — a single-bit transmission error is then detected because the received parity no longer matches.",
        "Signed numbers: Sign-magnitude (MSB = sign, rest = magnitude) is intuitive but has two representations of zero and complicates arithmetic. 1's complement (flip all bits) also has two zeros. 2's complement (flip all bits, add 1) has a single zero and lets subtraction be done as addition — this is what real hardware uses.",
        "2's complement addition/subtraction: to subtract B from A, add A to the 2's complement of B and discard any final carry-out beyond the register width; a sign mismatch in the result that doesn't match the operand signs signals overflow.",
        "Fixed-point representation: a fixed number of bits is set aside for the fractional part — simple and fast but a limited, constant range and precision. Floating-point (IEEE-754 style): a sign bit, an exponent field, and a mantissa (significand) field — trades a bit of speed/complexity for a vastly larger dynamic range.",
        "TTL (Transistor-Transistor Logic): built from bipolar junction transistors, faster switching historically but higher power consumption. CMOS (Complementary MOS): built from paired PMOS/NMOS transistors, draws almost no static current (very low power), now the dominant logic family.",
      ],
      definitions: [
        { term: "Excess-3 Code", definition: "A BCD-derived code for each decimal digit, formed by adding 3 (0011) to its 4-bit binary value, chosen to simplify decimal subtraction via 9's complement." },
        { term: "Gray Code", definition: "A binary code in which two successive values differ in exactly one bit position, used to avoid glitches when reading mechanical or rotary position encoders." },
        { term: "Parity Bit", definition: "An extra bit appended to a binary code so that the total count of 1-bits is even (even parity) or odd (odd parity), enabling detection of single-bit transmission errors." },
        { term: "2's Complement", definition: "The signed representation of a binary number formed by inverting all bits of its magnitude and adding 1; it has a unique zero and allows subtraction to be performed via ordinary binary addition." },
        { term: "Floating-Point Representation", definition: "A number representation using a sign bit, an exponent field, and a mantissa field, allowing a much wider dynamic range than fixed-point at the cost of representation complexity." },
      ],
      diagrams: [
        { title: "Number system conversion paths", svgKey: "number-system-conversions", caption: "Binary is the common hub — converting octal↔hex directly is rarely done; go through binary instead." },
      ],
      formulas: [
        { name: "Excess-3 code", expression: "Excess-3(digit) = BCD(digit) + 0011" },
        { name: "2's complement of an n-bit number", expression: "2's complement = (bitwise NOT of the number) + 1" },
        { name: "Range of an n-bit 2's complement number", expression: "−2ⁿ⁻¹  to  +2ⁿ⁻¹ − 1" },
        { name: "Binary grouping for conversion", expression: "Octal: group bits in 3s   |   Hex: group bits in 4s" },
      ],
      examFocus: [
        { question: "Convert a given number between binary, octal, decimal and hexadecimal.", weightage: "high" },
        { question: "Represent a given decimal number in sign-magnitude, 1's complement and 2's complement form, and perform addition/subtraction using 2's complement.", weightage: "high", note: "Always check for overflow explicitly — examiners specifically test whether you check this." },
        { question: "Encode a given decimal number in BCD, Excess-3, and Gray code.", weightage: "medium" },
        { question: "Explain the working of a parity bit for error detection with an example.", weightage: "medium" },
        { question: "Differentiate TTL and CMOS logic families.", weightage: "medium" },
        { question: "Differentiate fixed-point and floating-point number representation.", weightage: "low" },
      ],
      revisionNotes: [
        "Binary is the universal hub for octal/hex conversion (group bits in 3s/4s).",
        "Excess-3 = BCD + 3. Gray code changes 1 bit at a time.",
        "2's complement: invert + 1. Subtraction = add the 2's complement, drop final carry.",
        "n-bit 2's complement range: −2ⁿ⁻¹ to +2ⁿ⁻¹−1.",
        "TTL: BJT-based, faster historically, more power. CMOS: MOS-based, very low static power.",
      ],
      intuition:
        "2's complement isn't a trick — it's what happens if you let subtraction 'wrap around' a fixed-size odometer. On a 4-digit car odometer, driving backward 1 mile from 0000 rolls to 9999, not −1. 2's complement just picks that same wrap-around point so hardware never needs a separate subtract circuit — it just adds.",
      workedExamples: [
        {
          title: "Subtract using 2's complement",
          problem: "Compute 9 − 12 using 6-bit 2's complement arithmetic.",
          steps: [
            { label: "Step 1: Represent 9 and 12 in 6-bit binary", content: "9 = 001001,  12 = 001100" },
            { label: "Step 2: Find the 2's complement of 12 (the number being subtracted)", content: "Invert 001100 → 110011, then add 1 → 110100. This represents −12." },
            { label: "Step 3: Add 9 + (−12)", content: "001001 + 110100 = 111101. No carry-out beyond 6 bits, so no overflow correction needed." },
            { label: "Step 4: Interpret the result", content: "MSB = 1 → negative. Take 2's complement of 111101 to find magnitude: invert → 000010, add 1 → 000011 = 3. So the result is −3." },
          ],
          answer: "9 − 12 = −3 ✓ (matches ordinary arithmetic)",
        },
      ],
      selfCheck: [
        { question: "Why does 2's complement have only ONE representation of zero, unlike sign-magnitude or 1's complement?", answer: "In 2's complement, +0 and −0 both compute to the exact same bit pattern (all zeros) — inverting all-zeros and adding 1 wraps back to all-zeros. Sign-magnitude and 1's complement both have a distinct '+0' and '−0' pattern." },
        { question: "If adding two 2's complement numbers produces a carry-out of the MSB, do you always have overflow?", answer: "No — a final carry-out is simply discarded and does NOT by itself mean overflow. Real overflow is detected separately: when two operands of the same sign produce a result of the opposite sign." },
      ],
    },

    // ---------------------------------------------------------------
    // MODULE II — Boolean Algebra and Combinational Circuit Design
    // ---------------------------------------------------------------
    {
      id: "m2",
      title: "Boolean Algebra and Combinational Circuit Design",
      number: 2,
      topics: [
        { title: "Boolean algebra - Sum of Products method, Product of Sum method – K map representation and simplification (up to four variables) - Pairs, Quads, Octets, Don’t care conditions" },
        { title: "Combinational circuits: Adders -Full adder and half adder, Subtractors- half subtractor and full subtractor, 4 bit parallel binary adder/subtractor, Carry Look ahead adders" },
      ],
      overview: {
        summary:
          "This module covers Boolean algebra simplification using Sum of Products (SOP) and Product of Sums (POS) forms, K-map minimization up to four variables (pairs, quads, octets, don't-care conditions), and the design of adders and subtractors.",
        whyItMatters:
          "K-map simplification is the single most-tested numerical skill in this subject — practically every semester has at least one full question dedicated to minimizing a 4-variable Boolean expression, so speed and accuracy here directly translates to marks.",
      },
      coreConcepts: [
        "SOP (Sum of Products): a Boolean expression written as an OR of AND terms (e.g. AB + A'C) — each AND term is a 'minterm' covering specific input combinations where the output is 1.",
        "POS (Product of Sums): a Boolean expression written as an AND of OR terms — built from 'maxterms', covering the combinations where the output is 0.",
        "K-map (Karnaugh map): a grid arrangement of all input combinations such that adjacent cells differ in exactly one variable, making groups of 1s easy to spot visually.",
        "Grouping in a K-map: a Pair groups 2 adjacent 1s (eliminates 1 variable), a Quad groups 4 adjacent 1s (eliminates 2 variables), an Octet groups 8 adjacent 1s (eliminates 3 variables) — always group the largest possible power-of-2 block to get the simplest term.",
        "Don't-care conditions (input combinations that can never occur, or whose output doesn't matter) are marked 'X' in the K-map and can be treated as either 0 or 1, whichever helps form a bigger group.",
        "Half Adder: adds two single bits, producing Sum (XOR of inputs) and Carry (AND of inputs) — cannot handle an incoming carry.",
        "Full Adder: adds two bits plus an incoming carry, producing Sum and Carry-out — built from two half adders, or directly from its own SOP expressions.",
        "Half/Full Subtractor: same idea as adders but for binary subtraction, producing Difference and Borrow outputs.",
        "4-bit Parallel Binary Adder/Subtractor: cascades 4 full adders, with the carry-out of each stage feeding the carry-in of the next — but each stage must wait for the previous stage's carry, creating 'ripple carry' delay.",
        "Carry Look-ahead Adder: computes all the carries in advance from the inputs directly (using 'carry generate' and 'carry propagate' signals), avoiding the ripple delay and making addition much faster for wide numbers.",
      ],
      definitions: [
        { term: "K-map (Karnaugh Map)", definition: "A grid-based graphical method for simplifying Boolean expressions, arranged so that adjacent cells differ by exactly one variable, allowing 1s to be grouped visually into minimal terms." },
        { term: "Don't-Care Condition", definition: "An input combination in a truth table whose output value is unspecified or irrelevant, marked 'X' in a K-map and freely chosen as 0 or 1 to simplify the resulting expression." },
        { term: "Half Adder", definition: "A combinational circuit that adds two single binary bits, producing a Sum (XOR) and a Carry (AND) output, with no provision for an incoming carry." },
        { term: "Full Adder", definition: "A combinational circuit that adds two binary bits plus an incoming carry, producing a Sum and a Carry-out output." },
        { term: "Carry Look-ahead Adder", definition: "A fast binary adder design that computes all carry signals directly from the inputs using carry-generate and carry-propagate logic, avoiding the propagation delay of a ripple-carry adder." },
      ],
      diagrams: [
        { title: "4-variable K-map with a grouped quad", svgKey: "kmap-grouping", caption: "Adjacent 1s are grouped in powers of 2 (pair/quad/octet) — bigger groups give simpler terms." },
        { title: "Full adder logic", svgKey: "full-adder-circuit", caption: "Sum = A⊕B⊕Cin; Carry-out = AB + Cin(A⊕B) — built from two half-adder stages." },
      ],
      formulas: [
        { name: "Half adder", expression: "Sum = A ⊕ B   ,   Carry = A·B" },
        { name: "Full adder", expression: "Sum = A ⊕ B ⊕ Cin   ,   Cout = AB + Cin(A⊕B)" },
        { name: "K-map group sizes (variables eliminated)", expression: "Pair (2 cells) → 1 var.   Quad (4 cells) → 2 vars.   Octet (8 cells) → 3 vars." },
        { name: "Carry look-ahead signals", expression: "Generate: Gᵢ = AᵢBᵢ   |   Propagate: Pᵢ = Aᵢ⊕Bᵢ   |   Cᵢ₊₁ = Gᵢ + PᵢCᵢ" },
      ],
      examFocus: [
        { question: "Simplify a given 4-variable Boolean expression using a K-map (with or without don't-care terms), and draw the resulting logic circuit.", weightage: "high", note: "Always look for the largest valid group first — start with octets, then quads, then pairs." },
        { question: "Design and draw a full adder / full subtractor circuit, deriving its truth table and Boolean expressions.", weightage: "high" },
        { question: "Design a 4-bit parallel binary adder/subtractor and explain the ripple-carry delay problem.", weightage: "medium" },
        { question: "Explain how a carry look-ahead adder eliminates ripple-carry delay.", weightage: "medium" },
        { question: "Convert a given Boolean expression between SOP and POS form.", weightage: "low" },
      ],
      revisionNotes: [
        "SOP = OR of AND terms (minterms). POS = AND of OR terms (maxterms).",
        "K-map: group the LARGEST power-of-2 block of adjacent 1s first.",
        "Don't-cares (X) can flex to 0 or 1 — use them to make bigger groups.",
        "Half adder: Sum=A⊕B, Carry=AB. Full adder: Sum=A⊕B⊕Cin, Cout=AB+Cin(A⊕B).",
        "Ripple-carry adder is simple but slow (waits on each carry). Carry look-ahead computes carries upfront — much faster.",
      ],
      intuition:
        "A K-map cell isn't really in a grid — it's secretly sitting next to every other cell that's exactly one bit away, even when that looks far away on paper (the map wraps top-to-bottom and side-to-side). Grouping 1s is just spotting which nearby cells differ by only one variable, so that variable cancels out of the simplified term.",
      workedExamples: [
        {
          title: "Simplify a Boolean expression with a K-map",
          problem: "Simplify F(A,B,C) = AB'C + AB'C' + ABC + ABC' using a K-map.",
          steps: [
            { label: "Step 1: Plot the minterms", content: "AB'C(101), AB'C'(100), ABC(111), ABC'(110) — these are 4 minterms, all with A=1, forming a 2×2 block in the K-map (A=1 row, all 4 columns of B,C)." },
            { label: "Step 2: Group them", content: "All 4 cells have A=1 in common; B and C vary across all their combinations and cancel out completely (a valid quad — eliminates 2 variables)." },
            { label: "Step 3: Read off the simplified term", content: "Only A is common to all 4 minterms (B and C both take every value, so they disappear)." },
          ],
          answer: "F = A",
        },
      ],
      comparisons: [
        {
          title: "Ripple-Carry Adder vs Carry Look-Ahead Adder",
          scenario: "Both add two n-bit numbers — the difference is entirely about how fast the carry signal becomes available.",
          a: { label: "Ripple-Carry", body: "Each stage must literally wait for the previous stage's carry-out before it can finish. Simple to build, but delay grows with the number of bits." },
          b: { label: "Carry Look-Ahead", body: "Computes generate/propagate signals from the inputs directly and derives every carry up front, in parallel. More gates, but far less delay for wide adders." },
          takeaway: "For a small adder (4-bit), the difference barely matters. For a 32/64-bit ALU, ripple-carry delay becomes the bottleneck — that's exactly why real CPUs use look-ahead (or faster) adders.",
        },
      ],
      selfCheck: [
        { question: "In a K-map, why must groups always be sized in powers of 2 (1, 2, 4, 8...)?", answer: "Each doubling of group size corresponds to eliminating exactly one more variable (since that variable now takes both 0 and 1 within the group and cancels out). Non-power-of-2 groupings wouldn't correspond to a valid Boolean simplification." },
        { question: "Why are don't-care conditions actually useful, rather than just 'don't matter'?", answer: "Because you get to CHOOSE whether a don't-care cell is 0 or 1, you can pick whichever choice lets you form a larger group with the actual 1s nearby — giving a simpler final expression than if those inputs truly couldn't occur." },
      ],
    },

    // ---------------------------------------------------------------
    // MODULE III — Digital Logic Components and Verilog Programming
    // ---------------------------------------------------------------
    {
      id: "m3",
      title: "Digital Logic Components and Verilog Programming",
      number: 3,
      topics: [
        { title: "Comparators, Parity generators and checkers, Encoders, Decoders, , BCD to seven segment decoder, Code converters, Multiplexers, Demultiplexers, Architecture of Arithmetic Logic Units (Block schematic only)" },
        { title: "Verilog basic language elements: identifiers, data objects, scalar data types, operators" },
        { title: "Entity and Architecture, Gate Level Modelling: Basic gates, testbench, XOR using NAND and NOR" },
        { title: "Modeling combinational logic circuits in Verilog - Data Flow Modelling, Behavioral level Modeling: half adder, full adder, mux, demux, decoder, encoder" },
      ],
      overview: {
        summary:
          "This module covers MSI-level combinational building blocks — comparators, parity generators/checkers, encoders, decoders, multiplexers, demultiplexers, and ALU architecture — alongside an introduction to Verilog HDL and modeling combinational circuits with it.",
        whyItMatters:
          "Differentiating multiplexers/demultiplexers/encoders/decoders by function and writing a basic Verilog module for one of them (half adder, mux, decoder) are the two question types that show up reliably; the Verilog questions are new to this scheme so practice the exact syntax carefully.",
      },
      coreConcepts: [
        "Comparator: compares two binary numbers and outputs whether A>B, A=B, or A<B.",
        "Parity generator: computes and appends a parity bit to outgoing data; parity checker: recomputes parity on received data and flags a mismatch (detects single-bit errors).",
        "Encoder: converts 2ⁿ input lines (only one active at a time) into an n-bit binary code identifying which input was active.",
        "Decoder: the reverse — converts an n-bit binary code into one active output line out of 2ⁿ; the BCD-to-seven-segment decoder is a common specific decoder that drives a 7-segment display from a 4-bit BCD input.",
        "Multiplexer (MUX): selects one of several input lines to route to a single output, based on a binary 'select' input — essentially a digital switch.",
        "Demultiplexer (DEMUX): the reverse of a MUX — routes a single input line to one of several outputs, chosen by the select lines.",
        "Arithmetic Logic Unit (ALU): a combinational block (block-schematic level here) that performs arithmetic and logic operations selected by a function-select input, forming the computational core of a processor.",
        "Verilog basic elements: identifiers (names), data objects (nets like wire, and variables like reg), scalar data types, and operators (arithmetic, logical, bitwise, relational).",
        "Entity and Architecture (module structure in Verilog): a module declares its input/output ports (interface), and its internal behaviour/structure is described inside.",
        "Gate-level modeling: directly instantiating basic gates (and, or, not, xor, nand, nor) and wiring them together — e.g. building an XOR gate purely from NAND gates, then verifying it with a testbench.",
        "Data flow modeling: describing combinational logic using continuous assignment (assign) statements with Boolean operators, rather than individual gates.",
        "Behavioral modeling: describing circuit behaviour using procedural blocks (always/initial) and high-level constructs like if-else and case — used for half adder, full adder, mux, demux, decoder, encoder designs at a higher level of abstraction.",
      ],
      definitions: [
        { term: "Encoder", definition: "A combinational circuit that converts 2ⁿ input lines, of which only one is active at a time, into a corresponding n-bit binary output code." },
        { term: "Decoder", definition: "A combinational circuit that converts an n-bit binary input code into exactly one active output line out of 2ⁿ possible outputs." },
        { term: "Multiplexer (MUX)", definition: "A combinational circuit that selects one of several input signals and routes it to a single output line, based on the value of select input lines." },
        { term: "Demultiplexer (DEMUX)", definition: "A combinational circuit that routes a single input signal to one of several output lines, chosen by select input lines." },
        { term: "Gate-Level Modeling (Verilog)", definition: "A Verilog modeling style in which a circuit is described by directly instantiating and wiring together primitive logic gates." },
        { term: "Behavioral Modeling (Verilog)", definition: "A Verilog modeling style that describes a circuit's functional behaviour using procedural blocks and high-level constructs, rather than describing its gate-level structure." },
      ],
      diagrams: [
        { title: "MUX vs DEMUX vs Encoder vs Decoder", svgKey: "encoder-decoder-mux-demux", caption: "MUX: many → one (select chooses). DEMUX: one → many. Encoder: 2ⁿ lines → n-bit code. Decoder: n-bit code → 2ⁿ lines." },
      ],
      formulas: [
        { name: "Encoder/Decoder sizing", expression: "n-bit code  ⇔  2ⁿ lines" },
        { name: "Verilog: gate-level XOR from NAND", expression: "nand g1(y1,a,b); nand g2(y2,a,y1); nand g3(y3,b,y1); nand g4(out,y2,y3);" },
        { name: "Verilog: dataflow half adder", expression: "assign sum = a ^ b;\nassign carry = a & b;" },
        { name: "Verilog: behavioral mux (2-to-1)", expression: "always @(*)\n  if (sel) out = in1;\n  else out = in0;" },
      ],
      examFocus: [
        { question: "Write Verilog code (gate-level, dataflow, or behavioral) for a given combinational circuit (half/full adder, mux, demux, decoder, encoder).", weightage: "high", note: "Practice all three styles for the same circuit (e.g. half adder) — examiners may ask for a specific style by name." },
        { question: "Differentiate multiplexer, demultiplexer, encoder, and decoder, with their input/output sizing relationships.", weightage: "high" },
        { question: "Design a BCD-to-seven-segment decoder and explain its working.", weightage: "medium" },
        { question: "Explain the block-level architecture of an ALU.", weightage: "medium" },
        { question: "Write a Verilog testbench for a given basic gate or combinational module.", weightage: "low" },
      ],
      revisionNotes: [
        "Encoder: 2ⁿ lines → n-bit code. Decoder: n-bit code → 2ⁿ lines.",
        "MUX: many inputs → 1 output (select picks which). DEMUX: 1 input → many outputs.",
        "Verilog 3 styles: gate-level (instantiate gates), dataflow (assign + operators), behavioral (always/if-case).",
        "assign is for continuous (dataflow) logic; always blocks are for behavioral/procedural logic.",
        "ALU = arithmetic + logic operations, selected by a function-select input.",
      ],
      intuition:
        "A MUX is a single light switch wired to many bulbs but only one wire to the wall — the select line decides which bulb gets the signal. A decoder is the reverse philosophy taken to its limit: it doesn't switch a signal through, it just lights up exactly one indicator lamp out of many based on a binary code. Same 'one out of many' shape, opposite direction of data flow.",
      comparisons: [
        {
          title: "Gate-Level vs Dataflow vs Behavioral Verilog",
          scenario: "Same half adder, three completely different ways of describing it in Verilog.",
          a: { label: "Gate-level", body: "and g1(carry, a, b); xor g2(sum, a, b); — you personally wire up primitive gates. Closest to the actual hardware." },
          b: { label: "Dataflow", body: "assign sum = a ^ b; assign carry = a & b; — you describe the Boolean equations directly, the simulator figures out the gates." },
          takeaway: "Behavioral (always @(*) with if/case) sits a level above both — you describe WHAT the circuit should do, not how. All three styles can simulate identically; exams often ask you to write the SAME circuit in a specific named style.",
        },
      ],
      selfCheck: [
        { question: "If you have 8 input lines feeding into an encoder, what size is the output code, and why?", answer: "3 bits, because 2³=8 — an encoder converts 2ⁿ input lines into an n-bit code identifying which single line was active." },
        { question: "What's the key syntactic difference between an 'assign' statement and an 'always' block in Verilog, and when would you choose each?", answer: "assign drives a continuous (combinational, dataflow-style) signal and updates instantly whenever its right-hand side changes. always is a procedural block (used for behavioral modeling) that can model both combinational logic (always @(*)) and sequential logic (always @(posedge clk)) — use assign for simple continuous logic, always when you need procedural constructs like if/case or clocked behaviour." },
      ],
    },

    // ---------------------------------------------------------------
    // MODULE IV — Flip-Flops, Registers, and Counters
    // ---------------------------------------------------------------
    {
      id: "m4",
      title: "Flip-Flops, Registers, and Counters: Sequential Logic Design",
      number: 4,
      topics: [
        { title: "Flip-Flops, SR, JK, D and T flip-flops, JK Master Slave Flip-flop, Preset and clear inputs, Conversion of flip-flops" },
        { title: "Registers -SISO, SIPO, PISO, PIPO" },
        { title: "Up/Down Counters: Asynchronous Counters – Modulus of a counter – Mod-N counters Ring counter, Johnson Counter Synchronous counters, Design of Synchronous counters" },
        { title: "Modeling of sequential logic circuits in Verilog: flipflops, counters" },
      ],
      overview: {
        summary:
          "This module covers the four basic flip-flop types (SR, JK, D, T) and their conversions, shift register configurations (SISO/SIPO/PISO/PIPO), and counter design — both asynchronous (ripple) and synchronous counters.",
        whyItMatters:
          "Flip-flop conversion (e.g. design a JK flip-flop using a D flip-flop) and synchronous counter design are the two heaviest numerical question types here — both follow a clear, repeatable design procedure that's worth memorizing as a checklist.",
      },
      coreConcepts: [
        "SR flip-flop: Set/Reset inputs; S=1,R=0 sets Q=1; S=0,R=1 resets Q=0; S=R=1 is an invalid/forbidden state (for the basic NAND/NOR version).",
        "JK flip-flop: like SR but J=K=1 is defined (it toggles the output) — this resolves SR's forbidden-state problem and makes JK the most 'universal' flip-flop for conversions.",
        "D flip-flop: output simply follows the D input at the clock edge (Q_next = D) — used mainly for clean data storage/transfer, eliminates the SR ambiguity entirely.",
        "T flip-flop: toggles its output every clock edge when T=1, holds when T=0 (Q_next = T⊕Q) — the natural building block for binary counters.",
        "JK Master-Slave flip-flop: two latches in series (master then slave), clocked on opposite phases, preventing 'race-around' (uncontrolled toggling) that a simple JK can suffer from when J=K=1 for too long.",
        "Preset and Clear inputs: asynchronous overrides that force Q to 1 or 0 immediately, independent of the clock — used for initializing a flip-flop to a known state.",
        "Flip-flop conversion: to implement flip-flop type X using available flip-flop type Y, build an excitation table (Y's required input for every X-input/present-state/next-state combination) and derive Y's input as a Boolean function via K-map.",
        "Shift registers: SISO (Serial-In Serial-Out), SIPO (Serial-In Parallel-Out), PISO (Parallel-In Serial-Out), PIPO (Parallel-In Parallel-Out) — named directly by how data enters and exits.",
        "Asynchronous (ripple) counters: each flip-flop is clocked by the output of the previous one, so the count 'ripples' through with a small propagation delay at each stage — simple but slower for wide counters.",
        "Mod-N counter: a counter that resets back to 0 after counting N states (rather than running through its full natural binary range) — built by detecting the Nth state and forcing a reset/clear.",
        "Ring counter: a shift register where the output is fed back to the input, circulating a single 1 around a ring of flip-flops. Johnson counter: similar, but feeds back the complement of the last flip-flop, doubling the number of distinct states for the same flip-flop count.",
        "Synchronous counters: all flip-flops share the same clock signal, and next-state logic for every stage is computed directly from the present state — eliminates ripple delay, designed using the standard sequential-circuit design procedure (state table → excitation table → K-map → logic).",
      ],
      definitions: [
        { term: "JK Flip-Flop", definition: "A flip-flop with inputs J and K, behaving as Set when J=1,K=0, Reset when J=0,K=1, no change when J=K=0, and Toggle when J=K=1, resolving the SR flip-flop's forbidden state." },
        { term: "Master-Slave Flip-Flop", definition: "A flip-flop built from two latches in series, clocked on opposite clock phases, which prevents uncontrolled toggling (race-around) that can occur in a simple JK flip-flop." },
        { term: "Excitation Table", definition: "A table listing the flip-flop input values required to achieve every possible present-state-to-next-state transition, used as the starting point for flip-flop conversion or sequential circuit design." },
        { term: "Ripple (Asynchronous) Counter", definition: "A counter in which each flip-flop's clock input is driven by the output of the preceding flip-flop, so state changes propagate ('ripple') through the chain rather than occurring simultaneously." },
        { term: "Synchronous Counter", definition: "A counter in which all flip-flops share a common clock signal, with next-state logic computed directly from the present state, eliminating ripple propagation delay." },
        { term: "Johnson Counter", definition: "A shift-register-based counter that feeds the complement of its last flip-flop's output back to the first flip-flop's input, producing 2n distinct states for n flip-flops." },
      ],
      diagrams: [
        { title: "4 flip-flop types and their characteristic equations", svgKey: "flipflop-types", caption: "D simply follows its input; T toggles; JK and SR are determined by combinations of their two inputs." },
        { title: "Ripple counter timing", svgKey: "ripple-counter-timing", caption: "Each flip-flop toggles only when the previous one falls — notice the small propagation delay stacking up stage by stage." },
      ],
      formulas: [
        { name: "D flip-flop", expression: "Q_next = D" },
        { name: "T flip-flop", expression: "Q_next = T ⊕ Q" },
        { name: "JK flip-flop", expression: "Q_next = J·Q' + K'·Q" },
        { name: "SR flip-flop", expression: "Q_next = S + R'·Q   (S·R = 0 required)" },
        { name: "Mod-N counter flip-flop count", expression: "n = ⌈log₂ N⌉   (minimum flip-flops needed for a mod-N counter)" },
        { name: "Johnson counter states (n flip-flops)", expression: "2n distinct states" },
      ],
      examFocus: [
        { question: "Convert one flip-flop type into another (e.g. design a JK flip-flop using a D flip-flop) using an excitation table and K-map.", weightage: "high", note: "Always build the excitation table first — this is the step examiners check most carefully." },
        { question: "Design a synchronous Mod-N counter (state table → excitation table → K-map → logic circuit).", weightage: "high" },
        { question: "Design and explain a ripple (asynchronous) counter, identifying its propagation delay limitation.", weightage: "medium" },
        { question: "Explain the working of a ring counter and a Johnson counter, including their state counts.", weightage: "medium" },
        { question: "Differentiate the four shift register configurations (SISO, SIPO, PISO, PIPO).", weightage: "medium" },
        { question: "Explain the race-around condition in a JK flip-flop and how a master-slave configuration solves it.", weightage: "low" },
      ],
      revisionNotes: [
        "D: Q_next=D. T: Q_next=T⊕Q. JK: Q_next=JQ'+K'Q. SR: Q_next=S+R'Q (S·R=0).",
        "Flip-flop conversion = build excitation table → K-map → derive new FF's input logic.",
        "SISO/SIPO/PISO/PIPO — named by how data goes IN, then how it comes OUT.",
        "Ripple counter: each stage clocked by previous stage's output — simple, but delay stacks up.",
        "Synchronous counter: common clock, next-state computed directly — no ripple delay.",
        "Ring counter: circulates a single 1. Johnson counter: feeds back complement → 2n states.",
        "Master-slave JK avoids race-around (uncontrolled toggling) in a plain JK flip-flop.",
      ],
      intuition:
        "Flip-flop conversion feels harder than it is because the excitation table is just asking one question, over and over: 'given where I am and where I need to go, what input would the AVAILABLE flip-flop need?' Build that table mechanically and the K-map step is identical to every other K-map you've already done.",
      workedExamples: [
        {
          title: "Convert a D flip-flop into a T flip-flop",
          problem: "Design a T flip-flop using only a D flip-flop (and combinational logic).",
          steps: [
            { label: "Step 1: Write T flip-flop's characteristic equation", content: "T flip-flop: Q_next = T ⊕ Q (toggles when T=1, holds when T=0)." },
            { label: "Step 2: Recall what the D flip-flop actually does", content: "D flip-flop: Q_next = D — whatever you feed into D becomes the next state directly." },
            { label: "Step 3: Match them up", content: "Since D directly sets Q_next, simply set D equal to the T flip-flop's desired next state: D = T ⊕ Q." },
          ],
          answer: "D = T ⊕ Q  — feed a single XOR gate (inputs T and the flip-flop's own current output Q) into the D input, and the D flip-flop now behaves exactly like a T flip-flop.",
        },
      ],
      comparisons: [
        {
          title: "Ring Counter vs Johnson Counter",
          scenario: "Both are shift registers with feedback — the only difference is WHAT gets fed back.",
          a: { label: "Ring Counter", body: "Feeds back the last flip-flop's output directly. A single 1 just circulates around n flip-flops, giving n distinct states." },
          b: { label: "Johnson Counter", body: "Feeds back the COMPLEMENT of the last flip-flop's output. This doubles the achievable states to 2n for the same n flip-flops." },
          takeaway: "One inverter in the feedback path is the entire difference between a ring counter and a Johnson counter — and it doubles your state count for free.",
        },
      ],
      selfCheck: [
        { question: "Why does a synchronous counter avoid the propagation delay problem that a ripple counter has?", answer: "In a synchronous counter, every flip-flop is driven by the SAME clock signal directly, and the next-state logic for every flip-flop is computed in parallel from the current state — no flip-flop has to wait for another one's output to change first." },
        { question: "What problem does a master-slave configuration solve in a JK flip-flop, and how?", answer: "It solves the race-around condition (uncontrolled toggling when J=K=1 for longer than one propagation delay). The master latch is clocked on one phase and the slave on the opposite phase, so the output only changes once per clock cycle, not repeatedly while the clock is high." },
      ],
    },

    // ---------------------------------------------------------------
    // MODULE V — State Machines, D/A & A/D Converters, PLDs
    // ---------------------------------------------------------------
    {
      id: "m5",
      title: "State Machines, D/A and A/D Converters, Programmable Logic Devices",
      number: 5,
      topics: [
        { title: "Devices State Machines: State transition diagram, Moore and Mealy Machines Digital to Analog converter –Specifications, Weighted resistor type, R-2R Ladder type" },
        { title: "Analog to Digital Converter – Specifications, Flash type, Successive approximation type" },
        { title: "Programmable Logic Devices - PAL, PLA, FPGA, combinational logic design with PAL, PLA" },
      ],
      overview: {
        summary:
          "This module covers finite state machine modeling (Moore vs Mealy machines), the two main D/A converter architectures (weighted resistor, R-2R ladder), the two main A/D converter architectures (flash, successive approximation), and programmable logic devices (PAL, PLA, FPGA).",
        whyItMatters:
          "Differentiating Moore and Mealy machines (and drawing their state diagrams) and comparing the two ADC/DAC types are the most frequently asked theory questions in this module — both are conceptual rather than numerical, so precise, example-backed definitions score well.",
      },
      coreConcepts: [
        "A state machine models sequential behaviour as a finite set of states with transitions between them triggered by inputs — visualized with a state transition diagram (circles for states, labelled arrows for transitions).",
        "Moore Machine: the output depends only on the current state (not on the current input directly) — output is associated with the state itself, so it changes only on a state transition (clock edge).",
        "Mealy Machine: the output depends on BOTH the current state and the current input — output can change immediately when the input changes, even between clock edges, which generally needs fewer states than an equivalent Moore machine but is more sensitive to input glitches.",
        "DAC (Digital to Analog Converter), Weighted Resistor type: each input bit switches a resistor whose value is weighted by its bit's significance (binary-weighted), summed by an op-amp — simple concept but needs a very wide range of precise resistor values for many bits.",
        "DAC, R-2R Ladder type: uses only two resistor values (R and 2R) repeated in a ladder network, avoiding the wide resistor-value-range problem of the weighted-resistor design — the standard practical DAC architecture.",
        "ADC (Analog to Digital Converter), Flash type: compares the input simultaneously against 2ⁿ−1 reference voltages using that many comparators in parallel — extremely fast (single clock cycle) but needs exponentially more hardware as resolution (bits) increases.",
        "ADC, Successive Approximation type: uses a single comparator plus an internal DAC and a binary search strategy — guesses the MSB first, checks against the input, then refines bit by bit — needs n clock cycles for n bits, far less hardware than flash but slower.",
        "Programmable Logic Devices: PAL (Programmable AND array, fixed OR array) and PLA (both AND and OR arrays programmable) implement custom SOP logic without designing discrete gates; FPGA (Field-Programmable Gate Array) is far more flexible, built from a large array of configurable logic blocks and programmable interconnects, capable of implementing entire digital systems, not just combinational SOP logic.",
      ],
      definitions: [
        { term: "Moore Machine", definition: "A finite state machine whose output depends only on its current state, not directly on the current input, so the output changes only at a state transition." },
        { term: "Mealy Machine", definition: "A finite state machine whose output depends on both the current state and the current input, allowing the output to change as soon as the input changes." },
        { term: "Weighted Resistor DAC", definition: "A digital-to-analog converter that sums binary-weighted resistor currents (one resistor value per bit, scaled by significance) using an operational amplifier, to produce an analog output." },
        { term: "R-2R Ladder DAC", definition: "A digital-to-analog converter built from a repeating ladder network of only two resistor values (R and 2R), avoiding the need for a wide range of precise resistor values." },
        { term: "Flash ADC", definition: "An analog-to-digital converter that compares the input voltage simultaneously against 2ⁿ−1 reference levels using parallel comparators, producing a digital output in a single clock cycle." },
        { term: "Successive Approximation ADC", definition: "An analog-to-digital converter that determines the digital output bit-by-bit (MSB first) using a single comparator, an internal DAC, and a binary-search strategy, requiring n clock cycles for an n-bit conversion." },
        { term: "PAL / PLA", definition: "Programmable Logic Devices implementing custom Boolean SOP logic: a PAL has a programmable AND array with a fixed OR array, while a PLA has both the AND and OR arrays programmable." },
      ],
      diagrams: [
        { title: "Moore vs Mealy state diagrams", svgKey: "moore-mealy-fsm", caption: "Moore writes the output inside the state circle (state-only); Mealy writes it on the transition arrow alongside the input (state + input)." },
        { title: "R-2R ladder DAC", svgKey: "r2r-ladder-dac", caption: "Only two resistor values (R, 2R) repeat throughout the ladder — the practical fix for the weighted-resistor DAC's wide resistor-range problem." },
      ],
      formulas: [
        { name: "Flash ADC comparator count (n-bit)", expression: "2ⁿ − 1 comparators" },
        { name: "Successive approximation ADC conversion time", expression: "n clock cycles for n bits" },
      ],
      examFocus: [
        { question: "Differentiate Moore and Mealy machines, and draw the state diagram for a given sequence detector.", weightage: "high", note: "Mealy: output labelled on the arrow (state/input). Moore: output labelled inside the state circle." },
        { question: "Explain the R-2R ladder DAC and why it's preferred over the weighted-resistor DAC.", weightage: "high" },
        { question: "Differentiate flash ADC and successive approximation ADC in terms of speed and hardware complexity.", weightage: "high" },
        { question: "Differentiate PAL, PLA, and FPGA.", weightage: "medium" },
        { question: "Implement a given Boolean function using a PAL or PLA.", weightage: "medium" },
      ],
      revisionNotes: [
        "Moore: output = f(state) only. Mealy: output = f(state, input) — can react faster.",
        "Weighted resistor DAC: needs many precise resistor values. R-2R ladder: only 2 values, repeated.",
        "Flash ADC: 2ⁿ−1 comparators, 1 clock cycle — fast but hardware-heavy.",
        "SAR ADC: 1 comparator + internal DAC, n clock cycles — slower but compact.",
        "PAL: programmable AND, fixed OR. PLA: both programmable. FPGA: full configurable logic array, far more flexible than either.",
      ],
      intuition:
        "A successive-approximation ADC is playing 'guess the number' optimally — guess half the range, get told higher/lower, halve again. A flash ADC refuses to play that game at all: it just asks every possible question simultaneously with a wall of comparators and reads off the answer in one shot. Same goal, completely opposite trade of hardware for speed.",
      comparisons: [
        {
          title: "Moore Machine vs Mealy Machine",
          scenario: "Designing a sequence detector — both can do the job, but they disagree about where the output 'lives'.",
          a: { label: "Moore", body: "Output is tied to the STATE itself. Changes only at the next clock edge. Drawn with the output written inside the state circle." },
          b: { label: "Mealy", body: "Output depends on state AND current input. Can change the instant the input changes, even mid-cycle. Drawn with the output on the transition arrow." },
          takeaway: "Mealy machines often need fewer states for the same job, but are more sensitive to input glitches since output can change between clock edges.",
        },
      ],
      selfCheck: [
        { question: "Why does the R-2R ladder DAC need only two resistor values, no matter how many bits it supports?", answer: "The ladder structure repeats the same R/2R pattern for every additional bit — each stage looks identical to the next, so adding bits just means adding more identical R-2R rungs, never a new, more precisely-valued resistor." },
        { question: "If you need a 10-bit ADC, why might you choose successive approximation over flash, even though flash is faster?", answer: "A flash ADC needs 2¹⁰−1 = 1023 comparators for 10 bits — that's a huge amount of hardware. A successive-approximation ADC needs only 1 comparator and an internal DAC regardless of resolution, trading speed (10 clock cycles instead of 1) for dramatically less hardware." },
      ],
    },
  ],
};

export default content;
