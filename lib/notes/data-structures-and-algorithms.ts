import { SubjectContent } from "../types";

const content: SubjectContent = {
  code: "24ERP304",
  name: "Data Structures and Algorithms",
  semester: "s3",
  category: "computer",
  credits: 4,
  ltpj: "2-1-2-0",
  modules: [
    // ---------------------------------------------------------------
    // MODULE I — Basic Concepts of Data Structures
    // ---------------------------------------------------------------
    {
      id: "m1",
      title: "Basic Concepts of Data Structures",
      number: 1,
      topics: [
        { title: "Introduction: Overview of Data Structures – The Need for Data Structures – Cost and Benefits – Abstract Data Types and Data Structures" },
        { title: "Basic complexity analysis – Best, Worst, and Average Cases – Asymptotic Analysis -Analyzing Programs – Space Bounds, Complexity Calculation of Simple Algorithms" },
      ],
      overview: {
        summary:
          "This chapter introduces what a data structure actually is, why we bother choosing one over another, and how to measure an algorithm's efficiency using time and space complexity and the asymptotic notations O, Ω, Θ.",
        whyItMatters:
          "Almost every KTU/TKM DSA paper opens with a question from this module — a Big-O definition, a code-complexity trace, or an ADT-vs-data-structure distinction. It is the highest-frequency module in the subject and is a prerequisite for every later module, so these are the cheapest marks in the whole syllabus.",
      },
      coreConcepts: [
        "A data structure is a systematic way of organizing and storing data so it can be accessed and modified efficiently.",
        "Need for data structures: as data grows, naive storage makes search/insert/delete slow — the right structure keeps operations fast.",
        "Cost and benefit: every data structure trades something for something — e.g. arrays give fast access but costly insertion; linked lists give fast insertion but slow access. Choice depends on which operations dominate.",
        "Abstract Data Type (ADT) = a logical/mathematical description of data and the operations on it, with no detail of how it's implemented (e.g. 'Stack ADT' just says push/pop exist). A data structure is the actual implementation of an ADT.",
        "Time complexity = number of basic operations as a function of input size n, not actual seconds; Space complexity = extra memory used as a function of n.",
        "Best case = fastest scenario, Worst case = slowest scenario, Average case = expected behaviour over typical/random input — most exam answers should default to worst case unless asked otherwise.",
        "Big-O (O) gives the worst-case/upper bound; Big-Omega (Ω) gives the best-case/lower bound; Big-Theta (Θ) gives a tight bound when best and worst grow at the same rate.",
        "Drop constants and lower-order terms: 3n² + 5n + 2 is written as O(n²).",
        "Nested loops up to n multiply: O(n) inside O(n) gives O(n²). Sequential loops add, then keep only the larger term.",
        "A loop whose counter doubles/halves each step gives O(log n); recursive calls are analysed with a recurrence relation, solved using the Master Theorem.",
        "Growth order, fastest to slowest: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!).",
      ],
      definitions: [
        { term: "Data Structure", definition: "A specific way of organizing, storing, and managing data in a computer so that it can be used efficiently, defined by both its storage layout and the operations permitted on it." },
        { term: "Abstract Data Type (ADT)", definition: "A logical model of a data object defined purely by the operations that can be performed on it (e.g. insert, delete, search), independent of how those operations are implemented." },
        { term: "Time Complexity", definition: "A measure of the computational time an algorithm takes to run, expressed as a function of input size n, independent of hardware or implementation language." },
        { term: "Space Complexity", definition: "The total amount of memory an algorithm needs to run to completion, including auxiliary space used apart from the input, expressed as a function of n." },
        { term: "Big-O notation O(g(n))", definition: "f(n) = O(g(n)) if there exist positive constants c and n₀ such that f(n) ≤ c·g(n) for all n ≥ n₀ — an asymptotic upper bound on growth." },
        { term: "Big-Omega notation Ω(g(n))", definition: "f(n) = Ω(g(n)) if there exist positive constants c and n₀ such that f(n) ≥ c·g(n) for all n ≥ n₀ — an asymptotic lower bound on growth." },
        { term: "Big-Theta notation Θ(g(n))", definition: "f(n) = Θ(g(n)) if f(n) = O(g(n)) and f(n) = Ω(g(n)) simultaneously — a tight asymptotic bound." },
      ],
      diagrams: [
        { title: "Growth rate comparison of common complexity classes", svgKey: "big-o-growth-curves", caption: "As n increases, O(1) and O(log n) stay flat while O(n²) and O(2ⁿ) shoot upward — the curve examiners expect you to sketch and label." },
        { title: "Nested vs sequential loops", svgKey: "loop-complexity-blocks", caption: "Nested loops multiply their bounds; sequential loops add, and only the larger term survives." },
      ],
      formulas: [
        { name: "Big-O definition", expression: "f(n) = O(g(n))  ⇔  f(n) ≤ c · g(n),  ∀ n ≥ n₀,  c > 0", note: "Use this exact inequality form when asked to 'define' or 'prove' Big-O." },
        { name: "Big-Omega definition", expression: "f(n) = Ω(g(n))  ⇔  f(n) ≥ c · g(n),  ∀ n ≥ n₀,  c > 0" },
        { name: "Big-Theta definition", expression: "f(n) = Θ(g(n))  ⇔  c₁·g(n) ≤ f(n) ≤ c₂·g(n),  ∀ n ≥ n₀" },
        { name: "Master Theorem (divide & conquer recurrences)", expression: "T(n) = a·T(n/b) + f(n)", note: "Compare f(n) with n^(log_b a) to pick the matching case and read off T(n) directly." },
        { name: "Common complexity table", expression: "O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)", note: "Memorize this order; many questions just ask you to rank or compare two of these." },
      ],
      examFocus: [
        { question: "Define Big-O, Big-Omega and Big-Theta notation with examples.", weightage: "high", note: "Give the formal inequality for each, then one tiny example." },
        { question: "Differentiate Abstract Data Type and Data Structure.", weightage: "high", note: "ADT = what (logical operations), Data Structure = how (concrete implementation). Give Stack ADT vs array-based/linked-list-based stack as the example." },
        { question: "Find the time complexity of a given code snippet (nested loops / recursion).", weightage: "high", note: "Identify loop bounds, check nested vs sequential, write the final O(...)." },
        { question: "Differentiate best, worst and average case complexity with an example (e.g. linear search).", weightage: "medium" },
        { question: "State and apply the Master Theorem on a given recurrence relation.", weightage: "medium" },
      ],
      revisionNotes: [
        "ADT = logical operations only. Data Structure = actual implementation.",
        "O = worst case · Ω = best case · Θ = tight bound (both match).",
        "Drop constants & lower-order terms before writing final Big-O.",
        "Nested loops → multiply. Sequential loops → add, keep the larger term.",
        "Loop variable ×2 or ÷2 each iteration → O(log n).",
        "Order to memorize: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)",
        "Master theorem form: T(n) = aT(n/b) + f(n) — compare f(n) to n^(log_b a).",
      ],
      intuition:
        "Think of Big-O like a speed limit sign, not a speedometer reading — it tells you the worst the algorithm can possibly do as input grows, not its exact runtime on one particular input.",
      workedExamples: [
        {
          title: "Find the time complexity of a nested loop",
          problem: "What is the time complexity of: for(i=0;i<n;i++) { for(j=0;j<n;j++) { print(i,j); } }",
          steps: [
            { label: "Step 1 — outer loop bound", content: "The outer loop runs from i=0 to i<n, so it executes n times." },
            { label: "Step 2 — inner loop bound", content: "For every single value of i, the inner loop also runs from j=0 to j<n — n times." },
            { label: "Step 3 — combine (nested → multiply)", content: "Since the inner loop is nested inside the outer loop, total operations = n (outer) × n (inner) = n²." },
          ],
          answer: "O(n²)",
        },
      ],
      comparisons: [
        {
          title: "Worst Case vs Average Case",
          scenario: "Both describe an algorithm's behaviour across different inputs of the same size n — but they answer different questions.",
          a: { label: "Worst Case", body: "The maximum time the algorithm could take over ANY input of size n. This is what Big-O almost always means by default." },
          b: { label: "Average Case", body: "The expected time over a typical/random input of size n — needs an assumption about input distribution to even define." },
          takeaway: "Unless a question explicitly says 'average case', assume Big-O means worst case.",
        },
      ],
      selfCheck: [
        { question: "What is the time complexity of a single loop that runs i=0 to i<n, with nothing nested inside it?", answer: "O(n) — a single pass over n elements. No multiplication needed since there's no nesting." },
        { question: "If you have two SEPARATE (not nested) loops that each run n times, one after the other, what's the combined complexity?", answer: "O(n) + O(n) = O(n). They're sequential, not nested — you add them and keep the dominant term, you don't multiply." },
      ],
    },

    // ---------------------------------------------------------------
    // MODULE II — Arrays and Linked List
    // ---------------------------------------------------------------
    {
      id: "m2",
      title: "Arrays and Linked List",
      number: 2,
      topics: [
        { title: "Array - Stacks, Queues-Circular Queues, Double Ended Queues, Evaluation of Expressions" },
        { title: "Linked List - Self Referential Structures, Dynamic Memory Allocation, Singly Linked List-Operations on Linked List" },
        { title: "Doubly Linked List, Circular Linked List, Stacks and Queues using Linked List" },
        { title: "Applications of array and linked list -, Polynomial representation" },
      ],
      overview: {
        summary:
          "This chapter covers the two most fundamental linear data structures — arrays (and the stack/queue ADTs built on them) and linked lists (singly, doubly, circular) — plus the classic stack application of evaluating arithmetic expressions.",
        whyItMatters:
          "Infix-to-postfix conversion and postfix evaluation are near-guaranteed numerical questions every semester. Linked list operations (insert/delete/traverse) and array-vs-linked-list comparisons are also extremely high frequency, making this the second-most exam-dense module after Module I.",
      },
      coreConcepts: [
        "Array: elements stored in contiguous memory, giving O(1) random access via index, but a fixed size and costly insertion/deletion in the middle (O(n) shifting).",
        "Stack (LIFO): insertion and deletion only at one end, called 'top' — operations are push and pop, both O(1).",
        "Queue (FIFO): insertion at 'rear', deletion at 'front' — operations are enqueue and dequeue.",
        "Circular Queue: rear and front wrap around using modulo arithmetic, solving the wasted-space problem of a linear queue implemented on an array.",
        "Double Ended Queue (Deque): insertion and deletion allowed at both front and rear.",
        "Expression evaluation: infix (a+b) is what humans write; postfix (ab+) and prefix (+ab) remove the need for parentheses/precedence and are evaluated easily using a stack.",
        "Infix → Postfix conversion uses a stack to hold operators, popping based on precedence and associativity rules.",
        "Postfix evaluation: scan left to right, push operands, on seeing an operator pop two operands, apply it, push the result back.",
        "Linked List: a 'self-referential structure' — each node contains data plus a pointer to the next node — allocated dynamically at runtime (unlike an array's static block).",
        "Singly Linked List: one pointer per node (next); operations — insert at head/tail/position, delete, search, traverse — all O(1) at head, O(n) elsewhere since there's no random access.",
        "Doubly Linked List: each node has both next and prev pointers, allowing traversal in both directions at the cost of extra memory per node.",
        "Circular Linked List: the last node's next pointer points back to the first node instead of NULL — useful for round-robin style applications.",
        "Stacks and Queues can also be implemented using a linked list instead of an array — this removes the fixed-size limitation entirely.",
        "Application — Polynomial representation: each term (coefficient, exponent) is stored as a linked list node, making polynomial addition a simple linked-list merge.",
      ],
      definitions: [
        { term: "Stack", definition: "A linear data structure that follows the Last-In-First-Out (LIFO) principle, where insertion and deletion happen only at one end called the top." },
        { term: "Queue", definition: "A linear data structure that follows the First-In-First-Out (FIFO) principle, where insertion happens at the rear and deletion at the front." },
        { term: "Circular Queue", definition: "A queue implementation where the last position is connected back to the first using modulo arithmetic, allowing reuse of freed slots without shifting elements." },
        { term: "Deque (Double Ended Queue)", definition: "A linear data structure that allows insertion and deletion of elements from both the front and the rear ends." },
        { term: "Linked List", definition: "A linear data structure made of nodes, where each node is a self-referential structure containing data and a pointer to the next node, allocated dynamically in memory." },
        { term: "Self-Referential Structure", definition: "A structure (in C, typically via struct) that contains a pointer to another instance of the same structure type, used to build linked data structures." },
        { term: "Doubly Linked List", definition: "A linked list in which each node stores two pointers — one to the next node and one to the previous node — enabling traversal in both directions." },
        { term: "Circular Linked List", definition: "A linked list in which the last node's next pointer points back to the first node, forming a closed loop instead of ending at NULL." },
      ],
      diagrams: [
        { title: "Array vs Linked List memory layout", svgKey: "array-vs-linked-list", caption: "Arrays sit in one contiguous memory block (fast indexed access); linked-list nodes are scattered, connected only by pointers (fast insertion, no shifting)." },
        { title: "Singly vs Doubly Linked List node structure", svgKey: "linked-list-types", caption: "A singly linked node holds data + next; a doubly linked node adds a prev pointer for backward traversal." },
      ],
      formulas: [
        { name: "Circular queue index update", expression: "rear = (rear + 1) mod size  ;  front = (front + 1) mod size", note: "This wrap-around is exactly what makes a circular queue reuse freed slots." },
        { name: "Operator precedence (highest → lowest)", expression: "( )  >  ^  >  * , /  >  + , −", note: "Right-associative: ^.  Left-associative: * / + −. Needed for infix→postfix conversion." },
        { name: "Postfix evaluation rule", expression: "scan left→right: operand → push | operator → pop 2, compute, push result", note: "The final value left on the stack is the answer." },
      ],
      examFocus: [
        { question: "Convert a given infix expression to postfix using the stack-based algorithm (show the stack at each step).", weightage: "high", note: "Draw a 3-column trace: symbol read, stack contents, output so far." },
        { question: "Evaluate a given postfix expression using a stack (show step-by-step trace).", weightage: "high" },
        { question: "Differentiate array and linked list as data structures (memory, access time, insertion/deletion cost).", weightage: "high" },
        { question: "Write an algorithm to insert/delete a node at a given position in a singly linked list.", weightage: "high" },
        { question: "Differentiate singly, doubly and circular linked lists.", weightage: "medium" },
        { question: "Explain how a circular queue overcomes the limitation of a linear queue.", weightage: "medium" },
      ],
      revisionNotes: [
        "Stack = LIFO (push/pop at top). Queue = FIFO (enqueue at rear, dequeue at front).",
        "Circular queue fixes linear queue's wasted space using mod arithmetic.",
        "Infix→Postfix: use a stack for operators, respect precedence + associativity.",
        "Postfix eval: operand→push, operator→pop 2 + compute + push result.",
        "Array: contiguous, O(1) access, costly insert/delete in middle.",
        "Linked list: scattered nodes + pointers, O(1) insert at head, no random access (O(n) to reach index i).",
        "Doubly linked list adds a prev pointer → bidirectional traversal, more memory per node.",
        "Circular linked list: last node points back to head instead of NULL.",
      ],
      intuition:
        "An array is like assigned theater seats — numbered, instant to find by seat number. A linked list is a treasure hunt — each clue tells you where the next one is. That single picture explains every array-vs-linked-list tradeoff on the exam.",
      workedExamples: [
        {
          title: "Convert infix to postfix",
          problem: "Convert A + B * C to postfix using the stack-based algorithm.",
          steps: [
            { label: "Read A", content: "Operand → send straight to output. Output so far: A" },
            { label: "Read +", content: "Operator, stack is empty → push it. Stack: [+]. Output: A" },
            { label: "Read B", content: "Operand → output it. Output: A B" },
            { label: "Read * — compare precedence", content: "* has higher precedence than the + on top of the stack, so don't pop — just push *. Stack: [+, *]. Output: A B" },
            { label: "Read C, then end of input", content: "C is an operand → output it (A B C). Now pop everything left on the stack: pop * → A B C *, pop + → A B C * +." },
          ],
          answer: "A B C * +",
        },
      ],
      comparisons: [
        {
          title: "Array vs Linked List",
          scenario: "Both store a sequence of elements — the difference is entirely about HOW they sit in memory.",
          a: { label: "Array", body: "Contiguous block. O(1) access by index. Insert/delete in the middle costs O(n) (shifting)." },
          b: { label: "Linked List", body: "Scattered nodes + pointers. O(n) access (must traverse). Insert/delete at a known node costs O(1) (just repoint)." },
          takeaway: "Lots of random access needed → array. Lots of insertion/deletion needed → linked list.",
        },
      ],
      selfCheck: [
        { question: "Why does a circular queue fix the 'wasted space' problem a plain linear queue has?", answer: "In a linear queue, slots freed near the front never get reused once front has moved past them. A circular queue wraps front/rear using modulo arithmetic, so those freed slots get reused." },
        { question: "What's the one structural difference between a singly and a doubly linked list node?", answer: "A doubly linked node has an extra 'prev' pointer alongside 'next', enabling backward traversal — at the cost of one more pointer's worth of memory per node." },
      ],
    },

    // ---------------------------------------------------------------
    // MODULE III — Trees and Graphs
    // ---------------------------------------------------------------
    {
      id: "m3",
      title: "Trees and Graphs",
      number: 3,
      topics: [
        { title: "Trees -Binary Trees - Binary Tree Representation, Tree Traversals, Binary Search Trees- Binary Search Tree Operations" },
        { title: "Graphs, Representation of Graphs, Depth First Search and Breadth First Search on Graphs, Applications of Graphs" },
      ],
      overview: {
        summary:
          "This chapter moves from linear to non-linear data structures: binary trees and binary search trees (with their representations and traversal orders), and graphs (their representations, and the two fundamental traversal algorithms DFS and BFS).",
        whyItMatters:
          "Tree traversal algorithms (preorder/inorder/postorder) and BST operations are write-the-algorithm staples, while graph representation (adjacency matrix vs list) and BFS/DFS tracing on a given graph appear almost every semester — together this module is consistently one of the top three most-tested.",
      },
      coreConcepts: [
        "Tree terminology: root (top node, no parent), parent/child, leaf (no children), height (longest path root→leaf), degree (number of children of a node).",
        "Binary Tree: each node has at most two children, conventionally called left and right.",
        "Tree types: full (every node has 0 or 2 children), complete (all levels full except possibly the last, filled left to right), perfect (all leaves at the same level), skewed (every node has only one child — behaves like a linked list).",
        "Binary tree representation: array representation (index i's children at 2i+1, 2i+2 — works well for complete trees) vs linked representation (each node stores left and right pointers).",
        "Tree Traversals: Preorder (root → left → right), Inorder (left → root → right), Postorder (left → right → root), Level order (breadth-first, implemented using a queue).",
        "Inorder traversal of a BST visits nodes in sorted (ascending) order — this is the single most commonly tested property.",
        "Binary Search Tree (BST): for every node, all values in the left subtree are smaller and all values in the right subtree are larger.",
        "BST operations — search, insert, delete — all run in O(h) where h is the tree's height: O(log n) average, but O(n) worst case for a skewed tree.",
        "Graph: a set of vertices (nodes) connected by edges; can be directed or undirected, weighted or unweighted.",
        "Graph representation: Adjacency Matrix (V×V matrix, O(V²) space, O(1) edge lookup) vs Adjacency List (array/list of neighbours per vertex, O(V+E) space, better for sparse graphs).",
        "Depth First Search (DFS): explores as deep as possible along a branch before backtracking; implemented using a stack or recursion.",
        "Breadth First Search (BFS): explores all neighbours at the current depth before moving deeper; implemented using a queue; gives the shortest path in an unweighted graph.",
        "Applications of graphs: shortest path routing (maps/GPS), social network connection modelling, cycle detection, topological sorting (task scheduling).",
      ],
      definitions: [
        { term: "Binary Tree", definition: "A tree data structure in which each node has at most two children, referred to as the left child and the right child." },
        { term: "Binary Search Tree (BST)", definition: "A binary tree in which, for every node, all keys in its left subtree are smaller and all keys in its right subtree are larger than the node's key." },
        { term: "Tree Traversal", definition: "A systematic method of visiting every node of a tree exactly once, classified as preorder, inorder, postorder (depth-first) or level-order (breadth-first)." },
        { term: "Graph", definition: "A non-linear data structure consisting of a finite set of vertices and a set of edges connecting pairs of vertices." },
        { term: "Adjacency Matrix", definition: "A V×V matrix representation of a graph where entry [i][j] = 1 (or weight) if an edge exists between vertex i and vertex j, else 0." },
        { term: "Adjacency List", definition: "A graph representation where each vertex stores a list of the vertices it is directly connected to, more space-efficient than a matrix for sparse graphs." },
        { term: "Depth First Search (DFS)", definition: "A graph traversal algorithm that explores as far as possible along each branch before backtracking, typically implemented using a stack or recursion." },
        { term: "Breadth First Search (BFS)", definition: "A graph traversal algorithm that explores all neighbours of a vertex before moving to the next level, implemented using a queue, and that finds the shortest path in an unweighted graph." },
      ],
      diagrams: [
        { title: "Binary tree traversal orders", svgKey: "binary-tree-traversals", caption: "The same tree visited three different ways — preorder, inorder, postorder — inorder always comes out sorted for a BST." },
        { title: "BFS vs DFS order on a sample graph", svgKey: "graph-bfs-dfs", caption: "BFS spreads outward level by level using a queue; DFS dives down one branch fully using a stack before backtracking." },
      ],
      formulas: [
        { name: "Max nodes at level i", expression: "2^i  (root is level 0)" },
        { name: "Max nodes in a binary tree of height h", expression: "2^(h+1) − 1" },
        { name: "Height of a complete binary tree with n nodes", expression: "⌊log₂ n⌋" },
        { name: "BST operation complexity", expression: "Average: O(log n)   Worst (skewed): O(n)" },
        { name: "Graph representation space", expression: "Adjacency Matrix: O(V²)    Adjacency List: O(V + E)" },
      ],
      examFocus: [
        { question: "Write the algorithm for preorder/inorder/postorder traversal of a binary tree.", weightage: "high", note: "Give the 3-line recursive definition for all three, examiners often want all three together." },
        { question: "Construct a BST by inserting a given sequence of numbers, then show its inorder traversal.", weightage: "high" },
        { question: "Trace BFS and DFS on a given graph starting from a specified vertex.", weightage: "high", note: "Show the visited order and clearly mark the queue (BFS) / stack (DFS) state at each step." },
        { question: "Differentiate adjacency matrix and adjacency list representations of a graph.", weightage: "high" },
        { question: "Explain deletion in a BST for the three cases (leaf, one child, two children).", weightage: "medium" },
        { question: "State real-world applications of graph traversal algorithms.", weightage: "medium" },
      ],
      revisionNotes: [
        "Preorder: root-left-right. Inorder: left-root-right. Postorder: left-right-root.",
        "Inorder traversal of a BST = sorted ascending order — always state this.",
        "BST insert/search/delete: O(log n) average, O(n) worst (skewed tree).",
        "Adjacency Matrix: O(V²) space, O(1) lookup. Adjacency List: O(V+E) space, better for sparse graphs.",
        "DFS → stack/recursion, goes deep first. BFS → queue, goes wide first, gives shortest path (unweighted).",
        "Max nodes at level i = 2^i. Height of complete tree with n nodes = ⌊log₂ n⌋.",
      ],
      intuition:
        "A BST is binary search, frozen into a shape — every 'go left or right based on a comparison' step of binary search becomes a literal left/right pointer in the tree. That's exactly why both run in O(log n).",
      workedExamples: [
        {
          title: "Build a BST and read its inorder traversal",
          problem: "Insert 50, 30, 70, 20, 40 into an empty BST, one at a time, then give the inorder traversal.",
          steps: [
            { label: "Insert 50", content: "Tree is empty → 50 becomes the root." },
            { label: "Insert 30", content: "30 < 50 → goes to the left of 50." },
            { label: "Insert 70", content: "70 > 50 → goes to the right of 50." },
            { label: "Insert 20", content: "20 < 50 → go left to 30. 20 < 30 → goes to the left of 30." },
            { label: "Insert 40", content: "40 < 50 → go left to 30. 40 > 30 → goes to the right of 30." },
          ],
          answer: "Inorder (left-root-right): 20, 30, 40, 50, 70 — always sorted ascending for a BST.",
        },
      ],
      comparisons: [
        {
          title: "Adjacency Matrix vs Adjacency List",
          scenario: "Both represent the same graph — the difference is space efficiency vs lookup speed.",
          a: { label: "Adjacency Matrix", body: "V×V grid. O(1) to check if a specific edge exists. O(V²) space — wasteful for sparse graphs." },
          b: { label: "Adjacency List", body: "Each vertex stores only its actual neighbours. O(V+E) space — efficient for sparse graphs. Checking one specific edge takes longer." },
          takeaway: "Dense graph → matrix is fine. Sparse graph (the common case) → list wins on space.",
        },
      ],
      selfCheck: [
        { question: "Why does inorder traversal of a BST always come out sorted?", answer: "At every node, the BST property guarantees the left subtree is smaller and the right subtree is larger. Visiting left → root → right at every level naturally produces ascending order." },
        { question: "What data structure does BFS use, and what does DFS use?", answer: "BFS uses a queue (level by level). DFS uses a stack or recursion (dives deep along one branch before backtracking)." },
      ],
    },

    // ---------------------------------------------------------------
    // MODULE IV — Sorting and Searching
    // ---------------------------------------------------------------
    {
      id: "m4",
      title: "Sorting and Searching",
      number: 4,
      topics: [
        { title: "Sorting – Linear Sorting – Heap Sort – Merge Sort – Quick Sort –External Memory Sorting" },
        { title: "Searching - Linear Search, Binary Search, Complexity analysis" },
      ],
      overview: {
        summary:
          "This chapter compares the major sorting algorithms — including linear-time (non-comparison) sorts, heap sort, merge sort, and quick sort — plus external memory sorting for data too large to fit in RAM, and the two fundamental search algorithms.",
        whyItMatters:
          "Tracing an algorithm (merge sort / quick sort / heap sort) on a given array, step by step, is one of the most reliable 8-mark numerical questions in this subject. Time-complexity comparison tables across sorting algorithms are also a near-guaranteed short-answer question.",
      },
      coreConcepts: [
        "A sort is 'stable' if equal elements retain their original relative order; it is 'in-place' if it needs no significant extra memory beyond the input array.",
        "Linear-time (non-comparison) sorting: Counting Sort and Radix Sort achieve O(n+k) time by exploiting known key ranges instead of comparing elements — faster than any comparison sort's O(n log n) lower bound, but only works for restricted key types (e.g. integers in a known range).",
        "Heap Sort: build a max-heap from the array, then repeatedly swap the root (maximum) with the last element and 're-heapify' — O(n log n) in all cases, in-place, but not stable.",
        "Merge Sort: divide-and-conquer — recursively split the array in half, sort each half, then merge the two sorted halves — O(n log n) in all cases, stable, but needs O(n) extra space.",
        "Quick Sort: divide-and-conquer using a pivot — partition the array so smaller elements go left and larger go right of the pivot, then recurse on each side — average O(n log n), worst case O(n²) (when the pivot is always the smallest/largest), in-place.",
        "External Memory Sorting: used when the dataset is too large to fit in main memory — data is split into chunks that fit in RAM, each chunk is sorted and written to disk, then chunks are merged (k-way merge) — minimizing slow disk I/O is the key design goal.",
        "Linear Search: check every element one by one — O(n) — works on unsorted data, no precondition needed.",
        "Binary Search: repeatedly halve the search range by comparing the middle element — O(log n) — requires the data to be sorted first.",
      ],
      definitions: [
        { term: "Stable Sort", definition: "A sorting algorithm that preserves the relative order of elements that compare as equal." },
        { term: "In-place Sort", definition: "A sorting algorithm that rearranges elements within the original array, using only a constant amount of extra memory." },
        { term: "Heap", definition: "A complete binary tree stored as an array, satisfying the heap property: in a max-heap every parent is ≥ its children (≤ for a min-heap)." },
        { term: "Divide and Conquer", definition: "An algorithm design strategy that splits a problem into smaller subproblems, solves each recursively, and combines their solutions." },
        { term: "External Sorting", definition: "A class of sorting algorithms designed for data too large to fit in main memory, which sort manageable chunks on disk and then merge them." },
        { term: "Binary Search precondition", definition: "Binary search only works correctly on data that is already sorted, since it relies on comparing against a middle element to eliminate half the remaining range." },
      ],
      diagrams: [
        { title: "Merge sort divide-and-merge tree", svgKey: "merge-sort-tree", caption: "The array is split down to single elements, then merged back up in sorted order — the O(log n) levels each doing O(n) work give O(n log n) total." },
        { title: "Max-heap structure for heap sort", svgKey: "max-heap-structure", caption: "Every parent is ≥ its children; the root (max) is repeatedly extracted and the heap re-built." },
      ],
      formulas: [
        { name: "Sorting time-complexity table", expression: "Counting/Radix: O(n+k) | Heap: O(n log n) | Merge: O(n log n) | Quick (avg): O(n log n) | Quick (worst): O(n²)", note: "Memorize this table exactly — it is asked almost verbatim most semesters." },
        { name: "Merge Sort recurrence", expression: "T(n) = 2T(n/2) + O(n)  ⇒  T(n) = O(n log n)", note: "Classic Master Theorem case 2 example." },
        { name: "Binary Search recurrence", expression: "T(n) = T(n/2) + O(1)  ⇒  T(n) = O(log n)" },
        { name: "Linear Search complexity", expression: "Best: O(1)   Worst/Average: O(n)" },
      ],
      examFocus: [
        { question: "Trace merge sort / quick sort / heap sort on a given array, showing every intermediate step.", weightage: "high", note: "Draw the recursion/partition tree — partial marks are awarded per correct step even if the final array is wrong." },
        { question: "Compare the time and space complexity of heap sort, merge sort and quick sort.", weightage: "high" },
        { question: "Write and analyze the binary search algorithm, deriving its time complexity.", weightage: "high" },
        { question: "Explain why quick sort's worst case is O(n²) and how a good pivot choice avoids it.", weightage: "medium" },
        { question: "Explain the need for and working of external memory sorting.", weightage: "medium" },
        { question: "Differentiate linear search and binary search, including their preconditions.", weightage: "medium" },
      ],
      revisionNotes: [
        "Stable = equal elements keep order. In-place = no major extra memory.",
        "Heap sort: O(n log n) always, in-place, NOT stable.",
        "Merge sort: O(n log n) always, stable, needs O(n) extra space.",
        "Quick sort: O(n log n) average, O(n²) worst, in-place.",
        "Counting/Radix sort: O(n+k), beats O(n log n) but only for restricted key types.",
        "External sorting = sort chunks on disk + k-way merge, used when data > RAM.",
        "Linear search O(n), no precondition. Binary search O(log n), needs sorted data.",
      ],
      intuition:
        "Merge sort trusts the recursion completely and cleans up at the end (sort small, then merge). Quick sort does the hard work up front and trusts the recursion to need nothing more (partition first, then just recurse). Same divide-and-conquer skeleton, opposite philosophy about where the effort goes.",
      workedExamples: [
        {
          title: "Trace merge sort on a small array",
          problem: "Sort [8, 3, 5, 1] using merge sort.",
          steps: [
            { label: "Step 1: Split", content: "[8, 3, 5, 1] → [8, 3] and [5, 1]" },
            { label: "Step 2: Split again", content: "[8, 3] → [8] and [3].  [5, 1] → [5] and [1]. Single elements are already 'sorted'." },
            { label: "Step 3: Merge the pairs", content: "Merge [8] and [3] → [3, 8].  Merge [5] and [1] → [1, 5]." },
            { label: "Step 4: Final merge", content: "Merge [3, 8] and [1, 5]: compare 3 vs 1 → take 1. Compare 3 vs 5 → take 3. Compare 8 vs 5 → take 5. Take remaining 8." },
          ],
          answer: "[1, 3, 5, 8]",
        },
      ],
      comparisons: [
        {
          title: "Merge Sort vs Quick Sort",
          scenario: "Both are O(n log n) divide-and-conquer sorts — but they split the work very differently.",
          a: { label: "Merge Sort", body: "Splits blindly down the middle, does the real work while merging. Always O(n log n), stable, but needs O(n) extra space." },
          b: { label: "Quick Sort", body: "Does the real work while partitioning around a pivot, then just recurses. In-place, average O(n log n), but worst case O(n²) with a bad pivot." },
          takeaway: "Need a guarantee (e.g. external sorting, stability)? Merge sort. Need speed in practice with low memory? Quick sort.",
        },
      ],
      selfCheck: [
        { question: "Why is merge sort always O(n log n), but quick sort can degrade to O(n²)?", answer: "Merge sort always splits exactly in half, guaranteeing log n levels. Quick sort's split depends on the pivot — a consistently bad pivot (e.g. always picking the smallest element) creates n levels instead of log n levels." },
        { question: "Why doesn't binary search work on an unsorted array?", answer: "Binary search eliminates half the remaining range by comparing against the middle element — that elimination is only valid if everything on one side is guaranteed smaller and the other side larger, which requires sorted order." },
      ],
    },

    // ---------------------------------------------------------------
    // MODULE V — Hashing Table and Tries
    // ---------------------------------------------------------------
    {
      id: "m5",
      title: "Hashing Table and Tries",
      number: 5,
      topics: [
        { title: "Map ADT - Hash Tables and implementation of Map using Hash Tables - Design of hash functions - Collision resolution schemes: chaining, open addressing schemes - linear probing, quadratic probing, double hashing" },
        { title: "Applications of Hashing: finding duplicates, set intersection" },
        { title: "Tries: implementation of Map ADT using tries" },
      ],
      overview: {
        summary:
          "This chapter covers the Map ADT and its most common implementation, the hash table: how hash functions are designed, how collisions are resolved (chaining and open addressing), and a brief look at tries for prefix-based string storage.",
        whyItMatters:
          "Designing a hash function for a given key set and resolving collisions by hand (chaining or linear/quadratic probing) is a guaranteed numerical question. The definitions of load factor, the three probing techniques, and trie basics are also frequently asked as short-answer questions.",
      },
      coreConcepts: [
        "Map ADT: stores key-value pairs and supports operations like put(key, value), get(key), and remove(key).",
        "A Hash Table implements the Map ADT using an array plus a hash function that converts a key into an array index, giving O(1) average-case access.",
        "Hash function design — Division method: h(k) = k mod m. Multiplication method: uses the fractional part of k times a constant. A good hash function distributes keys uniformly and is fast to compute.",
        "Load factor α = n/m (number of entries ÷ table size) — directly affects performance; a higher load factor means more collisions and slower operations.",
        "Collision: when two different keys hash to the same slot.",
        "Chaining: each table slot holds a linked list (or similar structure) of all entries that hashed there — simple, but performance degrades as chains grow long.",
        "Open Addressing: on collision, probe for the next available slot within the table itself (no extra structure) — Linear Probing: h'(k,i) = (h(k)+i) mod m (suffers from clustering); Quadratic Probing: h'(k,i) = (h(k)+c₁i+c₂i²) mod m (reduces clustering); Double Hashing: h'(k,i) = (h₁(k)+i·h₂(k)) mod m (uses a second hash function for the step size, best collision spread).",
        "Applications of Hashing: finding duplicates in a list (insert into a hash set, O(1) lookup catches repeats), set intersection (hash one set, then probe with the other for O(n+m) intersection instead of O(n·m)).",
        "Trie (prefix tree): a tree where each path from the root spells out a string, with each edge labelled by a character — used to implement the Map ADT efficiently for string keys, especially for prefix search/autocomplete.",
      ],
      definitions: [
        { term: "Map ADT", definition: "An abstract data type that stores a collection of key-value pairs and supports insertion, lookup, and deletion by key, with each key appearing at most once." },
        { term: "Hash Function", definition: "A function that converts a key into an array index (hash value) for use in a hash table, ideally distributing keys uniformly across the available slots." },
        { term: "Load Factor (α)", definition: "The ratio of the number of stored entries (n) to the total number of slots (m) in a hash table: α = n/m, used as a measure of how full the table is." },
        { term: "Collision", definition: "An event where two distinct keys are mapped by the hash function to the same slot in a hash table." },
        { term: "Chaining", definition: "A collision-resolution technique where each hash table slot holds a linked list of all entries that hashed to that slot." },
        { term: "Open Addressing", definition: "A collision-resolution technique where, on collision, the algorithm probes for another empty slot within the same table according to a fixed probing sequence." },
        { term: "Double Hashing", definition: "An open-addressing technique that uses a second hash function to determine the probe step size, h'(k,i) = (h₁(k) + i·h₂(k)) mod m, giving better key distribution than linear or quadratic probing." },
        { term: "Trie", definition: "A tree-based data structure used to store strings, where each path from the root to a node represents a prefix, enabling fast prefix search and retrieval." },
      ],
      diagrams: [
        { title: "Chaining vs Open Addressing on collision", svgKey: "hash-chaining-probing", caption: "Chaining grows a linked list at the colliding slot; open addressing finds another empty slot inside the same table using a probe sequence." },
        { title: "Trie structure for a small set of words", svgKey: "trie-structure", caption: "Each edge is a character; a marked node means a complete word ends there — shared prefixes share the same path." },
      ],
      formulas: [
        { name: "Division method hash function", expression: "h(k) = k mod m" },
        { name: "Load factor", expression: "α = n / m" },
        { name: "Linear probing", expression: "h'(k, i) = (h(k) + i) mod m" },
        { name: "Quadratic probing", expression: "h'(k, i) = (h(k) + c₁·i + c₂·i²) mod m" },
        { name: "Double hashing", expression: "h'(k, i) = (h₁(k) + i · h₂(k)) mod m" },
        { name: "Average-case hash table operation cost", expression: "O(1) average  ·  O(n) worst case (all keys collide)" },
      ],
      examFocus: [
        { question: "Given a set of keys and a hash function, build the hash table resolving collisions using chaining.", weightage: "high", note: "Show h(k) computation for every key, then draw the chains." },
        { question: "Given a set of keys, build the hash table using linear probing / quadratic probing / double hashing.", weightage: "high", note: "Show every probe attempt, not just the final slot — partial marks are given per correct probe step." },
        { question: "Differentiate chaining and open addressing as collision-resolution techniques.", weightage: "high" },
        { question: "Explain load factor and its effect on hash table performance.", weightage: "medium" },
        { question: "Explain the structure and use of a Trie with an example set of words.", weightage: "medium" },
        { question: "Explain how hashing is used to find duplicates / compute set intersection efficiently.", weightage: "medium" },
      ],
      revisionNotes: [
        "Hash table = array + hash function → O(1) average access.",
        "Division method: h(k) = k mod m. Load factor α = n/m.",
        "Chaining: linked list per slot. Open addressing: probe within the table.",
        "Linear probing → clustering problem. Quadratic & double hashing reduce it.",
        "Double hashing step size comes from a 2nd hash function — best distribution.",
        "Trie: each path = a string; great for prefix search / autocomplete.",
        "Hashing turns 'find duplicate' / 'set intersection' from O(n²) into ~O(n).",
      ],
      intuition:
        "A hash table is a library with no catalogue — you compute exactly which shelf a book belongs on from its title, so you never have to search. A collision is just two books landing on the same shelf; chaining keeps a small stack on that shelf, open addressing tells the second book to take the next shelf over.",
      workedExamples: [
        {
          title: "Insert with linear probing",
          problem: "Insert keys 23, 13, 33 into a hash table of size m=10 using h(k) = k mod 10, resolving collisions with linear probing.",
          steps: [
            { label: "Insert 23", content: "h(23) = 23 mod 10 = 3 → slot 3 is empty → place 23 at slot 3." },
            { label: "Insert 13", content: "h(13) = 13 mod 10 = 3 → slot 3 is taken (by 23) → probe slot 4 → empty → place 13 at slot 4." },
            { label: "Insert 33", content: "h(33) = 33 mod 10 = 3 → slot 3 taken, probe slot 4 → taken, probe slot 5 → empty → place 33 at slot 5." },
          ],
          answer: "Slot 3: 23,  Slot 4: 13,  Slot 5: 33 — three different keys all hashing to 3, resolved by walking forward one slot at a time.",
        },
      ],
      comparisons: [
        {
          title: "Chaining vs Linear Probing",
          scenario: "Two different answers to the same problem: what do you do when two keys hash to the same slot?",
          a: { label: "Chaining", body: "Keep a separate linked list at each slot. Table never 'fills up' awkwardly, but performance degrades if one slot's chain gets long." },
          b: { label: "Linear Probing", body: "Walk forward to the next empty slot, no extra structure needed. Simpler memory-wise, but prone to clustering — colliding keys pile up in runs." },
          takeaway: "Chaining handles a high load factor more gracefully; open addressing is more cache-friendly but needs a low load factor to stay fast.",
        },
      ],
      selfCheck: [
        { question: "What's the difference between the hash function's job and the collision-resolution scheme's job?", answer: "The hash function's job is to map a key to a slot index (e.g. k mod m). The collision-resolution scheme's job is to decide what happens when two different keys land on the same slot — they're independent design choices." },
        { question: "Why does double hashing spread keys out better than linear probing?", answer: "Linear probing always steps by 1, so once two keys collide they follow the exact same probe sequence from then on (clustering). Double hashing's step size comes from a second hash function, so different colliding keys typically get different step sizes and spread apart instead of clumping." },
      ],
      crossLinks: [
        { label: "Hashing & hash tables also show up in Computer Networks (S6) — e.g. routing tables", href: "/s6/computer-networks" },
      ],
    },
  ],
};

export default content;
