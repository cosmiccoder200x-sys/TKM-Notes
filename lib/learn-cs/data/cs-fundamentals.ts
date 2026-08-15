import { LearnSubject } from "../types";

// COMPUTER SCIENCE FUNDAMENTALS — 7 subjects. DSA is fully authored.

export const csFundamentalsSubjects: LearnSubject[] = [
  {
    slug: "data-structures-and-algorithms",
    name: "Data Structures & Algorithms",
    category: "cs-fundamentals",
    icon: "modules",
    description:
      "The single most important subject in computer science. Arrays to graphs, Big-O to DP — the foundation of every technical interview and every serious system.",
    difficulty: "intermediate",
    estimatedHours: 60,
    prerequisites: ["programming-with-c", "python-programming"],
    stages: [
      {
        stage: "fundamentals",
        topics: [
          {
            slug: "what-is-a-data-structure",
            title: "What is a Data Structure?",
            difficulty: "beginner",
            estimatedMinutes: 30,
            summary:
              "How we organize data so programs can store it efficiently and retrieve it fast. The vocabulary for everything that follows.",
            whyMatters:
              "Every program is 'data + operations on it'. Choosing the right data structure is often the difference between instant and unusable.",
            keyIdea:
              "A data structure is a way of storing and organizing data. The same data, stored differently, changes how fast operations are.",
            example:
              "A phone book as a list: finding a name scans every entry (slow). As an alphabetically sorted structure, a binary search finds it in seconds.",
            intuition:
              "Think of a library. Books in a single pile are a 'list' — adding is instant but finding takes forever. Shelves sorted by title are a 'sorted structure' — you can jump to the middle and decide left or right.",
            commonMistakes: [
              "Assuming 'faster hardware' fixes a bad data structure choice",
              "Memorizing definitions without connecting them to real operations",
            ],
            practice: [
              "List 5 everyday objects (queue at a ticket counter, browser tabs, dictionary) and name the data structure they resemble.",
            ],
            quickRevision: [
              "Data structure = organization of data",
              "Same data, different structure → different speed",
              "Two things to judge: time to store, time to retrieve",
            ],
          },
          {
            slug: "big-o-notation",
            title: "Big-O Notation",
            difficulty: "beginner",
            estimatedMinutes: 60,
            summary:
              "A language for describing how an algorithm's cost grows as input grows. O(1), O(log n), O(n), O(n log n), O(n²).",
            whyMatters:
              "Big-O is the metric interviewers use and the reason your search works on a billion records. It answers 'will this scale?'",
            keyIdea:
              "Big-O describes worst-case growth rate, ignoring constants. O(n) doubles when input doubles; O(n²) quadruples.",
            example:
              "Linear search on 100 items = ~100 steps (O(n)). Binary search on 1,000,000 items = ~20 steps (O(log n)).",
            intuition:
              "Graph each function: O(1) is flat, O(log n) barely rises, O(n) is a straight line, O(n²) is a steep curve. The curve is what kills you at scale.",
            commonMistakes: [
              "Dropping important context: O(n²) on small inputs is sometimes fine",
              "Confusing best case with worst case",
              "Thinking O(2n) is different from O(n)",
            ],
            practice: [
              "Order these by growth: O(1), O(n), O(n²), O(log n), O(2^n), O(n log n)",
              "Determine the Big-O of two nested loops vs two sequential loops",
            ],
            quickRevision: [
              "Drop constants and lower-order terms",
              "Common ranks: 1 < log n < n < n log n < n² < 2^n",
              "Space complexity matters too",
            ],
          },
          {
            slug: "time-and-space-complexity",
            title: "Time and Space Complexity",
            difficulty: "beginner",
            estimatedMinutes: 45,
            summary:
              "Measuring algorithms in both time and memory, including best, average and worst cases.",
            whyMatters:
              "Interviews ask you to analyze your own solution — 'what's the time and space complexity of your approach?'",
            keyIdea:
              "Time complexity counts operations; space complexity counts extra memory (excluding the input itself).",
            example:
              "Copying an array: O(n) time and O(n) extra space. Reversing it in place: O(n) time, O(1) space.",
            commonMistakes: [
              "Forgetting about the recursion stack in space analysis",
              "Only analyzing time, never space",
            ],
            practice: [
              "For each solution you write this week, state both time and space complexity.",
            ],
            quickRevision: [
              "Time = number of operations as n grows",
              "Space = extra memory as n grows",
              "Recursion costs stack space",
            ],
          },
        ],
      },
      {
        stage: "core",
        topics: [
          {
            slug: "arrays",
            title: "Arrays",
            difficulty: "beginner",
            estimatedMinutes: 60,
            summary:
              "Contiguous memory, instant random access, and the trade-offs that define nearly every other structure.",
            whyMatters:
              "Arrays are the base on which strings, matrices, stacks, heaps and hash tables are built. Mastering them unlocks everything.",
            keyIdea:
              "An array stores items in contiguous slots. Indexing arr[i] is O(1) because the address is computed directly; inserting or deleting in the middle is O(n) because items shift.",
            example:
              "let scores = [85, 90, 78];  // scores[1] is 90, read instantly\n// Insert at front: shift everything right -> O(n)",
            intuition:
              "A row of lockers with numbered doors. You know locker #k's position exactly (address = start + k × size), so opening it is instant. But squeezing a new bag between two lockers means moving everyone.",
            commonMistakes: [
              "Off-by-one errors: valid indices are 0 to length-1",
              "Assuming insert/delete at an arbitrary position is O(1) — it is not",
              "Not accounting for resizing cost in dynamic arrays (amortized O(1), worst-case O(n))",
            ],
            practice: [
              "Reverse an array in place (O(1) space).",
              "Find the maximum subarray sum (Kadane's algorithm).",
              "Rotate an array by k positions.",
            ],
            quickRevision: [
              "Indexing: O(1)",
              "Insert/delete at middle: O(n)",
              "Dynamic arrays double when full (amortized O(1) append)",
              "Strings are character arrays (with null terminator in C)",
            ],
            prerequisites: ["what-is-a-data-structure", "big-o-notation"],
          },
          {
            slug: "linked-lists",
            title: "Linked Lists",
            difficulty: "beginner",
            estimatedMinutes: 75,
            summary:
              "Nodes connected by pointers: O(1) insertions anywhere, but O(n) to reach the middle.",
            whyMatters:
              "Linked lists teach pointer thinking and are a recurring interview topic for detecting cycles and reversing.",
            keyIdea:
              "Each node holds data and a pointer to the next node. Inserting/deleting at a known position is O(1); random access is O(n).",
            example:
              "class Node { int data; Node next; }\nA -> B -> C -> null   (singly linked)",
            intuition:
              "A treasure hunt: each clue tells you where the next clue is. Adding a new clue between two is easy once you hold them. But finding clue #50 requires following 49 clues in order.",
            commonMistakes: [
              "Losing the rest of the list when inserting (save next before rewiring)",
              "Forgetting to handle empty and one-node lists",
              "Infinite loops from cycles",
            ],
            practice: [
              "Reverse a singly linked list iteratively and recursively.",
              "Detect a cycle (Floyd's tortoise and hare).",
              "Find the middle node in one pass.",
            ],
            quickRevision: [
              "Insert/delete at head: O(1)",
              "Search: O(n)",
              "Memory: extra pointer per node",
              "Singly vs doubly (prev + next)",
            ],
            prerequisites: ["arrays"],
          },
          {
            slug: "stacks-and-queues",
            title: "Stacks and Queues",
            difficulty: "beginner",
            estimatedMinutes: 60,
            summary:
              "LIFO and FIFO structures — the under-appreciated workhorses behind function calls, undo, browsers and scheduling.",
            whyMatters:
              "Recursion uses a stack; BFS uses a queue; undo, parsing and expression evaluation all rely on stacks.",
            keyIdea:
              "Stack = last in, first out (push/pop). Queue = first in, first out (enqueue/dequeue). Both support O(1) insert and remove.",
            example:
              "// Stack: push 1, 2, 3 -> pop gives 3\n// Queue: enqueue 1, 2, 3 -> dequeue gives 1",
            intuition:
              "Stack: a stack of plates — you take the top plate. Queue: a line at the canteen — first to arrive is served first.",
            commonMistakes: [
              "Using a stack when the problem needs a queue (and vice versa)",
              "Array-based stack growing without bound",
            ],
            practice: [
              "Check balanced parentheses with a stack.",
              "Implement a queue using two stacks.",
              "Design a min-stack (push/pop/min all O(1)).",
            ],
            quickRevision: [
              "Stack: LIFO, push/pop/peek O(1)",
              "Queue: FIFO, enqueue/dequeue O(1)",
              "Implement with arrays or linked lists",
            ],
            prerequisites: ["arrays", "linked-lists"],
          },
          {
            slug: "hash-tables",
            title: "Hash Tables",
            difficulty: "beginner",
            estimatedMinutes: 75,
            summary:
              "Key→value storage with O(1) average lookup, insert and delete — the most-used structure in real code.",
            whyMatters:
              "Hash maps power caches, dictionaries, indexes and countless interview solutions. Knowing how they work under the hood separates pros.",
            keyIdea:
              "A hash function maps keys to buckets. Average O(1) operations degrade to O(n) in the worst case (collisions).",
            example:
              "let freq = {};\nfor (let x of arr) freq[x] = (freq[x] || 0) + 1;\n// Lookup freq[5] in O(1) average",
            intuition:
              "A school where each student is assigned a locker by hashing their name. Mostly you walk straight to the locker. When two students get the same locker, you chain them on a list — that's collision handling.",
            commonMistakes: [
              "Assuming worst-case O(1) (it's average case)",
              "Using a mutable key (changes its hash) — breaks lookups",
              "Ignoring load factor and resizing",
            ],
            practice: [
              "Find the first non-repeating character using a hash map.",
              "Two-sum problem in O(n).",
              "Detect duplicates in an array in O(n).",
            ],
            quickRevision: [
              "Insert/lookup/delete: O(1) average, O(n) worst",
              "Collisions handled by chaining or open addressing",
              "Keys must be hashable and immutable",
            ],
            prerequisites: ["arrays", "big-o-notation"],
          },
          {
            slug: "trees-and-binary-trees",
            title: "Trees and Binary Trees",
            difficulty: "intermediate",
            estimatedMinutes: 90,
            summary:
              "Hierarchical data with a root and children — the structure behind file systems, HTML, JSON and search.",
            whyMatters:
              "Trees appear everywhere, and binary tree traversals are a guaranteed interview topic.",
            keyIdea:
              "A binary tree has at most two children per node. Traversals (pre, in, post, level) visit nodes in defined orders.",
            example:
              "    1\n   / \\\n  2   3\n / \\\n4   5\n\nPreorder: 1 2 4 5 3\nInorder: 4 2 5 1 3\nPostorder: 4 5 2 3 1",
            intuition:
              "An org chart, or a family tree. Inorder on a binary search tree visits values in sorted order — that's the key trick.",
            commonMistakes: [
              "Mixing up pre/in/post order",
              "Recursion stack overflow on deep trees",
              "Forgetting null checks when recursing",
            ],
            practice: [
              "Implement all three DFS traversals (iterative too).",
              "Compute tree height and node count.",
              "Level-order traversal with a queue (BFS).",
            ],
            quickRevision: [
              "Height of balanced tree: O(log n); skewed: O(n)",
              "Pre = root, left, right | In = left, root, right | Post = left, right, root",
              "BFS uses a queue, DFS uses a stack",
            ],
            prerequisites: ["stacks-and-queues", "recursion"],
          },
          {
            slug: "recursion",
            title: "Recursion",
            difficulty: "intermediate",
            estimatedMinutes: 75,
            summary:
              "Functions that call themselves to solve smaller versions of the same problem. The gateway to trees, DP and backtracking.",
            whyMatters:
              "Recursion is how you think in DSA. If recursion doesn't click, divide-and-conquer and dynamic programming will feel impossible.",
            keyIdea:
              "Every recursive solution has a base case (stops) and a recursive case (reduces the problem). Trust that smaller calls work.",
            example:
              "function factorial(n) {\n  if (n <= 1) return 1;        // base case\n  return n * factorial(n - 1); // recursive case\n}",
            intuition:
              "Recursion is 'delegating' — you solve a smaller copy of the problem and combine. The call stack remembers each half-done step, like nested matryoshka dolls.",
            commonMistakes: [
              "No base case → stack overflow",
              "Recursive case not reducing the problem → infinite recursion",
              "Thinking about the whole chain instead of one step at a time",
            ],
            practice: [
              "Compute Fibonacci recursively, then with memoization.",
              "Reverse a string recursively.",
              "Count paths in a grid (pure recursion, then DP).",
            ],
            quickRevision: [
              "Base case + recursive case",
              "Every call uses stack space",
              "Memoization turns exponential into polynomial",
            ],
            prerequisites: ["big-o-notation"],
          },
        ],
      },
      {
        stage: "intermediate",
        topics: [
          {
            slug: "binary-search-trees",
            title: "Binary Search Trees",
            difficulty: "intermediate",
            estimatedMinutes: 75,
            summary:
              "A sorted tree where every node keeps its left subtree smaller and right subtree larger.",
            whyMatters:
              "BSTs give O(log n) search, insert and delete when balanced — the reasoning behind balanced trees and heaps.",
            keyIdea:
              "Invariant: left subtree < node < right subtree. Inorder traversal yields sorted order.",
            example:
              "    50\n   /  \\\n  30   70\n / \\   / \\\n20 40 60 80\nSearch 60: 60 > 50 -> right; 60 < 70 -> left. Found in 3 steps.",
            intuition:
              "A binary search applied to a tree: at every node you decide to go left or right, discarding half the remaining candidates.",
            commonMistakes: [
              "Unbalanced trees degrading to O(n) (a sorted insert order does this)",
              "Deleting nodes with two children (needs successor/predecessor)",
            ],
            practice: [
              "Implement BST insert and search.",
              "Validate that a tree is a BST.",
              "Find the lowest common ancestor of two nodes.",
            ],
            quickRevision: [
              "Balanced BST operations: O(log n)",
              "Inorder = sorted order",
              "Self-balancing variants: AVL, Red-Black",
            ],
            prerequisites: ["trees-and-binary-trees", "recursion"],
          },
          {
            slug: "heaps",
            title: "Heaps and Priority Queues",
            difficulty: "intermediate",
            estimatedMinutes: 60,
            summary:
              "A complete binary tree where the largest (or smallest) element is always at the top.",
            whyMatters:
              "Priority queues power Dijkstra's, task schedulers and Top-K problems — a favorite interview area.",
            keyIdea:
              "A max-heap keeps the largest at the root; extract-max is O(log n). Build a heap from an array in O(n).",
            example:
              "// k largest elements in an array\n// Use a min-heap of size k\nfor x in arr: push x; if size > k: pop smallest\n// Result: the k remaining are the k largest",
            intuition:
              "A tournament bracket: the champion sits at the top, and when the champion retires, the next contender is promoted quickly.",
            commonMistakes: [
              "Confusing min-heap vs max-heap for Top-K problems",
              "Using a sorted array where a heap is O(log n) cheaper",
            ],
            practice: [
              "Find the kth largest element with a heap.",
              "Merge k sorted lists using a min-heap.",
              "Implement heapify from an arbitrary array.",
            ],
            quickRevision: [
              "peek O(1), push/pop O(log n), build O(n)",
              "Min-heap for k largest, max-heap for k smallest",
            ],
            prerequisites: ["trees-and-binary-trees", "arrays"],
          },
          {
            slug: "sorting-algorithms",
            title: "Sorting Algorithms",
            difficulty: "intermediate",
            estimatedMinutes: 120,
            summary:
              "Bubble, selection, insertion, merge, quick and counting sort — how they work and when each wins.",
            whyMatters:
              "Sorting is the most studied problem in CS; merge and quick sort also teach divide-and-conquer.",
            keyIdea:
              "O(n²) sorts are simple but slow; O(n log n) sorts (merge, quick, heap) scale. Counting sort is O(n+k) for small ranges.",
            example:
              "Merge sort: split array in half, sort each half, merge. Depth of splits = log n, each level does O(n) work → O(n log n).",
            intuition:
              "Merge sort: divide the pile in two, have two people sort halves, then merge — merging sorted halves is fast because you only compare fronts.",
            commonMistakes: [
              "Using O(n²) sorts on large data",
              "Unstable sorts when stability matters",
              "Quick sort worst case on sorted input (pivot choice)",
            ],
            practice: [
              "Implement merge sort and trace it on a small array.",
              "Implement quick sort with a good pivot strategy.",
              "Count inversions using merge sort.",
            ],
            quickRevision: [
              "Stable: merge, insertion, bubble, counting",
              "In-place: quick, heap, insertion, selection",
              "Best general-purpose: O(n log n)",
            ],
            prerequisites: ["recursion", "big-o-notation"],
          },
          {
            slug: "binary-search",
            title: "Binary Search",
            difficulty: "intermediate",
            estimatedMinutes: 60,
            summary:
              "Search a sorted array by halving the range each step — O(log n) time.",
            whyMatters:
              "Binary search is a simple idea with brutal edge cases; interviewers love variants on sorted/rotated arrays.",
            keyIdea:
              "Maintain low..high; inspect the middle; decide which half the answer must live in.",
            example:
              "// Search 23 in [2, 5, 8, 12, 16, 23, 38, 56]\n// mid=12 -> 23>12 go right; mid=38 -> 23<38 go left; found.\n// 3 comparisons for 8 elements, log2(8) = 3",
            intuition:
              "The game 'guess a number between 1 and 100': say 50, then 75 or 25. Each guess halves the possibilities.",
            commonMistakes: [
              "Infinite loops from off-by-one (low <= high vs low < high)",
              "Integer overflow: use mid = low + (high - low) / 2",
              "Applying to unsorted input",
            ],
            practice: [
              "Search in a rotated sorted array.",
              "Find the first and last occurrence of a target.",
              "Find the peak element.",
            ],
            quickRevision: [
              "Requires sorted input",
              "O(log n) time, O(1) space",
              "Watch low/high updates carefully",
            ],
            prerequisites: ["arrays", "big-o-notation"],
          },
        ],
      },
      {
        stage: "advanced",
        topics: [
          {
            slug: "graphs",
            title: "Graphs and Graph Traversal",
            difficulty: "advanced",
            estimatedMinutes: 120,
            summary:
              "Nodes and edges: adjacency lists, BFS, DFS, and the problems they solve (shortest paths, connectivity, cycles).",
            whyMatters:
              "Graphs model networks, maps, social graphs and dependencies — the biggest interview topic after DP.",
            keyIdea:
              "Represent with adjacency lists. BFS finds shortest path in unweighted graphs; DFS explores and detects cycles.",
            example:
              "BFS: queue-based level-by-level exploration.\nDFS: stack/recursive depth-first exploration.",
            intuition:
              "BFS is a ripple spreading from a stone in a pond (closest first). DFS is a spelunker going as deep as possible before backtracking.",
            commonMistakes: [
              "Forgetting visited set → infinite loops on cycles",
              "Using DFS when BFS is needed for shortest path",
              "Mixed-up directed vs undirected semantics",
            ],
            practice: [
              "BFS and DFS traversals on the same graph.",
              "Detect a cycle in a directed graph.",
              "Number of islands (grid BFS/DFS).",
            ],
            quickRevision: [
              "Adjacency list: O(V + E) traversal",
              "BFS queue, DFS stack/recursion",
              "visited set is mandatory",
            ],
            prerequisites: ["stacks-and-queues", "recursion", "binary-search-trees"],
          },
          {
            slug: "shortest-path",
            title: "Shortest Paths: Dijkstra and BFS",
            difficulty: "advanced",
            estimatedMinutes: 90,
            summary:
              "Finding the cheapest route in weighted and unweighted graphs.",
            whyMatters:
              "Dijkstra's algorithm is the engine behind GPS navigation and a staple interview topic.",
            keyIdea:
              "BFS = shortest path for unweighted. Dijkstra = shortest for positive weights using a priority queue: always relax the cheapest known.",
            example:
              "Dijkstra: start with dist[start]=0, others=∞. Pop min from heap, relax neighbors. Stop when target popped.",
            commonMistakes: [
              "Using Dijkstra with negative weights (use Bellman-Ford)",
              "Marking visited before relaxing all edges (can miss shorter paths)",
            ],
            practice: [
              "Implement Dijkstra with a priority queue.",
              "Network delay time problem.",
              "Cheapest flights with at most k stops.",
            ],
            quickRevision: [
              "Dijkstra: O((V+E) log V) with heap",
              "No negative weights for Dijkstra",
              "BFS for unweighted shortest path",
            ],
            prerequisites: ["graphs", "heaps"],
          },
          {
            slug: "dynamic-programming",
            title: "Dynamic Programming",
            difficulty: "advanced",
            estimatedMinutes: 120,
            summary:
              "Solve overlapping subproblems once and reuse them. The hardest and most valuable topic in DSA.",
            whyMatters:
              "DP separates great candidates in interviews. Master the framework and most hard problems become pattern-matching.",
            keyIdea:
              "Two steps: (1) define a state that encodes the subproblem, (2) write a recurrence relating it to smaller states. Cache (memoize) or fill a table bottom-up.",
            example:
              "// Fibonacci with memoization\nconst memo = {};\nfunction fib(n) {\n  if (n <= 1) return n;\n  if (memo[n] !== undefined) return memo[n];\n  return memo[n] = fib(n-1) + fib(n-2);\n}\n// O(n) instead of O(2^n)",
            intuition:
              "Fibonacci naive recomputes fib(3) dozens of times. DP writes each answer on a sticky note the first time, so every later computation is a lookup, not a recomputation.",
            commonMistakes: [
              "Jumping to code before defining the state",
              "Missing the base cases",
              "Memoizing when a simple table works (or vice versa)",
            ],
            practice: [
              "Climbing stairs (start here — the hello world of DP).",
              "0/1 knapsack.",
              "Longest common subsequence.",
              "Coin change (minimum coins).",
            ],
            quickRevision: [
              "Overlapping subproblems + optimal substructure",
              "Memoize top-down or tabulate bottom-up",
              "Patterns: 1D, 2D grid, interval, decision",
            ],
            prerequisites: ["recursion", "big-o-notation"],
          },
          {
            slug: "backtracking",
            title: "Backtracking",
            difficulty: "advanced",
            estimatedMinutes: 90,
            summary:
              "Systematically explore choices, and undo (backtrack) when a path fails. The engine behind permutations and constraint puzzles.",
            whyMatters:
              "Backtracking solves N-Queens, Sudoku, combinations and permutation problems — very common interview asks.",
            keyIdea:
              "Build a solution incrementally. At each step try a candidate; recurse; if it leads nowhere, undo and try the next candidate.",
            example:
              "// Generate all subsets (classic)\nfunction subsets(nums) {\n  const res = [];\n  function go(i, cur) {\n    if (i === nums.length) return res.push([...cur]);\n    go(i+1, cur);            // skip\n    cur.push(nums[i]);\n    go(i+1, cur);            // take\n    cur.pop();               // backtrack\n  }\n  go(0, []); return res;\n}",
            intuition:
              "Think of a maze with a thread: you explore a branch, and if it's a dead end, you pull the thread back (undo) and try the next branch.",
            commonMistakes: [
              "Not undoing state after recursion (stale results)",
              "Missing pruning → exponential blow-up on big inputs",
            ],
            practice: [
              "Generate permutations and combinations.",
              "N-Queens placement.",
              "Word search on a grid.",
            ],
            quickRevision: [
              "Choose → explore → un-choose",
              "Prune early to stay fast",
              "State must be copied or restored correctly",
            ],
            prerequisites: ["recursion", "arrays"],
          },
        ],
      },
      {
        stage: "practice",
        topics: [
          {
            slug: "dsa-practice-array-and-strings",
            title: "Practice Set: Arrays & Strings",
            difficulty: "intermediate",
            estimatedMinutes: 150,
            summary: "The classic array/string problems that appear everywhere.",
            practice: [
              "Two sum (and its sorted variant)",
              "Product of array except self",
              "Longest substring without repeating characters",
              "Container with most water",
            ],
            quickRevision: ["Sliding window + two pointers cover most"],
          },
          {
            slug: "dsa-practice-linked-trees",
            title: "Practice Set: Linked Lists & Trees",
            difficulty: "intermediate",
            estimatedMinutes: 150,
            summary: "Pointer-heavy problems that build mastery.",
            practice: [
              "Merge two sorted lists",
              "Linked list cycle detection",
              "Lowest common ancestor",
              "Serialize and deserialize a binary tree",
            ],
            quickRevision: ["Draw the pointer rewiring before coding"],
          },
          {
            slug: "dsa-practice-dp-graphs",
            title: "Practice Set: DP & Graphs",
            difficulty: "advanced",
            estimatedMinutes: 180,
            summary: "The harder problems that close the interview gap.",
            practice: [
              "House robber, coin change, edit distance",
              "Number of islands, course schedule (topo sort)",
              "Word ladder",
            ],
            quickRevision: ["Write the recurrence in words before code"],
          },
        ],
      },
      {
        stage: "projects",
        topics: [
          {
            slug: "dsa-project-pathfinder",
            title: "Project: Pathfinding Visualizer",
            difficulty: "advanced",
            estimatedMinutes: 360,
            summary:
              "Visualize BFS, DFS and Dijkstra's on a grid with walls — see algorithms move in real time.",
            whyMatters:
              "Turning algorithms into a visual tool forces true understanding and is a strong portfolio piece.",
            practice: [
              "Render a grid, let users place walls, animate BFS/DFS/Dijkstra with different colors, show the final path.",
            ],
            quickRevision: ["Keep algorithm logic separate from rendering"],
          },
          {
            slug: "dsa-project-autocomplete",
            title: "Project: Autocomplete Engine",
            difficulty: "intermediate",
            estimatedMinutes: 240,
            summary:
              "A search-as-you-type engine using a trie or sorted array over a word list.",
            practice: [
              "Index words, rank suggestions by frequency/prefix, wire up a UI.",
            ],
            quickRevision: ["Prefix queries are fast with a trie"],
          },
        ],
      },
      {
        stage: "interview",
        topics: [
          {
            slug: "dsa-interview-strategy",
            title: "Interview Problem-Solving Framework",
            difficulty: "advanced",
            estimatedMinutes: 90,
            summary:
              "The repeatable process: clarify → brute force → optimize → code → test.",
            whyMatters:
              "Interviewers grade your process, not just the final answer.",
            practice: [
              "Practice narrating your approach out loud on 5 random problems.",
              "Always state time/space complexity before coding.",
            ],
            quickRevision: [
              "Clarify constraints first",
              "Brute force, then optimize (mention trade-offs)",
              "Test edge cases: empty, single, duplicates",
            ],
          },
          {
            slug: "dsa-company-patterns",
            title: "High-Frequency Problem Patterns",
            difficulty: "advanced",
            estimatedMinutes: 120,
            summary:
              "Sliding window, two pointers, fast/slow, merge intervals, top-k, island problems.",
            whyMatters:
              "Most interview problems are one of ~15 patterns. Pattern recognition is the final skill to build.",
            practice: [
              "Solve 2 problems per pattern from the DSA practice sets.",
            ],
            quickRevision: [
              "Subarray → sliding window or prefix sum",
              "Sorted + pair → two pointers",
              "Kth/largest → heap or quickselect",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "object-oriented-programming",
    name: "Object-Oriented Programming",
    category: "cs-fundamentals",
    icon: "chip",
    description:
      "The four pillars — encapsulation, abstraction, inheritance, polymorphism — plus SOLID design. Language-agnostic and interview-critical.",
    difficulty: "intermediate",
    estimatedHours: 25,
    prerequisites: ["programming-with-c"],
    stages: [
      {
        stage: "fundamentals",
        topics: [
          {
            slug: "oop-basics",
            title: "Classes, Objects and the OOP Mindset",
            difficulty: "beginner",
            estimatedMinutes: 60,
            summary: "Model the world as objects that hold state and expose behavior.",
            whyMatters: "Most professional codebases are object-oriented; you must read and write it fluently.",
            keyIdea: "A class is a blueprint; an object is a living instance with its own state.",
            example: "class Dog { name; breed; bark() { return 'woof'; } }\nconst rex = new Dog();",
            commonMistakes: ["Thinking OOP is just classes — it's about design"],
            practice: ["Model a real-world object (Car, BankAccount) as a class."],
            quickRevision: ["Class = blueprint, object = instance", "State + behavior together"],
          },
          {
            slug: "encapsulation",
            title: "Encapsulation",
            difficulty: "beginner",
            estimatedMinutes: 60,
            summary: "Bundle data with the methods that operate on it; hide internals.",
            whyMatters: "Encapsulation is what keeps large systems from breaking each other.",
            keyIdea: "Private fields + public methods = controlled access and changeable internals.",
            example: "class Account { private balance = 0; deposit(x) { this.balance += x; } }",
            commonMistakes: ["Exposing fields directly, breaking invariants"],
            practice: ["Refactor a class so its data is only changed via methods."],
            quickRevision: ["private hides implementation", "Getters/setters control access"],
          },
        ],
      },
      {
        stage: "core",
        topics: [
          {
            slug: "inheritance",
            title: "Inheritance",
            difficulty: "intermediate",
            estimatedMinutes: 60,
            summary: "Reuse and extend behavior by deriving classes.",
            whyMatters: "Inheritance models 'is-a' relationships and removes duplication.",
            keyIdea: "A subclass inherits members and can override methods.",
            example: "class Animal { eat() {} }\nclass Cat extends Animal { meow() {} }",
            commonMistakes: ["Deep inheritance chains that become rigid"],
            practice: ["Build a Shape → Circle/Rectangle hierarchy."],
            quickRevision: ["is-a relationship", "Override with care, prefer composition sometimes"],
          },
          {
            slug: "polymorphism",
            title: "Polymorphism",
            difficulty: "intermediate",
            estimatedMinutes: 75,
            summary: "One interface, many implementations — call the same method, get behavior by type.",
            whyMatters: "Polymorphism is what makes frameworks and plugins work.",
            keyIdea: "Base-type references call the derived implementation at runtime.",
            example: "List<Shape> shapes = ...;\nfor (Shape s : shapes) s.area(); // each draws itself",
            commonMistakes: ["Type-checking with instanceof instead of using polymorphism"],
            practice: ["Add a new Shape without touching the drawing code."],
            quickRevision: ["Same call, different behavior", "Enables the Strategy and Factory patterns"],
          },
          {
            slug: "abstraction-and-interfaces",
            title: "Abstraction and Interfaces",
            difficulty: "intermediate",
            estimatedMinutes: 60,
            summary: "Define contracts that hide implementation details.",
            whyMatters: "Interfaces let code depend on 'what' not 'how' — the key to testability.",
            keyIdea: "An interface lists behavior; classes implement it; callers depend on the interface.",
            example: "interface Payable { double amount(); }\nclass Invoice implements Payable { ... }",
            practice: ["Make your app's payment logic depend on an interface."],
            quickRevision: ["Abstract classes: partial impl; interfaces: pure contract", "Program to interfaces"],
          },
        ],
      },
      {
        stage: "intermediate",
        topics: [
          {
            slug: "association-and-composition",
            title: "Association, Aggregation and Composition",
            difficulty: "intermediate",
            estimatedMinutes: 60,
            summary: "How objects relate: uses-a, has-a (shared), has-a (owned).",
            whyMatters: "Modeling relationships correctly prevents design disasters.",
            keyIdea: "Composition = part-of (lives and dies with owner). Aggregation = shared part.",
            example: "A Car owns its Engine (composition). A Car has a Driver (aggregation).",
            practice: ["Classify relationships in a University → Department → Professor model."],
            quickRevision: ["Composition: strong ownership", "Prefer composition over inheritance where 'has-a' fits"],
          },
          {
            slug: "solid-principles",
            title: "SOLID Principles",
            difficulty: "intermediate",
            estimatedMinutes: 90,
            summary: "The five rules of maintainable design: SRP, OCP, LSP, ISP, DIP.",
            whyMatters: "SOLID is the vocabulary of code review and architecture discussions.",
            keyIdea: "Each letter is one rule for keeping classes focused and dependencies clean.",
            practice: [
              "Single Responsibility: split a God class.",
              "Open/Closed: extend behavior without modifying it.",
              "Dependency Inversion: depend on abstractions.",
            ],
            quickRevision: ["S: one reason to change", "O: open for extension", "D: invert dependencies"],
          },
          {
            slug: "design-patterns",
            title: "Design Patterns Overview",
            difficulty: "intermediate",
            estimatedMinutes: 90,
            summary: "Proven solutions: Singleton, Factory, Observer, Strategy, Decorator.",
            whyMatters: "Patterns are shared vocabulary for solving common design problems.",
            keyIdea: "Learn patterns as solutions to specific problems, not trophies to collect.",
            practice: [
              "Observer: an event system where subscribers get notified.",
              "Strategy: swapping algorithms at runtime.",
              "Factory: creating objects without specifying the concrete class.",
            ],
            quickRevision: ["Pattern = problem + solution + trade-offs", "Use when the problem actually matches"],
          },
        ],
      },
      {
        stage: "advanced",
        topics: [
          {
            slug: "oop-advanced-composition",
            title: "Composition vs Inheritance, Advanced Modeling",
            difficulty: "advanced",
            estimatedMinutes: 75,
            summary: "When inheritance hurts and composition shines.",
            whyMatters: "Fragile base classes are a classic source of production bugs.",
            keyIdea: "Prefer composing small objects over deep inheritance.",
            practice: ["Refactor a deep hierarchy into composed behaviors."],
            quickRevision: ["Inheritance = rigid", "Composition = flexible, testable"],
          },
        ],
      },
      {
        stage: "practice",
        topics: [
          {
            slug: "oop-practice-design",
            title: "Practice: Design a System",
            difficulty: "intermediate",
            estimatedMinutes: 180,
            summary: "Object-oriented design problems (like a library or vending machine).",
            practice: [
              "Design a vending machine: items, coins, states.",
              "Design a parking lot.",
              "Design a notification system with multiple channels.",
            ],
            quickRevision: ["List nouns → classes, verbs → methods"],
          },
        ],
      },
      {
        stage: "projects",
        topics: [
          {
            slug: "oop-project-inventory",
            title: "Project: Inventory System",
            difficulty: "intermediate",
            estimatedMinutes: 360,
            summary: "A complete OOP system with products, stock and orders.",
            practice: ["Model classes, use interfaces for persistence, add a console menu."],
            quickRevision: ["Keep each class single-responsibility"],
          },
        ],
      },
      {
        stage: "interview",
        topics: [
          {
            slug: "oop-interview-questions",
            title: "OOP Interview Questions",
            difficulty: "advanced",
            estimatedMinutes: 90,
            summary: "Explain the 4 pillars, SOLID examples, and design discussions.",
            practice: [
              "Give a real example of each pillar",
              "When would you choose composition over inheritance?",
              "Design a chess game (discussion).",
            ],
            quickRevision: ["Speak in terms of trade-offs, not definitions"],
          },
        ],
      },
    ],
  },
  {
    slug: "dbms",
    name: "Database Management Systems",
    category: "cs-fundamentals",
    icon: "database",
    description:
      "SQL, transactions, indexing and normalization — how real systems store, protect and query data at scale.",
    difficulty: "intermediate",
    estimatedHours: 35,
    prerequisites: [],
    stages: [
      {
        stage: "fundamentals",
        topics: [
          {
            slug: "dbms-intro",
            title: "What is a DBMS?",
            difficulty: "beginner",
            estimatedMinutes: 30,
            summary: "Why databases exist and how they differ from plain files.",
            whyMatters: "Every application of consequence sits on a database.",
            keyIdea: "A DBMS gives concurrent, crash-safe, queryable access to data.",
            practice: ["List differences between a CSV file and a database."],
            quickRevision: ["DBMS: storage + query + concurrency + recovery"],
          },
          {
            slug: "sql-basics",
            title: "SQL Basics: SELECT, INSERT, UPDATE, DELETE",
            difficulty: "beginner",
            estimatedMinutes: 90,
            summary: "The CRUD operations and WHERE filtering.",
            whyMatters: "SQL is the most transferable skill in this entire course.",
            keyIdea: "SQL is declarative — you say what, the engine figures out how.",
            example: "SELECT name, age FROM students WHERE age > 18 ORDER BY name;",
            practice: ["Query a sample table with filters, ordering and limits."],
            quickRevision: ["SELECT ... FROM ... WHERE ... ORDER BY ... LIMIT"],
          },
          {
            slug: "joins",
            title: "Joins and Aggregations",
            difficulty: "beginner",
            estimatedMinutes: 90,
            summary: "Combine tables with INNER/LEFT/RIGHT joins and group data with GROUP BY.",
            whyMatters: "Real queries almost always span multiple tables.",
            keyIdea: "A join links rows on a matching key; GROUP BY collapses rows with aggregates.",
            example: "SELECT d.name, COUNT(e.id) FROM dept d LEFT JOIN emp e ON e.dept_id = d.id GROUP BY d.name;",
            practice: ["Write queries joining three tables with aggregation."],
            quickRevision: ["INNER = match only", "LEFT = keep left rows anyway", "HAVING filters groups"],
          },
        ],
      },
      {
        stage: "core",
        topics: [
          {
            slug: "normalization",
            title: "Normalization (1NF–3NF)",
            difficulty: "intermediate",
            estimatedMinutes: 90,
            summary: "Removing redundancy and designing clean schemas.",
            whyMatters: "Bad schemas cause inconsistent data and slow queries.",
            keyIdea: "Normalize to eliminate redundancy: 1NF atomic values, 2NF no partial deps, 3NF no transitive deps.",
            example: "Split a Student(classes) table into Student and Enrollment to satisfy 3NF.",
            practice: ["Normalize a denormalized spreadsheet into 3NF."],
            quickRevision: ["1NF: atomic columns", "2NF: full key dependency", "3NF: no transitive dependency"],
          },
          {
            slug: "keys-and-constraints",
            title: "Keys and Constraints",
            difficulty: "beginner",
            estimatedMinutes: 45,
            summary: "Primary keys, foreign keys, unique, not null, check.",
            whyMatters: "Constraints are the database enforcing your data rules automatically.",
            keyIdea: "PK identifies rows; FK links tables and preserves referential integrity.",
            practice: ["Add appropriate constraints to a schema you designed."],
            quickRevision: ["PK unique + not null", "FK references another table", "ON DELETE CASCADE"],
          },
          {
            slug: "indexes",
            title: "Indexes and Query Performance",
            difficulty: "intermediate",
            estimatedMinutes: 60,
            summary: "B-tree and hash indexes that turn full scans into fast lookups.",
            whyMatters: "Indexes are the #1 lever for making slow queries fast.",
            keyIdea: "An index is a sorted structure allowing O(log n) lookups instead of O(n) scans.",
            practice: ["EXPLAIN a query with and without an index and compare."],
            quickRevision: ["Index the WHERE/join columns", "Indexes cost writes and space"],
          },
          {
            slug: "transactions-and-acid",
            title: "Transactions and ACID",
            difficulty: "intermediate",
            estimatedMinutes: 75,
            summary: "Atomicity, Consistency, Isolation, Durability — and why money transfers need them.",
            whyMatters: "ACID is what makes a database trustworthy for banking and e-commerce.",
            keyIdea: "A transaction groups operations so they all commit or all roll back.",
            example: "BEGIN; UPDATE accounts SET balance = balance - 100 WHERE id = 1; UPDATE accounts SET balance = balance + 100 WHERE id = 2; COMMIT;",
            practice: ["Explain what happens if the DB crashes mid-transfer."],
            quickRevision: ["A: all or nothing", "I: transactions don't see partial work", "D: survives crash"],
          },
        ],
      },
      {
        stage: "intermediate",
        topics: [
          {
            slug: "isolation-levels",
            title: "Isolation Levels and Concurrency",
            difficulty: "advanced",
            estimatedMinutes: 60,
            summary: "Read committed, repeatable read, serializable — and the anomalies they prevent.",
            whyMatters: "Concurrency control is why banks can serve millions of users.",
            keyIdea: "Stronger isolation = less concurrency = more safety.",
            practice: ["Explain dirty reads, lost updates, phantom reads."],
            quickRevision: ["Serializable is safest, slowest", "MVCC powers modern isolation"],
          },
          {
            slug: "subqueries-and-views",
            title: "Subqueries, CTEs and Views",
            difficulty: "intermediate",
            estimatedMinutes: 60,
            summary: "Compose complex queries and reuse them.",
            practice: ["Write a query using a CTE for running totals."],
            quickRevision: ["WITH ... AS (...) for readability", "Views = saved queries"],
          },
        ],
      },
      {
        stage: "advanced",
        topics: [
          {
            slug: "sql-optimization",
            title: "Query Optimization and EXPLAIN",
            difficulty: "advanced",
            estimatedMinutes: 60,
            summary: "Read execution plans, spot full scans and fix N+1 queries.",
            practice: ["Optimize a slow join using EXPLAIN ANALYZE."],
            quickRevision: ["Look for Seq Scan on big tables", "Avoid SELECT *"],
          },
          {
            slug: "nosql",
            title: "NoSQL Databases",
            difficulty: "intermediate",
            estimatedMinutes: 60,
            summary: "Document, key-value, column and graph stores — and when SQL isn't the answer.",
            practice: ["Compare a use case for MongoDB vs PostgreSQL."],
            quickRevision: ["NoSQL: flexible schema, horizontal scale", "CAP theorem trade-offs"],
          },
        ],
      },
      {
        stage: "practice",
        topics: [
          {
            slug: "sql-practice",
            title: "Practice Set: SQL from basic to advanced",
            difficulty: "intermediate",
            estimatedMinutes: 180,
            summary: "Solve a ladder of SQL problems on real datasets.",
            practice: [
              "Top-3 salaried per department",
              "Consecutive rows and gaps",
              "Running totals and window functions",
              "Second-highest value without LIMIT",
            ],
            quickRevision: ["Window functions: OVER(PARTITION BY ...)"],
          },
        ],
      },
      {
        stage: "projects",
        topics: [
          {
            slug: "dbms-project-schema-design",
            title: "Project: Design a Database for an App",
            difficulty: "intermediate",
            estimatedMinutes: 360,
            summary: "From requirements to a normalized schema with seed data and queries.",
            practice: ["Pick an app (e.g., library, e-commerce), design ER, build schema, write 10 queries."],
            quickRevision: ["Draw the ER diagram first"],
          },
        ],
      },
      {
        stage: "interview",
        topics: [
          {
            slug: "dbms-interview-questions",
            title: "DBMS Interview Questions",
            difficulty: "advanced",
            estimatedMinutes: 90,
            summary: "ACID, indexing, normalization, SQL vs NoSQL, transactions.",
            practice: [
              "Explain the difference between clustered and non-clustered index",
              "How would you design a notification feed?",
              "What happens on a SELECT — describe the pipeline",
            ],
            quickRevision: ["Speak in trade-offs"],
          },
        ],
      },
    ],
  },
  {
    slug: "operating-systems",
    name: "Operating Systems",
    category: "cs-fundamentals",
    icon: "sensor",
    description:
      "Processes, threads, scheduling, memory and file systems — the software that manages all software.",
    difficulty: "advanced",
    estimatedHours: 40,
    prerequisites: ["programming-with-c"],
    stages: [
      {
        stage: "fundamentals",
        topics: [
          {
            slug: "os-intro",
            title: "What is an Operating System?",
            difficulty: "beginner",
            estimatedMinutes: 30,
            summary: "Abstraction, resource management and the syscall interface.",
            whyMatters: "Every program you write runs on top of an OS's guarantees.",
            keyIdea: "The OS multiplexes hardware among many processes behind safe abstractions.",
            practice: ["List the abstractions: process, file, socket, virtual memory."],
            quickRevision: ["Kernel vs user mode", "Syscalls are the gateway"],
          },
          {
            slug: "processes-and-threads",
            title: "Processes and Threads",
            difficulty: "intermediate",
            estimatedMinutes: 75,
            summary: "The difference between a running program and a unit of execution.",
            whyMatters: "Processes and threads are the atoms of concurrency.",
            keyIdea: "Process = isolated address space + resources. Thread = unit of execution sharing the process.",
            practice: ["Compare a multi-process vs multi-threaded web server."],
            quickRevision: ["Threads share memory; processes don't", "Context switch costs"],
          },
        ],
      },
      {
        stage: "core",
        topics: [
          {
            slug: "cpu-scheduling",
            title: "CPU Scheduling",
            difficulty: "intermediate",
            estimatedMinutes: 75,
            summary: "FCFS, SJF, Round Robin, Priority — and their metrics.",
            whyMatters: "Scheduling decides how responsive and fair a system feels.",
            keyIdea: "Choose the next process to run to balance throughput, latency and fairness.",
            practice: ["Compute average waiting time for RR with time quantum 4."],
            quickRevision: ["Round Robin = fairness + responsiveness", "SJF minimizes avg waiting"],
          },
          {
            slug: "synchronization",
            title: "Process Synchronization and Deadlock",
            difficulty: "advanced",
            estimatedMinutes: 90,
            summary: "Mutexes, semaphores, the producer-consumer problem and deadlock.",
            whyMatters: "Concurrency bugs are the hardest in the field; this is the theory that prevents them.",
            keyIdea: "Locks protect critical sections; deadlock = circular wait; avoid with ordering.",
            example: "Producer-consumer: a bounded buffer + two semaphores (empty, full) + a mutex.",
            practice: ["Solve the dining philosophers problem."],
            quickRevision: ["Mutex = mutual exclusion", "Semaphore = counting lock", "Deadlock needs 4 conditions"],
          },
          {
            slug: "memory-management",
            title: "Memory Management and Paging",
            difficulty: "intermediate",
            estimatedMinutes: 90,
            summary: "Virtual memory, pages, frames and address translation.",
            whyMatters: "Virtual memory lets each process think it owns the whole RAM.",
            keyIdea: "Virtual addresses map to physical via page tables; TLB caches the mapping.",
            practice: ["Explain a page fault and what the OS does about it."],
            quickRevision: ["Page size typical 4KB", "TLB = fast address cache", "Swapping uses disk"],
          },
          {
            slug: "virtual-memory",
            title: "Virtual Memory and Page Replacement",
            difficulty: "advanced",
            estimatedMinutes: 60,
            summary: "Demand paging, FIFO/LRU/OPT replacement and thrashing.",
            practice: ["Simulate LRU on a reference string."],
            quickRevision: ["LRU approximates optimal", "Thrashing = too many faults"],
          },
        ],
      },
      {
        stage: "intermediate",
        topics: [
          {
            slug: "file-systems",
            title: "File Systems",
            difficulty: "intermediate",
            estimatedMinutes: 75,
            summary: "Inodes, directories, and how files are stored and allocated.",
            keyIdea: "An inode stores metadata + pointers to data blocks.",
            practice: ["Explain hard links vs soft links."],
            quickRevision: ["Blocks, inodes, superblock", "Journaling survives crashes"],
          },
          {
            slug: "os-security",
            title: "OS Security: Permissions and Protection",
            difficulty: "intermediate",
            estimatedMinutes: 45,
            summary: "Users, groups, file permissions and the security model.",
            practice: ["Explain rwx permissions and setuid."],
            quickRevision: ["Least privilege", "Capabilities over monolithic root"],
          },
        ],
      },
      {
        stage: "advanced",
        topics: [
          {
            slug: "distributed-os-concepts",
            title: "Distributed OS Concepts",
            difficulty: "advanced",
            estimatedMinutes: 60,
            summary: "What changes when the 'computer' is a cluster.",
            practice: ["Compare NFS vs local FS consistency."],
            quickRevision: ["Network FS + clock + failure challenges"],
          },
        ],
      },
      {
        stage: "practice",
        topics: [
          {
            slug: "os-practice",
            title: "Practice Set: OS Problems",
            difficulty: "advanced",
            estimatedMinutes: 150,
            summary: "Scheduling, synchronization and memory problems.",
            practice: [
              "Solve 10 scheduling examples by hand",
              "Write a threaded counter with a race, then fix it",
              "Simulate page replacement",
            ],
            quickRevision: ["Compute by hand, then check with simulation"],
          },
        ],
      },
      {
        stage: "projects",
        topics: [
          {
            slug: "os-project-shell",
            title: "Project: Build a Simple Shell",
            difficulty: "advanced",
            estimatedMinutes: 480,
            summary: "A terminal that parses commands, forks processes and pipes output.",
            whyMatters: "The classic OS project — you build a mini-OS user interface.",
            practice: ["Support commands, PATH lookup, pipes, redirection and background jobs."],
            quickRevision: ["fork + exec + wait + pipe are the primitives"],
          },
          {
            slug: "os-project-thread-pool",
            title: "Project: Thread Pool Library",
            difficulty: "advanced",
            estimatedMinutes: 300,
            summary: "Implement a worker pool that runs tasks from a queue.",
            practice: ["Queue of tasks, N worker threads, clean shutdown."],
            quickRevision: ["Mutex protects the queue", "Condition variable wakes workers"],
          },
        ],
      },
      {
        stage: "interview",
        topics: [
          {
            slug: "os-interview-questions",
            title: "OS Interview Questions",
            difficulty: "advanced",
            estimatedMinutes: 90,
            summary: "Process vs thread, deadlock, page fault, scheduling, syscalls.",
            practice: [
              "What happens when you type a URL? (process-level view)",
              "Explain the page fault lifecycle",
              "Difference between mutex and semaphore",
            ],
            quickRevision: ["Anchor answers in process/memory/file abstractions"],
          },
        ],
      },
    ],
  },
  {
    slug: "computer-networks",
    name: "Computer Networks",
    category: "cs-fundamentals",
    icon: "network",
    description:
      "From HTTP to TCP/IP: how data travels across the world, and how the web really works.",
    difficulty: "intermediate",
    estimatedHours: 35,
    prerequisites: [],
    stages: [
      {
        stage: "fundamentals",
        topics: [
          {
            slug: "network-basics",
            title: "Networks and the OSI/TCP-IP Models",
            difficulty: "beginner",
            estimatedMinutes: 60,
            summary: "Layers as abstractions: application, transport, network, link.",
            whyMatters: "The layered model is how engineers reason about the internet.",
            keyIdea: "Each layer adds a header and serves the layer above.",
            practice: ["Map HTTP, TCP, IP, Ethernet to layers."],
            quickRevision: ["L7 app, L4 transport, L3 network, L2 link"],
          },
          {
            slug: "ip-addressing",
            title: "IP Addressing and Subnetting",
            difficulty: "beginner",
            estimatedMinutes: 75,
            summary: "IPv4, CIDR, subnets and the basics of IPv6.",
            whyMatters: "Addressing is how machines find each other.",
            keyIdea: "An IP + subnet mask defines a network and host portion.",
            practice: ["Compute the network address of 192.168.1.77/24."],
            quickRevision: ["CIDR notation /24 = 255.255.255.0", "NAT maps private to public"],
          },
        ],
      },
      {
        stage: "core",
        topics: [
          {
            slug: "tcp-udp",
            title: "TCP and UDP",
            difficulty: "intermediate",
            estimatedMinutes: 90,
            summary: "Reliable, ordered, connection-oriented vs fast and connectionless.",
            whyMatters: "The transport layer decision affects every app you build.",
            keyIdea: "TCP: handshake, retransmission, flow control. UDP: fire and forget.",
            example: "HTTP/1.1 over TCP; DNS and video streaming often use UDP.",
            practice: ["Compare when you'd pick TCP vs UDP for a game."],
            quickRevision: ["3-way handshake", "TCP guarantees delivery; UDP doesn't"],
          },
          {
            slug: "http",
            title: "HTTP and the Web",
            difficulty: "beginner",
            estimatedMinutes: 75,
            summary: "Requests, responses, methods, status codes, headers and cookies.",
            whyMatters: "HTTP is the language of every web API you will ever call.",
            keyIdea: "A stateless request/response protocol carrying methods, statuses and headers.",
            practice: ["Trace a full HTTP request with curl -v."],
            quickRevision: ["GET/POST/PUT/DELETE", "200/301/400/401/404/500", "Cookies maintain state"],
          },
          {
            slug: "dns",
            title: "DNS and the Domain Name System",
            difficulty: "intermediate",
            estimatedMinutes: 45,
            summary: "How a name becomes an IP via recursive and iterative lookups.",
            practice: ["Explain what happens when you type a URL."],
            quickRevision: ["Root → TLD → authoritative servers", "Caching makes it fast"],
          },
        ],
      },
      {
        stage: "intermediate",
        topics: [
          {
            slug: "routing",
            title: "Routing and Forwarding",
            difficulty: "intermediate",
            estimatedMinutes: 60,
            summary: "How packets choose paths: distance vector vs link state (RIP, OSPF).",
            practice: ["Run a traceroute and interpret the hops."],
            quickRevision: ["Forwarding = local, routing = global", "BGP runs the internet"],
          },
          {
            slug: "network-security",
            title: "Network Security: TLS, Firewalls, VPN",
            difficulty: "intermediate",
            estimatedMinutes: 60,
            summary: "Encryption in transit, access control and secure tunnels.",
            practice: ["Explain the TLS handshake in one paragraph."],
            quickRevision: ["TLS = HTTPS", "Firewall filters; VPN encrypts"],
          },
        ],
      },
      {
        stage: "advanced",
        topics: [
          {
            slug: "advanced-http",
            title: "HTTP/2, HTTP/3 and CDNs",
            difficulty: "advanced",
            estimatedMinutes: 60,
            summary: "Multiplexing, QUIC over UDP and edge caching.",
            practice: ["Explain why HTTP/3 uses UDP."],
            quickRevision: ["QUIC = TCP features over UDP + TLS"],
          },
        ],
      },
      {
        stage: "practice",
        topics: [
          {
            slug: "networks-practice",
            title: "Practice Set: Network Problems",
            difficulty: "intermediate",
            estimatedMinutes: 120,
            summary: "Subnetting, TCP and HTTP exercises.",
            practice: [
              "Design a subnet plan for 4 departments",
              "Trace TCP handshake with Wireshark",
              "Decode an HTTP request manually",
            ],
            quickRevision: ["Use curl, Wireshark, traceroute as your lab"],
          },
        ],
      },
      {
        stage: "projects",
        topics: [
          {
            slug: "networks-project-chat",
            title: "Project: TCP Chat App",
            difficulty: "intermediate",
            estimatedMinutes: 360,
            summary: "A command-line chat server + client using sockets.",
            practice: ["Server accepts clients, broadcasts messages, handles disconnects."],
            quickRevision: ["Socket = endpoint; listen, accept, send, recv"],
          },
        ],
      },
      {
        stage: "interview",
        topics: [
          {
            slug: "networks-interview",
            title: "Networks Interview Questions",
            difficulty: "advanced",
            estimatedMinutes: 90,
            summary: "What happens when you type a URL? TCP handshake, DNS, HTTP.",
            practice: [
              "Narrate the full journey of typing a URL",
              "Difference between TCP and UDP with examples",
              "How does load balancing work at each layer?",
            ],
            quickRevision: ["Have one perfect 'URL journey' answer ready"],
          },
        ],
      },
    ],
  },
  {
    slug: "computer-organization-and-architecture",
    name: "Computer Organization & Architecture",
    category: "cs-fundamentals",
    icon: "chip",
    description:
      "How CPUs execute instructions: the fetch-decode-execute cycle, memory hierarchy and pipelines.",
    difficulty: "intermediate",
    estimatedHours: 30,
    prerequisites: ["programming-with-c"],
    stages: [
      {
        stage: "fundamentals",
        topics: [
          {
            slug: "number-systems",
            title: "Number Systems and Boolean Algebra",
            difficulty: "beginner",
            estimatedMinutes: 75,
            summary: "Binary, hex, two's complement and logic gates.",
            whyMatters: "Every operation in a CPU is bit manipulation.",
            keyIdea: "Two's complement represents negative numbers; gates build everything.",
            practice: ["Convert 42 to binary, hex and two's complement."],
            quickRevision: ["2's complement: invert + add 1", "AND/OR/NOT/XOR gates"],
          },
          {
            slug: "cpu-components",
            title: "CPU Components: ALU, Registers, Control Unit",
            difficulty: "beginner",
            estimatedMinutes: 60,
            summary: "The parts that execute programs.",
            practice: ["Describe the data path for ADD."],
            quickRevision: ["ALU computes, registers hold, control unit directs"],
          },
        ],
      },
      {
        stage: "core",
        topics: [
          {
            slug: "instruction-cycle",
            title: "Fetch-Decode-Execute Cycle",
            difficulty: "intermediate",
            estimatedMinutes: 75,
            summary: "How the CPU turns instructions into operations.",
            keyIdea: "PC points to instruction; fetch, decode, execute, repeat.",
            practice: ["Walk through the cycle for a LOAD instruction."],
            quickRevision: ["Program counter, instruction register", "Clock drives each step"],
          },
          {
            slug: "memory-hierarchy",
            title: "Memory Hierarchy and Cache",
            difficulty: "intermediate",
            estimatedMinutes: 90,
            summary: "Registers, cache, RAM, disk — and why locality matters.",
            whyMatters: "The hierarchy exists because fast memory is expensive.",
            keyIdea: "Cache exploits temporal and spatial locality; misses cost ~100 cycles.",
            practice: ["Explain why cache-friendly loops run faster."],
            quickRevision: ["L1/L2/L3/RAM/disk", "Hit rate drives performance"],
          },
          {
            slug: "pipelining",
            title: "Pipelining",
            difficulty: "advanced",
            estimatedMinutes: 75,
            summary: "Overlap instruction stages to run many at once.",
            whyMatters: "Pipelining is why modern CPUs are fast; hazards are why they're hard.",
            keyIdea: "Fetch one while decoding another; hazards (data/control) force stalls.",
            practice: ["Identify a data hazard and its fix (forwarding)."],
            quickRevision: ["5-stage classic pipeline", "Branch prediction handles control hazards"],
          },
        ],
      },
      {
        stage: "intermediate",
        topics: [
          {
            slug: "assembly",
            title: "Assembly Language and Addressing Modes",
            difficulty: "intermediate",
            estimatedMinutes: 90,
            summary: "Read and write low-level instructions.",
            practice: ["Trace a small assembly snippet and compute the result."],
            quickRevision: ["MOV, ADD, JMP, CMP, CALL", "Registers: rax, rbx, ..."],
          },
          {
            slug: "instruction-formats",
            title: "Instruction Formats (RISC vs CISC)",
            difficulty: "intermediate",
            estimatedMinutes: 60,
            summary: "Fixed-width RISC vs variable CISC and their trade-offs.",
            practice: ["Compare ARM vs x86 design philosophies."],
            quickRevision: ["RISC: simple, pipelined, compiler does work", "CISC: complex instructions"],
          },
        ],
      },
      {
        stage: "advanced",
        topics: [
          {
            slug: "advanced-cpu",
            title: "Superscalar, Out-of-Order and SIMD",
            difficulty: "advanced",
            estimatedMinutes: 60,
            summary: "How modern CPUs extract parallelism.",
            practice: ["Explain speculative execution in one paragraph."],
            quickRevision: ["ILP: multiple instructions per cycle", "SIMD: one instruction, many data"],
          },
          {
            slug: "storage",
            title: "I/O Systems and Storage",
            difficulty: "intermediate",
            estimatedMinutes: 60,
            summary: "Polling, interrupts, DMA and how disks work.",
            practice: ["Why is DMA better than CPU-driven I/O?"],
            quickRevision: ["Interrupts avoid busy-waiting", "DMA moves data without CPU"],
          },
        ],
      },
      {
        stage: "practice",
        topics: [
          {
            slug: "coa-practice",
            title: "Practice Set: Architecture Problems",
            difficulty: "intermediate",
            estimatedMinutes: 150,
            summary: "Number conversion, cache, pipeline and assembly exercises.",
            practice: [
              "Compute effective address for each addressing mode",
              "Solve a cache hit/miss sequence",
              "Pipeline timing diagrams with hazards",
            ],
            quickRevision: ["Work through timing diagrams by hand"],
          },
        ],
      },
      {
        stage: "projects",
        topics: [
          {
            slug: "coa-project-logisim-cpu",
            title: "Project: Build a CPU in Logisim",
            difficulty: "advanced",
            estimatedMinutes: 480,
            summary: "Design and simulate a small CPU from gates upward.",
            whyMatters: "Building a CPU makes every architecture concept concrete.",
            practice: ["ALU, registers, control unit, run a tiny program."],
            quickRevision: ["Start minimal: load, store, add, jump"],
          },
        ],
      },
      {
        stage: "interview",
        topics: [
          {
            slug: "coa-interview",
            title: "Architecture Interview Questions",
            difficulty: "advanced",
            estimatedMinutes: 90,
            summary: "Cache, pipelining, endianness, memory-mapped IO.",
            practice: ["What is big-endian vs little-endian?", "Explain cache thrashing", "What limits CPU clock speed?"],
            quickRevision: ["Anchor in the memory hierarchy"],
          },
        ],
      },
    ],
  },
  {
    slug: "software-engineering",
    name: "Software Engineering",
    category: "cs-fundamentals",
    icon: "flask",
    description:
      "Requirements, architecture, testing, version control and team workflow — how software is actually built in the real world.",
    difficulty: "beginner",
    estimatedHours: 25,
    prerequisites: [],
    stages: [
      {
        stage: "fundamentals",
        topics: [
          {
            slug: "software-lifecycle",
            title: "SDLC and Development Models",
            difficulty: "beginner",
            estimatedMinutes: 45,
            summary: "Waterfall, Agile, Scrum, Kanban and where each fits.",
            practice: ["Compare waterfall vs agile on a real project."],
            quickRevision: ["Agile: iterative, customer feedback, small releases"],
          },
          {
            slug: "requirements",
            title: "Requirements Engineering",
            difficulty: "beginner",
            estimatedMinutes: 60,
            summary: "Functional vs non-functional requirements and user stories.",
            practice: ["Write user stories for a food delivery app."],
            quickRevision: ["Acceptance criteria make stories testable"],
          },
        ],
      },
      {
        stage: "core",
        topics: [
          {
            slug: "architecture-and-design",
            title: "System Architecture and Design",
            difficulty: "intermediate",
            estimatedMinutes: 90,
            summary: "Layered architecture, MVC, microservices vs monoliths.",
            practice: ["Sketch the layers of a web app you've used."],
            quickRevision: ["Separation of concerns", "MVC: model, view, controller"],
          },
          {
            slug: "version-control",
            title: "Version Control with Git",
            difficulty: "beginner",
            estimatedMinutes: 60,
            summary: "Commits, branches, merges and pull requests.",
            whyMatters: "Git is the universal collaboration tool.",
            practice: ["Walk through a feature branch → PR → merge cycle."],
            quickRevision: ["commit = snapshot", "merge vs rebase", "PRs review changes"],
          },
          {
            slug: "testing",
            title: "Software Testing",
            difficulty: "intermediate",
            estimatedMinutes: 90,
            summary: "Unit, integration, E2E tests and TDD.",
            whyMatters: "Tests are how teams ship without fear.",
            keyIdea: "Test the smallest unit, then the wiring, then the flow.",
            practice: ["Write unit tests for a calculator module."],
            quickRevision: ["TDD: red, green, refactor", "Test pyramid: many unit, few E2E"],
          },
        ],
      },
      {
        stage: "intermediate",
        topics: [
          {
            slug: "refactoring-and-code-quality",
            title: "Refactoring and Code Quality",
            difficulty: "intermediate",
            estimatedMinutes: 60,
            summary: "Clean code, code reviews, linters and documentation.",
            practice: ["Refactor a messy function using small steps."],
            quickRevision: ["Readable > clever", "Small commits tell a story"],
          },
          {
            slug: "ci-cd",
            title: "CI/CD and DevOps Basics",
            difficulty: "intermediate",
            estimatedMinutes: 60,
            summary: "Automate build, test and deploy pipelines.",
            practice: ["Describe a pipeline: lint → test → build → deploy."],
            quickRevision: ["CI catches bugs early", "CD ships continuously"],
          },
        ],
      },
      {
        stage: "advanced",
        topics: [
          {
            slug: "software-maintenance",
            title: "Maintenance and Legacy Code",
            difficulty: "intermediate",
            estimatedMinutes: 45,
            summary: "Dealing with code you didn't write and systems that must keep running.",
            practice: ["List strategies for safely changing legacy code."],
            quickRevision: ["Characterization tests protect old behavior"],
          },
        ],
      },
      {
        stage: "practice",
        topics: [
          {
            slug: "se-practice",
            title: "Practice: Design a Process for an App",
            difficulty: "intermediate",
            estimatedMinutes: 120,
            summary: "Write requirements, design, tests and a git workflow plan.",
            practice: ["Produce the full artifact set for a small app."],
            quickRevision: ["Everything is documented and testable"],
          },
        ],
      },
      {
        stage: "projects",
        topics: [
          {
            slug: "se-project-collab-app",
            title: "Project: Collaborative To-Do App with CI",
            difficulty: "advanced",
            estimatedMinutes: 480,
            summary: "Build an app as a team would: repo, branches, PRs, tests, CI.",
            practice: ["Use issues, branches, PR reviews and a CI pipeline."],
            quickRevision: ["The process is the deliverable"],
          },
        ],
      },
      {
        stage: "interview",
        topics: [
          {
            slug: "se-interview",
            title: "Software Engineering Interview Questions",
            difficulty: "intermediate",
            estimatedMinutes: 60,
            summary: "Process questions and behavioral answers (STAR).",
            practice: ["Answer 'describe a project' with the STAR method."],
            quickRevision: ["STAR: situation, task, action, result"],
          },
        ],
      },
    ],
  },
];