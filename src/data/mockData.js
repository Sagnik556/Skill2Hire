export const initialStudentData = {
  id: "std-101",
  name: "Rohan Sharma",
  email: "rohan.sharma@institution.edu",
  phone: "+91 98765 43210",
  institution: "National Institute of Technology",
  department: "Computer Science & Engineering",
  degree: "B.Tech",
  year: "3rd Year (Semester 6)",
  cgpa: 8.8,
  bio: "Aspiring Full-Stack & AI Engineer passionate about scalable web architecture, cloud deployment, and machine learning models.",
  verifiedBadgeCount: 6,
  skillMatchAverage: 86,
  location: "Bangalore / Remote",

  // Student's assessed skills (scored 0-100)
  skills: [
    { name: "React / Frontend", score: 85, category: "Technical", verified: true, date: "2026-08-15" },
    { name: "Node.js / Express", score: 80, category: "Technical", verified: true, date: "2026-08-10" },
    { name: "Python / Data Science", score: 90, category: "Technical", verified: true, date: "2026-08-28" },
    { name: "Docker & Cloud (AWS)", score: 55, category: "Technical", verified: false, gap: true },
    { name: "PostgreSQL / SQL", score: 75, category: "Technical", verified: true, date: "2026-07-20" },
    { name: "Machine Learning (PyTorch)", score: 65, category: "Technical", verified: false, gap: true },
    { name: "Problem Solving & DSA", score: 88, category: "Technical", verified: true, date: "2026-08-01" },
    { name: "Technical Communication", score: 82, category: "Soft Skills", verified: true, date: "2026-06-14" },
    { name: "Agile Leadership", score: 70, category: "Soft Skills", verified: false }
  ],

  // Skill Gap Analysis targets
  targetRoles: [
    {
      role: "Full Stack AI Engineer",
      matchPercent: 88,
      requiredSkills: ["React", "Node.js", "Python", "PyTorch", "Docker"],
      missingSkills: ["Docker", "PyTorch Optimization"],
      recommendedCourses: ["Docker & Kubernetes Essentials", "GenAI Application Development"]
    },
    {
      role: "Cloud DevOps Associate",
      matchPercent: 62,
      requiredSkills: ["AWS", "Docker", "Linux", "CI/CD", "Kubernetes"],
      missingSkills: ["AWS Architecture", "Kubernetes", "Terraform"],
      recommendedCourses: ["AWS Solutions Architect Bootcamp", "DevOps Pipelines Live Workshop"]
    }
  ],

  // Digital Portfolio items
  projects: [
    {
      id: "p1",
      title: "MedIA - Healthcare Diagnostic Assistant",
      description: "AI-driven diagnostic dashboard analyzing medical imaging with PyTorch and presenting findings via React interface.",
      techStack: ["React", "Python", "FastAPI", "PyTorch", "Tailwind CSS"],
      githubUrl: "https://github.com/rohan/media-ai",
      liveUrl: "https://media-ai-demo.vercel.app",
      verified: true
    },
    {
      id: "p2",
      title: "SmartCampus - Automated Attendance System",
      description: "Facial recognition attendance system integrated with institution database and automated leave requests.",
      techStack: ["Node.js", "OpenCV", "MongoDB", "Express"],
      githubUrl: "https://github.com/rohan/smart-campus",
      verified: true
    }
  ],

  certifications: [
    {
      id: "c1",
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      issueDate: "July 2026",
      credentialId: "AWS-DEV-998241",
      verified: true
    },
    {
      id: "c2",
      name: "Meta Professional Frontend Developer",
      issuer: "Meta / Coursera",
      issueDate: "May 2026",
      credentialId: "META-FE-554109",
      verified: true
    }
  ]
};

export const sampleAssessments = [
  {
    id: "assess-1",
    title: "Full-Stack Development & Microservices",
    category: "Technical",
    durationMinutes: 15,
    totalQuestions: 5,
    difficulty: "Intermediate",
    skillsEvaluated: ["React", "Node.js", "API Design", "Database Querying"],
    questions: [
      {
        id: 1,
        question: "Which hook in React is primarily used to synchronize a component with an external system or side effects?",
        options: ["useMemo", "useEffect", "useCallback", "useState"],
        correctIndex: 1,
        explanation: "useEffect is specifically designed to perform side effects like fetching data, subscribing to external stores, or directly manipulating DOM."
      },
      {
        id: 2,
        question: "In Node.js asynchronous event-driven architecture, what handles non-blocking I/O operations under the hood?",
        options: ["Thread Pool directly", "Libuv Event Loop", "V8 Engine Synchronous Queue", "Web Worker API"],
        correctIndex: 1,
        explanation: "Libuv is the C library underlying Node.js that manages the event loop, thread pool, and non-blocking asynchronous I/O."
      },
      {
        id: 3,
        question: "What is the key advantage of using Docker containerization over traditional Virtual Machines?",
        options: [
          "Containers require a complete guest OS per application",
          "Containers share the host kernel and start up in seconds with low resource overhead",
          "Containers eliminate network latency completely",
          "Containers do not isolate filesystem changes"
        ],
        correctIndex: 1,
        explanation: "Containers virtualize at the operating system level, sharing the host OS kernel and making them lightweight compared to full VMs."
      },
      {
        id: 4,
        question: "In relational database optimization, what type of index is most effective for speeding up range queries on numeric columns?",
        options: ["Hash Index", "B-Tree Index", "Full-Text Index", "GiST Index"],
        correctIndex: 1,
        explanation: "B-Tree indexes maintain sorted order, making them optimal for equality and range-based (<, >, BETWEEN) lookups."
      },
      {
        id: 5,
        question: "Which HTTP status code explicitly signifies that a server received valid syntax but refuses to process the request due to missing permissions?",
        options: ["400 Bad Request", "401 Unauthorized", "403 Forbidden", "404 Not Found"],
        correctIndex: 2,
        explanation: "403 Forbidden means client credentials were recognized but client does not have rights to access the resource."
      }
    ]
  },
  {
    id: "assess-2",
    title: "Applied Artificial Intelligence & Machine Learning",
    category: "AI & ML",
    durationMinutes: 15,
    totalQuestions: 4,
    difficulty: "Advanced",
    skillsEvaluated: ["Python", "PyTorch", "Model Evaluation", "GenAI"],
    questions: [
      {
        id: 1,
        question: "What issue in deep neural networks does Residual Connections (ResNets) primarily overcome during backpropagation?",
        options: ["Overfitting", "Vanishing & Exploding Gradients", "High Data Sparsity", "Covariate Shift"],
        correctIndex: 1,
        explanation: "Skip connections allow gradients to flow directly back through shortcut paths, mitigating vanishing gradients in very deep networks."
      },
      {
        id: 2,
        question: "Which metric is most crucial when evaluating a medical diagnosis ML model where failing to detect a positive case (False Negative) is life-threatening?",
        options: ["Precision", "Recall (Sensitivity)", "Accuracy", "Specificity"],
        correctIndex: 1,
        explanation: "Recall measures the ratio of actual true positives correctly identified, minimizing dangerous False Negatives."
      },
      {
        id: 3,
        question: "In Transformer architecture (Vaswani et al.), what is the mathematical purpose of Scaled Dot-Product Attention?",
        options: [
          "Compress images into 2D matrices",
          "Compute relative importance weights between token vectors dynamically",
          "Eliminate activation functions",
          "Reduce batch size"
        ],
        correctIndex: 1,
        explanation: "Attention allows model tokens to attend to other tokens in the context window based on query-key dot product similarity."
      },
      {
        id: 4,
        question: "What is Retrieval-Augmented Generation (RAG) primarily used for in LLM deployment?",
        options: [
          "Training an LLM from scratch without text data",
          "Grounding LLM responses with real-time vector search from external custom knowledge bases",
          "Converting text directly into C++ code",
          "Increasing transformer context size permanently"
        ],
        correctIndex: 1,
        explanation: "RAG retrieves relevant domain documents from a vector store to inject factual context into prompt completion, reducing hallucinations."
      }
    ]
  }
];

export const sampleOpportunities = [
  {
    id: "opp-201",
    title: "Full-Stack AI Developer Intern",
    company: "DataMind AI Technologies",
    logo: "⚡",
    type: "Internship",
    duration: "6 Months",
    mode: "Hybrid (Bangalore)",
    stipend: "₹35,000 / month",
    postedDate: "2026-08-30",
    deadline: "2026-09-20",
    requiredSkills: ["React", "Python", "Node.js", "PostgreSQL"],
    matchPercent: 92,
    description: "Work directly with core AI engineering team to build user interfaces, dynamic query parsers, and API integrations for enterprise analytics tools.",
    responsibilities: [
      "Develop responsive React components integrated with FastAPI backends.",
      "Optimize SQL query performance and asynchronous vector database lookups.",
      "Participate in daily code reviews and CI/CD automated deployments."
    ],
    perks: ["PPO Opportunity (Pre-Placement Offer)", "Mentorship from Senior Architects", "Flexible Work Schedule"]
  },
  {
    id: "opp-202",
    title: "Graduate Software Engineer (Cloud Services)",
    company: "CloudScale Systems",
    logo: "☁️",
    type: "Placement (Full-Time)",
    duration: "Permanent",
    mode: "Onsite (Hyderabad / Pune)",
    stipend: "₹12.5 LPA Package",
    postedDate: "2026-08-25",
    deadline: "2026-09-15",
    requiredSkills: ["Node.js", "Docker & Cloud (AWS)", "Problem Solving & DSA"],
    matchPercent: 84,
    description: "Entry-level full-time position for graduating students with strong algorithmic foundation and foundational cloud exposure.",
    responsibilities: [
      "Architect microservice components using Node.js and AWS Serverless.",
      "Monitor system health metrics using CloudWatch & Datadog.",
      "Collaborate with Security Operations to implement OAuth2 authentication."
    ],
    perks: ["Health Insurance for Family", "Annual Learning Stipend ₹50,000", "Stock Options (ESOPs)"]
  },
  {
    id: "opp-203",
    title: "DevOps & Infrastructure Apprentice",
    company: "Nexus Enterprise Software",
    logo: "🛠️",
    type: "Apprenticeship",
    duration: "1 Year",
    mode: "Remote",
    stipend: "₹28,000 / month",
    postedDate: "2026-09-01",
    deadline: "2026-09-25",
    requiredSkills: ["Docker & Cloud (AWS)", "Node.js", "PostgreSQL"],
    matchPercent: 68,
    description: "Hands-on apprenticeship program focusing on container management, Kubernetes clusters, and continuous delivery infrastructure.",
    responsibilities: [
      "Maintain Docker compose pipelines for development staging environments.",
      "Automate bash scripts and GitHub Actions workflows.",
      "Assist in database migration scripts and back-up verifications."
    ],
    perks: ["Industry Certificate", "Direct Mentorship", "Conversion to Full-Time"]
  },
  {
    id: "opp-204",
    title: "Frontend UI/UX Systems Intern",
    company: "Innovate Design Labs",
    logo: "🎨",
    type: "Internship",
    duration: "3 Months",
    mode: "Remote",
    stipend: "₹25,000 / month",
    postedDate: "2026-08-28",
    deadline: "2026-09-18",
    requiredSkills: ["React / Frontend", "Technical Communication"],
    matchPercent: 95,
    description: "Craft modern web experiences, high-accessibility UI component libraries, and interactive design tokens for international SaaS clients.",
    responsibilities: [
      "Translate Figma design specifications into pixel-perfect React components.",
      "Implement smooth CSS animations and responsive micro-interactions.",
      "Ensure web accessibility (WCAG 2.1 AAA standards)."
    ],
    perks: ["Design System Certification", "Flexible Hours", "Team Offsite Invites"]
  }
];

export const sampleLearningPrograms = [
  {
    id: "learn-301",
    title: "Docker & Cloud Native Engineering Masterclass",
    company: "AWS Academy & Skill2Hire",
    category: "Certification Course",
    duration: "4 Weeks (Weekend Live)",
    level: "Intermediate",
    enrolledCount: 1420,
    skillsCovered: ["Docker", "Kubernetes", "AWS ECS", "CI/CD Pipelines"],
    description: "Close your cloud skills gap! Intensive hands-on workshop led by AWS certified Solution Architects with live project deployments.",
    badgeProvided: "Skill2Hire Verified Cloud Specialist"
  },
  {
    id: "learn-302",
    title: "Generative AI & Agentic Application Bootcamp",
    company: "DeepMind Learning Labs",
    category: "Industry Workshop",
    duration: "3 Weeks",
    level: "Advanced",
    enrolledCount: 2890,
    skillsCovered: ["PyTorch", "RAG Systems", "LangChain", "Vector DBs"],
    description: "Learn to build production-grade LLM applications, custom RAG agents, and multi-agent coordination frameworks.",
    badgeProvided: "GenAI Certified Engineer"
  }
];

export const sampleAcademicianOpportunities = [
  {
    id: "fac-401",
    title: "Faculty Immersion Fellowship in GenAI Architecture",
    provider: "Microsoft Research & Academic Alliance",
    type: "Faculty Internship",
    duration: "6 Weeks (Summer)",
    stipendHonorarium: "₹75,000 Honorarium + Travel",
    eligibility: "Assistant/Associate Professors in CS, IT, AI",
    deadline: "2026-09-30",
    description: "Exclusive opportunity for academicians to work alongside Microsoft Senior Research Scientists on state-of-the-art transformer optimization.",
    deliverables: ["Joint Research Paper Submission", "Updated Syllabus Module for Institution"]
  },
  {
    id: "fac-402",
    title: "National FDP on Industry 4.0 & Cyber-Physical Systems",
    provider: "IIT Bombay & Siemens Industry Co-Lab",
    type: "Faculty Development Program (FDP)",
    duration: "5 Days (Hybrid)",
    stipendHonorarium: "Sponsored Certification & Kit",
    eligibility: "Engineering & Applied Science Faculty",
    deadline: "2026-09-22",
    description: "Hands-on FDP providing practical lab exposure to industrial IoT, digital twin modeling, and SCADA automation standards.",
    deliverables: ["AICTE Approved FDP Certificate", "Lab Courseware Access"]
  },
  {
    id: "fac-403",
    title: "Industry Consultancy: High Performance Data Pipeline",
    provider: "FinTech Global Technologies",
    type: "Consultancy Project",
    duration: "3 Months (Part-time)",
    stipendHonorarium: "₹2,50,000 Grant",
    eligibility: "Faculty with specialization in Distributed Databases or Cloud Computing",
    deadline: "2026-09-28",
    description: "Industry seeking academic lead to consult on query engine optimization for sub-millisecond transaction processing.",
    deliverables: ["Technical Audit Report", "Architecture Blueprint"]
  }
];

export const sampleInstitutionalAnalytics = {
  overallPlacementRate: 84.5,
  avgStipend: "₹32,500 / mo",
  avgPackage: "₹9.8 LPA",
  totalStudentsAssessed: 1840,
  activeInternships: 412,
  partnerCompanies: 65,

  // Skill gap across departments
  departmentSkillGaps: [
    { department: "Computer Science", industryRequired: 92, studentProficiency: 82, gap: 10 },
    { department: "Information Tech", industryRequired: 90, studentProficiency: 76, gap: 14 },
    { department: "Electronics & Comm", industryRequired: 85, studentProficiency: 64, gap: 21 },
    { department: "Data Science & AI", industryRequired: 95, studentProficiency: 85, gap: 10 },
    { department: "Mechanical Engg", industryRequired: 80, studentProficiency: 58, gap: 22 }
  ],

  // Top In-Demand Skills vs Syllabus Alignment (%)
  skillDemandVsSyllabus: [
    { skill: "React / Frontend", demand: 94, syllabusCoverage: 70 },
    { skill: "Docker & Kubernetes", demand: 88, syllabusCoverage: 35 },
    { skill: "GenAI & LLM Tools", demand: 92, syllabusCoverage: 25 },
    { skill: "Cloud Platforms (AWS/Azure)", demand: 89, syllabusCoverage: 45 },
    { skill: "Data Structures & Algo", demand: 96, syllabusCoverage: 90 },
    { skill: "Cybersecurity & OAuth", demand: 81, syllabusCoverage: 60 }
  ],

  placementFunnel: [
    { stage: "Assessed Students", count: 1840 },
    { stage: "Skill Profile Matched", count: 1520 },
    { stage: "Applications Submitted", count: 1280 },
    { stage: "Shortlisted for Interview", count: 740 },
    { stage: "Internships & Job Offers", count: 620 }
  ]
};

export const initialApplications = [
  {
    id: "app-1",
    opportunityId: "opp-201",
    opportunityTitle: "Full-Stack AI Developer Intern",
    company: "DataMind AI Technologies",
    studentName: "Rohan Sharma",
    appliedDate: "2026-09-01",
    status: "Shortlisted",
    matchScore: 92,
    feedback: "Selected for Technical Coding Round on Sep 08."
  },
  {
    id: "app-2",
    opportunityId: "opp-204",
    opportunityTitle: "Frontend UI/UX Systems Intern",
    company: "Innovate Design Labs",
    studentName: "Rohan Sharma",
    appliedDate: "2026-08-29",
    status: "Interviewing",
    matchScore: 95,
    feedback: "System Design interview scheduled."
  }
];

export const sampleCandidatesPool = [
  {
    id: "c-101",
    name: "Rohan Sharma",
    institution: "National Institute of Technology",
    department: "Computer Science",
    cgpa: 8.8,
    skillMatch: 92,
    topSkills: ["React", "Python", "Node.js", "SQL"],
    verifiedBadges: 6,
    status: "Shortlisted",
    email: "rohan.sharma@institution.edu"
  },
  {
    id: "c-102",
    name: "Priya Nair",
    institution: "Indian Institute of Technology",
    department: "Data Science & AI",
    cgpa: 9.2,
    skillMatch: 96,
    topSkills: ["Python", "PyTorch", "FastAPI", "Docker"],
    verifiedBadges: 8,
    status: "Applied",
    email: "priya.nair@iit.edu"
  },
  {
    id: "c-103",
    name: "Aniket Verma",
    institution: "Birla Institute of Technology",
    department: "Information Technology",
    cgpa: 8.4,
    skillMatch: 81,
    topSkills: ["Java", "Spring Boot", "React", "SQL"],
    verifiedBadges: 5,
    status: "Interviewing",
    email: "aniket.v@bit.edu"
  },
  {
    id: "c-104",
    name: "Sneha Kulkarni",
    institution: "Vellore Institute of Technology",
    department: "Computer Science",
    cgpa: 8.9,
    skillMatch: 88,
    topSkills: ["React", "TypeScript", "Tailwind", "Node.js"],
    verifiedBadges: 7,
    status: "Offered",
    email: "sneha.k@vit.edu"
  }
];
