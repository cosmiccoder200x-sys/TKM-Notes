import { SubjectContent } from "../types";

const content: SubjectContent = {
  code: "24MAP301",
  name: "Advanced Linear Algebra, Complex Analysis & PDE",
  semester: "s3",
  category: "math",
  credits: 5,
  ltpj: "3-1-2-0",
  modules: [
    // ---------------------------------------------------------------
    // MODULE I — Vector Spaces
    // ---------------------------------------------------------------
    {
      id: "m1",
      title: "Vector Spaces",
      number: 1,
      topics: [
        { title: "(Text 1: Relevant topics from sections 2.1, 2.2, 2.3, 2.4, 2.5) Vector Spaces, Subspaces -Definition and Examples" },
        { title: "Linear independence of vectors, Linear span, Basis and dimension, Co-ordinate representation of vectors, Row space and Column space" },
      ],
      overview: {
        summary:
          "This module introduces vector spaces and subspaces in the abstract sense, then builds the core toolkit for working with them: linear independence, span, basis, dimension, coordinate representation, and row/column space.",
        whyItMatters:
          "Almost every later proof in this subject (orthogonal projections, Gram-Schmidt, even some PDE solution spaces) leans on 'is this a basis?' or 'what's the dimension?' — getting comfortable with checking linear independence and finding a basis here pays off across the whole syllabus.",
      },
      coreConcepts: [
        "A vector space V over a field (usually ℝ) is a set with addition and scalar multiplication satisfying 10 axioms (closure, associativity, commutativity, identity, inverse, distributivity) — in practice you mostly just check it's closed under addition and scalar multiplication.",
        "A subspace W of V is a subset that is itself a vector space under the same operations — to verify, check: (1) the zero vector is in W, (2) W is closed under addition, (3) W is closed under scalar multiplication.",
        "A set of vectors is linearly independent if no vector in the set can be written as a linear combination of the others — equivalently, c₁v₁+c₂v₂+...+cₙvₙ=0 forces all cᵢ=0.",
        "The span of a set of vectors is the set of all their possible linear combinations — it is always a subspace.",
        "A basis of V is a linearly independent set that spans V — every vector in V can then be written uniquely as a linear combination of basis vectors.",
        "Dimension = the number of vectors in any basis of V (this number is always the same regardless of which basis you pick).",
        "Coordinate representation: once a basis is fixed, every vector corresponds to a unique column of coefficients (its coordinate vector) relative to that basis.",
        "Row space of a matrix A = span of its rows; Column space of A = span of its columns. Row-reducing A to echelon form reveals a basis for the row space directly from the nonzero rows, and the pivot columns of the original A give a basis for the column space.",
        "rank(A) = dimension of the row space = dimension of the column space (they're always equal, even though row space and column space can live in different-dimensional ambient spaces).",
      ],
      definitions: [
        { term: "Vector Space", definition: "A set V equipped with vector addition and scalar multiplication satisfying closure, associativity, commutativity, existence of a zero vector and additive inverses, and distributivity laws relating the two operations." },
        { term: "Subspace", definition: "A subset W of a vector space V that is itself a vector space under V's operations; equivalently, W contains the zero vector and is closed under addition and scalar multiplication." },
        { term: "Linear Independence", definition: "A set of vectors {v₁,...,vₙ} is linearly independent if the only solution to c₁v₁+...+cₙvₙ=0 is c₁=c₂=...=cₙ=0." },
        { term: "Basis", definition: "A linearly independent set of vectors that spans the vector space, so every vector in the space has a unique representation as a linear combination of basis vectors." },
        { term: "Dimension", definition: "The number of vectors in any basis of a vector space — a well-defined invariant of the space, the same for every choice of basis." },
        { term: "Row Space / Column Space", definition: "The row space of a matrix is the span of its rows; the column space is the span of its columns. Both have dimension equal to rank(A)." },
      ],
      diagrams: [
        { title: "Span and basis in ℝ²/ℝ³", svgKey: "vector-space-basis", caption: "Two independent vectors span a plane; a basis is the minimal independent set that reaches every point in that span." },
      ],
      formulas: [
        { name: "Linear independence test", expression: "c₁v₁ + c₂v₂ + ... + cₙvₙ = 0  ⟹  c₁=c₂=...=cₙ=0" },
        { name: "Rank-dimension relation", expression: "dim(row space) = dim(column space) = rank(A)" },
        { name: "Rank-Nullity Theorem", expression: "rank(A) + nullity(A) = n   (n = number of columns of A)" },
      ],
      examFocus: [
        { question: "Determine whether a given set of vectors is linearly independent / forms a basis for the given space.", weightage: "high", note: "Set up c₁v₁+...+cₙvₙ=0 as a matrix equation and check if the only solution is trivial (or row-reduce and check the rank)." },
        { question: "Find a basis and the dimension for the row space / column space / null space of a given matrix.", weightage: "high" },
        { question: "Show that a given subset W of V is (or is not) a subspace of V.", weightage: "high", note: "Check zero vector, closure under addition, closure under scalar multiplication — show all three explicitly." },
        { question: "Find the coordinate vector of a given vector relative to a given basis.", weightage: "medium" },
      ],
      revisionNotes: [
        "Subspace check: 0 ∈ W, closed under +, closed under scalar ×.",
        "Independent: only trivial solution to c₁v₁+...+cₙvₙ=0.",
        "Basis = independent + spans. Dimension = size of any basis.",
        "Row-reduce A → nonzero rows of echelon form = basis for row space.",
        "Pivot columns of original A = basis for column space.",
        "rank(A) = dim(row space) = dim(column space). rank + nullity = n.",
      ],
      intuition:
        "A basis is the smallest possible 'ingredient list' for a space — few enough ingredients that none is redundant (independence), but enough that you can cook up any vector in the space from them (span). Dimension is just a count of how many ingredients that minimal list needs.",
      workedExamples: [
        {
          title: "Check linear independence of a set of vectors",
          problem: "Determine whether {(1,2,1), (2,1,0), (4,5,2)} is linearly independent in ℝ³.",
          steps: [
            { label: "Step 1: Set up the equation", content: "c₁(1,2,1) + c₂(2,1,0) + c₃(4,5,2) = (0,0,0)" },
            { label: "Step 2: Write as a system of equations", content: "c₁ + 2c₂ + 4c₃ = 0;  2c₁ + c₂ + 5c₃ = 0;  c₁ + 0c₂ + 2c₃ = 0" },
            { label: "Step 3: Solve (row reduce)", content: "From equation 3: c₁ = −2c₃. Substituting into equation 1: −2c₃ + 2c₂ + 4c₃ = 0 → 2c₂ + 2c₃ = 0 → c₂ = −c₃. Check in equation 2: 2(−2c₃) + (−c₃) + 5c₃ = −4c₃ − c₃ + 5c₃ = 0 ✓ (satisfied for ANY c₃)." },
          ],
          answer: "Non-trivial solutions exist (e.g. c₃=1, c₂=−1, c₁=−2), so the set is LINEARLY DEPENDENT — in fact (4,5,2) = 2(1,2,1) + 1(2,1,0).",
        },
      ],
      selfCheck: [
        { question: "If a set of 4 vectors lives in ℝ³, can it possibly be linearly independent? Why or why not?", answer: "No. In an n-dimensional space, you can have at most n linearly independent vectors. Any set of more than 3 vectors in ℝ³ must be linearly dependent." },
        { question: "Why is rank(A) the same number whether you compute it from the row space or the column space?", answer: "This is a fundamental theorem of linear algebra — the row rank and column rank of any matrix are always equal, even though the row space and column space can be subspaces of completely different-dimensional ambient spaces." },
      ],
    },

    // ---------------------------------------------------------------
    // MODULE II — Inner Product
    // ---------------------------------------------------------------
    {
      id: "m2",
      title: "Inner Product",
      number: 2,
      topics: [
        { title: "(Text 1: Relevant topics from sections 5.1, 5.2, 5.5) Inner Product: Inner product spaces, properties of inner product, length and distance, Orthogonality, Cauchy-Schwarz inequality, Orthogonal projection, orthogonal complement, Orthonormal basis, Gram-Schmidt orthogonalization process" },
      ],
      overview: {
        summary:
          "This module extends vector spaces with an inner product, giving a notion of length, distance and angle — leading to orthogonality, the Cauchy-Schwarz inequality, orthogonal projections, and the Gram-Schmidt process for building an orthonormal basis.",
        whyItMatters:
          "Gram-Schmidt and orthogonal projection problems are the highest-value numerical questions in this module and appear almost every semester — they're mechanical once you know the formula, so they're some of the most reliably scorable marks in the whole paper.",
      },
      coreConcepts: [
        "An inner product ⟨u,v⟩ on a vector space generalizes the dot product, satisfying linearity in one argument, symmetry, and positive-definiteness (⟨v,v⟩ ≥ 0, with equality only for v=0).",
        "Length (norm) of a vector: ‖v‖ = √⟨v,v⟩. Distance between two vectors: d(u,v) = ‖u−v‖.",
        "Two vectors u, v are orthogonal if ⟨u,v⟩ = 0.",
        "Cauchy-Schwarz inequality: |⟨u,v⟩| ≤ ‖u‖‖v‖ — this is what guarantees the angle formula cos θ = ⟨u,v⟩/(‖u‖‖v‖) always gives a value between −1 and 1.",
        "Orthogonal projection of v onto u: proj_u(v) = (⟨v,u⟩/⟨u,u⟩)u — the component of v lying along the direction of u.",
        "Orthogonal complement of a subspace W (written W⊥) is the set of all vectors orthogonal to every vector in W.",
        "An orthonormal basis is a basis whose vectors are mutually orthogonal AND each has unit length — coordinates relative to an orthonormal basis are found by simple inner products instead of solving a linear system.",
        "Gram-Schmidt process: starting from any basis {v₁,...,vₙ}, builds an orthogonal basis {u₁,...,uₙ} one vector at a time by subtracting off the projection onto all previously-built orthogonal vectors, then each uᵢ can be normalized (divided by its own length) to get an orthonormal basis.",
      ],
      definitions: [
        { term: "Inner Product", definition: "A function ⟨·,·⟩ on a vector space that is linear in its arguments, symmetric, and positive-definite, generalizing the dot product and providing a notion of length and angle." },
        { term: "Orthogonality", definition: "Two vectors u and v are orthogonal if their inner product ⟨u,v⟩ = 0." },
        { term: "Cauchy-Schwarz Inequality", definition: "For any vectors u, v in an inner product space, |⟨u,v⟩| ≤ ‖u‖·‖v‖, with equality if and only if u and v are linearly dependent." },
        { term: "Orthogonal Projection", definition: "The component of a vector v lying along the direction of another vector u (or subspace), given by proj_u(v) = (⟨v,u⟩/⟨u,u⟩)u." },
        { term: "Orthogonal Complement (W⊥)", definition: "The set of all vectors in the vector space that are orthogonal to every vector in a given subspace W." },
        { term: "Orthonormal Basis", definition: "A basis whose vectors are pairwise orthogonal and each has unit norm (length 1)." },
        { term: "Gram-Schmidt Orthogonalization", definition: "An algorithm that converts any basis of an inner product space into an orthogonal (and, after normalizing, orthonormal) basis by successively subtracting projections onto previously constructed vectors." },
      ],
      diagrams: [
        { title: "Orthogonal projection and Gram-Schmidt", svgKey: "gram-schmidt-projection", caption: "Each new vector has its projection onto the already-built orthogonal vectors subtracted off, leaving only the perpendicular leftover component." },
      ],
      formulas: [
        { name: "Norm (length)", expression: "‖v‖ = √⟨v,v⟩" },
        { name: "Distance", expression: "d(u,v) = ‖u − v‖" },
        { name: "Cauchy-Schwarz inequality", expression: "|⟨u,v⟩| ≤ ‖u‖·‖v‖" },
        { name: "Angle between vectors", expression: "cos θ = ⟨u,v⟩ / (‖u‖‖v‖)" },
        { name: "Orthogonal projection of v onto u", expression: "proj_u(v) = (⟨v,u⟩ / ⟨u,u⟩) · u" },
        { name: "Gram-Schmidt process", expression: "u₁=v₁ ;  uₖ = vₖ − Σᵢ₌₁^(k−1) (⟨vₖ,uᵢ⟩/⟨uᵢ,uᵢ⟩) uᵢ", note: "Normalize each uᵢ (divide by ‖uᵢ‖) at the end to get an orthonormal basis." },
      ],
      examFocus: [
        { question: "Apply the Gram-Schmidt process to a given set of vectors to construct an orthogonal/orthonormal basis.", weightage: "high", note: "Show every projection subtraction step explicitly — this is graded step-by-step." },
        { question: "Find the orthogonal projection of a given vector onto another vector or subspace.", weightage: "high" },
        { question: "Verify the Cauchy-Schwarz inequality for a given pair of vectors, or use it to bound an inner product.", weightage: "medium" },
        { question: "Find the orthogonal complement of a given subspace.", weightage: "medium" },
      ],
      revisionNotes: [
        "‖v‖=√⟨v,v⟩, d(u,v)=‖u−v‖, cosθ=⟨u,v⟩/(‖u‖‖v‖).",
        "Orthogonal: ⟨u,v⟩=0. Cauchy-Schwarz: |⟨u,v⟩|≤‖u‖‖v‖.",
        "proj_u(v) = (⟨v,u⟩/⟨u,u⟩)u — memorize this exact formula.",
        "Gram-Schmidt: uₖ = vₖ − (sum of projections onto all previous uᵢ).",
        "Orthonormal basis: pairwise orthogonal AND each vector has length 1.",
      ],
      intuition:
        "Gram-Schmidt is just repeatedly asking 'how much of this new vector is just a shadow of what I already have?' — projecting it onto everything built so far, then throwing that shadow away. Whatever's left over is guaranteed perpendicular to everything before it, by construction, not by luck.",
      workedExamples: [
        {
          title: "Apply Gram-Schmidt to two vectors",
          problem: "Apply Gram-Schmidt to v₁=(1,1,0) and v₂=(1,0,1) to find an orthogonal basis.",
          steps: [
            { label: "Step 1: u₁ = v₁", content: "u₁ = (1,1,0). No previous vectors to subtract a projection from." },
            { label: "Step 2: Find the projection of v₂ onto u₁", content: "⟨v₂,u₁⟩ = (1)(1)+(0)(1)+(1)(0) = 1. ⟨u₁,u₁⟩ = 1+1+0 = 2. proj = (1/2)(1,1,0) = (0.5, 0.5, 0)." },
            { label: "Step 3: Subtract the projection from v₂", content: "u₂ = v₂ − proj = (1,0,1) − (0.5,0.5,0) = (0.5, −0.5, 1)." },
          ],
          answer: "Orthogonal basis: u₁=(1,1,0), u₂=(0.5,−0.5,1) — check: ⟨u₁,u₂⟩ = 0.5−0.5+0 = 0 ✓",
        },
      ],
      comparisons: [
        {
          title: "Orthogonal Basis vs Orthonormal Basis",
          scenario: "Gram-Schmidt's raw output isn't quite the final answer most problems want.",
          a: { label: "Orthogonal basis", body: "Vectors are mutually perpendicular (⟨uᵢ,uⱼ⟩=0 for i≠j), but may have any length. This is exactly what Gram-Schmidt produces directly." },
          b: { label: "Orthonormal basis", body: "Orthogonal AND every vector has length exactly 1. Get this by dividing each uᵢ by its own norm ‖uᵢ‖ — one extra step after Gram-Schmidt." },
          takeaway: "If a question says 'orthonormal', don't stop at Gram-Schmidt's raw output — normalize every vector before you submit the answer.",
        },
      ],
      selfCheck: [
        { question: "Why is the Cauchy-Schwarz inequality exactly what guarantees cos θ = ⟨u,v⟩/(‖u‖‖v‖) is always a valid value between −1 and 1?", answer: "Cauchy-Schwarz states |⟨u,v⟩| ≤ ‖u‖‖v‖, which means the ratio ⟨u,v⟩/(‖u‖‖v‖) always has absolute value ≤ 1 — exactly the range needed for it to be a valid cosine value." },
        { question: "In Gram-Schmidt, why must you subtract the projection onto EVERY previously built vector, not just the immediately preceding one?", answer: "Each new vector needs to be orthogonal to the ENTIRE space spanned by all previous vectors, not just the last one. Subtracting only the most recent projection would leave a leftover component still pointing partly along an earlier vector." },
      ],
    },

    // ---------------------------------------------------------------
    // MODULE III — Complex Differentiation
    // ---------------------------------------------------------------
    {
      id: "m3",
      title: "Complex Differentiation",
      number: 3,
      topics: [
        { title: "(Text 2: Relevant topics from sections 13.3,13.4) Circles and disks half-planes, complex functions, limit, continuity and derivatives, analytic functions, Cauchy-Riemann equations, Laplace equation, Harmonic functions, harmonic conjugate functions" },
      ],
      overview: {
        summary:
          "This module moves into complex analysis: regions in the complex plane, limits/continuity/derivatives of complex functions, analytic functions, the Cauchy-Riemann equations, and the connection to harmonic functions via the Laplace equation.",
        whyItMatters:
          "Checking the Cauchy-Riemann equations and finding a harmonic conjugate are the two most reliable question types here, and they set up everything in Module IV (analytic functions are exactly the ones you can integrate with Cauchy's theorems).",
      },
      coreConcepts: [
        "Regions in the complex plane: a disk |z−z₀|<r is the open disk of radius r about z₀; a circle |z−z₀|=r is its boundary; a half-plane is the set of points on one side of a line (e.g. Re(z)>0).",
        "A complex function w=f(z) maps points in the z-plane to points in the w-plane; limits and continuity are defined exactly as in real analysis but distance is measured with the complex modulus.",
        "The derivative f'(z) exists at z₀ if the limit [f(z)−f(z₀)]/(z−z₀) exists as z→z₀ from EVERY direction in the complex plane — this is a much stronger requirement than real differentiability.",
        "f(z) is analytic (holomorphic) at z₀ if it is differentiable at every point in some neighbourhood of z₀, not just at the single point.",
        "Cauchy-Riemann equations: writing f(z)=u(x,y)+iv(x,y), f is analytic only if ∂u/∂x=∂v/∂y and ∂u/∂y=−∂v/∂x (and these partials are continuous) — this is the standard test for analyticity.",
        "If f=u+iv is analytic, both u and v individually satisfy Laplace's equation (∇²u=0, ∇²v=0) — they are called harmonic functions.",
        "Given one harmonic function u, its harmonic conjugate v is found by integrating the Cauchy-Riemann relations (∂v/∂y=∂u/∂x and ∂v/∂x=−∂u/∂y), making f=u+iv analytic.",
      ],
      definitions: [
        { term: "Analytic (Holomorphic) Function", definition: "A complex function that is differentiable at every point in some neighbourhood of a given point, not merely at that single point." },
        { term: "Cauchy-Riemann Equations", definition: "For f(z)=u(x,y)+iv(x,y) to be analytic, the equations ∂u/∂x=∂v/∂y and ∂u/∂y=−∂v/∂x must hold, with all four partial derivatives continuous." },
        { term: "Harmonic Function", definition: "A real-valued function φ(x,y) satisfying Laplace's equation ∂²φ/∂x² + ∂²φ/∂y² = 0; the real and imaginary parts of any analytic function are harmonic." },
        { term: "Harmonic Conjugate", definition: "Given a harmonic function u, a harmonic function v such that f=u+iv is analytic — found by integrating the Cauchy-Riemann equations." },
      ],
      diagrams: [
        { title: "Regions in the complex plane", svgKey: "complex-plane-regions", caption: "A disk, a circle (its boundary), and a half-plane — the three region types this module's problems are usually phrased around." },
      ],
      formulas: [
        { name: "Cauchy-Riemann equations", expression: "∂u/∂x = ∂v/∂y     and     ∂u/∂y = −∂v/∂x" },
        { name: "Laplace's equation (2D)", expression: "∂²φ/∂x² + ∂²φ/∂y² = 0" },
        { name: "Derivative of an analytic function", expression: "f'(z) = ∂u/∂x + i·∂v/∂x   (using the C-R equations)" },
      ],
      examFocus: [
        { question: "Verify the Cauchy-Riemann equations for a given f(z) and determine whether it is analytic.", weightage: "high" },
        { question: "Given a harmonic function u(x,y), find its harmonic conjugate v(x,y) and write the analytic function f=u+iv.", weightage: "high", note: "Integrate ∂v/∂y=∂u/∂x with respect to y, then fix the integration 'constant' (a function of x) using the second C-R equation." },
        { question: "Show that a given function u(x,y) is harmonic (satisfies Laplace's equation).", weightage: "medium" },
        { question: "Identify and sketch a given region in the complex plane (disk/circle/half-plane).", weightage: "low" },
      ],
      revisionNotes: [
        "Analytic = differentiable in a whole neighbourhood, not just one point.",
        "C-R equations: uₓ=vy, uy=−vₓ — the standard analyticity test.",
        "Real and imaginary parts of an analytic function are both harmonic (∇²=0).",
        "Harmonic conjugate: integrate C-R equations, fix constant using the other C-R equation.",
        "f'(z) = uₓ + ivₓ once C-R equations confirm analyticity.",
      ],
      intuition:
        "Real differentiability only has to work approaching from left and right. Complex differentiability has to work approaching from EVERY direction in a 2D plane simultaneously — the Cauchy-Riemann equations are just the price of admission for that much stricter requirement, which is exactly why analytic functions turn out to be so much better-behaved than typical real functions.",
      workedExamples: [
        {
          title: "Find the harmonic conjugate of a given function",
          problem: "Given u(x,y) = x² − y², find its harmonic conjugate v(x,y) such that f=u+iv is analytic.",
          steps: [
            { label: "Step 1: Use the first C-R equation", content: "∂v/∂y = ∂u/∂x = 2x. Integrate with respect to y: v = 2xy + g(x), where g(x) is an unknown function of x alone." },
            { label: "Step 2: Use the second C-R equation to find g(x)", content: "∂u/∂y = −∂v/∂x. LHS: ∂u/∂y = −2y. RHS: ∂v/∂x = 2y + g'(x). So −2y = −(2y + g'(x)) → −2y = −2y − g'(x) → g'(x) = 0." },
            { label: "Step 3: Conclude g(x)", content: "g'(x) = 0 means g(x) = C, an arbitrary real constant." },
          ],
          answer: "v(x,y) = 2xy + C  (so f(z) = (x²−y²) + i(2xy+C) = z² + iC, which is indeed analytic)",
        },
      ],
      selfCheck: [
        { question: "If a function f(z) satisfies the Cauchy-Riemann equations at a single isolated point but nowhere else nearby, is it analytic at that point?", answer: "No. Analyticity requires differentiability throughout an entire neighbourhood of the point, not just at the point itself. Satisfying C-R at one isolated point is necessary but not sufficient." },
        { question: "Why must the real and imaginary parts of ANY analytic function both satisfy Laplace's equation?", answer: "Differentiating the Cauchy-Riemann equations (uₓ=vy, uy=−vₓ) again and combining them eliminates v (or u) entirely and produces uₓₓ+uyy=0 (and the same for v) — this is exactly Laplace's equation, so it falls out automatically from analyticity." },
      ],
    },

    // ---------------------------------------------------------------
    // MODULE IV — Complex Integration
    // ---------------------------------------------------------------
    {
      id: "m4",
      title: "Complex Integration",
      number: 4,
      topics: [
        { title: "(Text 2- Relevant topics from sections 14.1,14.2,14.3,14.4,15.4,16.1,16.2,16.3) Cauchy’s integral theorem for simply connected domains (without proof), Cauchy’s Integral formula for simply connected domains (without proof), Cauchy’s Integral formula for derivatives of analytic functions, Taylor and Maclaurin series, Laurent's series, Poles and Residues, Evaluation of residues, Cauchy's residue theorem" },
      ],
      overview: {
        summary:
          "This module covers Cauchy's integral theorem and formula, power series representations of analytic functions (Taylor and Laurent series), poles and residues, and Cauchy's residue theorem for evaluating contour integrals.",
        whyItMatters:
          "Evaluating a contour integral using the residue theorem is the single highest-mark numerical question type in this entire course — it combines almost everything from this module (finding poles, computing residues, applying the theorem) into one question, so it's worth mastering completely.",
      },
      coreConcepts: [
        "Cauchy's Integral Theorem: if f(z) is analytic everywhere inside and on a simple closed contour C, then ∮_C f(z) dz = 0.",
        "Cauchy's Integral Formula: if f is analytic inside and on C and z₀ is inside C, then f(z₀) = (1/2πi) ∮_C f(z)/(z−z₀) dz — this lets you evaluate f at any interior point just from its boundary values.",
        "Cauchy's formula for derivatives: f⁽ⁿ⁾(z₀) = (n!/2πi) ∮_C f(z)/(z−z₀)ⁿ⁺¹ dz — every derivative of an analytic function can also be recovered from a contour integral.",
        "Taylor series: an analytic function can be expanded as a power series Σ aₙ(z−z₀)ⁿ around any point z₀ where it is analytic, valid inside the largest disk of analyticity.",
        "Laurent series: when f has a singularity at z₀, it can still be expanded as Σ aₙ(z−z₀)ⁿ but now allowing negative powers of (z−z₀) too — the negative-power part is called the principal part.",
        "A pole of order m at z₀ is a singularity where the Laurent series' principal part terminates at (z−z₀)⁻ᵘ — a simple pole has m=1.",
        "The residue of f at a pole z₀ is the coefficient a₋₁ of (z−z₀)⁻¹ in the Laurent expansion — it is the single number that determines the contour integral's value.",
        "For a simple pole: Res(f,z₀) = lim_{z→z₀} (z−z₀)f(z). For a pole of order m: Res(f,z₀) = (1/(m−1)!) lim_{z→z₀} d^(m−1)/dz^(m−1) [(z−z₀)ᵘf(z)].",
        "Cauchy's Residue Theorem: ∮_C f(z) dz = 2πi × (sum of residues of f at all poles enclosed by C) — this single theorem is what makes contour integration computationally tractable.",
      ],
      definitions: [
        { term: "Simple Closed Contour", definition: "A closed curve in the complex plane that does not cross itself, traversed (conventionally) in the counter-clockwise direction." },
        { term: "Pole", definition: "An isolated singularity z₀ of f(z) at which the Laurent series' principal part has finitely many terms; the highest negative power present gives the order of the pole." },
        { term: "Residue", definition: "The coefficient a₋₁ of the (z−z₀)⁻¹ term in the Laurent series expansion of f(z) about a singularity z₀." },
        { term: "Cauchy's Residue Theorem", definition: "For f analytic inside and on a simple closed contour C except at finitely many isolated singularities inside C, ∮_C f(z)dz = 2πi times the sum of the residues of f at those singularities." },
      ],
      diagrams: [
        { title: "Closed contour enclosing poles", svgKey: "contour-integration-path", caption: "Only the poles physically inside the contour contribute to the integral — anything outside C contributes nothing." },
      ],
      formulas: [
        { name: "Cauchy's Integral Theorem", expression: "∮_C f(z) dz = 0   (f analytic inside & on C)" },
        { name: "Cauchy's Integral Formula", expression: "f(z₀) = (1/2πi) ∮_C f(z)/(z−z₀) dz" },
        { name: "Cauchy's formula for derivatives", expression: "f⁽ⁿ⁾(z₀) = (n!/2πi) ∮_C f(z)/(z−z₀)ⁿ⁺¹ dz" },
        { name: "Residue at a simple pole", expression: "Res(f, z₀) = lim_{z→z₀} (z−z₀)·f(z)" },
        { name: "Residue at a pole of order m", expression: "Res(f, z₀) = (1/(m−1)!) · lim_{z→z₀} dᵘ⁻¹/dzᵘ⁻¹ [(z−z₀)ᵘ f(z)]" },
        { name: "Cauchy's Residue Theorem", expression: "∮_C f(z) dz = 2πi · Σ Res(f, zₖ)   (sum over poles zₖ inside C)" },
      ],
      examFocus: [
        { question: "Evaluate a given contour integral using Cauchy's Residue Theorem.", weightage: "high", note: "4-step method: (1) find all poles, (2) check which lie inside C, (3) compute the residue at each, (4) multiply the sum by 2πi." },
        { question: "Find the Taylor series / Laurent series expansion of a given function about a specified point.", weightage: "high" },
        { question: "Find the residue of a given function at a specified pole.", weightage: "high" },
        { question: "Apply Cauchy's integral formula to evaluate a given contour integral directly.", weightage: "medium" },
        { question: "Classify the singularities of a given function and state the order of each pole.", weightage: "medium" },
      ],
      revisionNotes: [
        "Cauchy's theorem: analytic inside & on C ⟹ ∮f dz = 0.",
        "Cauchy's formula: f(z₀) = (1/2πi)∮ f(z)/(z−z₀) dz.",
        "Pole order m → principal part of Laurent series stops at (z−z₀)⁻ᵘ.",
        "Residue = coefficient of (z−z₀)⁻¹ in Laurent series.",
        "Simple pole residue: lim (z−z₀)f(z). Order-m pole: use the (m−1)-th derivative formula.",
        "Residue theorem: ∮f dz = 2πi × Σ(residues inside C only).",
      ],
      intuition:
        "The residue theorem is almost absurdly generous: no matter how complicated f(z) is inside the contour, the ENTIRE integral collapses down to just one number per pole — the residue — and everything else about the function's behaviour inside the loop is irrelevant. Most of complex integration's 'difficulty' is just carefully finding that one number.",
      workedExamples: [
        {
          title: "Evaluate a contour integral using the residue theorem",
          problem: "Evaluate ∮_C 1/(z(z−2)) dz, where C is the circle |z|=3.",
          steps: [
            { label: "Step 1: Find all poles", content: "f(z) = 1/(z(z−2)) has simple poles at z=0 and z=2." },
            { label: "Step 2: Check which poles lie inside C", content: "C is |z|=3, a circle of radius 3 centered at origin. Both z=0 (distance 0) and z=2 (distance 2) are inside, since both are less than 3." },
            { label: "Step 3: Compute the residue at each pole", content: "At z=0: Res = lim_{z→0} z·f(z) = lim 1/(z−2) = 1/(0−2) = −1/2. At z=2: Res = lim_{z→2} (z−2)·f(z) = lim 1/z = 1/2." },
            { label: "Step 4: Apply the residue theorem", content: "∮f dz = 2πi × (sum of residues) = 2πi × (−1/2 + 1/2) = 2πi × 0." },
          ],
          answer: "∮_C f(z) dz = 0",
        },
      ],
      selfCheck: [
        { question: "If a contour C only encloses ONE of a function's two poles, does the other pole affect the integral's value at all?", answer: "No — the residue theorem only sums the residues of poles INSIDE the contour. A pole outside C contributes nothing to ∮f dz, no matter how large its residue is." },
        { question: "What's the practical difference between using Cauchy's Integral Formula directly versus using the Residue Theorem?", answer: "Cauchy's Integral Formula is really just the residue theorem applied to a single simple pole where f(z)/(z−z₀) has a known residue f(z₀). The residue theorem is the more general tool — it handles any number of poles of any order inside C, while Cauchy's formula is the special, simpler case." },
      ],
    },

    // ---------------------------------------------------------------
    // MODULE V — Partial Differential Equations
    // ---------------------------------------------------------------
    {
      id: "m5",
      title: "Partial Differential Equations",
      number: 5,
      topics: [
        { title: "(Text 3: Relevant topics from sections 17.1,17.2,17.3,17.4,17.5) Introduction, Formation of partial differential equations -elimination of arbitrary constants-elimination of arbitrary functions, Solutions of partial differential equations, Equations solvable by direct integration, Linear equations of the first order, Lagrange's linear equation" },
      ],
      overview: {
        summary:
          "This module covers how partial differential equations (PDEs) are formed — by eliminating arbitrary constants or arbitrary functions — and methods for solving first-order PDEs: direct integration, linear first-order PDEs, and Lagrange's linear equation.",
        whyItMatters:
          "Forming a PDE by eliminating constants/functions and solving a Lagrange's linear equation are both standard, mechanical question types that appear reliably — the key skill is recognizing which method a given PDE calls for.",
      },
      coreConcepts: [
        "A PDE involves an unknown function of two or more independent variables and its partial derivatives — commonly written with p=∂z/∂x and q=∂z/∂y for a function z(x,y).",
        "Forming a PDE by eliminating arbitrary constants: start from a relation involving x, y, z and two arbitrary constants, differentiate partially with respect to x and y to get two more equations, then eliminate the constants between all three equations.",
        "Forming a PDE by eliminating an arbitrary function: start from a relation like z=f(u) where u is some expression in x,y,z, differentiate partially to get equations involving f'(u), then eliminate f'(u) between them to leave a relation purely in p, q, x, y, z.",
        "Equations solvable by direct integration: when the PDE only involves p or q (not both, and no x,y,z mixed in awkwardly), integrate directly with respect to the relevant variable, treating the other variable as constant — the 'constant' of integration becomes an arbitrary function of that other variable.",
        "Linear first-order PDE (Lagrange's linear equation) has the standard form Pp + Qq = R, where P, Q, R are functions of x, y, z.",
        "Lagrange's method solves Pp+Qq=R by writing the auxiliary (subsidiary) equations dx/P = dy/Q = dz/R, finding two independent solutions u=c₁ and v=c₂ from these, and the general solution is then φ(u,v)=0 for an arbitrary function φ.",
      ],
      definitions: [
        { term: "Partial Differential Equation (PDE)", definition: "An equation involving an unknown function of two or more independent variables and one or more of its partial derivatives." },
        { term: "Order of a PDE", definition: "The order of the highest partial derivative appearing in the equation." },
        { term: "Lagrange's Linear Equation", definition: "A first-order PDE of the form Pp + Qq = R, where P, Q, R are functions of x, y, z and p=∂z/∂x, q=∂z/∂y; solved via the auxiliary equations dx/P=dy/Q=dz/R." },
        { term: "Subsidiary (Auxiliary) Equations", definition: "The set of ordinary differential equations dx/P=dy/Q=dz/R derived from a Lagrange's linear PDE Pp+Qq=R, whose solutions are combined to form the PDE's general solution." },
      ],
      diagrams: [],
      formulas: [
        { name: "Standard notation", expression: "p = ∂z/∂x   ,   q = ∂z/∂y" },
        { name: "Lagrange's linear equation", expression: "Pp + Qq = R" },
        { name: "Lagrange's auxiliary equations", expression: "dx/P = dy/Q = dz/R" },
        { name: "General solution form (Lagrange's method)", expression: "φ(u, v) = 0,   where u=c₁ and v=c₂ solve the auxiliary equations" },
      ],
      examFocus: [
        { question: "Form the PDE by eliminating the arbitrary constants from a given relation.", weightage: "high" },
        { question: "Form the PDE by eliminating the arbitrary function from a given relation z=f(u).", weightage: "high" },
        { question: "Solve a given Lagrange's linear equation Pp+Qq=R using the auxiliary equations.", weightage: "high", note: "Find two independent solutions from dx/P=dy/Q=dz/R, then write the general solution as φ(u,v)=0." },
        { question: "Solve a given PDE that is directly integrable in p or q.", weightage: "medium" },
      ],
      revisionNotes: [
        "p=∂z/∂x, q=∂z/∂y — standard shorthand throughout this module.",
        "Eliminate constants: differentiate w.r.t. x and y, eliminate constants among all 3 equations.",
        "Eliminate function: differentiate to get f'(u) in two equations, eliminate f'(u).",
        "Direct integration: integrate w.r.t. the relevant variable; constant → arbitrary function of the other variable.",
        "Lagrange's Pp+Qq=R → solve dx/P=dy/Q=dz/R → get u=c₁, v=c₂ → general solution φ(u,v)=0.",
      ],
      intuition:
        "Solving an ODE gives you a family of curves controlled by a handful of CONSTANTS. Solving Lagrange's PDE gives you a family of SURFACES controlled by an entire arbitrary FUNCTION — that jump from constants to functions is the single biggest conceptual leap going from ODEs to PDEs, and it's exactly why the general solution is written φ(u,v)=0 instead of just '=c'.",
      workedExamples: [
        {
          title: "Form a PDE by eliminating an arbitrary constant",
          problem: "Form the partial differential equation from z = ax + by, where a and b are arbitrary constants.",
          steps: [
            { label: "Step 1: Differentiate w.r.t. x", content: "p = ∂z/∂x = a" },
            { label: "Step 2: Differentiate w.r.t. y", content: "q = ∂z/∂y = b" },
            { label: "Step 3: Eliminate a and b", content: "Substitute a=p and b=q back into the original relation z = ax + by." },
          ],
          answer: "z = px + qy",
        },
      ],
      selfCheck: [
        { question: "Why does the 'arbitrary constant' integration constant become an arbitrary FUNCTION when solving a PDE by direct integration?", answer: "When integrating a PDE with respect to one variable (say x) while treating y as fixed, anything that's constant with respect to x — including any function of y alone — would vanish under that differentiation. So the 'constant' of integration must be allowed to be an arbitrary function of the other variable, not just a plain number." },
        { question: "In Lagrange's method, what do the two solutions u=c₁ and v=c₂ (from the auxiliary equations) actually represent?", answer: "They are two independent relations that are constant along the characteristic curves of the PDE. Combining them as φ(u,v)=0, for an arbitrary function φ, captures every possible solution surface of the original PDE — that's why the general solution must be written this way rather than as a single fixed equation." },
      ],
    },
  ],
};

export default content;
