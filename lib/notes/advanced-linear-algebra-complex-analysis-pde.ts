// ER Subject: Advanced Linear Algebra, Complex Analysis & PDE
// Imported from CSE Core S3-S8 2024 COMPLETE SYLLABUS JSON
// Program: ER, Scheme: 2024, Semester: s3

import { Module, Topic, SubjectContent } from "../types";

const topicsModuleI: Topic[] = [
  { title: "Vector Spaces, Subspaces - Definition and Examples", details: "Vector Spaces, Subspaces -Definition and Examples. Linear independence of vectors, Linear span, Basis and dimension, Co-ordinate representation of vectors, Row space and Column space" },
  { title: "Linear independence of vectors", details: "Linear independence of vectors, Linear span, Basis and dimension" },
];

const topicsModuleII: Topic[] = [
  { title: "Inner Product: Inner product spaces", details: "Inner Product: Inner product spaces, properties of inner product, length and distance, Orthogonality, Cauchy-Schwarz inequality, Orthogonal projection, orthogonal compliment, Orthonormal basis, Gram Schmidt orthogonalization process" },
];

const topicsModuleIII: Topic[] = [
  { title: "Complex differentiation: Analytic functions", details: "Circles and disks half planes, complex functions, limit, continuity and derivatives, analytic functions, Cauchy-Riemann equations, Laplace equation, Harmonic functions, harmonic conjugate functions" },
];

const topicsModuleIV: Topic[] = [
  { title: "Complex Integration: Cauchy's integral theorem", details: "Cauchy's integral theorem for simply connected domains (without proof), Cauchy's Integral formula for simply connected domains (without proof), Cauchy's Integral formula for derivatives of an analytic function, Taylor's series, Maclaurin series and Laurent's series, Poles and Residues, Evaluation of residues, Cauchy's residue theorem" },
];

const topicsModuleV: Topic[] = [
  { title: "Partial Differential Equations: Formation and solutions", details: "Introduction, Formation of partial differential equations - elimination of arbitrary constants - elimination of arbitrary functions, Solutions of partial differential equations, Equations solvable by direct integration, Linear equations of the first order, Lagrange's linear equation" },
];

const content: SubjectContent = {
  code: "24MAP301",
  name: "Advanced Linear Algebra, Complex Analysis & PDE",
  semester: "s3",
  programId: "ER",
  category: "math",
  credits: 5,
  ltpj: "5-1-2-0-5",
  modules: [
    {
      id: "m1",
      number: 1,
      title: ": (Vector space)",
      topics: topicsModuleI,
      overview: {
        summary: "Vector spaces, subspaces, linear independence, basis and dimension",
        whyItMatters: "Foundation for all subsequent topics in linear algebra and analysis"
      },
      coreConcepts: [
        "Vector space axioms",
        "Linear independence",
        "Basis and dimension",
        "Coordinate representation"
      ],
      definitions: [
        { term: "Vector Space", definition: "A set of vectors with two operations (addition and scalar multiplication) satisfying eight axioms" },
        { term: "Linear Independence", definition: "A set of vectors where no vector is a linear combination of the others" },
        { term: "Basis", definition: "A linearly independent set that spans the vector space" },
        { term: "Dimension", definition: "The number of vectors in a basis for the vector space" }
      ],
      diagrams: [],
      formulas: [],
      examFocus: [
        { question: "Define a vector space and give an example", weightage: "high" },
        { question: "Determine if a set of vectors is linearly independent", weightage: "high" }
      ],
      revisionNotes: [
        "A vector space generalizes the concept of Euclidean space",
        "Subspaces are subsets that are themselves vector spaces",
        "A basis provides a coordinate system for the vector space",
        "Dimension is an invariant of the vector space"
      ]
    },
    {
      id: "m2",
      number: 2,
      title: ": (Inner Product)",
      topics: topicsModuleII,
      overview: {
        summary: "Inner product spaces, orthogonality, projection, Gram-Schmidt process",
        whyItMatters: "Enables measurement of angles and lengths in abstract vector spaces"
      },
      coreConcepts: [
        "Inner product axioms",
        "Cauchy-Schwarz inequality",
        "Orthogonality and orthogonal projection",
        "Gram-Schmidt orthogonalization"
      ],
      definitions: [
        { term: "Inner Product", definition: "A generalization of the dot product to abstract vector spaces" },
        { term: "Orthogonal", definition: "Two vectors are orthogonal if their inner product is zero" },
        { term: "Gram-Schmidt", definition: "Process to orthogonalize a set of vectors" }
      ],
      diagrams: [],
      formulas: [],
      examFocus: [
        { question: "State the Cauchy-Schwarz inequality", weightage: "high" },
        { question: "Apply Gram-Schmidt to find an orthogonal basis", weightage: "medium" }
      ],
      revisionNotes: [
        "Inner product generalizes the dot product to abstract spaces",
        "Orthogonal projection is useful for least squares approximation",
        "Gram-Schmidt produces an orthogonal basis from any basis"
      ]
    },
    {
      id: "m3",
      number: 3,
      title: ": (Complex differentiation)",
      topics: topicsModuleIII,
      overview: {
        summary: "Analytic functions, Cauchy-Riemann equations, harmonic functions",
        whyItMatters: "Complex differentiation is much more restrictive than real differentiation"
      },
      coreConcepts: [
        "Analytic (holomorphic) functions",
        "Cauchy-Riemann equations",
        "Harmonic functions and conjugates"
      ],
      definitions: [
        { term: "Analytic Function", definition: "A complex function that is differentiable at every point in a domain" },
        { term: "Cauchy-Riemann Equations", definition: "Necessary and sufficient conditions for a function to be analytic" },
        { term: "Harmonic Function", definition: "A real-valued function satisfying Laplace's equation" }
      ],
      diagrams: [],
      formulas: [],
      examFocus: [
        { question: "State the Cauchy-Riemann equations", weightage: "high" },
        { question: "Determine if a function is analytic", weightage: "medium" }
      ],
      revisionNotes: [
        "Analytic functions are infinitely differentiable",
        "The Cauchy-Riemann equations link real and imaginary parts",
        "Harmonic functions appear in potential theory and physics"
      ]
    },
    {
      id: "m4",
      number: 4,
      title: ": (Complex Integration)",
      topics: topicsModuleIV,
      overview: {
        summary: "Cauchy's integral theorem, Cauchy's integral formula, residue theorem",
        whyItMatters: "Complex integration simplifies many real integrals and is essential for residue calculus"
      },
      coreConcepts: [
        "Cauchy's integral theorem",
        "Cauchy's integral formula",
        "Residues and isolated singularities",
        "Residue theorem"
      ],
      definitions: [
        { term: "Contour Integral", definition: "Integral of a complex function along a path in the complex plane" },
        { term: "Residue", definition: "The coefficient of (z-z₀)⁻¹ in the Laurent series expansion around a singularity" },
        { term: "Residue Theorem", definition: "Relates contour integrals to sum of residues inside the contour" }
      ],
      diagrams: [],
      formulas: [],
      examFocus: [
        { question: "State Cauchy's integral formula", weightage: "high" },
        { question: "Use residues to evaluate real integrals", weightage: "high" }
      ],
      revisionNotes: [
        "Cauchy's integral theorem: integral of analytic function over closed contour is zero",
        "Residue theorem is powerful for evaluating real integrals",
        "Isolated singularities: removable, pole, essential"
      ]
    },
    {
      id: "m5",
      number: 5,
      title: ": (Partial Differential Equations)",
      topics: topicsModuleV,
      overview: {
        summary: "Formation of PDEs, methods of solution, first-order equations",
        whyItMatters: "PDEs model many physical phenomena (heat, wave, potential)"
      },
      coreConcepts: [
        "Formation of PDEs by elimination of arbitrary constants/functions",
        "Lagrange's method for first-order linear PDEs",
        "Solutions by direct integration"
      ],
      definitions: [
        { term: "Partial Differential Equation", definition: "An equation involving partial derivatives of a function of multiple variables" },
        { term: "Order of PDE", definition: "The highest order of derivative present in the equation" },
        { term: "Lagrange's Linear Equation", definition: "First-order PDE of the form Pp + Qq = R" }
      ],
      diagrams: [],
      formulas: [],
      examFocus: [
        { question: "Form a PDE by eliminating arbitrary constants", weightage: "medium" },
        { question: "Solve using Lagrange's method", weightage: "medium" }
      ],
      revisionNotes: [
        "PDE formation: eliminate constants or functions from given equation",
        "Lagrange's method uses auxiliary equations dx/P = dy/Q = dz/R",
        "First-order linear PDEs have standard solution methods"
      ]
    }
  ],
};

export default content;