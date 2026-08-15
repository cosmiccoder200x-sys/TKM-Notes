// CS [AI] Subject: Advanced Linear Algebra, Complex Analysis & PDE [AI]
// Imported from CSE [AI] S3-S8 2024 COMPLETE IMPORT JSON
// Program: CS_AI, Scheme: 2024, Semester: s3

import { Module, Topic, SubjectContent } from "../types";

const topicsModuleI: Topic[] = [
  { title: "Vector Spaces, Subspaces - Definition and Examples", details: "Vector Spaces, Subspaces -Definition and Examples. Linear independence of vectors, Linear span, Basis and dimension, Co-ordinate representation of vectors" },
  { title: "Linear Transformations", details: "Linear transformations, Matrix representation of linear transformations, Change of basis, Properties of linear transformations, kernel and image of linear transformation, rank and nullity" },
];

const topicsModuleII: Topic[] = [
  { title: "Inner Product: Inner product spaces", details: "Inner Product: Inner product spaces, properties of inner product, length and distance, Orthogonality, Cauchy-Schwarz inequality, Orthogonal projection, Orthonormal basis, Gram- Schmidt orthonormalization process" },
];

const topicsModuleIII: Topic[] = [
  { title: "Complex differentiation: Analytic functions", details: "Circles and disks half planes, complex functions, limit, continuity and derivatives, analytic functions, Cauchy-Riemann equations, Laplace equation, Harmonic functions, harmonic conjugate functions" },
];

const topicsModuleIV: Topic[] = [
  { title: "Complex Integration: Cauchy's integral formula", details: "Cauchy's integral theorem for simply connected domains (without proof), Cauchy's Integral formula for simply connected domains (without proof), Cauchy's Integral formula for derivatives of an analytic function, Taylor's series, Maclaurin series and Laurent's series, Poles and Residues, Evaluation of residues, Cauchy's residue theorem" },
];

const topicsModuleV: Topic[] = [
  { title: "Partial Differential Equations and Fourier Analysis", details: "Introduction to Partial Differential Equations, Formation of partial differential equations, Solutions by direct integration, Lagrange's linear equation, Introduction to Fourier series, Fourier sine and cosine transforms" },
];

const content: SubjectContent = {
  code: "24MAP300",
  name: "Advanced Linear Algebra, Complex Analysis & PDE [AI]",
  semester: "s3",
  programId: "CS_AI",
  category: "math",
  credits: 5,
  ltpj: "5-1-2-0-5",
  modules: [
    {
      id: "m1",
      number: 1,
      title: "I: (Vector space)",
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
        "Subsets that are themselves vector spaces are subspaces",
        "A basis provides a coordinate system for the vector space",
        "Dimension is an invariant of the vector space"
      ]
    },
    {
      id: "m2",
      number: 2,
      title: "I: (Linear Transformations)",
      topics: topicsModuleII,
      overview: {
        summary: "Linear transformations, matrix representation, change of basis, kernel and image",
        whyItMatters: "Linear transformations preserve vector space structure and are fundamental to analysis"
      },
      coreConcepts: [
        "Linear transformation properties",
        "Matrix representation",
        "Change of basis",
        "Kernel and image"
      ],
      definitions: [
        { term: "Linear Transformation", definition: "A function between vector spaces that preserves vector addition and scalar multiplication" },
        { term: "Kernel", definition: "Set of vectors that map to the zero vector" },
        { term: "Image", definition: "Set of all outputs of the transformation" }
      ],
      diagrams: [],
      formulas: [],
      examFocus: [
        { question: "Find the kernel of a linear transformation", weightage: "medium" },
        { question: "Find the image of a linear transformation", weightage: "medium" }
      ],
      revisionNotes: [
        "Every linear transformation can be represented by a matrix",
        "The rank-nullity theorem: dim(domain) = rank + nullity",
        "Similar matrices represent the same transformation in different bases"
      ]
    },
    {
      id: "m3",
      number: 3,
      title: "I: (Inner Product)",
      topics: topicsModuleIII,
      overview: {
        summary: "Inner product spaces, orthogonality, Gram-Schmidt process",
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
      id: "m4",
      number: 4,
      title: "V: (Laplace transforms)",
      topics: topicsModuleIV,
      overview: {
        summary: "Laplace transform, inverse Laplace transform, first shifting theorem, convolution",
        whyItMatters: "Laplace transform simplifies solving differential equations and system analysis"
      },
      coreConcepts: [
        "Laplace transform and its inverse",
        "First shifting theorem (s-domain scaling)",
        "Linearity property",
        "Convolution theorem"
      ],
      definitions: [
        { term: "Laplace Transform", definition: "Integral transform that converts a function of time to a function of complex frequency" },
        { term: "Inverse Laplace Transform", definition: "Recovers the original function from its Laplace transform" },
        { term: "Convolution Theorem", definition: "Laplace transform of convolution equals product of Laplace transforms" }
      ],
      diagrams: [],
      formulas: [],
      examFocus: [
        { question: "Compute Laplace transform of basic functions", weightage: "medium" },
        { question: "Use convolution to solve ODEs", weightage: "medium" }
      ],
      revisionNotes: [
        "Laplace transform converts differential equations to algebraic equations",
        "First shifting theorem: L{f(at)} = (1/a)F(s/a)",
        "Convolution: (f * g)(t) = ∫₀ᵗ f(τ)g(t-τ)dτ"
      ]
    },
    {
      id: "m5",
      number: 5,
      title: "V: (Fourier series)",
      topics: topicsModuleV,
      overview: {
        summary: "Fourier series, sine and cosine transforms, Fourier transform",
        whyItMatters: "Fourier analysis decomposes functions into frequency components"
      },
      coreConcepts: [
        "Fourier series representation",
        "Dirichlet conditions",
        "Convergence of Fourier series",
        "Sine and cosine series"
      ],
      definitions: [
        { term: "Fourier Series", definition: "Representation of a periodic function as sum of sines and cosines" },
        { term: "Euler's Formulas", definition: "a₀/2 + Σ[aₙcos(nωx) + bₙsin(nωx)]" },
        { term: "Orthogonality", definition: "Sinusoidal functions with different frequencies are orthogonal" }
      ],
      diagrams: [],
      formulas: [],
      examFocus: [
        { question: "Find Fourier series of a given function", weightage: "medium" },
        { question: "Apply Fourier transform to solve PDEs", weightage: "medium" }
      ],
      revisionNotes: [
        "Fourier series exists for functions satisfying Dirichlet conditions",
        "The complex form uses e^(inx) instead of separate sines and cosines",
        "Parseval's identity relates time and frequency domain energy"
      ]
    }
  ],
};

export default content;