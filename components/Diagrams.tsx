// Named inline-SVG diagrams. Add a new key here whenever a module references
// a svgKey that doesn't exist yet — keeps every diagram crisp, labeled, and
// dependency-free (no image uploads needed for v1).

function GrowthCurves() {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-auto">
      <line x1="30" y1="170" x2="300" y2="170" stroke="#232A35" strokeWidth="1" />
      <line x1="30" y1="170" x2="30" y2="10" stroke="#232A35" strokeWidth="1" />
      <text x="295" y="184" fill="#8A93A1" fontSize="9" textAnchor="end">n</text>
      <text x="14" y="16" fill="#8A93A1" fontSize="9">time</text>

      {/* O(1) */}
      <path d="M30,160 L300,160" stroke="#5A6372" strokeWidth="2" fill="none" />
      <text x="255" y="155" fill="#5A6372" fontSize="9">O(1)</text>

      {/* O(log n) */}
      <path d="M30,160 Q120,120 300,95" stroke="#4FD1C5" strokeWidth="2" fill="none" />
      <text x="255" y="90" fill="#4FD1C5" fontSize="9">O(log n)</text>

      {/* O(n) */}
      <path d="M30,160 L300,40" stroke="#F5B544" strokeWidth="2" fill="none" />
      <text x="255" y="35" fill="#F5B544" fontSize="9">O(n)</text>

      {/* O(n log n) */}
      <path d="M30,160 Q150,90 260,15" stroke="#FB7185" strokeWidth="2" fill="none" />
      <text x="190" y="14" fill="#FB7185" fontSize="9">O(n log n)</text>

      {/* O(n^2) */}
      <path d="M30,160 Q140,150 200,15" stroke="#9b6bff" strokeWidth="2" fill="none" />
      <text x="150" y="14" fill="#9b6bff" fontSize="9">O(n²)</text>
    </svg>
  );
}

function LoopComplexityBlocks() {
  return (
    <svg viewBox="0 0 320 170" className="w-full h-auto">
      <rect x="20" y="20" width="120" height="60" rx="6" fill="none" stroke="#4FD1C5" strokeWidth="1.5" />
      <rect x="32" y="32" width="96" height="36" rx="4" fill="none" stroke="#4FD1C5" strokeWidth="1.5" strokeDasharray="3 3" />
      <text x="80" y="55" fill="#EDEFF2" fontSize="9" textAnchor="middle">for i in n</text>
      <text x="80" y="66" fill="#EDEFF2" fontSize="9" textAnchor="middle">for j in n</text>
      <text x="80" y="100" fill="#4FD1C5" fontSize="10" textAnchor="middle" fontWeight="600">Nested → O(n²)</text>

      <rect x="180" y="20" width="120" height="25" rx="6" fill="none" stroke="#F5B544" strokeWidth="1.5" />
      <text x="240" y="36" fill="#EDEFF2" fontSize="9" textAnchor="middle">for i in n</text>
      <rect x="180" y="55" width="120" height="25" rx="6" fill="none" stroke="#F5B544" strokeWidth="1.5" />
      <text x="240" y="71" fill="#EDEFF2" fontSize="9" textAnchor="middle">for j in n²</text>
      <text x="240" y="100" fill="#F5B544" fontSize="10" textAnchor="middle" fontWeight="600">Sequential → O(n²), not O(n+n²)≈O(n³)</text>
    </svg>
  );
}

function ArrayVsLinkedList() {
  return (
    <svg viewBox="0 0 320 150" className="w-full h-auto">
      <text x="10" y="16" fill="#4FD1C5" fontSize="10" fontWeight="600">Array — contiguous block</text>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x={10 + i * 36} y="24" width="32" height="28" fill="none" stroke="#4FD1C5" strokeWidth="1.5" />
          <text x={26 + i * 36} y="42" fill="#EDEFF2" fontSize="9" textAnchor="middle">{["A", "B", "C", "D", "E"][i]}</text>
          <text x={26 + i * 36} y="64" fill="#8A93A1" fontSize="8" textAnchor="middle">{i}</text>
        </g>
      ))}

      <text x="10" y="96" fill="#F5B544" fontSize="10" fontWeight="600">Linked List — scattered nodes</text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={10 + i * 100} y="104" width="60" height="28" rx="4" fill="none" stroke="#F5B544" strokeWidth="1.5" />
          <line x1={10 + i * 100} y1="104" x2={10 + i * 100} y2="132" stroke="#F5B544" strokeWidth="1" />
          <text x={28 + i * 100} y="122" fill="#EDEFF2" fontSize="9" textAnchor="middle">{["A", "B", "C"][i]}</text>
          <text x={58 + i * 100} y="122" fill="#8A93A1" fontSize="8" textAnchor="middle">next</text>
          {i < 2 && (
            <line x1={70 + i * 100} y1="118" x2={110 + i * 100} y2="118" stroke="#F5B544" strokeWidth="1.5" markerEnd="url(#arrow)" />
          )}
        </g>
      ))}
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#F5B544" />
        </marker>
      </defs>
    </svg>
  );
}

function LinkedListTypes() {
  return (
    <svg viewBox="0 0 320 130" className="w-full h-auto">
      <text x="10" y="14" fill="#4FD1C5" fontSize="10" fontWeight="600">Singly: data | next</text>
      <rect x="10" y="20" width="80" height="26" rx="4" fill="none" stroke="#4FD1C5" strokeWidth="1.5" />
      <line x1="55" y1="20" x2="55" y2="46" stroke="#4FD1C5" />
      <text x="32" y="37" fill="#EDEFF2" fontSize="9" textAnchor="middle">data</text>
      <text x="72" y="37" fill="#EDEFF2" fontSize="9" textAnchor="middle">next</text>

      <text x="10" y="74" fill="#F5B544" fontSize="10" fontWeight="600">Doubly: prev | data | next</text>
      <rect x="10" y="80" width="120" height="26" rx="4" fill="none" stroke="#F5B544" strokeWidth="1.5" />
      <line x1="48" y1="80" x2="48" y2="106" stroke="#F5B544" />
      <line x1="90" y1="80" x2="90" y2="106" stroke="#F5B544" />
      <text x="29" y="97" fill="#EDEFF2" fontSize="8" textAnchor="middle">prev</text>
      <text x="69" y="97" fill="#EDEFF2" fontSize="9" textAnchor="middle">data</text>
      <text x="110" y="97" fill="#EDEFF2" fontSize="8" textAnchor="middle">next</text>

      <text x="180" y="14" fill="#FB7185" fontSize="10" fontWeight="600">Circular: last → first</text>
      <circle cx="240" cy="60" r="36" fill="none" stroke="#FB7185" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="240" y="64" fill="#8A93A1" fontSize="8" textAnchor="middle">loops back</text>
    </svg>
  );
}

function BinaryTreeTraversals() {
  return (
    <svg viewBox="0 0 300 160" className="w-full h-auto">
      <line x1="150" y1="20" x2="90" y2="70" stroke="#232A35" />
      <line x1="150" y1="20" x2="210" y2="70" stroke="#232A35" />
      <line x1="90" y1="70" x2="60" y2="120" stroke="#232A35" />
      <line x1="90" y1="70" x2="120" y2="120" stroke="#232A35" />
      <line x1="210" y1="70" x2="240" y2="120" stroke="#232A35" />

      {[
        { x: 150, y: 20, v: "F" },
        { x: 90, y: 70, v: "B" },
        { x: 210, y: 70, v: "G" },
        { x: 60, y: 120, v: "A" },
        { x: 120, y: 120, v: "D" },
        { x: 240, y: 120, v: "I" },
      ].map((n) => (
        <g key={n.v}>
          <circle cx={n.x} cy={n.y} r="14" fill="#131720" stroke="#4FD1C5" strokeWidth="1.5" />
          <text x={n.x} y={n.y + 4} fill="#EDEFF2" fontSize="10" textAnchor="middle">{n.v}</text>
        </g>
      ))}
      <text x="10" y="150" fill="#4FD1C5" fontSize="9">Inorder: A B D F G I (sorted!)</text>
    </svg>
  );
}

function GraphBfsDfs() {
  const nodes = [
    { id: "A", x: 40, y: 30 },
    { id: "B", x: 140, y: 20 },
    { id: "C", x: 40, y: 100 },
    { id: "D", x: 140, y: 100 },
    { id: "E", x: 240, y: 60 },
  ];
  const edges = [["A", "B"], ["A", "C"], ["B", "D"], ["C", "D"], ["D", "E"]];
  const pos = (id: string) => nodes.find((n) => n.id === id)!;
  return (
    <svg viewBox="0 0 300 140" className="w-full h-auto">
      {edges.map(([a, b], i) => {
        const pa = pos(a), pb = pos(b);
        return <line key={i} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y} stroke="#232A35" strokeWidth="1.5" />;
      })}
      {nodes.map((n) => (
        <g key={n.id}>
          <circle cx={n.x} cy={n.y} r="14" fill="#131720" stroke="#4FD1C5" strokeWidth="1.5" />
          <text x={n.x} y={n.y + 4} fill="#EDEFF2" fontSize="10" textAnchor="middle">{n.id}</text>
        </g>
      ))}
      <text x="10" y="128" fill="#4FD1C5" fontSize="9">BFS from A: A,B,C,D,E (queue, level by level)</text>
    </svg>
  );
}

function MergeSortTree() {
  return (
    <svg viewBox="0 0 320 130" className="w-full h-auto">
      <text x="10" y="14" fill="#8A93A1" fontSize="9">split</text>
      <rect x="120" y="6" width="80" height="20" fill="none" stroke="#4FD1C5" strokeWidth="1.5" />
      <text x="160" y="20" fill="#EDEFF2" fontSize="9" textAnchor="middle">8 3 5 1</text>

      <rect x="60" y="46" width="60" height="20" fill="none" stroke="#4FD1C5" strokeWidth="1.5" />
      <text x="90" y="60" fill="#EDEFF2" fontSize="9" textAnchor="middle">8 3</text>
      <rect x="200" y="46" width="60" height="20" fill="none" stroke="#4FD1C5" strokeWidth="1.5" />
      <text x="230" y="60" fill="#EDEFF2" fontSize="9" textAnchor="middle">5 1</text>

      <rect x="40" y="86" width="34" height="20" fill="none" stroke="#F5B544" strokeWidth="1.5" />
      <text x="57" y="100" fill="#EDEFF2" fontSize="9" textAnchor="middle">3 8</text>
      <rect x="206" y="86" width="34" height="20" fill="none" stroke="#F5B544" strokeWidth="1.5" />
      <text x="223" y="100" fill="#EDEFF2" fontSize="9" textAnchor="middle">1 5</text>

      <text x="270" y="20" fill="#8A93A1" fontSize="9">↓ split down</text>
      <text x="270" y="100" fill="#F5B544" fontSize="9">↑ merge up (sorted)</text>
    </svg>
  );
}

function MaxHeapStructure() {
  return (
    <svg viewBox="0 0 280 150" className="w-full h-auto">
      <line x1="140" y1="20" x2="80" y2="70" stroke="#232A35" />
      <line x1="140" y1="20" x2="200" y2="70" stroke="#232A35" />
      <line x1="80" y1="70" x2="50" y2="120" stroke="#232A35" />
      <line x1="80" y1="70" x2="110" y2="120" stroke="#232A35" />

      {[
        { x: 140, y: 20, v: "90" },
        { x: 80, y: 70, v: "70" },
        { x: 200, y: 70, v: "60" },
        { x: 50, y: 120, v: "40" },
        { x: 110, y: 120, v: "65" },
      ].map((n) => (
        <g key={n.v}>
          <circle cx={n.x} cy={n.y} r="16" fill="#131720" stroke="#FB7185" strokeWidth="1.5" />
          <text x={n.x} y={n.y + 4} fill="#EDEFF2" fontSize="10" textAnchor="middle">{n.v}</text>
        </g>
      ))}
      <text x="10" y="148" fill="#FB7185" fontSize="9">every parent ≥ its children</text>
    </svg>
  );
}

function HashChainingProbing() {
  return (
    <svg viewBox="0 0 320 140" className="w-full h-auto">
      <text x="10" y="14" fill="#4FD1C5" fontSize="10" fontWeight="600">Chaining</text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="10" y={24 + i * 24} width="30" height="20" fill="none" stroke="#4FD1C5" strokeWidth="1.5" />
          <text x="25" y={38 + i * 24} fill="#8A93A1" fontSize="8" textAnchor="middle">{i}</text>
        </g>
      ))}
      <rect x="50" y="24" width="30" height="20" fill="none" stroke="#4FD1C5" strokeWidth="1.5" strokeDasharray="3 2" />
      <text x="65" y="38" fill="#EDEFF2" fontSize="9" textAnchor="middle">23</text>
      <rect x="86" y="24" width="30" height="20" fill="none" stroke="#4FD1C5" strokeWidth="1.5" strokeDasharray="3 2" />
      <text x="101" y="38" fill="#EDEFF2" fontSize="9" textAnchor="middle">53</text>

      <text x="180" y="14" fill="#F5B544" fontSize="10" fontWeight="600">Open addressing (linear probe)</text>
      {["12", "·", "12+1", "·", "·"].map((v, i) => (
        <g key={i}>
          <rect x={180 + i * 26} y="24" width="24" height="20" fill="none" stroke="#F5B544" strokeWidth="1.5" />
          <text x={192 + i * 26} y="38" fill="#EDEFF2" fontSize="8" textAnchor="middle">{v}</text>
        </g>
      ))}
      <text x="10" y="120" fill="#8A93A1" fontSize="9">Chaining: list grows at the slot. Probing: hunts for the next free slot.</text>
    </svg>
  );
}

function TrieStructure() {
  return (
    <svg viewBox="0 0 300 140" className="w-full h-auto">
      <circle cx="30" cy="20" r="10" fill="#131720" stroke="#4FD1C5" strokeWidth="1.5" />
      <line x1="30" y1="20" x2="90" y2="60" stroke="#232A35" />
      <text x="58" y="36" fill="#8A93A1" fontSize="9">c</text>
      <circle cx="90" cy="60" r="10" fill="#131720" stroke="#4FD1C5" strokeWidth="1.5" />
      <text x="90" y="64" fill="#EDEFF2" fontSize="8" textAnchor="middle">a</text>

      <line x1="90" y1="60" x2="60" y2="100" stroke="#232A35" />
      <text x="65" y="84" fill="#8A93A1" fontSize="9">t</text>
      <circle cx="60" cy="100" r="10" fill="#131720" stroke="#FB7185" strokeWidth="1.5" />
      <text x="60" y="104" fill="#EDEFF2" fontSize="8" textAnchor="middle">t*</text>

      <line x1="90" y1="60" x2="150" y2="100" stroke="#232A35" />
      <text x="128" y="84" fill="#8A93A1" fontSize="9">r</text>
      <circle cx="150" cy="100" r="10" fill="#131720" stroke="#4FD1C5" strokeWidth="1.5" />
      <text x="150" y="104" fill="#EDEFF2" fontSize="8" textAnchor="middle">r</text>
      <line x1="150" y1="100" x2="150" y2="130" stroke="#232A35" />
      <text x="160" y="118" fill="#8A93A1" fontSize="9">d</text>

      <text x="10" y="135" fill="#4FD1C5" fontSize="9">words stored: cat, card  (* marks end of a word)</text>
    </svg>
  );
}

function TheveninNortonEquivalent() {
  return (
    <svg viewBox="0 0 320 130" className="w-full h-auto">
      <text x="10" y="14" fill="#4FD1C5" fontSize="10" fontWeight="600">Thevenin: Vth + Rth (series)</text>
      <circle cx="30" cy="50" r="14" fill="none" stroke="#4FD1C5" strokeWidth="1.5" />
      <text x="30" y="54" fill="#EDEFF2" fontSize="9" textAnchor="middle">Vth</text>
      <line x1="44" y1="50" x2="70" y2="50" stroke="#4FD1C5" strokeWidth="1.5" />
      <rect x="70" y="40" width="34" height="20" fill="none" stroke="#4FD1C5" strokeWidth="1.5" />
      <text x="87" y="54" fill="#EDEFF2" fontSize="8" textAnchor="middle">Rth</text>
      <line x1="104" y1="50" x2="130" y2="50" stroke="#4FD1C5" strokeWidth="1.5" />
      <circle cx="132" cy="50" r="2" fill="#4FD1C5" />
      <text x="60" y="78" fill="#8A93A1" fontSize="8" textAnchor="middle">A —— B (load terminals)</text>

      <text x="190" y="14" fill="#F5B544" fontSize="10" fontWeight="600">Norton: IN ‖ RN (parallel)</text>
      <circle cx="220" cy="50" r="14" fill="none" stroke="#F5B544" strokeWidth="1.5" />
      <text x="220" y="54" fill="#EDEFF2" fontSize="8" textAnchor="middle">IN ↑</text>
      <line x1="220" y1="36" x2="220" y2="20" stroke="#F5B544" />
      <line x1="220" y1="20" x2="290" y2="20" stroke="#F5B544" />
      <line x1="290" y1="20" x2="290" y2="36" stroke="#F5B544" />
      <rect x="275" y="36" width="30" height="28" fill="none" stroke="#F5B544" strokeWidth="1.5" />
      <text x="290" y="54" fill="#EDEFF2" fontSize="8" textAnchor="middle">RN</text>
      <line x1="220" y1="64" x2="220" y2="80" stroke="#F5B544" />
      <line x1="220" y1="80" x2="290" y2="80" stroke="#F5B544" />
      <line x1="290" y1="64" x2="290" y2="80" stroke="#F5B544" />
      <text x="240" y="100" fill="#8A93A1" fontSize="8" textAnchor="middle">IN = Vth/Rth, RN = Rth</text>
    </svg>
  );
}

function SuperpositionSteps() {
  return (
    <svg viewBox="0 0 320 110" className="w-full h-auto">
      <rect x="10" y="10" width="80" height="50" rx="4" fill="none" stroke="#8A93A1" strokeWidth="1.5" />
      <text x="50" y="38" fill="#EDEFF2" fontSize="9" textAnchor="middle">V1 + V2</text>
      <text x="50" y="72" fill="#8A93A1" fontSize="8" textAnchor="middle">original circuit</text>

      <text x="105" y="38" fill="#5A6372" fontSize="14">=</text>

      <rect x="125" y="10" width="80" height="50" rx="4" fill="none" stroke="#4FD1C5" strokeWidth="1.5" />
      <text x="165" y="38" fill="#EDEFF2" fontSize="9" textAnchor="middle">V1 only</text>
      <text x="165" y="72" fill="#4FD1C5" fontSize="8" textAnchor="middle">V2 → short</text>

      <text x="218" y="38" fill="#5A6372" fontSize="14">+</text>

      <rect x="235" y="10" width="80" height="50" rx="4" fill="none" stroke="#F5B544" strokeWidth="1.5" />
      <text x="275" y="38" fill="#EDEFF2" fontSize="9" textAnchor="middle">V2 only</text>
      <text x="275" y="72" fill="#F5B544" fontSize="8" textAnchor="middle">V1 → short</text>
    </svg>
  );
}

function RlRcTransformImpedance() {
  return (
    <svg viewBox="0 0 320 120" className="w-full h-auto">
      {[
        { x: 20, label: "R", t: "R", c: "#4FD1C5" },
        { x: 130, label: "L", t: "sL  +  Li(0)", c: "#F5B544" },
        { x: 240, label: "C", t: "1/sC  +  v(0)/s", c: "#FB7185" },
      ].map((el) => (
        <g key={el.label}>
          <text x={el.x} y="16" fill={el.c} fontSize="11" fontWeight="600">{el.label}</text>
          <text x={el.x} y="34" fill="#8A93A1" fontSize="9">time-domain</text>
          <line x1={el.x} y1="50" x2={el.x + 60} y2="50" stroke="#5A6372" />
          <text x={el.x + 30} y="68" fill="#8A93A1" fontSize="11" textAnchor="middle">↓ Laplace</text>
          <rect x={el.x} y="80" width="70" height="24" fill="none" stroke={el.c} strokeWidth="1.5" />
          <text x={el.x + 35} y="96" fill="#EDEFF2" fontSize="8" textAnchor="middle">{el.t}</text>
        </g>
      ))}
    </svg>
  );
}

function RlCircuitStepResponse() {
  return (
    <svg viewBox="0 0 300 150" className="w-full h-auto">
      <line x1="30" y1="130" x2="280" y2="130" stroke="#232A35" />
      <line x1="30" y1="130" x2="30" y2="15" stroke="#232A35" />
      <text x="270" y="144" fill="#8A93A1" fontSize="9" textAnchor="end">t</text>
      <text x="14" y="20" fill="#8A93A1" fontSize="9">i(t)</text>
      <path d="M30,130 C90,40 130,30 270,28" stroke="#4FD1C5" strokeWidth="2" fill="none" />
      <line x1="30" y1="28" x2="270" y2="28" stroke="#5A6372" strokeDasharray="3 3" />
      <text x="272" y="32" fill="#5A6372" fontSize="8">V/R (final)</text>
      <line x1="90" y1="130" x2="90" y2="58" stroke="#F5B544" strokeDasharray="3 3" />
      <line x1="30" y1="58" x2="90" y2="58" stroke="#F5B544" strokeDasharray="3 3" />
      <text x="92" y="56" fill="#F5B544" fontSize="9">63.2% at t = τ</text>
    </svg>
  );
}

function ResonanceCurve() {
  return (
    <svg viewBox="0 0 300 150" className="w-full h-auto">
      <line x1="20" y1="130" x2="280" y2="130" stroke="#232A35" />
      <line x1="20" y1="130" x2="20" y2="15" stroke="#232A35" />
      <text x="270" y="144" fill="#8A93A1" fontSize="9" textAnchor="end">f</text>
      <text x="6" y="20" fill="#8A93A1" fontSize="9">I</text>
      <path d="M20,125 C90,120 130,20 150,20 C170,20 210,120 280,125" stroke="#4FD1C5" strokeWidth="2" fill="none" />
      <line x1="150" y1="20" x2="150" y2="130" stroke="#5A6372" strokeDasharray="3 3" />
      <text x="150" y="142" fill="#5A6372" fontSize="8" textAnchor="middle">f₀</text>
      <line x1="20" y1="75" x2="280" y2="75" stroke="#F5B544" strokeDasharray="2 3" />
      <text x="22" y="71" fill="#F5B544" fontSize="8">Imax/√2</text>
      <line x1="108" y1="75" x2="108" y2="130" stroke="#FB7185" strokeDasharray="2 2" />
      <line x1="193" y1="75" x2="193" y2="130" stroke="#FB7185" strokeDasharray="2 2" />
      <text x="108" y="142" fill="#FB7185" fontSize="8" textAnchor="middle">f₁</text>
      <text x="193" y="142" fill="#FB7185" fontSize="8" textAnchor="middle">f₂</text>
    </svg>
  );
}

function ThreePhaseYDelta() {
  return (
    <svg viewBox="0 0 300 140" className="w-full h-auto">
      <text x="10" y="14" fill="#4FD1C5" fontSize="10" fontWeight="600">Star (Y)</text>
      <circle cx="60" cy="60" r="3" fill="#4FD1C5" />
      {[[60, 20], [25, 95], [95, 95]].map(([x, y], i) => (
        <line key={i} x1="60" y1="60" x2={x} y2={y} stroke="#4FD1C5" strokeWidth="1.5" />
      ))}
      <text x="60" y="14" fill="#EDEFF2" fontSize="8" textAnchor="middle">a</text>
      <text x="18" y="105" fill="#EDEFF2" fontSize="8" textAnchor="middle">b</text>
      <text x="100" y="105" fill="#EDEFF2" fontSize="8" textAnchor="middle">c</text>
      <text x="65" y="75" fill="#8A93A1" fontSize="7">N</text>

      <text x="190" y="14" fill="#F5B544" fontSize="10" fontWeight="600">Delta (Δ)</text>
      <polygon points="230,25 195,90 265,90" fill="none" stroke="#F5B544" strokeWidth="1.5" />
      <text x="230" y="18" fill="#EDEFF2" fontSize="8" textAnchor="middle">a</text>
      <text x="188" y="100" fill="#EDEFF2" fontSize="8" textAnchor="middle">b</text>
      <text x="272" y="100" fill="#EDEFF2" fontSize="8" textAnchor="middle">c</text>
      <text x="150" y="125" fill="#8A93A1" fontSize="8">no neutral point in delta</text>
    </svg>
  );
}

function NeutralShiftPhasor() {
  return (
    <svg viewBox="0 0 220 220" className="w-full h-auto">
      <circle cx="110" cy="110" r="90" fill="none" stroke="#232A35" strokeWidth="1" />
      <line x1="110" y1="110" x2="110" y2="20" stroke="#4FD1C5" strokeWidth="1.5" />
      <text x="110" y="12" fill="#4FD1C5" fontSize="9" textAnchor="middle">VaN</text>
      <line x1="110" y1="110" x2="32" y2="155" stroke="#4FD1C5" strokeWidth="1.5" />
      <text x="22" y="165" fill="#4FD1C5" fontSize="9">VbN</text>
      <line x1="110" y1="110" x2="188" y2="155" stroke="#4FD1C5" strokeWidth="1.5" />
      <text x="190" y="165" fill="#4FD1C5" fontSize="9">VcN</text>
      <circle cx="110" cy="110" r="3" fill="#8A93A1" />
      <text x="118" y="108" fill="#8A93A1" fontSize="8">N (source)</text>
      <circle cx="130" cy="90" r="3" fill="#FB7185" />
      <line x1="110" y1="110" x2="130" y2="90" stroke="#FB7185" strokeWidth="1.5" strokeDasharray="3 2" />
      <text x="135" y="85" fill="#FB7185" fontSize="8">N&apos; (shifted, load)</text>
    </svg>
  );
}

function TwoPortNetworkBlock() {
  return (
    <svg viewBox="0 0 280 110" className="w-full h-auto">
      <rect x="80" y="20" width="120" height="60" rx="4" fill="none" stroke="#4FD1C5" strokeWidth="1.5" />
      <text x="140" y="55" fill="#EDEFF2" fontSize="10" textAnchor="middle">two-port network</text>

      <line x1="20" y1="32" x2="80" y2="32" stroke="#4FD1C5" strokeWidth="1.5" />
      <line x1="20" y1="68" x2="80" y2="68" stroke="#4FD1C5" strokeWidth="1.5" />
      <text x="15" y="28" fill="#8A93A1" fontSize="8" textAnchor="end">I1 →</text>
      <text x="15" y="80" fill="#8A93A1" fontSize="8" textAnchor="end">V1</text>

      <line x1="200" y1="32" x2="260" y2="32" stroke="#F5B544" strokeWidth="1.5" />
      <line x1="200" y1="68" x2="260" y2="68" stroke="#F5B544" strokeWidth="1.5" />
      <text x="265" y="28" fill="#8A93A1" fontSize="8">← I2</text>
      <text x="265" y="80" fill="#8A93A1" fontSize="8">V2</text>
    </svg>
  );
}

function SimulationTypesFlow() {
  const types = [
    { label: "DC", desc: "operating point", c: "#4FD1C5" },
    { label: "Transient", desc: "response vs time", c: "#F5B544" },
    { label: "AC", desc: "freq. response", c: "#FB7185" },
    { label: "Digital", desc: "logic 0/1, timing", c: "#9b6bff" },
  ];
  return (
    <svg viewBox="0 0 320 100" className="w-full h-auto">
      <rect x="130" y="6" width="60" height="22" rx="4" fill="none" stroke="#8A93A1" strokeWidth="1.5" />
      <text x="160" y="21" fill="#EDEFF2" fontSize="9" textAnchor="middle">circuit model</text>
      {types.map((t, i) => (
        <g key={t.label}>
          <line x1="160" y1="28" x2={40 + i * 80} y2="50" stroke="#232A35" />
          <rect x={10 + i * 80} y="50" width="60" height="38" rx="4" fill="none" stroke={t.c} strokeWidth="1.5" />
          <text x={40 + i * 80} y="66" fill={t.c} fontSize="9" textAnchor="middle" fontWeight="600">{t.label}</text>
          <text x={40 + i * 80} y="80" fill="#8A93A1" fontSize="7" textAnchor="middle">{t.desc}</text>
        </g>
      ))}
    </svg>
  );
}

function SimulinkBlockDiagram() {
  return (
    <svg viewBox="0 0 320 90" className="w-full h-auto">
      <rect x="10" y="30" width="60" height="30" rx="4" fill="none" stroke="#4FD1C5" strokeWidth="1.5" />
      <text x="40" y="48" fill="#EDEFF2" fontSize="9" textAnchor="middle">Step</text>
      <line x1="70" y1="45" x2="110" y2="45" stroke="#8A93A1" strokeWidth="1.5" markerEnd="url(#arrow2)" />

      <rect x="110" y="20" width="100" height="50" rx="4" fill="none" stroke="#F5B544" strokeWidth="1.5" />
      <text x="160" y="40" fill="#EDEFF2" fontSize="9" textAnchor="middle">Gain → Sum →</text>
      <text x="160" y="54" fill="#EDEFF2" fontSize="9" textAnchor="middle">Integrator</text>

      <line x1="210" y1="45" x2="250" y2="45" stroke="#8A93A1" strokeWidth="1.5" markerEnd="url(#arrow2)" />
      <rect x="250" y="30" width="60" height="30" rx="4" fill="none" stroke="#FB7185" strokeWidth="1.5" />
      <text x="280" y="48" fill="#EDEFF2" fontSize="9" textAnchor="middle">Scope</text>

      <defs>
        <marker id="arrow2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#8A93A1" />
        </marker>
      </defs>
      <text x="40" y="78" fill="#4FD1C5" fontSize="8" textAnchor="middle">source</text>
      <text x="160" y="84" fill="#F5B544" fontSize="8" textAnchor="middle">system model</text>
      <text x="280" y="78" fill="#FB7185" fontSize="8" textAnchor="middle">sink</text>
    </svg>
  );
}

function AdcDacBlock() {
  return (
    <svg viewBox="0 0 300 100" className="w-full h-auto">
      <text x="10" y="14" fill="#8A93A1" fontSize="9">analog in</text>
      <rect x="10" y="22" width="60" height="28" rx="4" fill="none" stroke="#F5B544" strokeWidth="1.5" />
      <text x="40" y="40" fill="#EDEFF2" fontSize="8" textAnchor="middle">S&H</text>
      <line x1="70" y1="36" x2="100" y2="36" stroke="#8A93A1" strokeWidth="1.5" />
      <rect x="100" y="22" width="60" height="28" rx="4" fill="none" stroke="#4FD1C5" strokeWidth="1.5" />
      <text x="130" y="40" fill="#EDEFF2" fontSize="8" textAnchor="middle">ADC</text>
      <line x1="160" y1="36" x2="190" y2="36" stroke="#8A93A1" strokeWidth="1.5" />
      <text x="195" y="40" fill="#8A93A1" fontSize="9">digital code</text>

      <text x="10" y="70" fill="#8A93A1" fontSize="9">digital code</text>
      <line x1="65" y1="80" x2="100" y2="80" stroke="#8A93A1" strokeWidth="1.5" />
      <rect x="100" y="66" width="60" height="28" rx="4" fill="none" stroke="#FB7185" strokeWidth="1.5" />
      <text x="130" y="84" fill="#EDEFF2" fontSize="8" textAnchor="middle">DAC</text>
      <line x1="160" y1="80" x2="190" y2="80" stroke="#8A93A1" strokeWidth="1.5" />
      <text x="195" y="84" fill="#8A93A1" fontSize="9">analog out</text>
    </svg>
  );
}

function DaqSystemArchitecture() {
  return (
    <svg viewBox="0 0 320 100" className="w-full h-auto">
      <text x="10" y="14" fill="#8A93A1" fontSize="9">real-world signal</text>
      <rect x="10" y="22" width="70" height="30" rx="4" fill="none" stroke="#F5B544" strokeWidth="1.5" />
      <text x="45" y="41" fill="#EDEFF2" fontSize="8" textAnchor="middle">sensor</text>
      <line x1="80" y1="37" x2="115" y2="37" stroke="#8A93A1" strokeWidth="1.5" />

      <rect x="115" y="20" width="80" height="34" rx="4" fill="none" stroke="#4FD1C5" strokeWidth="1.5" />
      <text x="155" y="40" fill="#EDEFF2" fontSize="8" textAnchor="middle">DAQ (ADC)</text>
      <line x1="195" y1="37" x2="230" y2="37" stroke="#8A93A1" strokeWidth="1.5" />
      <text x="200" y="30" fill="#8A93A1" fontSize="7">bus (USB/PCI)</text>

      <rect x="230" y="20" width="80" height="34" rx="4" fill="none" stroke="#FB7185" strokeWidth="1.5" />
      <text x="270" y="40" fill="#EDEFF2" fontSize="8" textAnchor="middle">PC + software</text>
      <text x="270" y="70" fill="#8A93A1" fontSize="7" textAnchor="middle">software = &quot;the instrument&quot;</text>
    </svg>
  );
}

// ---- Math (24MAP301) ----

function VectorSpaceBasis() {
  return (
    <svg viewBox="0 0 220 160" className="w-full h-auto">
      <line x1="20" y1="140" x2="200" y2="140" stroke="#232A35" />
      <line x1="20" y1="140" x2="20" y2="10" stroke="#232A35" />
      <line x1="20" y1="140" x2="140" y2="40" stroke="#4FD1C5" strokeWidth="2" markerEnd="url(#arrowM)" />
      <text x="145" y="38" fill="#4FD1C5" fontSize="9">v₁</text>
      <line x1="20" y1="140" x2="170" y2="120" stroke="#F5B544" strokeWidth="2" markerEnd="url(#arrowM)" />
      <text x="174" y="124" fill="#F5B544" fontSize="9">v₂</text>
      <polygon points="20,140 140,40 170,120" fill="#4FD1C5" opacity="0.07" />
      <text x="22" y="155" fill="#8A93A1" fontSize="8">span{"{v₁,v₂}"} = the shaded plane</text>
      <defs>
        <marker id="arrowM" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#8A93A1" />
        </marker>
      </defs>
    </svg>
  );
}

function GramSchmidtProjection() {
  return (
    <svg viewBox="0 0 240 140" className="w-full h-auto">
      <line x1="20" y1="120" x2="220" y2="120" stroke="#4FD1C5" strokeWidth="2" markerEnd="url(#arrowM2)" />
      <text x="222" y="124" fill="#4FD1C5" fontSize="9">u₁</text>
      <line x1="20" y1="120" x2="140" y2="20" stroke="#8A93A1" strokeWidth="1.5" strokeDasharray="3 2" />
      <text x="142" y="18" fill="#8A93A1" fontSize="9">v₂</text>
      <line x1="20" y1="120" x2="100" y2="120" stroke="#F5B544" strokeWidth="2" markerEnd="url(#arrowM2)" />
      <text x="95" y="135" fill="#F5B544" fontSize="8">proj of v₂ on u₁</text>
      <line x1="100" y1="120" x2="140" y2="20" stroke="#FB7185" strokeWidth="2" markerEnd="url(#arrowM2)" />
      <text x="142" y="70" fill="#FB7185" fontSize="9">u₂ (leftover ⟂ part)</text>
      <defs>
        <marker id="arrowM2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#8A93A1" />
        </marker>
      </defs>
    </svg>
  );
}

function ComplexPlaneRegions() {
  return (
    <svg viewBox="0 0 300 130" className="w-full h-auto">
      <text x="10" y="14" fill="#4FD1C5" fontSize="10" fontWeight="600">Disk |z−z₀|&lt;r</text>
      <circle cx="55" cy="60" r="32" fill="#4FD1C5" opacity="0.08" stroke="#4FD1C5" strokeWidth="1.5" />
      <circle cx="55" cy="60" r="2" fill="#4FD1C5" />
      <text x="55" y="55" fill="#4FD1C5" fontSize="8" textAnchor="middle">z₀</text>

      <text x="115" y="14" fill="#F5B544" fontSize="10" fontWeight="600">Circle |z−z₀|=r</text>
      <circle cx="165" cy="60" r="32" fill="none" stroke="#F5B544" strokeWidth="1.5" />

      <text x="220" y="14" fill="#FB7185" fontSize="10" fontWeight="600">Half-plane Re(z)&gt;0</text>
      <line x1="240" y1="20" x2="240" y2="110" stroke="#FB7185" strokeWidth="1.5" />
      <rect x="240" y="20" width="55" height="90" fill="#FB7185" opacity="0.08" />
    </svg>
  );
}

function ContourIntegrationPath() {
  return (
    <svg viewBox="0 0 260 150" className="w-full h-auto">
      <ellipse cx="130" cy="75" rx="100" ry="55" fill="none" stroke="#4FD1C5" strokeWidth="1.5" />
      <circle cx="100" cy="60" r="4" fill="#F5B544" />
      <text x="100" y="50" fill="#F5B544" fontSize="9" textAnchor="middle">pole (inside)</text>
      <circle cx="160" cy="95" r="4" fill="#F5B544" />
      <text x="160" y="112" fill="#F5B544" fontSize="9" textAnchor="middle">pole (inside)</text>
      <circle cx="240" cy="40" r="4" fill="#5A6372" />
      <text x="240" y="30" fill="#5A6372" fontSize="9" textAnchor="middle">pole (outside — ignored)</text>
      <text x="40" y="140" fill="#8A93A1" fontSize="9">contour C</text>
    </svg>
  );
}

// ---- Digital Electronics (24ERJ303) ----

function NumberSystemConversions() {
  return (
    <svg viewBox="0 0 280 110" className="w-full h-auto">
      <circle cx="140" cy="55" r="32" fill="none" stroke="#4FD1C5" strokeWidth="1.5" />
      <text x="140" y="59" fill="#4FD1C5" fontSize="10" textAnchor="middle">Binary</text>
      {[
        { x: 30, y: 20, label: "Decimal" },
        { x: 250, y: 20, label: "Octal (×3 bits)" },
        { x: 140, y: 100, label: "Hex (×4 bits)" },
      ].map((n) => (
        <g key={n.label}>
          <line x1="140" y1="55" x2={n.x} y2={n.y} stroke="#8A93A1" strokeWidth="1.2" />
          <text x={n.x} y={n.y} fill="#EDEFF2" fontSize="9" textAnchor="middle">{n.label}</text>
        </g>
      ))}
    </svg>
  );
}

function KmapGrouping() {
  const cells = [
    ["1", "1", "0", "0"],
    ["1", "1", "0", "0"],
    ["0", "0", "0", "0"],
    ["0", "0", "0", "0"],
  ];
  return (
    <svg viewBox="0 0 180 180" className="w-full h-auto">
      {cells.map((row, r) =>
        row.map((v, c) => (
          <g key={`${r}-${c}`}>
            <rect x={10 + c * 40} y={10 + r * 40} width="40" height="40" fill="none" stroke="#232A35" />
            <text x={30 + c * 40} y={34 + r * 40} fill={v === "1" ? "#4FD1C5" : "#5A6372"} fontSize="14" textAnchor="middle">{v}</text>
          </g>
        ))
      )}
      <rect x="10" y="10" width="80" height="80" fill="none" stroke="#F5B544" strokeWidth="2.5" rx="4" />
      <text x="95" y="50" fill="#F5B544" fontSize="9">quad group</text>
    </svg>
  );
}

function FullAdderCircuit() {
  return (
    <svg viewBox="0 0 280 130" className="w-full h-auto">
      <text x="10" y="20" fill="#8A93A1" fontSize="9">A, B, Cin</text>
      <rect x="10" y="30" width="70" height="30" rx="4" fill="none" stroke="#4FD1C5" strokeWidth="1.5" />
      <text x="45" y="49" fill="#EDEFF2" fontSize="8" textAnchor="middle">XOR ×2</text>
      <line x1="80" y1="45" x2="110" y2="45" stroke="#8A93A1" />
      <text x="115" y="35" fill="#F5B544" fontSize="9">Sum</text>
      <line x1="110" y1="45" x2="150" y2="45" stroke="#8A93A1" />

      <rect x="10" y="75" width="70" height="30" rx="4" fill="none" stroke="#FB7185" strokeWidth="1.5" />
      <text x="45" y="94" fill="#EDEFF2" fontSize="8" textAnchor="middle">AND + OR</text>
      <line x1="80" y1="90" x2="150" y2="90" stroke="#8A93A1" />
      <text x="155" y="80" fill="#FB7185" fontSize="9">Cout</text>
    </svg>
  );
}

function EncoderDecoderMuxDemux() {
  const items = [
    { l: "Encoder", d: "2ⁿ lines → n-bit code", c: "#4FD1C5" },
    { l: "Decoder", d: "n-bit code → 2ⁿ lines", c: "#F5B544" },
    { l: "MUX", d: "many in → 1 out (select)", c: "#FB7185" },
    { l: "DEMUX", d: "1 in → many out (select)", c: "#9b6bff" },
  ];
  return (
    <svg viewBox="0 0 300 100" className="w-full h-auto">
      {items.map((it, i) => (
        <g key={it.l}>
          <rect x={10 + i * 73} y="10" width="65" height="36" rx="4" fill="none" stroke={it.c} strokeWidth="1.5" />
          <text x={42 + i * 73} y="32" fill={it.c} fontSize="9" textAnchor="middle" fontWeight="600">{it.l}</text>
          <text x={42 + i * 73} y="58" fill="#8A93A1" fontSize="7" textAnchor="middle">{it.d}</text>
        </g>
      ))}
    </svg>
  );
}

function FlipflopTypes() {
  const ffs = [
    { l: "D", eq: "Q′=D", c: "#4FD1C5" },
    { l: "T", eq: "Q′=T⊕Q", c: "#F5B544" },
    { l: "JK", eq: "Q′=JQ̄+K̄Q", c: "#FB7185" },
    { l: "SR", eq: "Q′=S+R̄Q", c: "#9b6bff" },
  ];
  return (
    <svg viewBox="0 0 300 90" className="w-full h-auto">
      {ffs.map((f, i) => (
        <g key={f.l}>
          <rect x={10 + i * 73} y="10" width="65" height="40" rx="4" fill="none" stroke={f.c} strokeWidth="1.5" />
          <text x={42 + i * 73} y="34" fill={f.c} fontSize="11" textAnchor="middle" fontWeight="600">{f.l}</text>
          <text x={42 + i * 73} y="65" fill="#8A93A1" fontSize="8" textAnchor="middle">{f.eq}</text>
        </g>
      ))}
    </svg>
  );
}

function RippleCounterTiming() {
  return (
    <svg viewBox="0 0 280 110" className="w-full h-auto">
      {["CLK", "Q0", "Q1", "Q2"].map((label, i) => (
        <g key={label}>
          <text x="8" y={20 + i * 24} fill="#8A93A1" fontSize="8">{label}</text>
          <path
            d={
              i === 0
                ? "M30,15 L30,25 L60,25 L60,15 L90,15 L90,25 L120,25 L120,15 L150,15 L150,25 L180,25 L180,15 L210,15 L210,25 L240,25 L240,15"
                : `M30,${15 + i * 24} L${30 + i * 30},${15 + i * 24} L${30 + i * 30},${5 + i * 24} L${60 + i * 30},${5 + i * 24} L${60 + i * 30},${15 + i * 24} L240,${15 + i * 24}`
            }
            stroke={i === 0 ? "#8A93A1" : "#4FD1C5"}
            strokeWidth="1.5"
            fill="none"
          />
        </g>
      ))}
      <text x="30" y="100" fill="#F5B544" fontSize="8">each stage toggles a little later than the one before it →</text>
    </svg>
  );
}

function MooreMealyFsm() {
  return (
    <svg viewBox="0 0 300 110" className="w-full h-auto">
      <text x="10" y="14" fill="#4FD1C5" fontSize="10" fontWeight="600">Moore</text>
      <circle cx="50" cy="60" r="24" fill="none" stroke="#4FD1C5" strokeWidth="1.5" />
      <text x="50" y="58" fill="#EDEFF2" fontSize="8" textAnchor="middle">S0/0</text>
      <circle cx="130" cy="60" r="24" fill="none" stroke="#4FD1C5" strokeWidth="1.5" />
      <text x="130" y="58" fill="#EDEFF2" fontSize="8" textAnchor="middle">S1/1</text>
      <line x1="74" y1="60" x2="106" y2="60" stroke="#8A93A1" markerEnd="url(#arrowM3)" />
      <text x="90" y="50" fill="#8A93A1" fontSize="7">in=1</text>

      <text x="180" y="14" fill="#F5B544" fontSize="10" fontWeight="600">Mealy</text>
      <circle cx="220" cy="60" r="22" fill="none" stroke="#F5B544" strokeWidth="1.5" />
      <text x="220" y="63" fill="#EDEFF2" fontSize="8" textAnchor="middle">S0</text>
      <circle cx="280" cy="60" r="22" fill="none" stroke="#F5B544" strokeWidth="1.5" />
      <text x="280" y="63" fill="#EDEFF2" fontSize="8" textAnchor="middle">S1</text>
      <line x1="242" y1="60" x2="258" y2="60" stroke="#8A93A1" markerEnd="url(#arrowM3)" />
      <text x="232" y="48" fill="#8A93A1" fontSize="7">in=1/out=1</text>
      <defs>
        <marker id="arrowM3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#8A93A1" />
        </marker>
      </defs>
    </svg>
  );
}

function R2rLadderDac() {
  return (
    <svg viewBox="0 0 280 100" className="w-full h-auto">
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={20 + i * 60} y="20" width="30" height="14" fill="none" stroke="#4FD1C5" strokeWidth="1.2" />
          <text x={35 + i * 60} y="30" fill="#4FD1C5" fontSize="7" textAnchor="middle">2R</text>
          <line x1={35 + i * 60} y1="34" x2={35 + i * 60} y2="55" stroke="#8A93A1" />
          {i < 3 && <line x1={50 + i * 60} y1="27" x2={80 + i * 60} y2="27" stroke="#F5B544" strokeWidth="1.2" />}
          {i < 3 && <text x={65 + i * 60} y="20" fill="#F5B544" fontSize="7" textAnchor="middle">R</text>}
        </g>
      ))}
      <text x="140" y="80" fill="#8A93A1" fontSize="8" textAnchor="middle">only two resistor values (R, 2R), repeated</text>
    </svg>
  );
}

// ---- Sensor & Sensor Circuits (24ERT305) ----

function MeasurementSystemElements() {
  const stages = ["Detector / Transducer", "Signal Conditioning", "Data Presentation"];
  return (
    <svg viewBox="0 0 320 70" className="w-full h-auto">
      {stages.map((s, i) => (
        <g key={s}>
          <rect x={10 + i * 105} y="10" width="90" height="40" rx="4" fill="none" stroke="#4FD1C5" strokeWidth="1.5" />
          <text x={55 + i * 105} y="34" fill="#EDEFF2" fontSize="8" textAnchor="middle">{s}</text>
          {i < 2 && <line x1={100 + i * 105} y1="30" x2={115 + i * 105} y2="30" stroke="#8A93A1" strokeWidth="1.5" markerEnd="url(#arrowM4)" />}
        </g>
      ))}
      <defs>
        <marker id="arrowM4" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#8A93A1" />
        </marker>
      </defs>
    </svg>
  );
}

function ThermocoupleCircuit() {
  return (
    <svg viewBox="0 0 280 100" className="w-full h-auto">
      <line x1="40" y1="30" x2="100" y2="30" stroke="#4FD1C5" strokeWidth="2" />
      <line x1="40" y1="30" x2="40" y2="70" stroke="#F5B544" strokeWidth="2" />
      <line x1="100" y1="30" x2="100" y2="70" stroke="#FB7185" strokeWidth="2" />
      <circle cx="40" cy="70" r="4" fill="#F5B544" />
      <text x="40" y="86" fill="#F5B544" fontSize="8" textAnchor="middle">measuring junction (T)</text>
      <circle cx="100" cy="70" r="4" fill="#FB7185" />
      <text x="100" y="86" fill="#FB7185" fontSize="8" textAnchor="middle">reference junction (T_ref)</text>
      <circle cx="70" cy="20" r="10" fill="none" stroke="#8A93A1" />
      <text x="70" y="23" fill="#8A93A1" fontSize="7" textAnchor="middle">V</text>
      <text x="160" y="40" fill="#8A93A1" fontSize="8">V ∝ (T − T_ref)</text>
    </svg>
  );
}

function CcdVsCmos() {
  return (
    <svg viewBox="0 0 280 110" className="w-full h-auto">
      <text x="10" y="14" fill="#4FD1C5" fontSize="10" fontWeight="600">CCD</text>
      {[0, 1, 2].map((i) => (
        <rect key={i} x={10 + i * 26} y="22" width="22" height="22" fill="none" stroke="#4FD1C5" strokeWidth="1.2" />
      ))}
      <line x1="10" y1="50" x2="88" y2="50" stroke="#4FD1C5" strokeWidth="1.5" markerEnd="url(#arrowM5)" />
      <rect x="10" y="56" width="78" height="16" fill="none" stroke="#4FD1C5" strokeWidth="1.2" />
      <text x="49" y="68" fill="#EDEFF2" fontSize="7" textAnchor="middle">shared amplifier</text>

      <text x="150" y="14" fill="#F5B544" fontSize="10" fontWeight="600">CMOS</text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={150 + i * 40} y="22" width="22" height="22" fill="none" stroke="#F5B544" strokeWidth="1.2" />
          <rect x={150 + i * 40} y="46" width="22" height="10" fill="none" stroke="#F5B544" strokeWidth="1" />
          <text x={161 + i * 40} y="54" fill="#EDEFF2" fontSize="6" textAnchor="middle">amp</text>
        </g>
      ))}
      <defs>
        <marker id="arrowM5" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#4FD1C5" />
        </marker>
      </defs>
    </svg>
  );
}

function LvdtStructure() {
  return (
    <svg viewBox="0 0 300 150" className="w-full h-auto">
      <rect x="40" y="30" width="180" height="40" rx="4" fill="none" stroke="#8A93A1" strokeWidth="1.2" />
      <text x="130" y="20" fill="#8A93A1" fontSize="8" textAnchor="middle">primary + 2 secondary coils</text>
      <rect x="115" y="35" width="30" height="30" fill="#4FD1C5" opacity="0.3" stroke="#4FD1C5" />
      <text x="130" y="55" fill="#EDEFF2" fontSize="7" textAnchor="middle">core</text>

      <line x1="40" y1="100" x2="220" y2="100" stroke="#232A35" />
      <line x1="40" y1="100" x2="40" y2="30" stroke="#232A35" />
      <path d="M40,95 Q130,30 220,95" stroke="#F5B544" strokeWidth="2" fill="none" />
      <text x="130" y="120" fill="#F5B544" fontSize="8" textAnchor="middle">output Vout vs core position (null at center)</text>
    </svg>
  );
}

function SignalConditioningChain() {
  const stages = ["Sensor", "Amplify", "Linearize", "Filter", "ADC"];
  return (
    <svg viewBox="0 0 320 60" className="w-full h-auto">
      {stages.map((s, i) => (
        <g key={s}>
          <rect x={10 + i * 62} y="10" width="52" height="30" rx="4" fill="none" stroke="#4FD1C5" strokeWidth="1.5" />
          <text x={36 + i * 62} y="29" fill="#EDEFF2" fontSize="7" textAnchor="middle">{s}</text>
          {i < stages.length - 1 && <line x1={62 + i * 62} y1="25" x2={72 + i * 62} y2="25" stroke="#8A93A1" markerEnd="url(#arrowM6)" />}
        </g>
      ))}
      <defs>
        <marker id="arrowM6" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#8A93A1" />
        </marker>
      </defs>
    </svg>
  );
}

// ---- Life Skills (24HUT310) ----

function FourAsStress() {
  const steps = ["Avoid", "Alter", "Accept", "Adapt"];
  return (
    <svg viewBox="0 0 300 70" className="w-full h-auto">
      {steps.map((s, i) => (
        <g key={s}>
          <rect x={10 + i * 73} y="15" width="60" height="34" rx="6" fill="none" stroke="#4FD1C5" strokeWidth="1.5" />
          <text x={40 + i * 73} y="36" fill="#4FD1C5" fontSize="10" textAnchor="middle" fontWeight="600">{s}</text>
          {i < 3 && <line x1={70 + i * 73} y1="32" x2={83 + i * 73} y2="32" stroke="#8A93A1" markerEnd="url(#arrowM7)" />}
        </g>
      ))}
      <defs>
        <marker id="arrowM7" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#8A93A1" />
        </marker>
      </defs>
    </svg>
  );
}

function SixThinkingHats() {
  const hats = [
    { c: "#EDEFF2", l: "White", d: "facts" },
    { c: "#FB7185", l: "Red", d: "feelings" },
    { c: "#1B212B", l: "Black", d: "caution" },
    { c: "#F5B544", l: "Yellow", d: "benefit" },
    { c: "#4FD1C5", l: "Green", d: "ideas" },
    { c: "#5B8DEF", l: "Blue", d: "process" },
  ];
  return (
    <svg viewBox="0 0 320 90" className="w-full h-auto">
      {hats.map((h, i) => (
        <g key={h.l}>
          <circle cx={30 + i * 50} cy="30" r="16" fill={h.c} stroke="#232A35" strokeWidth="1" />
          <text x={30 + i * 50} y="60" fill="#EDEFF2" fontSize="8" textAnchor="middle">{h.l}</text>
          <text x={30 + i * 50} y="72" fill="#8A93A1" fontSize="7" textAnchor="middle">{h.d}</text>
        </g>
      ))}
    </svg>
  );
}

function GroupVsTeam() {
  return (
    <svg viewBox="0 0 280 110" className="w-full h-auto">
      <text x="10" y="14" fill="#4FD1C5" fontSize="10" fontWeight="600">Group</text>
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={30 + i * 30} cy="50" r="12" fill="none" stroke="#4FD1C5" strokeWidth="1.5" />
      ))}
      <text x="45" y="85" fill="#8A93A1" fontSize="7" textAnchor="middle">independent goals</text>

      <text x="170" y="14" fill="#F5B544" fontSize="10" fontWeight="600">Team</text>
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={190 + i * 30} cy="50" r="12" fill="none" stroke="#F5B544" strokeWidth="1.5" />
      ))}
      <line x1="190" y1="50" x2="250" y2="50" stroke="#F5B544" strokeWidth="1" strokeDasharray="2 2" />
      <text x="220" y="85" fill="#8A93A1" fontSize="7" textAnchor="middle">shared goal, interdependent</text>
    </svg>
  );
}

const registry: Record<string, () => JSX.Element> = {
  "big-o-growth-curves": GrowthCurves,
  "loop-complexity-blocks": LoopComplexityBlocks,
  "array-vs-linked-list": ArrayVsLinkedList,
  "linked-list-types": LinkedListTypes,
  "binary-tree-traversals": BinaryTreeTraversals,
  "graph-bfs-dfs": GraphBfsDfs,
  "merge-sort-tree": MergeSortTree,
  "max-heap-structure": MaxHeapStructure,
  "hash-chaining-probing": HashChainingProbing,
  "trie-structure": TrieStructure,
  "thevenin-norton-equivalent": TheveninNortonEquivalent,
  "superposition-steps": SuperpositionSteps,
  "rl-rc-transform-impedance": RlRcTransformImpedance,
  "rl-circuit-step-response": RlCircuitStepResponse,
  "resonance-curve": ResonanceCurve,
  "three-phase-y-delta": ThreePhaseYDelta,
  "neutral-shift-phasor": NeutralShiftPhasor,
  "two-port-network-block": TwoPortNetworkBlock,
  "simulation-types-flow": SimulationTypesFlow,
  "simulink-block-diagram": SimulinkBlockDiagram,
  "adc-dac-block": AdcDacBlock,
  "daq-system-architecture": DaqSystemArchitecture,
  "vector-space-basis": VectorSpaceBasis,
  "gram-schmidt-projection": GramSchmidtProjection,
  "complex-plane-regions": ComplexPlaneRegions,
  "contour-integration-path": ContourIntegrationPath,
  "number-system-conversions": NumberSystemConversions,
  "kmap-grouping": KmapGrouping,
  "full-adder-circuit": FullAdderCircuit,
  "encoder-decoder-mux-demux": EncoderDecoderMuxDemux,
  "flipflop-types": FlipflopTypes,
  "ripple-counter-timing": RippleCounterTiming,
  "moore-mealy-fsm": MooreMealyFsm,
  "r2r-ladder-dac": R2rLadderDac,
  "measurement-system-elements": MeasurementSystemElements,
  "thermocouple-circuit": ThermocoupleCircuit,
  "ccd-vs-cmos": CcdVsCmos,
  "lvdt-structure": LvdtStructure,
  "signal-conditioning-chain": SignalConditioningChain,
  "four-as-stress": FourAsStress,
  "six-thinking-hats": SixThinkingHats,
  "group-vs-team": GroupVsTeam,
};

export default function Diagram({ svgKey }: { svgKey: string }) {
  const Renderer = registry[svgKey];
  if (!Renderer) {
    return (
      <div className="text-ink-faint text-sm font-mono p-6 text-center border border-dashed border-bg-border rounded-card">
        diagram not yet added
      </div>
    );
  }
  return <Renderer />;
}
