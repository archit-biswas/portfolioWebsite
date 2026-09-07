export type SkillLevel = "Beginner" | "Intermediate" | "Advanced";

export interface JourneyItem {
  type: "work" | "education";
  role: string;
  org: string;
  location: string;
  start: string;
  end: string;
  achievements: string[];
}

export interface Project {
  name: string;
  description: string;
  repo: string;
  demo: string | null;
  language: string;
  tags: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialUrl: string;
}

export const portfolio = {
  about: {
    name: "Archit Biswas",
    title: "Software Engineer - Full-Stack & AI/ML",
    location: "Mumbai, India",
    email: "architbiswas885@yahoo.com",
    phone: "+91-91520-19510",
    pitch:
      "Full-Stack Software Engineer & GenAI/LLM Developer based in Mumbai, India",
    pitchDetail:
      "I build full-stack web applications, retrieval-augmented generation (RAG) pipelines, and applied machine learning systems using React, Node.js, Python, Spring Boot, and Docker. Open to Software Engineer, Full-Stack Developer, and AI/ML Engineer roles, remote or on-site.",
    bio: "Software Engineer with an M.Sc. in Computer Science (Augmented and Virtual Reality) from Trinity College Dublin and a B.E. in Electronics and Telecommunications from RGIT Mumbai. I work across the full stack, from React and Node.js on the frontend to Spring Boot, REST APIs, and GraphQL on the backend, and I build GenAI and LLM based systems including retrieval-augmented generation (RAG) agents using LangChain and ChromaDB.",
    bioSecondary:
      "My applied machine learning work spans XGBoost demand forecasting, NLP pipelines built on Rasa and spaCy, and reinforcement learning research using PPO and Bayesian inference. I containerize and ship everything with Docker and CI/CD, and I care about clean, documented, production-ready systems over one-off scripts.",
    statement:
      "I like taking a system from a rough idea to something that actually runs in production, whether that's a RAG agent answering questions over a private dataset, a price optimization model, or a full-stack app with real users.",
    portrait: "",
    values: [
      {
        label: "Full-Stack Ownership",
        text: "End-to-end delivery across React, Node.js, Express, Spring Boot, and PostgreSQL, from spec to deployed product.",
      },
      {
        label: "Applied AI & Machine Learning",
        text: "Hands-on experience building GenAI pipelines, RAG agents, NLP models, and predictive ML systems using LangChain, XGBoost, and Rasa.",
      },
      {
        label: "Clean Systems Thinking",
        text: "Docker-based, documentation-first delivery designed for maintainability, not just demos.",
      },
    ],
    links: [
      { label: "GitHub", url: "https://github.com/archit-biswas" },
      { label: "LinkedIn", url: "https://linkedin.com/in/archit-biswas" },
    ],
  },
  journey: [
    {
      type: "work",
      role: "Customer Relations Management Associate",
      org: "Amazon",
      location: "Remote",
      start: "2025",
      end: "Present",
      achievements: [
        "Maintained first-contact resolution above SLA targets across account security and identity verification workflows using structured root-cause analysis and enterprise diagnostic tooling.",
        "Identified transactional anomalies supporting fraud reduction through data governance and regulatory compliance focused analysis.",
        "Achieved zero documentation gaps across compliance reviews through structured SOPs, issue logs, and escalation records aligned with Agile delivery standards.",
        "Reduced cross-tier escalation cycle times through structured problem decomposition and cross-team stakeholder communication.",
      ],
    },
    {
      type: "education",
      role: "M.Sc. in Computer Science, Augmented and Virtual Reality",
      org: "Trinity College Dublin, Ireland",
      location: "Dublin, Ireland",
      start: "2024",
      end: "2025",
      achievements: [
        "Dissertation: Adaptive AI for Dynamic Narrative Games, supervised by Prof. Michael Manzke.",
        "Designed and evaluated five adaptive AI architectures for games, including deep reinforcement learning (PPO) and Bayesian inference.",
      ],
    },
    {
      type: "education",
      role: "B.E. in Electronics and Telecommunications, Honors in AI/ML",
      org: "MCT's Rajiv Gandhi Institute of Technology, Mumbai",
      location: "Mumbai, India",
      start: "2020",
      end: "2024",
      achievements: [],
    },
    {
      type: "work",
      role: "Front-End Web Development Intern",
      org: "RoboRise Technologies",
      location: "Remote",
      start: "Apr 2022",
      end: "Jun 2022",
      achievements: [
        "Improved web application performance by 25% by building reusable, component-based UI in React, JavaScript, HTML5, and CSS3.",
        "Reduced frontend data rendering latency by 30% by integrating REST and GraphQL APIs for asynchronous client-side data delivery.",
        "Reduced post-deployment defects through Agile sprint cycles and structured peer code review.",
      ],
    },
    {
      type: "work",
      role: "Software Engineering Job Simulation",
      org: "JPMorganChase, Forage",
      location: "Remote",
      start: "Mar 2026",
      end: "Mar 2026",
      achievements: [
        "Integrated Apache Kafka with Spring Boot microservices for event-driven architecture.",
        "Implemented JPA persistence and consumed REST APIs via RestTemplate.",
        "Validated transaction workflows using Maven test suites.",
      ],
    },
    {
      type: "work",
      role: "Data Analytics Job Simulation",
      org: "Tata iQ, Forage",
      location: "Remote",
      start: "Mar 2026",
      end: "Mar 2026",
      achievements: [
        "Performed exploratory data analysis (EDA) using GenAI tools.",
        "Designed a no-code predictive modeling framework for customer delinquency risk.",
        "Formulated an agentic AI-driven collections strategy with ethical AI and regulatory compliance considerations.",
      ],
    },
  ] as JourneyItem[],
  skillsIntro:
    "Technical skills across full-stack development, GenAI/LLM systems, and applied machine learning, listed by category below.",
  skills: [
    {
      category: "Languages",
      blurb: "Python, JavaScript, TypeScript, Java, C++, C#, SQL",
      items: [
        { name: "Python", level: "Advanced" as SkillLevel },
        { name: "JavaScript", level: "Advanced" as SkillLevel },
        { name: "Java", level: "Intermediate" as SkillLevel },
        { name: "SQL", level: "Intermediate" as SkillLevel },
        { name: "TypeScript", level: "Intermediate" as SkillLevel },
        { name: "C++", level: "Intermediate" as SkillLevel },
        { name: "C#", level: "Intermediate" as SkillLevel },
      ],
    },
    {
      category: "Frontend",
      blurb: "React, HTML5, CSS3, Responsive Design, Component-Based Architecture, UI/UX Development",
      items: [
        { name: "React", level: "Advanced" as SkillLevel },
        { name: "HTML5 / CSS3", level: "Advanced" as SkillLevel },
        { name: "Responsive Design", level: "Advanced" as SkillLevel },
      ],
    },
    {
      category: "Backend & APIs",
      blurb: "Node.js, Express.js, Spring Boot, REST APIs, GraphQL, Microservices Architecture, System Design, Distributed Systems, Apache Kafka, Event-Driven Systems",
      items: [
        { name: "Node.js / Express.js", level: "Advanced" as SkillLevel },
        { name: "REST APIs / GraphQL", level: "Advanced" as SkillLevel },
        { name: "Spring Boot", level: "Intermediate" as SkillLevel },
        { name: "Microservices Architecture", level: "Intermediate" as SkillLevel },
      ],
    },
    {
      category: "AI / ML & Data",
      blurb: "GenAI, LLM Integration, Prompt Engineering, Retrieval-Augmented Generation (RAG), Agentic AI, LangChain, ChromaDB, Rasa, Machine Learning, NLP, Deep Learning, Reinforcement Learning, Feature Engineering, MLOps, Model Deployment, Predictive Modeling, EDA, Statistical Analysis, Data Analytics, Data Visualization",
      items: [
        { name: "LLM Integration / RAG / LangChain", level: "Advanced" as SkillLevel },
        { name: "Agentic AI / Prompt Engineering", level: "Advanced" as SkillLevel },
        { name: "Machine Learning / NLP", level: "Advanced" as SkillLevel },
        { name: "Data Analytics / EDA", level: "Intermediate" as SkillLevel },
        { name: "Apache Kafka", level: "Intermediate" as SkillLevel },
      ],
    },
    {
      category: "XR & Game Development",
      blurb: "Unity3D, Unity XR Toolkit, Unreal Engine, C#",
      items: [
        { name: "Unity3D / XR Toolkit", level: "Advanced" as SkillLevel },
        { name: "Unreal Engine", level: "Intermediate" as SkillLevel },
      ],
    },
    {
      category: "DevOps & Infrastructure",
      blurb: "Docker, Containerization, CI/CD, AWS (S3), Infrastructure as Code, Git, Maven, Linux, Monitoring & Observability",
      items: [
        { name: "Git", level: "Advanced" as SkillLevel },
        { name: "Docker", level: "Advanced" as SkillLevel },
        { name: "CI/CD", level: "Intermediate" as SkillLevel },
        { name: "AWS, S3", level: "Intermediate" as SkillLevel },
      ],
    },
  ],
  projects: [
    {
      name: "Local RAG AI Agent",
      description:
        "Fully offline retrieval-augmented generation (RAG) agent built with Ollama, Llama 3.2, LangChain, and ChromaDB, using mxbai-embed-large embeddings for zero-cloud-dependency document analysis. Includes a Pandas-based ETL pipeline and persistent vector storage, fully containerized with Docker for production-ready GenAI deployment.",
      repo: "https://github.com/archit-biswas",
      demo: null,
      language: "Python",
      tags: ["GenAI", "RAG", "LangChain"],
    },
    {
      name: "Full-Stack Ride Sharing Application",
      description:
        "Full-stack ride-sharing platform with a React frontend and Node.js/Express backend, using a Neon serverless PostgreSQL database and GraphQL integration. Containerized with Docker and deployed via CI/CD for zero-downtime, reproducible production builds.",
      repo: "https://github.com/archit-biswas",
      demo: null,
      language: "JavaScript",
      tags: ["Full-Stack", "PostgreSQL", "GraphQL"],
    },
    {
      name: "VR Art Gallery Application",
      description:
        "Interactive VR environment built in Unity3D with the Unity XR Toolkit as part of coursework at Trinity College Dublin, developed through Agile/SCRUM sprints with structured peer code review.",
      repo: "https://github.com/archit-biswas",
      demo: null,
      language: "C#",
      tags: ["XR", "Unity3D"],
    },
    {
      name: "Retail Price Optimization Engine",
      description:
        "Retail pricing model combining XGBoost regression with Prophet demand forecasting to recommend revenue-maximizing price points, achieving an R² of 0.92 on price elasticity modeling across product categories.",
      repo: "https://github.com/archit-biswas",
      demo: null,
      language: "Python",
      tags: ["Machine Learning", "Forecasting"],
    },
    {
      name: "NLP-Based Conversational Chatbot",
      description:
        "Conversational AI chatbot built with Rasa for NLU and dialogue management, combined with spaCy and NLTK for natural language preprocessing. Achieved 85%+ intent classification accuracy, with findings published in a research paper.",
      repo: "https://github.com/archit-biswas",
      demo: null,
      language: "Python",
      tags: ["NLP", "Chatbot"],
    },
    {
      name: "Adaptive AI for Dynamic Narrative Games, Dissertation",
      description:
        "Research project evaluating five adaptive AI architectures, heuristic rule-based, fuzzy logic, tabular Q-learning, Bayesian inference, and deep reinforcement learning (PPO), for dynamic narrative adaptation in video games, supervised by Prof. Michael Manzke at Trinity College Dublin.",
      repo: "https://github.com/archit-biswas",
      demo: null,
      language: "Python",
      tags: ["Reinforcement Learning", "Research"],
    },
  ] as Project[],
  certifications: [
    {
      name: "Career Essentials in Software Development",
      issuer: "Microsoft & LinkedIn",
      date: "2025",
      credentialUrl: "https://linkedin.com/in/archit-biswas",
    },
    {
      name: "Docker Foundations Professional Certificate",
      issuer: "LinkedIn Learning",
      date: "2025",
      credentialUrl: "https://linkedin.com/in/archit-biswas",
    },
    {
      name: "AI and Machine Learning Specialisation",
      issuer: "College of Engineering Pune",
      date: "2024",
      credentialUrl: "https://linkedin.com/in/archit-biswas",
    },
  ] as Certification[],
  resume: {
    blurb:
      "Download the full resume (PDF) for a complete breakdown of my experience across full-stack development, GenAI/LLM engineering, and applied machine learning.",
    url: "/resume.pdf",
    updatedAt: "2026",
    fileSize: "PDF · 149 KB",
  },
  githubProfile: "https://github.com/archit-biswas",
};

export const sections = [
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];
