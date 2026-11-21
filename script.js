/**
 * @license
 * PlacementPath — Explainable Placement Preparation Planner
 * Vanilla JavaScript Application Engine
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. CONSTANTS & DOMAIN BENCHMARKS
  // ==========================================================================

  const STORAGE_KEY = 'placementpath_state_v2';

  // Standard B.Tech Job Roles & Required Competency Benchmarks (0 to 100)
  const ROLE_BENCHMARKS = {
    'Backend Developer': {
      title: 'Backend Developer',
      overview: 'Focuses on server architecture, database modeling, RESTful/gRPC APIs, concurrency, and high-throughput reliability.',
      tier: 'Product & High-Growth Startups (₹8–24 LPA)',
      rounds: [
        '1. Online Assessment (OA): 2 DSA coding questions + 15 Core CS MCQs',
        '2. Technical Round 1: DSA (Trees/Graphs) & Low-Level API Design',
        '3. Technical Round 2: DBMS (Indexing/Transactions) & Operating Systems',
        '4. Managerial / HR: System behavioral, STAR project discussion'
      ],
      benchmarks: {
        dsa: 80,
        dbms: 85,
        os: 78,
        cn: 75,
        aptitude: 70,
        communication: 72
      },
      explanations: {
        dsa: 'High priority: OA rounds at product companies require solving 2 algorithmic problems (Graph/Tree/DP) within 60-90 minutes.',
        dbms: 'Critical core skill: 85% of backend technical interviews evaluate schema indexing, query optimization, and transaction ACID isolation.',
        os: 'Fundamental requirement: Concurrency, multi-threading, deadlocks, and memory management are tested in deep technical rounds.',
        cn: 'Essential: HTTP/HTTPS, REST status codes, WebSockets, and TCP handshake mechanics form the backbone of API design.',
        aptitude: 'Screening hurdle: General quantitative & logical reasoning is used to shortlist the top 15% in mass or campus pool drives.',
        communication: 'Required: Explaining architectural trade-offs and code structure clearly during live pair programming rounds.'
      },
      actions: {
        dsa: 'Practice 20 medium Graph and Tree problems on LeetCode/GeeksforGeeks with space-time complexity analysis.',
        dbms: 'Build a relational schema with indexing, write complex JOIN queries, and benchmark transaction isolation levels.',
        os: 'Review process synchronization primitives (Mutex, Semaphores) and simulate virtual memory page replacement algorithms.',
        cn: 'Analyze TCP vs UDP transport trade-offs and simulate a client-server socket connection in your language of choice.',
        aptitude: 'Solve 15 time & work and probability questions daily under a 2-minute-per-question countdown.',
        communication: 'Structure your final-year project walkthrough using the Situation-Task-Action-Result (STAR) technique.'
      }
    },
    'Frontend Developer': {
      title: 'Frontend Developer',
      overview: 'Specializes in user interfaces, client-side performance, browser APIs, state management, and modern component engineering.',
      tier: 'Product & Web Tech Firms (₹7–20 LPA)',
      rounds: [
        '1. Online Assessment (OA): 1 DSA problem + JavaScript & CSS MCQs',
        '2. Machine Coding Round: Build a reactive component (e.g. Autocomplete / Kanban) in 90 mins',
        '3. Technical Deep-Dive: DOM mechanics, rendering pipeline, Web Vitals',
        '4. Managerial / HR: Collaboration, design system handoff, behavioral'
      ],
      benchmarks: {
        dsa: 70,
        dbms: 60,
        os: 65,
        cn: 82,
        aptitude: 68,
        communication: 80
      },
      explanations: {
        dsa: 'Needed for machine coding: Array manipulation, recursion, and string parsing are tested in live machine coding rounds.',
        dbms: 'Foundational: Understanding client caching, IndexedDB, and REST/GraphQL payload consumption.',
        os: 'Moderate importance: Browser process threads, Web Workers, and event loop concurrency mechanics.',
        cn: 'High priority: HTTP/2, caching headers, CORS security policies, and CDN asset delivery are crucial frontend benchmarks.',
        aptitude: 'Initial screening: Standard speed-math and logical puzzle cutoff during preliminary campus tests.',
        communication: 'Very high: Frequent interaction with designers and product managers requires crisp UX empathy and presentation.'
      },
      actions: {
        dsa: 'Implement custom debounce, throttle, deep-clone, and EventEmitter in clean vanilla JavaScript.',
        dbms: 'Practice integrating RESTful endpoints with mock SQLite or JSON databases.',
        os: 'Study JavaScript Event Loop execution order (Microtasks vs Macrotasks) and Web Worker message passing.',
        cn: 'Implement client-side caching strategies and investigate CORS preflight OPTIONS request mechanics.',
        aptitude: 'Practice 20 speed arithmetic and logical reasoning questions 3 times a week.',
        communication: 'Prepare a 5-minute interactive walkthrough of a responsive web project showcasing accessibility & clean UI.'
      }
    },
    'Full-Stack Developer': {
      title: 'Full-Stack Developer',
      overview: 'Bridges frontend interfaces with robust backend services, end-to-end data pipelines, and cloud deployments.',
      tier: 'Startups & Mid-to-Large Enterprises (₹8–22 LPA)',
      rounds: [
        '1. Online Assessment: Full-stack coding challenge + Core CS',
        '2. Technical Round 1: Full-stack architecture & data modeling',
        '3. Technical Round 2: DSA problem solving & system integration',
        '4. HR / Culture Fit: Ownership, delivery track record'
      ],
      benchmarks: {
        dsa: 75,
        dbms: 80,
        os: 72,
        cn: 78,
        aptitude: 70,
        communication: 78
      },
      explanations: {
        dsa: 'Core filter: Algorithmic data processing and complexity awareness across both client and server layers.',
        dbms: 'High priority: Designing clean 3NF database schemas, relational migrations, and query latency tuning.',
        os: 'System foundation: Container execution, file I/O operations, and server thread lifecycle.',
        cn: 'Critical: Full-duplex WebSockets, HTTPS encryption, cookie session management, and REST APIs.',
        aptitude: 'Placement cutoff: Standard hurdle in university placement cell tier-1 eligibility.',
        communication: 'Crucial: Explaining end-to-end data flows from UI click to database commit.'
      },
      actions: {
        dsa: 'Solve 15 Tree and Dynamic Programming problems with clean, modular code.',
        dbms: 'Design an end-to-end database schema for an e-commerce or booking system with foreign key constraints.',
        os: 'Deploy a containerized application and inspect CPU/memory resource utilization.',
        cn: 'Build a secure JWT-based authentication flow with HTTP-only cookie validation.',
        aptitude: 'Complete 2 timed quantitative tests focusing on data interpretation and percentages.',
        communication: 'Practice whiteboard system diagrams explaining request lifecycle from DNS to Database.'
      }
    },
    'Data Analyst': {
      title: 'Data Analyst',
      overview: 'Transforms complex datasets into business intelligence using SQL, statistical modeling, Python data tools, and dashboards.',
      tier: 'Consulting, FinTech & Analytics (₹6–18 LPA)',
      rounds: [
        '1. Online Assessment: SQL queries, Aptitude & Probability',
        '2. Technical Round 1: Complex SQL joins, aggregations & Python pandas',
        '3. Technical Round 2: Business case study & statistical interpretation',
        '4. Managerial: Stakeholder reporting, presentation skills'
      ],
      benchmarks: {
        dsa: 65,
        dbms: 90,
        os: 55,
        cn: 55,
        aptitude: 88,
        communication: 82
      },
      explanations: {
        dsa: 'Basic algorithmic skill: Array transformations, dictionary lookups, and algorithmic sorting.',
        dbms: 'Top Priority (90): Window functions (ROW_NUMBER, RANK, DENSE_RANK), CTEs, and cohort aggregations.',
        os: 'Low priority: Basic familiarity with file systems and automated batch cron scripts.',
        cn: 'Low priority: Fundamental data ingestion protocols and API consumption.',
        aptitude: 'Extremely high (88): Probability, permutations, hypothesis testing, and quantitative problem solving.',
        communication: 'Essential: Translating mathematical insights into actionable executive recommendations.'
      },
      actions: {
        dsa: 'Practice array slicing, dictionary hashing, and nested data filtering in Python.',
        dbms: 'Master SQL Window Functions, CTEs, and self-joins on complex business datasets.',
        os: 'Learn basic command-line shell scripts for batch CSV transformation.',
        cn: 'Review JSON and REST data payload structure for API-based analytics pipelines.',
        aptitude: 'Solve 25 quantitative aptitude and Bayes theorem probability questions daily.',
        communication: 'Draft a 1-page executive summary analyzing a business metric drop (e.g. churn or conversion).'
      }
    },
    'AI/ML Engineer': {
      title: 'AI/ML Engineer',
      overview: 'Develops mathematical learning algorithms, feature engineering pipelines, model training workflows, and evaluation systems.',
      tier: 'AI Labs & Deep Tech (₹10–28 LPA)',
      rounds: [
        '1. Online Assessment: Advanced DSA + Linear Algebra/Calculus + Python',
        '2. Technical Round 1: ML algorithms from scratch & loss function math',
        '3. Technical Round 2: Model deployment, data pipelines & latency',
        '4. Technical/HR: Research paper breakdown & behavioral'
      ],
      benchmarks: {
        dsa: 85,
        dbms: 75,
        os: 75,
        cn: 65,
        aptitude: 85,
        communication: 74
      },
      explanations: {
        dsa: 'Very high: Graph search algorithms, matrix computations, and recursion are fundamental to ML engineering.',
        dbms: 'Important: Feature store querying, vector embeddings indexing, and batch dataset extraction.',
        os: 'Important: GPU memory allocation, CUDA thread scheduling, and multi-process data loaders.',
        cn: 'Moderate: Serving inference over gRPC/REST APIs and distributed training networks.',
        aptitude: 'Extremely high: Linear algebra, multivariable calculus, and probabilistic reasoning.',
        communication: 'Important: Clearly explaining bias-variance trade-offs, regularization, and evaluation metrics.'
      },
      actions: {
        dsa: 'Implement binary search, graph traversal, and dynamic programming optimization on LeetCode.',
        dbms: 'Practice writing optimized queries to extract clean training features from relational tables.',
        os: 'Study process memory limits and multi-threaded data generator pipelines.',
        cn: 'Build a lightweight model inference REST server with error handling and request batching.',
        aptitude: 'Review eigenvalue decomposition, gradient descent derivations, and conditional probability.',
        communication: 'Explain the internal architecture of a Transformer model in plain English without slides.'
      }
    },
    'Software Engineer': {
      title: 'Software Engineer (General SDE)',
      overview: 'Generalist software engineering role across core computer science, algorithmic efficiency, robust code design, and team delivery.',
      tier: 'FAANG / Tier-1 Tech Giants & MNCs (₹9–26 LPA)',
      rounds: [
        '1. Online Assessment: 2-3 DSA algorithmic problems (Graph/DP/Strings)',
        '2. Technical Round 1: Data Structures & Live Algorithmic Optimization',
        '3. Technical Round 2: Core CS (OS, DBMS, Computer Networks) + System Design',
        '4. HR & Leadership: Core values, conflict resolution, cultural fit'
      ],
      benchmarks: {
        dsa: 85,
        dbms: 80,
        os: 80,
        cn: 78,
        aptitude: 80,
        communication: 75
      },
      explanations: {
        dsa: 'Primary filter: Over 75% of candidates are screened out based on algorithmic proficiency in OA and Round 1.',
        dbms: 'Key technical round subject: Normalization (BCNF/3NF), indexing B-Trees, and deadlock detection.',
        os: 'Core technical subject: Paging, virtual memory, process states, and synchronization primitives.',
        cn: 'Core technical subject: OSI 7-layer model, TCP flow control, IP addressing, and DNS resolution.',
        aptitude: 'Round 1 screening: Standard aptitude cutoff test in campus pool recruitment.',
        communication: 'Round 3 & HR: Clear problem decomposition and ability to receive feedback during technical interviews.'
      },
      actions: {
        dsa: 'Solve 30 LeetCode Medium/Hard problems covering Graphs, Trees, and Dynamic Programming.',
        dbms: 'Practice converting unnormalized tables into 3NF and explain B+ Tree index traversal.',
        os: 'Write answers for the top 20 classical OS interview questions (Dining Philosophers, Deadlocks, Paging).',
        cn: 'Draw and explain the step-by-step packet flow when typing google.com in a browser.',
        aptitude: 'Complete 3 full-length 60-minute placement mock aptitude assessments.',
        communication: 'Practice mock technical interviews with peers speaking your reasoning out loud.'
      }
    }
  };

  // Skill definitions and metadata
  const SKILL_METADATA = [
    { key: 'dsa', name: 'Data Structures & Algorithms', category: 'Problem Solving', icon: 'fa-brain' },
    { key: 'dbms', name: 'Database Management (DBMS)', category: 'Core CS', icon: 'fa-database' },
    { key: 'os', name: 'Operating Systems (OS)', category: 'Core CS', icon: 'fa-microchip' },
    { key: 'cn', name: 'Computer Networks (CN)', category: 'Core CS', icon: 'fa-network-wired' },
    { key: 'aptitude', name: 'Quantitative & Logical Aptitude', category: 'Aptitude', icon: 'fa-calculator' },
    { key: 'communication', name: 'Communication & Behavioral', category: 'Soft Skills', icon: 'fa-comments' }
  ];

  // Standard B.Tech Placement Assessment Quizzes Catalog
  const QUIZ_CATALOG = [
    {
      id: 'dsa',
      title: 'Data Structures & Algorithms',
      category: 'tech',
      categoryLabel: 'Technical Problem Solving',
      icon: 'fa-brain',
      iconColor: '#7C3AED',
      timeLimitMinutes: 10,
      description: 'Covers Trees, Binary Search, Graphs, Dynamic Programming & Complexity Analysis typical of Tech Round 1.',
      questions: [
        {
          id: 'dsa_1',
          text: 'What is the worst-case time complexity of searching in an unbalanced Binary Search Tree (BST)?',
          options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
          correctIndex: 2,
          difficulty: 'Easy',
          subtopic: 'Trees',
          explanation: 'In the worst case, a Binary Search Tree degenerates into a linear linked list (skewed tree) when keys are inserted in sorted order, resulting in O(N) search time. Balanced trees like AVL or Red-Black guarantee O(log N).'
        },
        {
          id: 'dsa_2',
          text: 'Which data structure is primarily utilized to implement Breadth-First Search (BFS) on an unweighted graph?',
          options: ['Stack', 'Queue', 'Priority Queue (Min-Heap)', 'Binary Search Tree'],
          correctIndex: 1,
          difficulty: 'Easy',
          subtopic: 'Graphs',
          explanation: 'BFS operates on a First-In-First-Out (FIFO) basis to traverse nodes level by level, making a Queue the standard data structure. Depth-First Search (DFS) uses a Stack (or recursion call stack).'
        },
        {
          id: 'dsa_3',
          text: 'Which sorting algorithm has a worst-case time complexity of O(N log N) and is guaranteed to be stable?',
          options: ['Quick Sort', 'Merge Sort', 'Heap Sort', 'Selection Sort'],
          correctIndex: 1,
          difficulty: 'Medium',
          subtopic: 'Sorting',
          explanation: 'Merge Sort consistently achieves O(N log N) time across best, average, and worst cases, and preserves the relative order of duplicate elements (stable). Quick Sort is O(N²) worst-case and unstable; Heap Sort is O(N log N) but unstable.'
        },
        {
          id: 'dsa_4',
          text: 'What is the minimum number of queues required to implement a standard Stack (LIFO behavior)?',
          options: ['1 queue', '2 queues', '3 queues', 'It is impossible to implement a stack with queues'],
          correctIndex: 1,
          difficulty: 'Medium',
          subtopic: 'Stacks & Queues',
          explanation: 'A stack can be implemented using 2 queues (either making the push operation costly O(N) by transferring elements between queues, or making the pop operation costly).'
        },
        {
          id: 'dsa_5',
          text: 'In dynamic programming, which condition must a problem satisfy to be solvable via the DP technique?',
          options: [
            'Greedy choice property only',
            'Optimal substructure and overlapping subproblems',
            'Linear graph topology and no cycles',
            'Strictly positive integers in all inputs'
          ],
          correctIndex: 1,
          difficulty: 'Hard',
          subtopic: 'Dynamic Programming',
          explanation: 'Dynamic Programming requires two core properties: 1) Optimal Substructure (an optimal solution to the problem contains optimal solutions to subproblems), and 2) Overlapping Subproblems (subproblems are computed repeatedly and can be memoized).'
        }
      ]
    },
    {
      id: 'dbms',
      title: 'Database Management Systems (DBMS)',
      category: 'tech',
      categoryLabel: 'Core CS Fundamentals',
      icon: 'fa-database',
      iconColor: '#4F46E5',
      timeLimitMinutes: 10,
      description: 'SQL queries, normalization (1NF-BCNF), indexing (B+ Trees), ACID properties, and transaction concurrency.',
      questions: [
        {
          id: 'dbms_1',
          text: 'Which normal form addresses and eliminates transitive dependencies among non-prime attributes?',
          options: ['First Normal Form (1NF)', 'Second Normal Form (2NF)', 'Third Normal Form (3NF)', 'Boyce-Codd Normal Form (BCNF)'],
          correctIndex: 2,
          difficulty: 'Medium',
          subtopic: 'Normalization',
          explanation: '3NF requires that the relation is in 2NF and no non-prime attribute is transitively dependent on the primary key. 2NF removes partial dependencies, and BCNF is a stricter version where every determinant must be a candidate key.'
        },
        {
          id: 'dbms_2',
          text: 'In the ACID transaction model, which component is primarily responsible for ensuring the "Durability" guarantee?',
          options: ['Lock Manager and Two-Phase Locking', 'Write-Ahead Logging (WAL) and recovery engine', 'Query Optimizer', 'Buffer Pool In-Memory Cache'],
          correctIndex: 1,
          difficulty: 'Medium',
          subtopic: 'ACID Properties',
          explanation: 'Durability ensures committed transactions persist even during unexpected system crashes. Databases accomplish this via Write-Ahead Logging (WAL) and redo/undo logs written to non-volatile disk before committing.'
        },
        {
          id: 'dbms_3',
          text: 'Why do relational databases predominantly utilize B+ Trees instead of standard Binary Search Trees for disk indexing?',
          options: [
            'B+ Trees require zero memory',
            'B+ Trees have high fanout, minimizing expensive disk I/O seek operations, and leaf nodes form a linked list for range queries',
            'Binary search trees cannot store string values',
            'B+ Trees guarantee O(1) constant time lookups'
          ],
          correctIndex: 1,
          difficulty: 'Hard',
          subtopic: 'Indexing',
          explanation: 'B+ Trees have a large branching factor (fanout), keeping tree height low (typically 3-4 levels for millions of rows), drastically reducing disk block reads. Linked leaves also make range scans (e.g. BETWEEN 10 AND 50) sequential and fast.'
        },
        {
          id: 'dbms_4',
          text: 'Consider the SQL statement: SELECT department, COUNT(*) FROM employees GROUP BY department HAVING COUNT(*) > 5; What does the HAVING clause do?',
          options: [
            'Filters rows before any aggregation takes place',
            'Filters aggregated group results after grouping has been performed',
            'Sorts the output in descending count order',
            'Creates a foreign key constraint on department'
          ],
          correctIndex: 1,
          difficulty: 'Easy',
          subtopic: 'SQL Queries',
          explanation: 'WHERE filters individual row records before grouping; HAVING filters the aggregated groups after GROUP BY evaluates aggregate expressions like COUNT(*) or AVG().'
        },
        {
          id: 'dbms_5',
          text: 'Which transaction isolation level completely prevents "Dirty Read", "Non-Repeatable Read", and "Phantom Read" anomalies?',
          options: ['Read Uncommitted', 'Read Committed', 'Repeatable Read', 'Serializable'],
          correctIndex: 3,
          difficulty: 'Hard',
          subtopic: 'Transactions',
          explanation: 'Serializable is the highest isolation level. It emulates serial execution of transactions, preventing dirty reads, non-repeatable reads, and phantom reads.'
        }
      ]
    },
    {
      id: 'os',
      title: 'Operating Systems (OS)',
      category: 'tech',
      categoryLabel: 'Core CS Fundamentals',
      icon: 'fa-microchip',
      iconColor: '#0EA5E9',
      timeLimitMinutes: 10,
      description: 'Processes vs threads, CPU scheduling, synchronization, deadlocks, paging, and virtual memory.',
      questions: [
        {
          id: 'os_1',
          text: 'Which of the following is shared among all threads executing within the same parent process?',
          options: ['Program counter', 'Stack and registers', 'Address space (heap, code segment, and global variables)', 'Thread ID'],
          correctIndex: 2,
          difficulty: 'Easy',
          subtopic: 'Threads',
          explanation: 'Threads within the same process share the process address space, heap memory, open file descriptors, and global data. However, each thread maintains its own private Stack, Registers, and Program Counter (PC).'
        },
        {
          id: 'os_2',
          text: 'What algorithm is universally referenced in operating systems to safely prevent or avoid system deadlocks by simulating resource allocations?',
          options: ['Dijkstra Banker\'s Algorithm', 'Kruskal Algorithm', 'Round Robin Scheduling', 'Peterson Algorithm'],
          correctIndex: 0,
          difficulty: 'Medium',
          subtopic: 'Deadlocks',
          explanation: 'Banker\'s Algorithm, designed by Edsger Dijkstra, tests for safe states before allocating requested resources to ensure no deadlock can occur.'
        },
        {
          id: 'os_3',
          text: 'What phenomenon occurs when a system spends substantially more time swapping virtual memory pages in and out of disk than executing useful CPU instructions?',
          options: ['Paging Fault Tolerance', 'Thrashing', 'Starvation', 'Internal Fragmentation'],
          correctIndex: 1,
          difficulty: 'Easy',
          subtopic: 'Memory Management',
          explanation: 'Thrashing happens when the working set of all processes exceeds physical RAM capacity, causing continuous page faults and disk I/O saturation.'
        },
        {
          id: 'os_4',
          text: 'Which of the following conditions is NOT one of Coffman\'s four necessary conditions for a deadlock to exist?',
          options: ['Mutual Exclusion', 'Hold and Wait', 'Preemption allowed', 'Circular Wait'],
          correctIndex: 2,
          difficulty: 'Medium',
          subtopic: 'Deadlocks',
          explanation: 'Deadlock requires NO PREEMPTION (resources cannot be forcibly taken away). If preemption is allowed, deadlocks can be broken.'
        },
        {
          id: 'os_5',
          text: 'In Unix/Linux systems, what is the immediate status of a child process that has terminated, but whose parent has not yet invoked wait()?',
          options: ['Orphan process', 'Zombie (Defunct) process', 'Daemon process', 'Init process'],
          correctIndex: 1,
          difficulty: 'Medium',
          subtopic: 'Process Lifecycle',
          explanation: 'A zombie process has finished execution but remains in the process table so that its exit status code can be read by its parent. Once the parent calls wait(), the zombie entry is released.'
        }
      ]
    },
    {
      id: 'cn',
      title: 'Computer Networks (CN)',
      category: 'tech',
      categoryLabel: 'Core CS Fundamentals',
      icon: 'fa-network-wired',
      iconColor: '#059669',
      timeLimitMinutes: 10,
      description: 'OSI 7 layers, TCP/IP, 3-way handshake, DNS, HTTP/HTTPS, and subnetting.',
      questions: [
        {
          id: 'cn_1',
          text: 'What is the correct sequence of control packets exchanged during the standard TCP 3-Way Handshake connection establishment?',
          options: ['ACK -> SYN -> SYN-ACK', 'SYN -> SYN-ACK -> ACK', 'SYN -> ACK -> DATA', 'FIN -> ACK -> FIN-ACK'],
          correctIndex: 1,
          difficulty: 'Easy',
          subtopic: 'Transport Layer',
          explanation: 'The client initiates with a SYN packet, the server responds with SYN-ACK, and the client confirms with ACK, establishing a reliable bidirectional connection.'
        },
        {
          id: 'cn_2',
          text: 'At which layer of the OSI reference model do network routers primarily inspect destination IP addresses to make forwarding decisions?',
          options: ['Data Link Layer (Layer 2)', 'Network Layer (Layer 3)', 'Transport Layer (Layer 4)', 'Session Layer (Layer 5)'],
          correctIndex: 1,
          difficulty: 'Easy',
          subtopic: 'OSI Model',
          explanation: 'Network Layer (Layer 3) handles logical packet routing and IP addressing. Switches typically operate at Layer 2 (MAC addresses), while hubs operate at Layer 1.'
        },
        {
          id: 'cn_3',
          text: 'What is the primary difference between HTTP/1.1 and HTTP/2 in handling multiple concurrent network requests?',
          options: [
            'HTTP/2 requires plain text instead of binary frames',
            'HTTP/2 introduces binary framing and multiplexing over a single TCP connection, eliminating head-of-line blocking at the application layer',
            'HTTP/2 does not support caching or TLS encryption',
            'HTTP/2 uses UDP instead of TCP'
          ],
          correctIndex: 1,
          difficulty: 'Medium',
          subtopic: 'Application Layer',
          explanation: 'HTTP/2 allows interleaving multiple bidirectional request and response frames simultaneously across one single TCP socket (multiplexing), preventing head-of-line blocking.'
        },
        {
          id: 'cn_4',
          text: 'In IPv4 subnetting, how many usable host IP addresses are available in a network configured with a /28 CIDR subnet mask?',
          options: ['16', '14', '30', '12'],
          correctIndex: 1,
          difficulty: 'Medium',
          subtopic: 'Subnetting',
          explanation: 'A /28 mask leaves 32 - 28 = 4 host bits. Total addresses = 2⁴ = 16. Subtracting 2 (1 for network identifier and 1 for broadcast address) yields 14 usable host IPs.'
        },
        {
          id: 'cn_5',
          text: 'Which transport protocol does DNS predominantly utilize for standard domain name resolution queries?',
          options: ['TCP (Port 80)', 'UDP (Port 53)', 'ICMP (Port 21)', 'BGP (Port 179)'],
          correctIndex: 1,
          difficulty: 'Easy',
          subtopic: 'Protocols',
          explanation: 'DNS uses UDP on Port 53 for standard client lookups because UDP is connectionless and incurs low latency. DNS switches to TCP for zone transfers or large responses > 512 bytes.'
        }
      ]
    },
    {
      id: 'aptitude',
      title: 'Quantitative & Logical Aptitude',
      category: 'aptitude',
      categoryLabel: 'Placement Screening Aptitude',
      icon: 'fa-calculator',
      iconColor: '#D97706',
      timeLimitMinutes: 10,
      description: 'Time & work, percentages, probability, speed & distance, and syllogisms tested in preliminary campus rounds.',
      questions: [
        {
          id: 'apt_1',
          text: 'Pipe A can fill a tank in 6 hours, while Pipe B can fill the same tank in 12 hours. If both pipes are opened simultaneously, how long will it take to fill the tank completely?',
          options: ['3 hours', '4 hours', '4.5 hours', '5 hours'],
          correctIndex: 1,
          difficulty: 'Easy',
          subtopic: 'Time & Work',
          explanation: 'Rate of A = 1/6 tank/hr, Rate of B = 1/12 tank/hr. Combined rate = (1/6) + (1/12) = 3/12 = 1/4 tank/hr. Therefore, total time required = 1 / (1/4) = 4 hours.'
        },
        {
          id: 'apt_2',
          text: 'A train 180 meters long is traveling at a uniform speed of 54 km/h. How many seconds will it take to pass a stationary signal pole completely?',
          options: ['10 seconds', '12 seconds', '15 seconds', '18 seconds'],
          correctIndex: 1,
          difficulty: 'Easy',
          subtopic: 'Speed & Distance',
          explanation: 'Convert speed to m/s: 54 × (5/18) = 15 m/s. Time to cross pole = Distance / Speed = 180 m / 15 m/s = 12 seconds.'
        },
        {
          id: 'apt_3',
          text: 'Two dice are rolled simultaneously. What is the probability that the sum of the numbers obtained is greater than 9?',
          options: ['1/6', '1/9', '5/36', '1/12'],
          correctIndex: 0,
          difficulty: 'Medium',
          subtopic: 'Probability',
          explanation: 'Total outcomes = 6 × 6 = 36. Outcomes with sum > 9 (i.e. 10, 11, or 12): (4,6), (5,5), (6,4), (5,6), (6,5), (6,6) = 6 favorable outcomes. Probability = 6/36 = 1/6.'
        },
        {
          id: 'apt_4',
          text: 'The price of a laptop is discounted by 20%, and then subsequently increased by 20%. Compared to the original price, what is the net percentage change?',
          options: ['0% change (same price)', '4% decrease', '4% increase', '2% decrease'],
          correctIndex: 1,
          difficulty: 'Easy',
          subtopic: 'Percentages',
          explanation: 'Let original price = 100. After 20% discount: 100 - 20 = 80. After 20% increase on 80: 80 + 16 = 96. Net change = (96 - 100) = -4, representing a 4% decrease.'
        },
        {
          id: 'apt_5',
          text: 'Look at this number sequence: 4, 9, 25, 49, 121, 169, ___. What number comes next?',
          options: ['225', '256', '289', '361'],
          correctIndex: 2,
          difficulty: 'Medium',
          subtopic: 'Series Completion',
          explanation: 'The series consists of squares of consecutive prime numbers: 2² = 4, 3² = 9, 5² = 25, 7² = 49, 11² = 121, 13² = 169. The next prime number is 17, and 17² = 289.'
        }
      ]
    },
    {
      id: 'communication',
      title: 'Communication & Behavioral Fundamentals',
      category: 'aptitude',
      categoryLabel: 'HR & Technical Articulation',
      icon: 'fa-comments',
      iconColor: '#10B981',
      timeLimitMinutes: 8,
      description: 'STAR methodology, technical articulation, conflict handling, and behavioral HR interview rounds.',
      questions: [
        {
          id: 'comm_1',
          text: 'What does the widely recommended STAR interview framework stand for when answering behavioral questions?',
          options: [
            'Strategy, Tactics, Action, Review',
            'Situation, Task, Action, Result',
            'Summary, Timeline, Assessment, Resolution',
            'Statement, Target, Approach, Return'
          ],
          correctIndex: 1,
          difficulty: 'Easy',
          subtopic: 'Interview Frameworks',
          explanation: 'The STAR method (Situation, Task, Action, Result) provides a structured storytelling approach to showcase tangible problem-solving and quantified achievements in behavioral rounds.'
        },
        {
          id: 'comm_2',
          text: 'When a technical interviewer asks you a question or algorithmic puzzle you do not know the immediate answer to, which approach is most professional?',
          options: [
            'Guess a random answer confidently and pretend you know it',
            'State transparently what you do know, communicate your thought process and initial hypothesis, and ask clarifying questions',
            'Remain silent until the interviewer moves on to another question',
            'Argue that the question is irrelevant for the role'
          ],
          correctIndex: 1,
          difficulty: 'Easy',
          subtopic: 'Live Interviewing',
          explanation: 'Technical interviewers evaluate how you reason through ambiguity. Communicating your assumptions, asking clarifying questions, and exploring partial paths demonstrates collaboration and composure.'
        },
        {
          id: 'comm_3',
          text: 'Which element is most critical when concluding the "Result" stage of a project story in an engineering interview?',
          options: [
            'A complaint about how hard team members were to work with',
            'Quantifiable outcome, lessons learned, and how it impacted performance or user metrics',
            'A list of software tool versions you used',
            'A promise that the code has zero bugs'
          ],
          correctIndex: 1,
          difficulty: 'Medium',
          subtopic: 'STAR Method',
          explanation: 'Concrete quantifiable metrics (e.g., "reduced query latency by 35% and handled 10,000 daily requests") validate impact and demonstrate business value.'
        },
        {
          id: 'comm_4',
          text: 'In professional engineering communication, how should a critical architectural disagreement between teammates be resolved constructively?',
          options: [
            'Ignore the teammate and merge your branch directly',
            'Evaluate both proposals objectively against technical criteria (scalability, maintainability, deadline) using written documentation or benchmarks',
            'Escalate immediately to the CEO',
            'Vote based on personal popularity'
          ],
          correctIndex: 1,
          difficulty: 'Easy',
          subtopic: 'Teamwork',
          explanation: 'Objective engineering evaluations (benchmarking performance, checking operational complexity) remove personal friction and lead to optimal architecture decisions.'
        }
      ]
    },
    {
      id: 'programming',
      title: 'Programming Fundamentals',
      category: 'tech',
      categoryLabel: 'Technical Problem Solving',
      icon: 'fa-code',
      iconColor: '#6366F1',
      timeLimitMinutes: 10,
      description: 'Object-Oriented Programming (OOP), pointers, call-by-value vs reference, compilation lifecycle, and memory layout.',
      questions: [
        {
          id: 'prog_1',
          text: 'Which Object-Oriented Programming (OOP) pillar allows an object to take many forms and execute different implementations via a common interface?',
          options: ['Encapsulation', 'Polymorphism', 'Data Abstraction', 'Inheritance'],
          correctIndex: 1,
          difficulty: 'Easy',
          subtopic: 'OOP Concepts',
          explanation: 'Polymorphism (meaning "many forms") allows methods to perform different tasks based on the object calling them, either at compile-time (overloading) or runtime (overriding).'
        },
        {
          id: 'prog_2',
          text: 'In compiled languages like C/C++, what is the role of the Linker in the build pipeline?',
          options: [
            'Converts human-readable source code into assembly instructions',
            'Combines multiple object files (.o) and resolves external library references into a single executable binary',
            'Allocates heap memory at runtime',
            'Executes code line by line with an interpreter'
          ],
          correctIndex: 1,
          difficulty: 'Medium',
          subtopic: 'Compilation',
          explanation: 'The compilation stages are Preprocessing -> Compilation -> Assembly -> Linking. The Linker resolves function references and connects external library symbols.'
        },
        {
          id: 'prog_3',
          text: 'What is a "Memory Leak" in an application and why is it problematic in production services?',
          options: [
            'When code accesses an unauthorized memory address, causing a segmentation fault',
            'When dynamically allocated heap memory is no longer referenced but never released back to the system, causing RAM exhaustion over time',
            'When a pointer points to stack memory after function return',
            'When processor cache overflows'
          ],
          correctIndex: 1,
          difficulty: 'Medium',
          subtopic: 'Memory Management',
          explanation: 'A memory leak occurs when heap memory allocated with malloc/new is not freed. Over time, memory consumption swells, leading to server degradation or Out-Of-Memory (OOM) crashes.'
        },
        {
          id: 'prog_4',
          text: 'What is the primary difference between Pass-by-Value and Pass-by-Reference when passing a variable to a function?',
          options: [
            'Pass-by-value copies the argument data, leaving the original caller variable unaffected by changes made inside the function',
            'Pass-by-value is always faster than pass-by-reference',
            'Pass-by-reference creates a full clone in stack memory',
            'Pass-by-value only works with floating point numbers'
          ],
          correctIndex: 0,
          difficulty: 'Easy',
          subtopic: 'Functions & Parameters',
          explanation: 'In pass-by-value, a copy of the variable is provided, preventing modifications to the caller\'s original value. In pass-by-reference, the memory address is passed, so changes directly alter the caller\'s variable.'
        }
      ]
    }
  ];

  // Pre-configured Demo Student Profiles for evaluation testing
  const DEMO_PROFILES = {
    aarav: {
      student: {
        name: 'Aarav Sharma',
        branch: 'Computer Science & Engineering',
        year: '3rd Year (Pre-Final)',
        targetRole: 'Backend Developer',
        companyTier: 'Product Companies (Tier 1)',
        availableHours: 14,
        selfSkills: {
          dsa: 68,
          dbms: 60,
          os: 70,
          cn: 65,
          aptitude: 74,
          communication: 80
        }
      },
      assessmentHistory: [
        {
          id: 'hist_101',
          topicId: 'dsa',
          topicTitle: 'Data Structures & Algorithms',
          date: '2026-10-18',
          scorePct: 80,
          totalQuestions: 5,
          correctCount: 4,
          wrongCount: 1,
          skillImpact: '+8 pts'
        },
        {
          id: 'hist_102',
          topicId: 'dbms',
          topicTitle: 'Database Management Systems (DBMS)',
          date: '2026-10-15',
          scorePct: 60,
          totalQuestions: 5,
          correctCount: 3,
          wrongCount: 2,
          skillImpact: '+5 pts'
        },
        {
          id: 'hist_103',
          topicId: 'os',
          topicTitle: 'Operating Systems (OS)',
          date: '2026-10-10',
          scorePct: 80,
          totalQuestions: 5,
          correctCount: 4,
          wrongCount: 1,
          skillImpact: '+7 pts'
        },
        {
          id: 'hist_104',
          topicId: 'aptitude',
          topicTitle: 'Quantitative & Logical Aptitude',
          date: '2026-10-04',
          scorePct: 80,
          totalQuestions: 5,
          correctCount: 4,
          wrongCount: 1,
          skillImpact: '+6 pts'
        }
      ],
      studyPlan: {
        Mon: [
          { id: 'p_1', title: 'Solve 2 LeetCode Medium Tree problems (LCA & Diameter)', category: 'Data Structures & Algorithms', duration: 90, priority: 'High', completed: true },
          { id: 'p_2', title: 'Review B+ Tree Indexing & 3NF Normalization notes', category: 'Database Management (DBMS)', duration: 60, priority: 'High', completed: true },
          { id: 'p_3', title: 'Simulate Producer-Consumer with Semaphores in C/Java', category: 'Operating Systems & Networks', duration: 45, priority: 'Medium', completed: false }
        ],
        Tue: [
          { id: 'p_4', title: 'Study SQL Query Execution Plans (EXPLAIN ANALYZE)', category: 'Database Management (DBMS)', duration: 75, priority: 'High', completed: true },
          { id: 'p_5', title: 'Practice Graph BFS & Topological Sort templates', category: 'Data Structures & Algorithms', duration: 90, priority: 'High', completed: false },
          { id: 'p_6', title: 'Solve 10 Time & Work quantitative problems', category: 'Quantitative Aptitude', duration: 45, priority: 'Normal', completed: true }
        ],
        Wed: [
          { id: 'p_7', title: 'Implement Redis Caching pattern in Node/Spring API', category: 'Database Management (DBMS)', duration: 90, priority: 'High', completed: true },
          { id: 'p_8', title: 'Review TCP 3-Way Handshake & FIN termination states', category: 'Operating Systems & Networks', duration: 60, priority: 'Medium', completed: false }
        ],
        Thu: [
          { id: 'p_9', title: 'Solve 2 Dynamic Programming 1D array problems', category: 'Data Structures & Algorithms', duration: 90, priority: 'High', completed: false },
          { id: 'p_10', title: 'Practice 15 Permutation & Probability questions', category: 'Quantitative Aptitude', duration: 60, priority: 'Medium', completed: false }
        ],
        Fri: [
          { id: 'p_11', title: 'Mock Technical Interview Session: System Design basics', category: 'Communication & HR', duration: 60, priority: 'High', completed: false },
          { id: 'p_12', title: 'Review ACID isolation anomalies (Dirty vs Phantom reads)', category: 'Database Management (DBMS)', duration: 60, priority: 'Medium', completed: false }
        ],
        Sat: [
          { id: 'p_13', title: 'Take full-length Weekly Placement Mock Assessment', category: 'Data Structures & Algorithms', duration: 90, priority: 'High', completed: false },
          { id: 'p_14', title: 'Weekly weak areas review & error log journaling', category: 'Operating Systems & Networks', duration: 60, priority: 'Normal', completed: false }
        ],
        Sun: [
          { id: 'p_15', title: 'Structure STAR story for Final Year Capstone Project', category: 'Communication & HR', duration: 60, priority: 'Medium', completed: false },
          { id: 'p_16', title: 'Light code review and plan next week target skills', category: 'Programming Fundamentals', duration: 45, priority: 'Normal', completed: false }
        ]
      }
    },
    priya: {
      student: {
        name: 'Priya Patel',
        branch: 'Information Technology',
        year: '4th Year (Final)',
        targetRole: 'Full-Stack Developer',
        companyTier: 'Product Companies (Tier 1)',
        availableHours: 18,
        selfSkills: {
          dsa: 82,
          dbms: 80,
          os: 75,
          cn: 70,
          aptitude: 76,
          communication: 85
        }
      },
      assessmentHistory: [
        {
          id: 'hist_201',
          topicId: 'dsa',
          topicTitle: 'Data Structures & Algorithms',
          date: '2026-10-21',
          scorePct: 100,
          totalQuestions: 5,
          correctCount: 5,
          wrongCount: 0,
          skillImpact: '+12 pts'
        },
        {
          id: 'hist_202',
          topicId: 'communication',
          topicTitle: 'Communication & Behavioral Fundamentals',
          date: '2026-10-19',
          scorePct: 100,
          totalQuestions: 4,
          correctCount: 4,
          wrongCount: 0,
          skillImpact: '+10 pts'
        },
        {
          id: 'hist_203',
          topicId: 'dbms',
          topicTitle: 'Database Management Systems (DBMS)',
          date: '2026-10-12',
          scorePct: 80,
          totalQuestions: 5,
          correctCount: 4,
          wrongCount: 1,
          skillImpact: '+8 pts'
        }
      ],
      studyPlan: {
        Mon: [
          { id: 'p_21', title: 'Build React full-stack API integration with JWT auth', category: 'Programming Fundamentals', duration: 90, priority: 'High', completed: true },
          { id: 'p_22', title: 'Review Computer Networks HTTPS handshake & DNS', category: 'Operating Systems & Networks', duration: 60, priority: 'High', completed: true }
        ],
        Tue: [
          { id: 'p_23', title: 'Solve 2 LeetCode Hard Dynamic Programming challenges', category: 'Data Structures & Algorithms', duration: 90, priority: 'High', completed: true },
          { id: 'p_24', title: 'Practice 20 Syllogisms & Logical deduction puzzles', category: 'Quantitative Aptitude', duration: 45, priority: 'Medium', completed: true }
        ],
        Wed: [
          { id: 'p_25', title: 'Database schema optimization and indexing benchmark', category: 'Database Management (DBMS)', duration: 75, priority: 'Medium', completed: false }
        ],
        Thu: [
          { id: 'p_26', title: 'System architecture review: Microservices vs Monolith', category: 'Programming Fundamentals', duration: 90, priority: 'High', completed: false }
        ],
        Fri: [
          { id: 'p_27', title: 'Solve 2 LeetCode Graph and Disjoint Set problems', category: 'Data Structures & Algorithms', duration: 90, priority: 'High', completed: false }
        ],
        Sat: [
          { id: 'p_28', title: 'Timed Mock OA Test (2 coding problems + 20 MCQs)', category: 'Data Structures & Algorithms', duration: 120, priority: 'High', completed: false }
        ],
        Sun: [
          { id: 'p_29', title: 'Behavioral prep: Articulate leadership and failure examples', category: 'Communication & HR', duration: 60, priority: 'Medium', completed: false }
        ]
      }
    },
    blank: {
      student: {
        name: 'New Student',
        branch: 'Computer Science & Engineering',
        year: '3rd Year (Pre-Final)',
        targetRole: 'Software Engineer',
        companyTier: 'Product Companies (Tier 1)',
        availableHours: 12,
        selfSkills: {
          dsa: 50,
          dbms: 50,
          os: 50,
          cn: 50,
          aptitude: 50,
          communication: 50
        }
      },
      assessmentHistory: [],
      studyPlan: {
        Mon: [
          { id: 'b_1', title: 'Take your first skill assessment (DSA / DBMS)', category: 'Data Structures & Algorithms', duration: 45, priority: 'High', completed: false }
        ],
        Tue: [],
        Wed: [],
        Thu: [],
        Fri: [],
        Sat: [],
        Sun: []
      }
    }
  };

  // ==========================================================================
  // 2. STATE MANAGEMENT & STORAGE
  // ==========================================================================

  let state = loadInitialState();

  // Active quiz execution variables
  let activeQuiz = null;
  let currentQuestionIndex = 0;
  let userAnswers = {};
  let quizTimerInterval = null;
  let secondsRemaining = 600;
  let activePlannerDay = 'Mon';

  // Chart instances
  let radarChartInstance = null;
  let barChartInstance = null;
  let donutChartInstance = null;
  let lineChartInstance = null;

  function loadInitialState() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse localStorage, resetting to default demo', e);
    }
    // Default to Aarav Sharma
    return JSON.parse(JSON.stringify(DEMO_PROFILES.aarav));
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Error writing to localStorage', e);
    }
  }

  // ==========================================================================
  // 3. EXPLAINABLE CALCULATION FORMULAS
  // ==========================================================================

  /**
   * Transparent Rule-Based Skill Calculation:
   * When an assessment has been taken for that topic:
   *   calibratedScore = round((0.70 * latestAssessmentScore) + (0.30 * selfAssessedScore))
   * If no assessment taken yet:
   *   calibratedScore = selfAssessedScore (flagged as unverified)
   */
  function getCalibratedSkillScore(skillKey) {
    const selfVal = state.student.selfSkills[skillKey] || 50;
    const pastAssessments = state.assessmentHistory.filter(item => item.topicId === skillKey);

    if (pastAssessments.length === 0) {
      return {
        score: selfVal,
        isVerified: false,
        sourceText: 'Self-assessed baseline (Take quiz to verify)'
      };
    }

    // Weighted average: most recent assessment has highest weight
    const latestTest = pastAssessments[0];
    const score = Math.min(100, Math.max(0, Math.round((0.70 * latestTest.scorePct) + (0.30 * selfVal))));
    return {
      score: score,
      isVerified: true,
      assessmentPct: latestTest.scorePct,
      sourceText: `Verified: (0.70 × ${latestTest.scorePct}%) + (0.30 × ${selfVal} self)`
    };
  }

  /**
   * Overall Readiness Index (0 to 100):
   * Readiness = (Technical × 0.35) + (DSA × 0.30) + (Aptitude × 0.20) + (Communication × 0.15)
   * where Technical = average of (DBMS, OS, CN)
   */
  function calculatePlacementReadiness() {
    const dsa = getCalibratedSkillScore('dsa').score;
    const dbms = getCalibratedSkillScore('dbms').score;
    const os = getCalibratedSkillScore('os').score;
    const cn = getCalibratedSkillScore('cn').score;
    const aptitude = getCalibratedSkillScore('aptitude').score;
    const comm = getCalibratedSkillScore('communication').score;

    const technicalAvg = (dbms + os + cn) / 3;

    const overall = Math.round(
      (technicalAvg * 0.35) +
      (dsa * 0.30) +
      (aptitude * 0.20) +
      (comm * 0.15)
    );

    let label = 'Needs Focus';
    let labelClass = 'text-danger';
    if (overall >= 80) {
      label = 'Placement Ready';
      labelClass = 'text-success';
    } else if (overall >= 70) {
      label = 'Strong Progress';
      labelClass = 'text-success';
    } else if (overall >= 60) {
      label = 'Moderate Progress';
      labelClass = 'text-warning';
    }

    return {
      overall: Math.min(100, Math.max(0, overall)),
      technical: Math.round(technicalAvg),
      dsa: dsa,
      aptitude: aptitude,
      communication: comm,
      label: label,
      labelClass: labelClass
    };
  }

  /**
   * Skill-Gap Analysis for Active Role:
   * Gap = max(0, BenchmarkTarget - CalibratedScore)
   */
  function computeSkillGapsForRole(roleName) {
    const roleConfig = ROLE_BENCHMARKS[roleName] || ROLE_BENCHMARKS['Backend Developer'];
    const results = [];

    SKILL_METADATA.forEach(skill => {
      const calibrated = getCalibratedSkillScore(skill.key);
      const target = roleConfig.benchmarks[skill.key] || 75;
      const gap = Math.max(0, target - calibrated.score);

      let priority = 'Met';
      let priorityClass = 'prio-met';

      if (gap >= 20) {
        priority = 'Critical';
        priorityClass = 'prio-critical';
      } else if (gap >= 10) {
        priority = 'Moderate';
        priorityClass = 'prio-moderate';
      } else if (gap > 0) {
        priority = 'Low';
        priorityClass = 'prio-low';
      }

      results.push({
        key: skill.key,
        name: skill.name,
        category: skill.category,
        icon: skill.icon,
        current: calibrated.score,
        target: target,
        gap: gap,
        priority: priority,
        priorityClass: priorityClass,
        isVerified: calibrated.isVerified,
        explanation: roleConfig.explanations[skill.key] || 'Essential competency for campus recruitment.',
        action: roleConfig.actions[skill.key] || 'Complete recommended practice modules.'
      });
    });

    // Sort: Critical first, then Moderate, Low, Met
    const priorityWeight = { 'Critical': 4, 'Moderate': 3, 'Low': 2, 'Met': 1 };
    results.sort((a, b) => (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0) || b.gap - a.gap);

    return results;
  }

  // ==========================================================================
  // 4. UI INITIALIZATION & EVENT LISTENERS
  // ==========================================================================

  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initHeaderControls();
    initProfileForm();
    initAssessmentCatalog();
    initQuizInteractions();
    initSkillGapView();
    initPlannerView();
    initRolesExplorer();
    initAnalyticsView();
    initModalsAndToasts();

    // Render full application state
    renderAllViews();
  });

  // Navigation handlers
  // Sidebar Toggle & Collapse Handlers
  function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    if (window.innerWidth <= 900) {
      sidebar.classList.toggle('mobile-open');
    } else {
      sidebar.classList.toggle('collapsed');
      setTimeout(() => {
        if (typeof renderDashboardRadar === 'function') renderDashboardRadar();
        if (typeof renderSkillGapBarChart === 'function') renderSkillGapBarChart();
        if (typeof renderPlannerDonutChart === 'function') renderPlannerDonutChart();
        if (typeof renderAnalyticsCharts === 'function') renderAnalyticsCharts();
      }, 260);
    }
  }

  function collapseSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    if (window.innerWidth <= 900) {
      sidebar.classList.remove('mobile-open');
    } else {
      sidebar.classList.add('collapsed');
      setTimeout(() => {
        if (typeof renderDashboardRadar === 'function') renderDashboardRadar();
        if (typeof renderSkillGapBarChart === 'function') renderSkillGapBarChart();
        if (typeof renderPlannerDonutChart === 'function') renderPlannerDonutChart();
        if (typeof renderAnalyticsCharts === 'function') renderAnalyticsCharts();
      }, 260);
    }
  }

  function openSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    if (window.innerWidth <= 900) {
      sidebar.classList.add('mobile-open');
    } else {
      sidebar.classList.remove('collapsed');
      setTimeout(() => {
        if (typeof renderDashboardRadar === 'function') renderDashboardRadar();
        if (typeof renderSkillGapBarChart === 'function') renderSkillGapBarChart();
        if (typeof renderPlannerDonutChart === 'function') renderPlannerDonutChart();
        if (typeof renderAnalyticsCharts === 'function') renderAnalyticsCharts();
      }, 260);
    }
  }

  function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link[data-view]');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const viewId = link.getAttribute('data-view');
        switchView(viewId);
      });
    });

    // Delegated data-view-target buttons (e.g. from Dashboard or Results)
    document.addEventListener('click', (e) => {
      const targetBtn = e.target.closest('[data-view-target]');
      if (targetBtn) {
        const targetView = targetBtn.getAttribute('data-view-target');
        switchView(targetView);
      }
    });

    // Sidebar Close / Collapse button (Top-left white X button)
    const closeBtns = [
      document.getElementById('sidebar-close-btn'),
      document.getElementById('mobile-sidebar-close')
    ].filter(Boolean);

    closeBtns.forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        collapseSidebar();
      };
    });

    // Sidebar Reopen / Toggle button (Header Hamburger menu)
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    if (toggleBtn) {
      toggleBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleSidebar();
      };
    }

    // Delegated click handler for sidebar buttons so clicks never drop
    document.addEventListener('click', (e) => {
      const closeTarget = e.target.closest('#sidebar-close-btn, #mobile-sidebar-close, .sidebar-close-btn, .mobile-sidebar-close');
      if (closeTarget) {
        e.preventDefault();
        collapseSidebar();
        return;
      }

      const toggleTarget = e.target.closest('#mobile-menu-toggle, .sidebar-toggle-btn');
      if (toggleTarget) {
        e.preventDefault();
        toggleSidebar();
        return;
      }
    });
  }

  function switchView(viewId) {
    // Hide all view panels
    document.querySelectorAll('.view-panel').forEach(panel => {
      panel.classList.remove('active');
    });

    // Deactivate nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });

    // Activate selected
    const activePanel = document.getElementById(`view-${viewId}`);
    if (activePanel) {
      activePanel.classList.add('active');
    }

    const activeNav = document.querySelector(`.nav-link[data-view="${viewId}"]`);
    if (activeNav) {
      activeNav.classList.add('active');
    }

    // Update Header Title & Breadcrumb
    const pageHeading = document.getElementById('page-heading');
    const pageSubheading = document.getElementById('page-subheading');

    const viewTitles = {
      dashboard: { title: 'Student Placement Dashboard', sub: 'Explainable Readiness, Skill-Gap Matrix & Weekly Roadmap' },
      profile: { title: 'Student Profile & Calibration', sub: 'Manage target role, study hours, and academic baseline' },
      assessments: { title: 'Standardized Placement Assessments', sub: 'Interactive campus recruitment quizzes with explainable scoring' },
      skillgap: { title: 'Explainable Skill-Gap Analysis', sub: `Point discrepancy breakdown for ${state.student.targetRole}` },
      planner: { title: 'Dynamic Weekly Preparation Planner', sub: 'Personalized schedule aligned to prioritized skill bottlenecks' },
      roles: { title: 'Campus Job Roles & Benchmarks', sub: 'Standardized B.Tech recruitment profiles and hiring round pipelines' },
      analytics: { title: 'Placement Analytics & Progress Ledger', sub: 'Comprehensive audit trail, test history, and improvement charts' }
    };

    if (viewTitles[viewId]) {
      pageHeading.textContent = viewTitles[viewId].title;
      pageSubheading.textContent = viewTitles[viewId].sub;
    }

    // Close mobile sidebar if open
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.remove('mobile-open');

    // Trigger charts redraw if active view has charts
    if (viewId === 'dashboard') {
      setTimeout(renderDashboardRadar, 50);
    } else if (viewId === 'skillgap') {
      setTimeout(renderSkillGapBarChart, 50);
    } else if (viewId === 'planner') {
      setTimeout(renderPlannerDonutChart, 50);
    } else if (viewId === 'analytics') {
      setTimeout(renderAnalyticsCharts, 50);
    }
  }

  // Header Target Role Selector & Notifications
  function initHeaderControls() {
    const roleSelect = document.getElementById('header-role-select');
    if (roleSelect) {
      roleSelect.value = state.student.targetRole;
      roleSelect.addEventListener('change', (e) => {
        state.student.targetRole = e.target.value;
        saveState();
        showToast(`Target role updated to ${e.target.value}`, 'success');
        renderAllViews();
      });
    }

    // Notifications toggle
    const notifBtn = document.getElementById('btn-notifications');
    const notifPanel = document.getElementById('notification-panel');
    const clearNotifsBtn = document.getElementById('btn-clear-notifs');

    if (notifBtn && notifPanel) {
      notifBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notifPanel.classList.toggle('active');
      });

      document.addEventListener('click', (e) => {
        if (!notifPanel.contains(e.target) && !notifBtn.contains(e.target)) {
          notifPanel.classList.remove('active');
        }
      });
    }

    if (clearNotifsBtn) {
      clearNotifsBtn.addEventListener('click', () => {
        document.getElementById('notification-list').innerHTML = '<div style="padding: 16px; text-align: center; color: #94A3B8; font-size: 12px;">No unread system alerts.</div>';
        document.getElementById('notif-count').textContent = '0';
        notifPanel.classList.remove('active');
        showToast('All system notifications cleared', 'info');
      });
    }

    // Quick profile click in header
    const profileBtn = document.getElementById('btn-quick-profile');
    if (profileBtn) {
      profileBtn.addEventListener('click', () => {
        switchView('profile');
      });
    }
  }

  // Profile Form Handling
  function initProfileForm() {
    const form = document.getElementById('profile-form');
    const hoursSlider = document.getElementById('prof-hours');
    const hoursLabel = document.getElementById('lbl-hours');

    if (hoursSlider && hoursLabel) {
      hoursSlider.addEventListener('input', (e) => {
        hoursLabel.textContent = e.target.value;
      });
    }

    // Skill slider live value labels
    const skillSliders = document.querySelectorAll('.skill-slider');
    skillSliders.forEach(slider => {
      slider.addEventListener('input', (e) => {
        const skillKey = slider.getAttribute('data-skill');
        const badge = document.getElementById(`lbl-skill-${slider.id.replace('prof-skill-', '')}`);
        if (badge) {
          badge.textContent = e.target.value;
        }
      });
    });

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        state.student.name = document.getElementById('prof-name').value.trim() || 'Aarav Sharma';
        state.student.branch = document.getElementById('prof-branch').value;
        state.student.year = document.getElementById('prof-year').value;
        state.student.targetRole = document.getElementById('prof-target-role').value;
        state.student.companyTier = document.getElementById('prof-company-tier').value;
        state.student.availableHours = parseInt(document.getElementById('prof-hours').value, 10) || 14;

        state.student.selfSkills = {
          dsa: parseInt(document.getElementById('prof-skill-dsa').value, 10),
          dbms: parseInt(document.getElementById('prof-skill-dbms').value, 10),
          os: parseInt(document.getElementById('prof-skill-os').value, 10),
          cn: parseInt(document.getElementById('prof-skill-cn').value, 10),
          aptitude: parseInt(document.getElementById('prof-skill-apt').value, 10),
          communication: parseInt(document.getElementById('prof-skill-comm').value, 10)
        };

        // Synchronize header role selector
        const headerRole = document.getElementById('header-role-select');
        if (headerRole) headerRole.value = state.student.targetRole;

        saveState();
        showToast('Profile and benchmarks saved successfully!', 'success');
        renderAllViews();
        switchView('dashboard');
      });
    }

    // Load sample profile buttons on profile page
    const btnAarav = document.getElementById('btn-load-sample-aarav');
    const btnPriya = document.getElementById('btn-load-sample-priya');
    const btnResetProfile = document.getElementById('btn-reset-profile');

    if (btnAarav) {
      btnAarav.addEventListener('click', () => loadPresetProfile('aarav'));
    }
    if (btnPriya) {
      btnPriya.addEventListener('click', () => loadPresetProfile('priya'));
    }
    if (btnResetProfile) {
      btnResetProfile.addEventListener('click', () => loadPresetProfile('blank'));
    }
  }

  // ==========================================================================
  // 5. ASSESSMENT ENGINE & QUIZ FLOW
  // ==========================================================================

  function initAssessmentCatalog() {
    // Filter pills
    const filterPills = document.querySelectorAll('.pill-filter');
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const cat = pill.getAttribute('data-filter');
        renderAssessmentCards(cat);
      });
    });
  }

  function renderAssessmentCards(categoryFilter = 'all') {
    const grid = document.getElementById('assessment-cards-grid');
    if (!grid) return;

    grid.innerHTML = '';

    const filtered = categoryFilter === 'all'
      ? QUIZ_CATALOG
      : QUIZ_CATALOG.filter(q => q.category === categoryFilter);

    filtered.forEach(quiz => {
      // Find latest assessment score if taken
      const past = state.assessmentHistory.filter(h => h.topicId === quiz.id);
      let lastScoreHtml = '<span class="text-muted">Not taken yet</span>';
      if (past.length > 0) {
        lastScoreHtml = `<strong>${past[0].scorePct}%</strong> (${past[0].date})`;
      }

      const card = document.createElement('div');
      card.className = 'assess-card';
      card.innerHTML = `
        <div class="assess-card-header">
          <div class="assess-card-icon" style="background: ${quiz.iconColor}15; color: ${quiz.iconColor};">
            <i class="fa-solid ${quiz.icon}"></i>
          </div>
          <span class="q-difficulty-badge">${quiz.categoryLabel}</span>
        </div>
        <h3 class="assess-card-title">${quiz.title}</h3>
        <p class="assess-card-desc">${quiz.description}</p>
        <div class="assess-card-meta">
          <div class="assess-meta-item">
            <i class="fa-regular fa-circle-question"></i>
            <span>${quiz.questions.length} Questions</span>
          </div>
          <div class="assess-meta-item">
            <i class="fa-regular fa-clock"></i>
            <span>${quiz.timeLimitMinutes} Mins</span>
          </div>
        </div>
        <div class="assess-card-footer">
          <div class="assess-last-score">
            Last Score: ${lastScoreHtml}
          </div>
          <button class="btn-sm btn-primary btn-start-quiz" data-quiz-id="${quiz.id}">
            <i class="fa-solid fa-play"></i> Start Quiz
          </button>
        </div>
      `;
      grid.appendChild(card);
    });

    // Attach click listeners
    grid.querySelectorAll('.btn-start-quiz').forEach(btn => {
      btn.addEventListener('click', () => {
        const qId = btn.getAttribute('data-quiz-id');
        startQuizSession(qId);
      });
    });
  }

  function handleExitQuizClick(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
      e.stopPropagation();
    }
    performExitQuiz();
  }

  function performExitQuiz() {
    // 1. Immediately stop the active quiz timer & clear interval
    stopQuizTimer();

    // 2. Clear the active quiz session state safely
    activeQuiz = null;
    userAnswers = {};
    currentQuestionIndex = 0;
    secondsRemaining = 0;

    // 3. Clear question and options UI so nothing lingers
    const codeContainer = document.getElementById('q-code');
    const codeContent = document.getElementById('q-code-content');
    if (codeContainer) codeContainer.classList.add('hidden');
    if (codeContent) codeContent.textContent = '';

    const expBox = document.getElementById('q-explanation-box');
    const expText = document.getElementById('q-explanation-text');
    if (expBox) expBox.classList.add('hidden');
    if (expText) expText.textContent = '';

    const optionsContainer = document.getElementById('q-options-container');
    if (optionsContainer) optionsContainer.innerHTML = '';

    const dotsContainer = document.getElementById('quiz-indicator-dots');
    if (dotsContainer) dotsContainer.innerHTML = '';

    // 4. Hide active quiz screen and show assessment topic catalog
    showQuizCatalogView();

    // 5. Ensure Assessments navigation item remains active
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    const assessNavLink = document.querySelector('.nav-link[data-view="assessments"]');
    if (assessNavLink) assessNavLink.classList.add('active');

    // 6. Restore page heading
    const pageHeading = document.getElementById('page-heading');
    const pageSubheading = document.getElementById('page-subheading');
    if (pageHeading) pageHeading.textContent = 'Standardized Placement Assessments';
    if (pageSubheading) pageSubheading.textContent = 'Interactive campus recruitment quizzes with explainable scoring';

    // 7. Inform student without calculation or saving of scores
    showToast('Assessment session exited. No score recorded.', 'info');
  }

  function initQuizInteractions() {
    // Exit quiz button direct listener
    const btnExit = document.getElementById('btn-quiz-exit');
    if (btnExit) {
      btnExit.onclick = handleExitQuizClick;
    }

    // Delegated click handler for Exit Quiz to guarantee it catches any click event
    document.addEventListener('click', (e) => {
      const exitBtn = e.target.closest('#btn-quiz-exit');
      if (exitBtn) {
        e.preventDefault();
        e.stopPropagation();
        performExitQuiz();
      }
    });

    // Previous / Next buttons
    const btnPrev = document.getElementById('btn-quiz-prev');
    const btnNext = document.getElementById('btn-quiz-next');

    if (btnPrev) {
      btnPrev.onclick = () => {
        if (currentQuestionIndex > 0) {
          currentQuestionIndex--;
          renderCurrentQuestion();
        }
      };
    }

    if (btnNext) {
      btnNext.onclick = () => {
        if (!activeQuiz) return;
        if (currentQuestionIndex < activeQuiz.questions.length - 1) {
          currentQuestionIndex++;
          renderCurrentQuestion();
        } else {
          // Submit Quiz
          finishQuizSession();
        }
      };
    }

    // Results screen navigation buttons
    const btnResultsToGap = document.getElementById('btn-results-to-gap');
    const btnResultsToPlanner = document.getElementById('btn-results-to-planner');
    const btnResultsBack = document.getElementById('btn-results-back-catalog');

    if (btnResultsToGap) {
      btnResultsToGap.onclick = () => {
        showQuizCatalogView();
        switchView('skillgap');
      };
    }
    if (btnResultsToPlanner) {
      btnResultsToPlanner.onclick = () => {
        showQuizCatalogView();
        switchView('planner');
      };
    }
    if (btnResultsBack) {
      btnResultsBack.onclick = () => {
        showQuizCatalogView();
      };
    }
  }

  function startQuizSession(quizId) {
    const quiz = QUIZ_CATALOG.find(q => q.id === quizId);
    if (!quiz) return;

    activeQuiz = quiz;
    currentQuestionIndex = 0;
    userAnswers = {};
    secondsRemaining = quiz.timeLimitMinutes * 60;

    // Show active quiz container
    document.getElementById('assess-catalog-screen').classList.add('hidden');
    document.getElementById('quiz-results-screen').classList.add('hidden');
    document.getElementById('assess-active-quiz-screen').classList.remove('hidden');

    document.getElementById('active-quiz-title').textContent = quiz.title;
    document.getElementById('active-quiz-category').textContent = quiz.categoryLabel;
    document.getElementById('quiz-total-num').textContent = quiz.questions.length;

    renderCurrentQuestion();
    startQuizTimer();
  }

  function renderCurrentQuestion() {
    if (!activeQuiz) return;

    const q = activeQuiz.questions[currentQuestionIndex];
    document.getElementById('quiz-current-num').textContent = currentQuestionIndex + 1;
    document.getElementById('q-difficulty').textContent = q.difficulty;
    document.getElementById('q-subtopic').textContent = q.subtopic;
    document.getElementById('q-text').textContent = q.text;

    // Optional code block
    const codeContainer = document.getElementById('q-code');
    const codeContent = document.getElementById('q-code-content');
    if (q.code) {
      codeContainer.classList.remove('hidden');
      codeContent.textContent = q.code;
    } else {
      codeContainer.classList.add('hidden');
    }

    // Render options
    const optionsContainer = document.getElementById('q-options-container');
    optionsContainer.innerHTML = '';

    const letters = ['A', 'B', 'C', 'D'];
    q.options.forEach((optText, idx) => {
      const optEl = document.createElement('div');
      optEl.className = 'quiz-option-item';

      const isChosen = userAnswers[currentQuestionIndex] === idx;
      if (isChosen) {
        optEl.classList.add('selected');
      }

      optEl.innerHTML = `
        <span class="option-prefix">${letters[idx]}</span>
        <span class="option-text">${optText}</span>
      `;

      optEl.addEventListener('click', () => {
        userAnswers[currentQuestionIndex] = idx;
        renderCurrentQuestion();
      });

      optionsContainer.appendChild(optEl);
    });

    // Explanation: only show if answered
    const expBox = document.getElementById('q-explanation-box');
    const expText = document.getElementById('q-explanation-text');
    if (userAnswers[currentQuestionIndex] !== undefined) {
      expBox.classList.remove('hidden');
      expText.textContent = q.explanation;
    } else {
      expBox.classList.add('hidden');
    }

    // Update bottom dots
    const dotsContainer = document.getElementById('quiz-indicator-dots');
    dotsContainer.innerHTML = '';
    activeQuiz.questions.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'indicator-dot';
      if (i === currentQuestionIndex) dot.classList.add('active');
      if (userAnswers[i] !== undefined) dot.classList.add('answered');
      dotsContainer.appendChild(dot);
    });

    // Buttons label
    const btnPrev = document.getElementById('btn-quiz-prev');
    const btnNext = document.getElementById('btn-quiz-next');

    btnPrev.disabled = currentQuestionIndex === 0;

    if (currentQuestionIndex === activeQuiz.questions.length - 1) {
      btnNext.innerHTML = 'Submit Quiz <i class="fa-solid fa-check"></i>';
    } else {
      btnNext.innerHTML = 'Next <i class="fa-solid fa-chevron-right"></i>';
    }
  }

  function startQuizTimer() {
    stopQuizTimer();
    updateTimerDisplay();
    quizTimerInterval = setInterval(() => {
      secondsRemaining--;
      updateTimerDisplay();
      if (secondsRemaining <= 0) {
        stopQuizTimer();
        showToast('Time has expired! Submitting your answers.', 'warning');
        finishQuizSession();
      }
    }, 1000);
  }

  function stopQuizTimer() {
    if (quizTimerInterval) {
      clearInterval(quizTimerInterval);
      quizTimerInterval = null;
    }
  }

  function updateTimerDisplay() {
    const timerEl = document.getElementById('quiz-timer-text');
    if (!timerEl) return;
    const m = Math.floor(secondsRemaining / 60);
    const s = secondsRemaining % 60;
    timerEl.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  function finishQuizSession() {
    stopQuizTimer();
    if (!activeQuiz) return;

    let correctCount = 0;
    activeQuiz.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const totalQuestions = activeQuiz.questions.length;
    const scorePct = Math.round((correctCount / totalQuestions) * 100);
    const wrongCount = totalQuestions - correctCount;

    // Prior baseline for this skill
    const prevSkillScore = state.student.selfSkills[activeQuiz.id] || 50;

    // Explainable Integration:
    // New Rating = (Assessment * 0.70) + (PrevSkill * 0.30)
    const newRating = Math.round((scorePct * 0.70) + (prevSkillScore * 0.30));
    const skillDelta = newRating - prevSkillScore;
    const deltaSign = skillDelta >= 0 ? `+${skillDelta}` : `${skillDelta}`;

    // Update state.student.selfSkills so it anchors future calculations
    state.student.selfSkills[activeQuiz.id] = newRating;

    // Log to assessment history
    const today = new Date().toISOString().split('T')[0];
    const logItem = {
      id: 'hist_' + Date.now(),
      topicId: activeQuiz.id,
      topicTitle: activeQuiz.title,
      date: today,
      scorePct: scorePct,
      totalQuestions: totalQuestions,
      correctCount: correctCount,
      wrongCount: wrongCount,
      skillImpact: `${deltaSign} pts`
    };

    // Prepend to assessment history
    state.assessmentHistory.unshift(logItem);
    saveState();

    // Render results screen
    document.getElementById('assess-active-quiz-screen').classList.add('hidden');
    document.getElementById('quiz-results-screen').classList.remove('hidden');

    document.getElementById('results-topic-name').textContent = activeQuiz.title;
    document.getElementById('res-score-pct').textContent = `${scorePct}%`;
    document.getElementById('res-correct-count').textContent = correctCount;
    document.getElementById('res-wrong-count').textContent = wrongCount;
    document.getElementById('res-impact-val').textContent = `${deltaSign} pts`;

    // Explainable impact rationale text
    const explainEl = document.getElementById('res-explain-text');
    explainEl.innerHTML = `
      Your validated test score of <strong>${scorePct}%</strong> was integrated with your baseline (${prevSkillScore}) via the explainable formula: <br>
      <code>New Rating = (0.70 × ${scorePct}) + (0.30 × ${prevSkillScore}) = ${newRating}/100</code>.<br>
      Your calibrated <strong>${activeQuiz.title}</strong> rating is now updated across all dashboard gauges and skill gap charts.
    `;

    // Render question review list
    const reviewList = document.getElementById('results-review-list');
    reviewList.innerHTML = '';

    activeQuiz.questions.forEach((q, idx) => {
      const userChoice = userAnswers[idx];
      const isCorrect = userChoice === q.correctIndex;
      const letters = ['A', 'B', 'C', 'D'];

      const item = document.createElement('div');
      item.className = `review-item ${isCorrect ? 'is-correct' : 'is-wrong'}`;
      item.innerHTML = `
        <div class="review-q-header">
          <span class="review-q-num">Question ${idx + 1} (${q.subtopic})</span>
          <span class="review-q-status ${isCorrect ? 'text-success' : 'text-danger'}">
            ${isCorrect ? '<i class="fa-solid fa-check"></i> Correct' : '<i class="fa-solid fa-xmark"></i> Incorrect'}
          </span>
        </div>
        <p class="review-q-text">${q.text}</p>
        <div class="review-answer-line">
          <strong>Your Answer:</strong> ${userChoice !== undefined ? `${letters[userChoice]}. ${q.options[userChoice]}` : 'Unanswered'}
        </div>
        ${!isCorrect ? `
          <div class="review-answer-line text-success">
            <strong>Correct Answer:</strong> ${letters[q.correctIndex]}. ${q.options[q.correctIndex]}
          </div>
        ` : ''}
        <div class="review-explanation">
          <strong>Why:</strong> ${q.explanation}
        </div>
      `;
      reviewList.appendChild(item);
    });

    showToast(`Assessment submitted! Score: ${scorePct}%. Skill rating updated.`, 'success');

    // Trigger full state refresh in background
    renderAllViews();
  }

  function showQuizCatalogView() {
    document.getElementById('assess-active-quiz-screen').classList.add('hidden');
    document.getElementById('quiz-results-screen').classList.add('hidden');
    document.getElementById('assess-catalog-screen').classList.remove('hidden');
    renderAssessmentCards();
  }

  // ==========================================================================
  // 6. SKILL GAP ANALYSIS VIEW
  // ==========================================================================

  function initSkillGapView() {
    // Formula expand/collapse
    const formulaToggle = document.getElementById('toggle-formula-details');
    const formulaBox = document.getElementById('formula-details-box');
    const chevron = document.getElementById('formula-chevron');

    if (formulaToggle && formulaBox) {
      formulaToggle.addEventListener('click', () => {
        formulaBox.classList.toggle('active');
        if (chevron) {
          chevron.style.transform = formulaBox.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
        }
      });
    }

    // Gap filter buttons
    const filterBtns = document.querySelectorAll('.gap-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterVal = btn.getAttribute('data-gap-filter');
        renderSkillGapCards(filterVal);
      });
    });
  }

  function renderSkillGapCards(filter = 'all') {
    const container = document.getElementById('skill-gap-cards-container');
    if (!container) return;

    container.innerHTML = '';
    const gaps = computeSkillGapsForRole(state.student.targetRole);

    // Update filter counts
    document.getElementById('count-all-skills').textContent = gaps.length;
    document.getElementById('count-crit-skills').textContent = gaps.filter(g => g.priority === 'Critical').length;
    document.getElementById('count-mod-skills').textContent = gaps.filter(g => g.priority === 'Moderate').length;
    document.getElementById('count-met-skills').textContent = gaps.filter(g => g.priority === 'Met').length;

    // Filter list
    const filtered = gaps.filter(item => {
      if (filter === 'all') return true;
      if (filter === 'critical') return item.priority === 'Critical';
      if (filter === 'moderate') return item.priority === 'Moderate';
      if (filter === 'met') return item.priority === 'Met';
      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; padding: 30px; text-align: center; color: var(--text-muted); background: #FFFFFF; border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
          No competencies in the "${filter}" category for ${state.student.targetRole}.
        </div>
      `;
      return;
    }

    filtered.forEach(skill => {
      const card = document.createElement('div');
      card.className = 'skill-gap-card';

      card.innerHTML = `
        <div class="skill-card-top">
          <div>
            <h3 class="skill-name">${skill.name}</h3>
            <span class="skill-category-tag">${skill.category}</span>
          </div>
          <span class="priority-tag ${skill.priorityClass}">${skill.priority} Priority</span>
        </div>

        <div class="skill-scores-row">
          <div>
            <span class="score-cell-val">${skill.current}</span>
            <span class="score-cell-lbl">Current Rating</span>
          </div>
          <div>
            <span class="score-cell-val">${skill.target}</span>
            <span class="score-cell-lbl">Hiring Benchmark</span>
          </div>
          <div>
            <span class="score-cell-val ${skill.gap > 0 ? 'text-danger' : 'text-success'}">
              ${skill.gap > 0 ? `-${skill.gap} pts` : 'Target Met'}
            </span>
            <span class="score-cell-lbl">Point Discrepancy</span>
          </div>
        </div>

        <div class="skill-comparison-bars">
          <div class="comp-bar-track">
            <div class="comp-bar-current" style="width: ${skill.current}%;"></div>
            <div class="comp-bar-target" style="left: ${skill.target}%;"></div>
          </div>
          <div class="comp-bar-labels">
            <span>Current: ${skill.current}%</span>
            <span>Target Benchmark: ${skill.target}%</span>
          </div>
        </div>

        <div class="skill-explanation-block">
          <span class="exp-label"><i class="fa-solid fa-circle-question"></i> Why this matters in hiring rounds:</span>
          <p class="exp-text">${skill.explanation}</p>
        </div>

        <div class="skill-action-block">
          <span class="action-label"><i class="fa-solid fa-bolt"></i> Recommended Learning Activity:</span>
          <p class="action-text">${skill.action}</p>
        </div>

        <div class="skill-card-bottom">
          <span style="font-size: 11.5px; color: var(--text-muted);">
            ${skill.isVerified ? '<i class="fa-solid fa-circle-check text-success"></i> Quiz Verified' : '<i class="fa-solid fa-clock text-warning"></i> Self-Rated Baseline'}
          </span>
          <button class="btn-sm btn-primary-outline btn-quiz-shortcut" data-skill-key="${skill.key}">
            Take ${skill.name.split(' ')[0]} Quiz
          </button>
        </div>
      `;

      container.appendChild(card);
    });

    // Shortcut to take quiz
    container.querySelectorAll('.btn-quiz-shortcut').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-skill-key');
        switchView('assessments');
        startQuizSession(key);
      });
    });
  }

  // ==========================================================================
  // 7. STUDY PLANNER VIEW
  // ==========================================================================

  function initPlannerView() {
    // Day tab clicks
    const dayTabs = document.querySelectorAll('.day-tab');
    dayTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        dayTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activePlannerDay = tab.getAttribute('data-day');
        renderPlannerTasksForDay(activePlannerDay);
      });
    });

    // Regenerate plan button
    const btnRegen = document.getElementById('btn-regenerate-plan');
    if (btnRegen) {
      btnRegen.addEventListener('click', () => {
        generateDynamicStudyPlan();
        renderPlannerViews();
        showToast('Weekly study plan regenerated tailored to your active gaps!', 'success');
      });
    }

    // Add custom task button
    const btnAddCustom = document.getElementById('btn-add-custom-task');
    const modalTask = document.getElementById('modal-custom-task');
    const formTask = document.getElementById('form-custom-task');
    const closeTask = document.getElementById('modal-close-task');
    const cancelTask = document.getElementById('btn-cancel-task');

    if (btnAddCustom && modalTask) {
      btnAddCustom.addEventListener('click', () => {
        modalTask.classList.remove('hidden');
      });
      [closeTask, cancelTask].forEach(btn => {
        if (btn) btn.addEventListener('click', () => modalTask.classList.add('hidden'));
      });
    }

    if (formTask) {
      formTask.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('task-input-title').value.trim();
        const day = document.getElementById('task-input-day').value;
        const category = document.getElementById('task-input-category').value;
        const duration = parseInt(document.getElementById('task-input-duration').value, 10) || 60;
        const priority = document.getElementById('task-input-priority').value;

        if (!title) return;

        const newTask = {
          id: 'custom_' + Date.now(),
          title: title,
          category: category,
          duration: duration,
          priority: priority,
          completed: false
        };

        if (!state.studyPlan[day]) state.studyPlan[day] = [];
        state.studyPlan[day].push(newTask);

        saveState();
        modalTask.classList.add('hidden');
        formTask.reset();

        // Switch to that day tab
        activePlannerDay = day;
        document.querySelectorAll('.day-tab').forEach(t => {
          t.classList.toggle('active', t.getAttribute('data-day') === day);
        });

        renderPlannerViews();
        showToast('Custom task added to your schedule!', 'success');
      });
    }
  }

  function renderPlannerTasksForDay(day) {
    const container = document.getElementById('day-tasks-container');
    const dayTitle = document.getElementById('day-view-title');
    const daySub = document.getElementById('day-view-sub');
    const completionTag = document.getElementById('day-completion-summary');

    if (!container) return;

    const dayFullNames = {
      Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday',
      Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday'
    };

    dayTitle.textContent = `${dayFullNames[day]} Preparation Tasks`;
    const tasks = state.studyPlan[day] || [];

    const completedCount = tasks.filter(t => t.completed).length;
    completionTag.textContent = `${completedCount} of ${tasks.length} Completed`;

    container.innerHTML = '';

    if (tasks.length === 0) {
      container.innerHTML = `
        <div style="padding: 30px; text-align: center; color: var(--text-muted);">
          No tasks scheduled for ${dayFullNames[day]}. Enjoy your rest day or click "Add Custom Task".
        </div>
      `;
      return;
    }

    tasks.forEach(task => {
      const card = document.createElement('div');
      card.className = `task-item-card ${task.completed ? 'completed' : ''}`;

      card.innerHTML = `
        <div class="task-checkbox-custom" data-task-id="${task.id}">
          ${task.completed ? '<i class="fa-solid fa-check"></i>' : ''}
        </div>
        <div class="task-details">
          <div class="task-title">${task.title}</div>
          <div class="task-meta-row">
            <span class="task-category-pill">${task.category}</span>
            <span>·</span>
            <span><i class="fa-regular fa-clock"></i> ${task.duration} mins</span>
            <span>·</span>
            <span class="priority-tag ${task.priority === 'High' ? 'prio-critical' : task.priority === 'Medium' ? 'prio-moderate' : 'prio-low'}">${task.priority}</span>
          </div>
        </div>
        <button class="btn-delete-task" data-delete-id="${task.id}" title="Delete task">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      `;

      // Toggle completed
      card.querySelector('.task-checkbox-custom').addEventListener('click', () => {
        task.completed = !task.completed;
        saveState();
        renderPlannerTasksForDay(day);
        renderPlannerProgressStats();
        renderPlannerDonutChart();
        showToast(task.completed ? 'Task marked as completed!' : 'Task reopened', 'info');
      });

      // Delete task
      card.querySelector('.btn-delete-task').addEventListener('click', () => {
        state.studyPlan[day] = state.studyPlan[day].filter(t => t.id !== task.id);
        saveState();
        renderPlannerTasksForDay(day);
        renderPlannerProgressStats();
        renderPlannerDonutChart();
        showToast('Task removed from schedule', 'info');
      });

      container.appendChild(card);
    });
  }

  function renderPlannerProgressStats() {
    let totalMins = 0;
    let completedMins = 0;

    Object.values(state.studyPlan).forEach(taskList => {
      taskList.forEach(t => {
        totalMins += t.duration;
        if (t.completed) completedMins += t.duration;
      });
    });

    const completedHours = (completedMins / 60).toFixed(1);
    const targetHours = state.student.availableHours || 14;
    const pct = Math.min(100, Math.round((completedMins / (targetHours * 60)) * 100));

    // Dashboard widgets
    const dashHoursComp = document.getElementById('dashboard-hours-completed');
    const dashHoursTarg = document.getElementById('dashboard-hours-target');
    const dashHoursFill = document.getElementById('dashboard-hours-fill');
    const dashPlanPct = document.getElementById('dashboard-plan-pct');

    if (dashHoursComp) dashHoursComp.textContent = completedHours;
    if (dashHoursTarg) dashHoursTarg.textContent = `${targetHours}.0`;
    if (dashHoursFill) dashHoursFill.style.width = `${pct}%`;
    if (dashPlanPct) dashPlanPct.textContent = `${pct}% Done`;

    // Header hours indicator
    const headerHours = document.getElementById('header-hours-val');
    if (headerHours) headerHours.textContent = `${targetHours}h / wk`;
  }

  function generateDynamicStudyPlan() {
    const gaps = computeSkillGapsForRole(state.student.targetRole);
    const hours = state.student.availableHours || 14;

    // Build 7-day schedule prioritized by highest gap skills
    const topGaps = gaps.slice(0, 3);
    const topSkillName = topGaps[0] ? topGaps[0].name : 'Data Structures & Algorithms';
    const secondSkillName = topGaps[1] ? topGaps[1].name : 'Database Management (DBMS)';

    state.studyPlan = {
      Mon: [
        { id: 'gen_1', title: `Deep Dive: Core problem sets in ${topSkillName}`, category: topSkillName, duration: 90, priority: 'High', completed: false },
        { id: 'gen_2', title: `Review foundational theory & syntax for ${secondSkillName}`, category: secondSkillName, duration: 60, priority: 'High', completed: false }
      ],
      Tue: [
        { id: 'gen_3', title: `Solve 2 algorithmic practice problems on LeetCode`, category: 'Data Structures & Algorithms', duration: 90, priority: 'High', completed: false },
        { id: 'gen_4', title: 'Timed quantitative aptitude set: Time & Work + Percentages', category: 'Quantitative Aptitude', duration: 45, priority: 'Medium', completed: false }
      ],
      Wed: [
        { id: 'gen_5', title: `Targeted practice for ${topSkillName} hiring questions`, category: topSkillName, duration: 90, priority: 'High', completed: false },
        { id: 'gen_6', title: 'Operating Systems & Networks interview revision notes', category: 'Operating Systems & Networks', duration: 60, priority: 'Medium', completed: false }
      ],
      Thu: [
        { id: 'gen_7', title: `System implementation or schema design exercise (${secondSkillName})`, category: secondSkillName, duration: 90, priority: 'High', completed: false },
        { id: 'gen_8', title: '15 Probability and logical reasoning puzzles', category: 'Quantitative Aptitude', duration: 45, priority: 'Normal', completed: false }
      ],
      Fri: [
        { id: 'gen_9', title: 'Mock Technical Interview: Explain project and algorithms out loud', category: 'Communication & HR', duration: 60, priority: 'High', completed: false },
        { id: 'gen_10', title: 'Review common interview edge cases & space-time trade-offs', category: 'Data Structures & Algorithms', duration: 60, priority: 'Medium', completed: false }
      ],
      Sat: [
        { id: 'gen_11', title: 'Take full-length timed Mock Assessment on PlacementPath', category: 'Data Structures & Algorithms', duration: 90, priority: 'High', completed: false },
        { id: 'gen_12', title: 'Analyze assessment errors & update error log', category: topSkillName, duration: 45, priority: 'Normal', completed: false }
      ],
      Sun: [
        { id: 'gen_13', title: 'Behavioral HR preparation: Refine capstone STAR narrative', category: 'Communication & HR', duration: 60, priority: 'Medium', completed: false },
        { id: 'gen_14', title: 'Review weekly progress and calibrate goals for next week', category: 'Programming Fundamentals', duration: 45, priority: 'Normal', completed: false }
      ]
    };

    saveState();
  }

  // ==========================================================================
  // 8. JOB ROLE EXPLORER VIEW
  // ==========================================================================

  function initRolesExplorer() {
    renderRolesExplorer();
  }

  function renderRolesExplorer() {
    // Role cards grid
    const container = document.getElementById('roles-cards-container');
    if (!container) return;

    container.innerHTML = '';

    Object.entries(ROLE_BENCHMARKS).forEach(([roleKey, role]) => {
      const card = document.createElement('div');
      const isActive = state.student.targetRole === roleKey;
      card.className = `role-card ${isActive ? 'active-target' : ''}`;

      // Calculate compatibility match percentage
      let totalMatch = 0;
      let count = 0;
      Object.entries(role.benchmarks).forEach(([skillKey, targetVal]) => {
        const currentVal = getCalibratedSkillScore(skillKey).score;
        const ratio = Math.min(1, currentVal / targetVal);
        totalMatch += ratio;
        count++;
      });
      const matchPct = Math.round((totalMatch / count) * 100);

      card.innerHTML = `
        ${isActive ? '<div class="active-role-ribbon">Active Target</div>' : ''}
        <div class="role-card-header">
          <h3 class="role-card-title">${role.title}</h3>
          <span class="role-hiring-stats"><i class="fa-solid fa-briefcase"></i> ${role.tier}</span>
        </div>
        <p class="role-desc">${role.overview}</p>

        <div class="role-benchmarks-list">
          <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 700; color: var(--color-primary); margin-bottom: 6px;">
            <span>Candidate Skill Match</span>
            <span>${matchPct}% Match</span>
          </div>
          ${Object.entries(role.benchmarks).map(([sKey, sVal]) => {
            const currentScore = getCalibratedSkillScore(sKey).score;
            return `
              <div class="bench-item">
                <div class="bench-header">
                  <span class="bench-name">${sKey.toUpperCase()}</span>
                  <span class="bench-score">${currentScore} / ${sVal}</span>
                </div>
                <div class="bench-bar-track">
                  <div class="bench-bar-fill" style="width: ${Math.min(100, Math.round((currentScore / sVal) * 100))}%;"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div class="interview-pipeline-summary">
          <div class="pipeline-title"><i class="fa-solid fa-diagram-project"></i> Typical Interview Pipeline</div>
          <div class="pipeline-rounds">
            ${role.rounds.map(r => `<div>${r}</div>`).join('')}
          </div>
        </div>

        <div class="role-card-action">
          <button class="btn-block ${isActive ? 'btn-secondary' : 'btn-primary'} btn-set-target-role" data-role="${roleKey}">
            ${isActive ? '<i class="fa-solid fa-check"></i> Current Target Role' : 'Select as Target Role'}
          </button>
        </div>
      `;

      container.appendChild(card);
    });

    // Handle role selection
    container.querySelectorAll('.btn-set-target-role').forEach(btn => {
      btn.addEventListener('click', () => {
        const selected = btn.getAttribute('data-role');
        state.student.targetRole = selected;
        // Also update header
        const headerRole = document.getElementById('header-role-select');
        if (headerRole) headerRole.value = selected;

        saveState();
        showToast(`Target role set to ${selected}! Skill gaps recalculated.`, 'success');
        renderAllViews();
      });
    });
  }

  // ==========================================================================
  // 9. ANALYTICS & ASSESSMENT LEDGER VIEW
  // ==========================================================================

  function initAnalyticsView() {
    const searchInput = document.getElementById('ledger-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        renderAnalyticsLedger(e.target.value.toLowerCase());
      });
    }
  }

  function renderAnalyticsLedger(filterText = '') {
    const tbody = document.getElementById('analytics-ledger-tbody');
    if (!tbody) return;

    tbody.innerHTML = '';
    const history = state.assessmentHistory || [];

    const filtered = filterText
      ? history.filter(h => h.topicTitle.toLowerCase().includes(filterText))
      : history;

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; color: var(--text-muted); padding: 24px;">
            ${history.length === 0 ? 'No assessment sessions logged yet. Take a quiz to populate your history.' : 'No assessments match your search.'}
          </td>
        </tr>
      `;
      return;
    }

    filtered.forEach(log => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><i class="fa-regular fa-calendar" style="color: var(--text-light); margin-right: 6px;"></i> ${log.date}</td>
        <td><strong>${log.topicTitle}</strong></td>
        <td>${log.correctCount} / ${log.totalQuestions} questions</td>
        <td><strong>${log.correctCount * 20} pts</strong></td>
        <td>
          <span style="font-weight: 700; color: ${log.scorePct >= 70 ? 'var(--color-success)' : 'var(--color-danger)'};">
            ${log.scorePct}%
          </span>
        </td>
        <td><span class="badge-accent">${log.skillImpact}</span></td>
        <td>
          <span class="priority-tag ${log.scorePct >= 70 ? 'prio-met' : 'prio-critical'}">
            ${log.scorePct >= 70 ? 'Passed' : 'Needs Practice'}
          </span>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  function renderStrengthsAndWeaknesses() {
    const container = document.getElementById('strengths-weakness-container');
    if (!container) return;

    const gaps = computeSkillGapsForRole(state.student.targetRole);

    const weaknesses = gaps.filter(g => g.gap >= 10);
    const strengths = gaps.filter(g => g.gap < 10);

    container.innerHTML = `
      <div class="strength-col">
        <h4><i class="fa-solid fa-circle-check"></i> Strong Competencies</h4>
        <div class="sw-list">
          ${strengths.length > 0 ? strengths.map(s => `
            <div class="sw-item strong">
              <span><strong>${s.name}</strong></span>
              <span>${s.current}/100</span>
            </div>
          `).join('') : '<div style="font-size: 12px; color: var(--text-muted);">None yet. Complete quizzes to verify.</div>'}
        </div>
      </div>

      <div class="weakness-col">
        <h4><i class="fa-solid fa-triangle-exclamation"></i> Immediate Improvement Gaps</h4>
        <div class="sw-list">
          ${weaknesses.length > 0 ? weaknesses.map(w => `
            <div class="sw-item weak">
              <div>
                <strong>${w.name}</strong>
                <div style="font-size: 11px;">Gap: ${w.gap} points (Benchmark: ${w.target})</div>
              </div>
              <button class="btn-sm btn-ghost btn-fix-gap" data-key="${w.key}" title="Take quiz">
                <i class="fa-solid fa-play"></i>
              </button>
            </div>
          `).join('') : '<div style="font-size: 12px; color: var(--text-success);">All competencies meet or exceed hiring targets!</div>'}
        </div>
      </div>
    `;

    container.querySelectorAll('.btn-fix-gap').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-key');
        switchView('assessments');
        startQuizSession(key);
      });
    });
  }

  // ==========================================================================
  // 10. CHART.JS VISUALIZATIONS
  // ==========================================================================

  function renderDashboardRadar() {
    const canvas = document.getElementById('dashboardRadarChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const gaps = computeSkillGapsForRole(state.student.targetRole);

    const labels = gaps.map(g => g.name.split(' ')[0] + (g.name.includes('&') ? ' & Alg' : ''));
    const currentData = gaps.map(g => g.current);
    const benchmarkData = gaps.map(g => g.target);

    if (radarChartInstance) {
      radarChartInstance.destroy();
    }

    radarChartInstance = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Current Verified Rating',
            data: currentData,
            backgroundColor: 'rgba(124, 58, 237, 0.25)',
            borderColor: '#7C3AED',
            pointBackgroundColor: '#7C3AED',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#7C3AED',
            borderWidth: 2
          },
          {
            label: 'Role Hiring Benchmark',
            data: benchmarkData,
            backgroundColor: 'rgba(245, 158, 11, 0.15)',
            borderColor: '#F59E0B',
            pointBackgroundColor: '#F59E0B',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#F59E0B',
            borderWidth: 2,
            borderDash: [4, 4]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: { color: 'rgba(226, 232, 240, 0.8)' },
            grid: { color: 'rgba(226, 232, 240, 0.8)' },
            pointLabels: {
              font: { size: 11, family: "'Plus Jakarta Sans', sans-serif", weight: 600 },
              color: '#475569'
            },
            ticks: {
              display: false,
              min: 0,
              max: 100,
              stepSize: 20
            }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0F172A',
            titleFont: { family: "'Plus Jakarta Sans', sans-serif" },
            bodyFont: { family: "'JetBrains Mono', monospace" }
          }
        }
      }
    });

    // Update title above radar
    const radarTitle = document.getElementById('radar-role-title');
    if (radarTitle) radarTitle.textContent = state.student.targetRole;
  }

  function renderSkillGapBarChart() {
    const canvas = document.getElementById('skillGapBarChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const gaps = computeSkillGapsForRole(state.student.targetRole);

    const labels = gaps.map(g => g.name);
    const gapValues = gaps.map(g => g.gap);
    const bgColors = gaps.map(g => {
      if (g.gap >= 20) return '#EF4444';
      if (g.gap >= 10) return '#F59E0B';
      return '#10B981';
    });

    if (barChartInstance) {
      barChartInstance.destroy();
    }

    barChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Points Behind Benchmark Target',
          data: gapValues,
          backgroundColor: bgColors,
          borderRadius: 6,
          barThickness: 28
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => `Gap: ${context.parsed.y} points required to meet benchmark`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Deficiency Points', font: { size: 11, weight: 600 } },
            grid: { color: 'rgba(226, 232, 240, 0.6)' }
          },
          x: {
            grid: { display: false },
            ticks: {
              font: { size: 11 },
              callback: function(val) {
                const label = this.getLabelForValue(val);
                return label.length > 18 ? label.substr(0, 16) + '...' : label;
              }
            }
          }
        }
      }
    });
  }

  function renderPlannerDonutChart() {
    const canvas = document.getElementById('plannerDonutChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Aggregate hours per category
    const categoryTotals = {};
    Object.values(state.studyPlan).forEach(tasks => {
      tasks.forEach(t => {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.duration;
      });
    });

    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals).map(m => (m / 60).toFixed(1));
    const colors = ['#4F46E5', '#7C3AED', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'];

    if (donutChartInstance) {
      donutChartInstance.destroy();
    }

    donutChartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: colors.slice(0, labels.length),
          borderWidth: 2,
          borderColor: '#FFFFFF'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: { display: false }
        }
      }
    });

    // Populate breakdown list below chart
    const listEl = document.getElementById('planner-breakdown-list');
    if (listEl) {
      listEl.innerHTML = labels.map((lbl, idx) => `
        <div class="time-item">
          <div class="time-left">
            <span class="time-dot" style="background: ${colors[idx % colors.length]};"></span>
            <span>${lbl}</span>
          </div>
          <span class="time-val">${data[idx]} hrs</span>
        </div>
      `).join('');
    }
  }

  function renderAnalyticsCharts() {
    const canvas = document.getElementById('progressLineChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Dynamic chronological points from state
    const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Current Week'];
    const readinessProgression = [52, 58, 63, 67, 70, calculatePlacementReadiness().overall];

    if (lineChartInstance) {
      lineChartInstance.destroy();
    }

    lineChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Overall Placement Readiness Score',
            data: readinessProgression,
            borderColor: '#4F46E5',
            backgroundColor: 'rgba(79, 70, 229, 0.08)',
            fill: true,
            tension: 0.35,
            pointBackgroundColor: '#4F46E5',
            pointRadius: 5,
            pointHoverRadius: 7
          },
          {
            label: 'Minimum Campus Hiring Threshold (70)',
            data: [70, 70, 70, 70, 70, 70],
            borderColor: '#10B981',
            borderDash: [5, 5],
            borderWidth: 1.5,
            pointRadius: 0,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: { font: { size: 11, family: "'Plus Jakarta Sans', sans-serif" } }
          }
        },
        scales: {
          y: {
            min: 40,
            max: 100,
            grid: { color: 'rgba(226, 232, 240, 0.6)' },
            title: { display: true, text: 'Readiness Score (0-100)', font: { size: 11, weight: 600 } }
          },
          x: { grid: { display: false } }
        }
      }
    });

    renderStrengthsAndWeaknesses();
    renderAnalyticsLedger();
  }

  // ==========================================================================
  // 11. DASHBOARD & HIGH-LEVEL RENDERING
  // ==========================================================================

  function renderAllViews() {
    renderDashboard();
    renderProfileFormValues();
    renderAssessmentCards();
    renderSkillGapViewData();
    renderPlannerViews();
    renderRolesExplorer();
    renderAnalyticsViewData();
    renderNotifications();
  }

  function renderDashboard() {
    const readiness = calculatePlacementReadiness();
    const roleConfig = ROLE_BENCHMARKS[state.student.targetRole] || ROLE_BENCHMARKS['Backend Developer'];

    // Hero Banner updates
    document.getElementById('hero-student-name').textContent = state.student.name.split(' ')[0];
    document.getElementById('hero-target-role').textContent = state.student.targetRole;
    document.getElementById('hero-readiness-score').textContent = readiness.overall;
    document.getElementById('hero-readiness-label').textContent = readiness.label;
    document.getElementById('hero-readiness-label').className = `gauge-status-label ${readiness.labelClass}`;

    // SVG Gauge circle animation
    // Circle circumference with r=68 is 2 * PI * 68 = ~427.2
    const circle = document.getElementById('gauge-progress-circle');
    if (circle) {
      const circ = 427.2;
      const offset = circ - (circ * (readiness.overall / 100));
      circle.style.strokeDashoffset = offset;
      if (readiness.overall >= 70) circle.style.stroke = '#10B981';
      else if (readiness.overall >= 60) circle.style.stroke = '#F59E0B';
      else circle.style.stroke = '#EF4444';
    }

    // 4 KPI Score Cards
    document.getElementById('kpi-tech-score').textContent = readiness.technical;
    document.getElementById('kpi-tech-fill').style.width = `${readiness.technical}%`;
    document.getElementById('kpi-tech-target').textContent = `Req: ${Math.round((roleConfig.benchmarks.dbms + roleConfig.benchmarks.os + roleConfig.benchmarks.cn) / 3)}`;

    document.getElementById('kpi-dsa-score').textContent = readiness.dsa;
    document.getElementById('kpi-dsa-fill').style.width = `${readiness.dsa}%`;
    document.getElementById('kpi-dsa-target').textContent = `Req: ${roleConfig.benchmarks.dsa}`;

    document.getElementById('kpi-apt-score').textContent = readiness.aptitude;
    document.getElementById('kpi-apt-fill').style.width = `${readiness.aptitude}%`;
    document.getElementById('kpi-apt-target').textContent = `Req: ${roleConfig.benchmarks.aptitude}`;

    document.getElementById('kpi-comm-score').textContent = readiness.communication;
    document.getElementById('kpi-comm-fill').style.width = `${readiness.communication}%`;
    document.getElementById('kpi-comm-target').textContent = `Req: ${roleConfig.benchmarks.communication}`;

    // Radar Chart
    renderDashboardRadar();

    // Heatmap Table
    renderHeatmapTable();

    // Recommendations list
    renderDashboardRecommendations();

    // Recent assessments in dashboard
    renderDashboardRecentAssessments();

    // Sidebar student card
    const initials = state.student.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'ST';
    document.getElementById('sidebar-avatar').textContent = initials;
    document.getElementById('sidebar-student-name').textContent = state.student.name;
    document.getElementById('sidebar-target-role').textContent = state.student.targetRole;
    document.getElementById('header-avatar').textContent = initials;
    document.getElementById('header-name').textContent = state.student.name.split(' ')[0];

    // Badge counts
    const gaps = computeSkillGapsForRole(state.student.targetRole);
    const critCount = gaps.filter(g => g.priority === 'Critical').length;
    const badge = document.getElementById('nav-gaps-badge');
    if (badge) {
      badge.textContent = `${critCount} Gaps`;
      badge.className = `nav-badge ${critCount > 0 ? 'badge-warning' : 'badge-success'}`;
    }
  }

  function renderHeatmapTable() {
    const tbody = document.getElementById('heatmap-table-body');
    if (!tbody) return;

    tbody.innerHTML = '';
    const gaps = computeSkillGapsForRole(state.student.targetRole);

    gaps.forEach(g => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <div style="display: flex; align-items: center; gap: 8px;">
            <i class="fa-solid ${g.icon}" style="color: var(--color-primary); width: 16px;"></i>
            <strong>${g.name}</strong>
          </div>
        </td>
        <td class="font-mono">${g.current}/100</td>
        <td class="font-mono">${g.target}/100</td>
        <td class="font-mono ${g.gap > 0 ? 'text-danger' : 'text-success'}">
          ${g.gap > 0 ? `-${g.gap} pts` : '0 (Met)'}
        </td>
        <td>
          <span class="priority-tag ${g.priorityClass}">${g.priority}</span>
        </td>
        <td style="font-size: 11.5px; color: var(--text-muted);">
          ${g.isVerified ? '<span class="text-success"><i class="fa-solid fa-check"></i> Verified</span>' : 'Self-Reported'}
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  function renderDashboardRecommendations() {
    const container = document.getElementById('dashboard-recommendations-list');
    if (!container) return;

    container.innerHTML = '';
    const gaps = computeSkillGapsForRole(state.student.targetRole);
    const criticals = gaps.filter(g => g.gap > 0).slice(0, 3);

    if (criticals.length === 0) {
      container.innerHTML = `
        <div style="padding: 16px; background: #ECFDF5; border-radius: var(--radius-md); color: #065F46; font-size: 12.5px;">
          <i class="fa-solid fa-circle-check"></i> Outstanding! All verified skills currently satisfy the target hiring baseline for ${state.student.targetRole}.
        </div>
      `;
      return;
    }

    criticals.forEach(item => {
      const rec = document.createElement('div');
      rec.className = 'dash-rec-item';

      rec.innerHTML = `
        <div class="rec-urgency-dot ${item.priority === 'Critical' ? 'dot-critical' : 'dot-high'}"></div>
        <div class="rec-content">
          <div class="rec-title-row">
            <span class="rec-title">${item.name} Remediation</span>
            <span class="rec-impact">+${item.gap} pts gap</span>
          </div>
          <p class="rec-rationale">${item.action}</p>
          <button class="rec-action-btn btn-dash-rec" data-skill-key="${item.key}">
            Take 10-Min Assessment <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      `;

      rec.querySelector('.btn-dash-rec').addEventListener('click', () => {
        switchView('assessments');
        startQuizSession(item.key);
      });

      container.appendChild(rec);
    });
  }

  function renderDashboardRecentAssessments() {
    const container = document.getElementById('dashboard-assess-list');
    if (!container) return;

    container.innerHTML = '';
    const recent = state.assessmentHistory.slice(0, 3);

    if (recent.length === 0) {
      container.innerHTML = `
        <div style="padding: 20px; text-align: center; color: var(--text-muted); font-size: 12.5px;">
          No assessments recorded yet. Complete a quiz to establish your verified readiness score.
        </div>
      `;
      return;
    }

    recent.forEach(log => {
      const item = document.createElement('div');
      item.className = 'assess-log-card';

      item.innerHTML = `
        <div class="assess-log-left">
          <div class="assess-log-icon">
            <i class="fa-solid fa-clipboard-check"></i>
          </div>
          <div>
            <div class="assess-log-title">${log.topicTitle}</div>
            <div class="assess-log-date">${log.date} · ${log.totalQuestions} Questions</div>
          </div>
        </div>
        <div class="assess-log-right">
          <span class="assess-log-score ${log.scorePct >= 70 ? 'text-success' : 'text-danger'}">${log.scorePct}%</span>
          <span class="badge-accent">${log.skillImpact}</span>
        </div>
      `;
      container.appendChild(item);
    });
  }

  function renderProfileFormValues() {
    const student = state.student;
    document.getElementById('prof-name').value = student.name;
    document.getElementById('prof-branch').value = student.branch;
    document.getElementById('prof-year').value = student.year;
    document.getElementById('prof-target-role').value = student.targetRole;
    document.getElementById('prof-company-tier').value = student.companyTier;
    document.getElementById('prof-hours').value = student.availableHours;
    document.getElementById('lbl-hours').textContent = student.availableHours;

    // Sliders
    const skills = student.selfSkills;
    document.getElementById('prof-skill-dsa').value = skills.dsa;
    document.getElementById('lbl-skill-dsa').textContent = skills.dsa;

    document.getElementById('prof-skill-dbms').value = skills.dbms;
    document.getElementById('lbl-skill-dbms').textContent = skills.dbms;

    document.getElementById('prof-skill-os').value = skills.os;
    document.getElementById('lbl-skill-os').textContent = skills.os;

    document.getElementById('prof-skill-cn').value = skills.cn;
    document.getElementById('lbl-skill-cn').textContent = skills.cn;

    document.getElementById('prof-skill-apt').value = skills.aptitude;
    document.getElementById('lbl-skill-apt').textContent = skills.aptitude;

    document.getElementById('prof-skill-comm').value = skills.communication;
    document.getElementById('lbl-skill-comm').textContent = skills.communication;
  }

  function renderSkillGapViewData() {
    const role = state.student.targetRole;
    document.getElementById('gap-role-heading').textContent = `${role} Hiring Benchmarks`;

    const gaps = computeSkillGapsForRole(role);
    document.getElementById('gap-critical-count').textContent = gaps.filter(g => g.priority === 'Critical').length;
    document.getElementById('gap-moderate-count').textContent = gaps.filter(g => g.priority === 'Moderate').length;
    document.getElementById('gap-met-count').textContent = gaps.filter(g => g.priority === 'Met').length;

    renderSkillGapCards('all');
    renderSkillGapBarChart();
  }

  function renderPlannerViews() {
    document.getElementById('plan-role-label').textContent = state.student.targetRole;
    document.getElementById('plan-hours-label').textContent = state.student.availableHours;

    renderPlannerTasksForDay(activePlannerDay);
    renderPlannerProgressStats();
    renderPlannerDonutChart();
  }

  function renderAnalyticsViewData() {
    renderAnalyticsCharts();
  }

  function renderNotifications() {
    const list = document.getElementById('notification-list');
    if (!list) return;

    const gaps = computeSkillGapsForRole(state.student.targetRole);
    const criticals = gaps.filter(g => g.priority === 'Critical');

    const notifs = [
      {
        title: `Role Benchmark Alert: ${state.student.targetRole}`,
        text: `You have ${criticals.length} critical competency gaps requiring practice before online assessments.`,
        type: 'warn'
      },
      {
        title: 'Weekly Study Commitment',
        text: `Target: ${state.student.availableHours} preparation hours configured for this week.`,
        type: 'info'
      },
      {
        title: 'Explainable AI Recommendation',
        text: criticals.length > 0
          ? `Focus on ${criticals[0].name} to gain up to +${criticals[0].gap} readiness points.`
          : 'Great job maintaining your preparation pace! Review full-length mock tests.',
        type: 'info'
      }
    ];

    list.innerHTML = notifs.map(n => `
      <div class="notif-item">
        <div class="notif-icon ${n.type}">
          <i class="fa-solid ${n.type === 'warn' ? 'fa-triangle-exclamation' : 'fa-lightbulb'}"></i>
        </div>
        <div class="notif-content">
          <strong>${n.title}</strong>
          <p>${n.text}</p>
        </div>
      </div>
    `).join('');

    const countEl = document.getElementById('notif-count');
    if (countEl) countEl.textContent = notifs.length;
  }

  // ==========================================================================
  // 12. MODALS, TOASTS & PRESET PROFILES
  // ==========================================================================

  function initModalsAndToasts() {
    // Explainability modal
    const btnMethodology = document.getElementById('btn-show-methodology');
    const btnDashboardExplain = document.getElementById('btn-dashboard-explain-modal');
    const modalMethodology = document.getElementById('modal-methodology');
    const closeMethodology = document.getElementById('modal-close-methodology');
    const okMethodology = document.getElementById('btn-close-methodology-ok');

    [btnMethodology, btnDashboardExplain].forEach(btn => {
      if (btn && modalMethodology) {
        btn.addEventListener('click', () => modalMethodology.classList.remove('hidden'));
      }
    });

    [closeMethodology, okMethodology].forEach(btn => {
      if (btn && modalMethodology) {
        btn.addEventListener('click', () => modalMethodology.classList.add('hidden'));
      }
    });

    // Reset / Switch Demo Data modal
    const btnQuickReset = document.getElementById('btn-quick-reset');
    const modalReset = document.getElementById('modal-reset-data');
    const closeReset = document.getElementById('modal-close-reset');
    const cancelReset = document.getElementById('btn-cancel-reset');

    if (btnQuickReset && modalReset) {
      btnQuickReset.addEventListener('click', () => modalReset.classList.remove('hidden'));
    }
    [closeReset, cancelReset].forEach(btn => {
      if (btn && modalReset) btn.addEventListener('click', () => modalReset.classList.add('hidden'));
    });

    // Modal option buttons
    const btnAarav = document.getElementById('btn-confirm-aarav');
    const btnPriya = document.getElementById('btn-confirm-priya');
    const btnBlank = document.getElementById('btn-confirm-blank');

    if (btnAarav) {
      btnAarav.addEventListener('click', () => {
        loadPresetProfile('aarav');
        modalReset.classList.add('hidden');
      });
    }
    if (btnPriya) {
      btnPriya.addEventListener('click', () => {
        loadPresetProfile('priya');
        modalReset.classList.add('hidden');
      });
    }
    if (btnBlank) {
      btnBlank.addEventListener('click', () => {
        loadPresetProfile('blank');
        modalReset.classList.add('hidden');
      });
    }
  }

  function loadPresetProfile(key) {
    if (!DEMO_PROFILES[key]) return;
    state = JSON.parse(JSON.stringify(DEMO_PROFILES[key]));
    saveState();
    showToast(`Loaded profile: ${state.student.name}`, 'success');
    renderAllViews();
    switchView('dashboard');
  }

  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let icon = 'fa-circle-info text-accent';
    if (type === 'success') icon = 'fa-circle-check text-success';
    if (type === 'error') icon = 'fa-triangle-exclamation text-danger';

    toast.innerHTML = `
      <i class="fa-solid ${icon}"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(40px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

})();
