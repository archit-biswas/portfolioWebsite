export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Native" | "Spoken" | "Fluent" | "Basic";

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
  description: string;
  image?: string;
}

export const portfolio = {
  about: {
    name: "Archit Biswas",
    title: "Software Engineer - Full-Stack Developer & AI/ML Engineer",
    location: "Mumbai, India",
    email: "hello@architbiswas.online",
    phone: "+91-91520-19510",
    pitch:
      "Full-Stack Software Engineer & Generative AI (GenAI) / Large Language Model (LLM) Developer based in Mumbai, India",
    pitchDetail:
      "I build full-stack web applications, RESTful APIs, Retrieval-Augmented Generation (RAG) pipelines, and applied machine learning systems using React, Node.js, Python, Spring Boot, and Docker. Open to Software Engineer, Full-Stack Developer, and AI/ML (Artificial Intelligence / Machine Learning) Engineer roles, remote or on-site.",
    bio: "Software Engineer with a Master of Science (M.Sc.) in Computer Science (Augmented and Virtual Reality) from Trinity College Dublin and a Bachelor of Engineering (B.E.) in Electronics and Telecommunications from Rajiv Gandhi Institute of Technology (RGIT), Mumbai. I work across the full stack, from React and Node.js on the frontend to Spring Boot, REST APIs, and GraphQL on the backend, and I build GenAI and LLM based systems including RAG agents using LangChain and ChromaDB.",
    bioSecondary:
      "My applied machine learning work spans XGBoost demand forecasting, natural language processing (NLP) pipelines built on Rasa and spaCy, and reinforcement learning research using Proximal Policy Optimization (PPO) and Bayesian inference. I have a strong foundation in data structures, system design, and Agile delivery, with a track record of cross-team collaboration and technical documentation. I containerize and ship everything with Docker and CI/CD (continuous integration and continuous delivery), and I care about clean, documented, production-ready systems over one-off scripts.",
    statement:
      "I like taking a system from a rough idea to something that actually runs in production, whether that's a RAG agent answering questions over a private dataset, a price optimization model, or a full-stack web application with real users.",
    portrait: "",
    values: [
      {
        label: "Full-Stack Ownership",
        text: "End-to-end full-stack development across React, Node.js, Express.js, Spring Boot, and PostgreSQL, from spec to deployed product.",
      },
      {
        label: "Applied AI & Machine Learning",
        text: "Hands-on experience building GenAI pipelines, RAG agents, NLP models, and predictive machine learning systems using LangChain, XGBoost, and Rasa.",
      },
      {
        label: "Clean Systems Thinking",
        text: "Docker-based, documentation-first software delivery designed for maintainability, not just demos.",
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
        "Maintained first-contact resolution rates above Service Level Agreement (SLA) targets by triaging and resolving multi-system technical issues across account security, identity verification, and transactional workflows using structured root-cause analysis and enterprise diagnostic tooling.",
        "Identified and escalated transactional anomalies and account behavior irregularities to support fraud reduction efforts, applying analytical reasoning within data governance, regulatory compliance, and operational risk frameworks.",
        "Achieved zero documentation gaps across compliance reviews by authoring and maintaining structured Standard Operating Procedures (SOPs), issue resolution logs, and escalation records aligned with Agile delivery and quality assurance standards.",
        "Reduced cross-tier escalation cycle times by coordinating across technical support tiers and operations teams through structured problem decomposition, documented handoff protocols, and clear stakeholder communication.",
      ],
    },
    {
      type: "education",
      role: "Master of Science (M.Sc.) in Computer Science, Augmented and Virtual Reality (AR/VR)",
      org: "Trinity College Dublin, Ireland",
      location: "Dublin, Ireland",
      start: "2024",
      end: "Dec 2025",
      achievements: [
        "Dissertation: Adaptive AI for Dynamic Narrative Games, supervised by Prof. Michael Manzke.",
        "Designed and evaluated five adaptive artificial intelligence (AI) architectures for games, including deep reinforcement learning with Proximal Policy Optimization (PPO) and Bayesian inference.",
      ],
    },
    {
      type: "education",
      role: "Bachelor of Engineering (B.E.) in Electronics and Telecommunications, Honors in Artificial Intelligence and Machine Learning (AI/ML)",
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
        "Improved web application performance by 25% across page load benchmarks by developing reusable, modular UI components in React, JavaScript, HTML5, and CSS3 following component-based front-end architecture principles.",
        "Reduced front-end data rendering latency by 30% by integrating REST APIs and GraphQL endpoints for asynchronous, optimized client-side content delivery.",
        "Reduced post-deployment defects through Agile sprint cycles, structured peer code reviews, and debugging workflows in line with Software Development Life Cycle (SDLC) best practices and accessibility compliance standards.",
      ],
    },
    {
      type: "work",
      role: "Software Engineering Virtual Job Simulation",
      org: "JPMorganChase, Forage",
      location: "Remote",
      start: "Mar 2026",
      end: "Mar 2026",
      achievements: [
        "Integrated Apache Kafka with Spring Boot microservices to build an event-driven architecture.",
        "Implemented data persistence with Java Persistence API (JPA) and consumed REST APIs via RestTemplate.",
        "Validated transaction workflows using Maven test suites.",
      ],
    },
    {
      type: "work",
      role: "Data Analytics Virtual Job Simulation",
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
    "Technical skills across full-stack web development, Generative AI (GenAI) and Large Language Model (LLM) systems, and applied machine learning, listed by category below.",
  skills: [
    {
      category: "Programming Languages",
      blurb: "Python, JavaScript, TypeScript, Java, C++, C#, SQL (Structured Query Language)",
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
      category: "Frontend Development",
      blurb: "React, HTML5, CSS3, Responsive Design, Component-Based Architecture, UI/UX (User Interface / User Experience) Development",
      items: [
        { name: "React", level: "Advanced" as SkillLevel },
        { name: "HTML5 / CSS3", level: "Advanced" as SkillLevel },
        { name: "Responsive Design", level: "Advanced" as SkillLevel },
      ],
    },
    {
      category: "Backend Development & APIs",
      blurb: "Node.js, Express.js, Spring Boot, REST APIs, GraphQL, API Integration, JSON, Microservices Architecture, System Design, Distributed Systems, Apache Kafka, Event-Driven Systems",
      items: [
        { name: "Node.js / Express.js", level: "Advanced" as SkillLevel },
        { name: "REST APIs / GraphQL", level: "Advanced" as SkillLevel },
        { name: "Spring Boot", level: "Intermediate" as SkillLevel },
        { name: "Microservices Architecture", level: "Intermediate" as SkillLevel },
      ],
    },
    {
      category: "AI / ML & Data",
      blurb: "Generative AI (GenAI), Large Language Model (LLM) Integration, Prompt Engineering, Retrieval-Augmented Generation (RAG), Agentic AI, LangChain, ChromaDB, Rasa, Machine Learning, Natural Language Processing (NLP), Deep Learning, Reinforcement Learning, Feature Engineering, Machine Learning Operations (MLOps), Model Deployment, Predictive Modeling, Exploratory Data Analysis (EDA), Statistical Analysis, Data Analytics, Data Visualization",
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
      blurb: "Extended Reality (XR), Unity3D, Unity XR Toolkit, Unreal Engine, C#",
      items: [
        { name: "Unity3D / XR Toolkit", level: "Advanced" as SkillLevel },
        { name: "Unreal Engine", level: "Intermediate" as SkillLevel },
      ],
    },
    {
      category: "DevOps & Infrastructure",
      blurb: "Docker, Containerization, CI/CD (Continuous Integration and Continuous Delivery), Amazon Web Services (AWS) S3, Infrastructure as Code, Git, Maven, Linux, Monitoring & Observability",
      items: [
        { name: "Git", level: "Advanced" as SkillLevel },
        { name: "Docker", level: "Advanced" as SkillLevel },
        { name: "CI/CD", level: "Intermediate" as SkillLevel },
        { name: "AWS (Amazon Web Services), S3", level: "Intermediate" as SkillLevel },
      ],
    },
    {
      category: "Spoken Languages",
      blurb: "English, Hindi, Bengali, Marathi, Japanese",
      items: [
        { name: "English", level: "Fluent" as SkillLevel },
        { name: "Hindi", level: "Native" as SkillLevel },
        { name: "Marathi", level: "Basic" as SkillLevel },
        { name: "Bengali", level: "Native" as SkillLevel },
        { name: "Japanese", level: "Basic" as SkillLevel },
      ],
    },
  ],
  projects: [
    {
      name: "Local RAG AI Agent",
      description:
        "Fully offline Retrieval-Augmented Generation (RAG) AI agent built with Ollama (Llama 3.2 large language model), LangChain, and ChromaDB, using mxbai-embed-large embeddings and persistent vector storage for zero-cost, zero-cloud-dependency document analysis on private datasets. Applies prompt engineering to ground LLM responses in retrieved context, and uses a Pandas-based ETL (Extract, Transform, Load) and CSV ingestion pipeline with ChromaDB vector store reuse to avoid re-indexing across sessions. Containerized with Docker as a cloud-deployable, production-ready Generative AI (GenAI) template.",
      repo: "https://github.com/archit-biswas",
      demo: null,
      language: "Python",
      tags: ["GenAI", "RAG", "LangChain"],
    },
    {
      name: "Full-Stack Ride Sharing Application",
      description:
        "Full-stack ride-sharing web application with a React frontend and Node.js/Express.js backend, using a Neon serverless PostgreSQL database for data persistence and asynchronous REST API and GraphQL integration for dynamic data delivery. Containerized with Docker and deployed via CI/CD (continuous integration and continuous delivery) pipelines for zero-downtime, reproducible production builds, with responsive design for cross-device compatibility and maintained technical documentation.",
      repo: "https://github.com/archit-biswas",
      demo: null,
      language: "JavaScript",
      tags: ["Full-Stack", "PostgreSQL", "GraphQL"],
    },
    {
      name: "VR Art Gallery Application",
      description:
        "Interactive virtual reality (VR) art gallery environment built in Unity3D with the Unity XR (Extended Reality) Toolkit and JavaScript-driven UI components, developed as coursework at Trinity College Dublin through Agile/SCRUM sprints with structured peer code review and debugging workflows. Included hands-on exposure to Amazon Web Services (AWS) S3 for cloud-based asset storage.",
      repo: "https://github.com/archit-biswas",
      demo: null,
      language: "C#",
      tags: ["XR", "Unity3D"],
    },
    {
      name: "Retail Price Optimization Engine",
      description:
        "Retail price optimization model built in Python, combining XGBoost regression with Prophet demand forecasting to recommend revenue-maximizing price points. Modeled price elasticity of demand across product categories, achieving an R² of 0.92 in predicting demand response to pricing changes.",
      repo: "https://github.com/archit-biswas",
      demo: null,
      language: "Python",
      tags: ["Machine Learning", "Forecasting"],
    },
    {
      name: "NLP-Based Conversational Chatbot",
      description:
        "Conversational AI chatbot built with Rasa for natural language understanding (NLU) and dialogue management, combined with rule-based logic and spaCy and NLTK (Natural Language Toolkit) for natural language processing (NLP) preprocessing. Achieved 85%+ accuracy in both intent classification and response accuracy through structured testing, with findings documented in a published research paper.",
      repo: "https://github.com/archit-biswas",
      demo: null,
      language: "Python",
      tags: ["NLP", "Chatbot"],
    },
    {
      name: "Adaptive AI for Dynamic Narrative Games, Dissertation",
      description:
        "Research project that designed and implemented five adaptive AI architectures in Python (heuristic rule-based, fuzzy logic, tabular Q-learning, Bayesian probabilistic inference, and deep reinforcement learning with Proximal Policy Optimization (PPO)) to evaluate dynamic narrative adaptation in video games, supervised by Prof. Michael Manzke at Trinity College Dublin. Found that the Bayesian model gave the most practical balance of interpretability, computational efficiency, and adaptive performance, while reinforcement learning approaches underperformed due to reward misalignment and limited training resources.",
      repo: "https://github.com/archit-biswas",
      demo: null,
      language: "Python",
      tags: ["Reinforcement Learning", "Research"],
    },
  ] as Project[],
  certifications: [
    {
      name: "EA - Product Management Job Simulation",
      issuer: "Forage",
      date: "2026",
      credentialUrl: "https://www.theforage.com/completion-certificates/j43dGscQHtJJ57N54/5genWYpfo5b57G7yv_j43dGscQHtJJ57N54_699b1f7fa41b81eca9afd99e_1777532742246_completion_certificate.pdf",
      description: "A self-paced simulation of a product manager's work at a games publisher. I practised turning data and user needs into prioritised recommendations, which sharpened how I frame product decisions as an engineer.",
      image: "/certs/ea-product-management.png",
    },
    {
      name: "JPMorganChase - Software Engineering Job Simulation",
      issuer: "Forage",
      date: "2026",
      credentialUrl: "https://www.theforage.com/completion-certificates/Sj7temL583QAYpHXD/E6McHJDKsQYh79moz_Sj7temL583QAYpHXD_699b1f7fa41b81eca9afd99e_1773001843040_completion_certificate.pdf",
      description: "A simulated engineering task set in a financial services team, covering a Java service, message streaming and a REST API. It gave me a realistic feel for working on a backend codebase against a spec.",
      image: "/certs/jpmorgan-software-engineering.png",
    },
    {
      name: "Tata - GenAI Powered Data Analytics Job Simulation",
      issuer: "Forage",
      date: "2026",
      credentialUrl: "https://www.theforage.com/completion-certificates/ifobHAoMjQs9s6bKS/gMTdCXwDdLYoXZ3wG_ifobHAoMjQs9s6bKS_699b1f7fa41b81eca9afd99e_1774526917261_completion_certificate.pdf",
      description: "A simulation on using generative AI to analyse business data and present findings to stakeholders. It built my habit of pairing AI tooling with clear, decision-ready reporting.",
      image: "/certs/tata-genai-analytics.png",
    },
    {
      name: "Docker Foundations Professional Certificate",
      issuer: "Docker",
      date: "2026",
      credentialUrl: "https://www.linkedin.com/learning/certificates/62923b1ab6595a0a7b3a225d193d353974ac1a638a865759e624cff5346b853a?trk=flagship-lil_details_mobile_certification",
      description: "Covered images, containers, Dockerfiles and Compose. It gave me the working knowledge to package and run applications consistently, which is the base for the DevOps roles I'm targeting.",
      image: "/certs/docker-foundations.png",
    },
    {
      name: "Career Essentials in Software Development by Microsoft and LinkedIn",
      issuer: "Microsoft",
      date: "2025",
      credentialUrl: "https://www.linkedin.com/learning/certificates/7b37800c9f89780a04c6775536726ef2f0d23ef0f5fff906cad121a98454d679?trk=flagship-lil_details_mobile_certification",
      description: "A structured overview of the software development lifecycle, including version control, testing and team workflows. It filled in the process side of engineering that sits around the code itself.",
      image: "/certs/microsoft-career-essentials.png",
    },
    {
      name: "Introduction to Career Skills in Software Development",
      issuer: "LinkedIn",
      date: "2025",
      credentialUrl: "https://www.linkedin.com/learning/certificates/512f610c85aa2fec0504d66b4c7ffbec759797baa677a6e272b4534b91685532?trk=flagship-lil_details_mobile_certification",
      description: "Introduced how developers work day to day, from collaboration and communication to the different engineering roles. Useful grounding for moving from a non-engineering job into a software team.",
      image: "/certs/linkedin-career-skills.png",
    },
    {
      name: "Programming Foundations: Beyond the Fundamentals",
      issuer: "LinkedIn",
      date: "2025",
      credentialUrl: "https://www.linkedin.com/learning/certificates/8c8515ffb862fbe32354264719db020b00a0f4ba49cfcb85e5e390e49d2d203a?trk=flagship-lil_details_mobile_certification",
      description: "Focused on debugging, testing, error handling and code quality. It pushed me to write code that others can read and maintain, not just code that runs.",
      image: "/certs/programming-beyond-fundamentals.png",
    },
    {
      name: "Programming Foundations: Fundamentals",
      issuer: "LinkedIn",
      date: "2025",
      credentialUrl: "https://www.linkedin.com/learning/certificates/e79fd8ff1ed10f3036d02ed4d7092f77b8218c7912e0fcbad7841956090c7645?trk=flagship-lil_details_mobile_certification",
      description: "Core concepts such as variables, control flow, functions and data structures. A language-agnostic refresher that keeps my fundamentals solid across stacks.",
      image: "/certs/programming-fundamentals.png",
    },
    {
      name: "International English Language Testing System",
      issuer: "IELTS Official",
      date: "2024",
      credentialUrl: "https://linkedin.com/in/archit-biswas",
      description: "Formal proof of English proficiency across reading, writing, listening and speaking. It supports study and work in international teams, including my MSc at Trinity College Dublin.",
      image: "/certs/ielts.png",
    },
    {
      name: "Complete Web & Mobile Designer in 2022: UI/UX, Figma, +more",
      issuer: "Udemy",
      date: "2022",
      credentialUrl: "https://www.udemy.com/certificate/UC-3ac3b5f4-5ae5-4f3a-b7e7-b8d09eb6fdb8/",
      description: "Taught UI/UX principles, wireframing and prototyping in Figma. It helps me collaborate with designers and build interfaces with usability in mind.",
      image: "/certs/udemy-uiux-designer.png",
    },
    {
      name: "Learn Ethical Hacking From Scratch",
      issuer: "Udemy",
      date: "2021",
      credentialUrl: "https://www.udemy.com/certificate/UC-cf3fa48c-943d-465b-9f04-6763385cac55/",
      description: "An introduction to penetration testing, covering network and web application vulnerabilities. It gave me a security mindset that I bring into how I design and deploy software.",
      image: "/certs/udemy-ethical-hacking.png",
    },
    {
      name: "The Complete Web Developer in 2022: Zero to Mastery",
      issuer: "Udemy",
      date: "2021",
      credentialUrl: "https://www.udemy.com/certificate/UC-ae06916c-ed86-4d38-8a8c-1a6b51853643/",
      description: "A full-stack web course spanning HTML, CSS, JavaScript, Node and databases. It was my first end-to-end exposure to building and shipping a web application.",
      image: "/certs/udemy-web-developer.png",
    },
    {
      name: "2022 Complete Python Bootcamp From Zero to Hero in Python",
      issuer: "Udemy",
      date: "2020",
      credentialUrl: "https://www.udemy.com/certificate/UC-77e70641-9133-4298-b100-fcd5371e267c/",
      description: "Python from the basics through object-oriented programming and scripting. It's the foundation for my later AI/ML and automation work.",
      image: "/certs/udemy-python-bootcamp.png",
    },
  ] as Certification[],
  resume: {
    blurb:
      "Download the full resume (PDF) for a complete breakdown of my experience across full-stack web development, Generative AI (GenAI) and Large Language Model (LLM) engineering, and applied machine learning.",
    url: "/resume.pdf",
    updatedAt: "2026",
    fileSize: "PDF · 149 KB",
  },
  githubProfile: "https://github.com/archit-biswas",
};

export const sections = [
  { id: "about", label: "About" },
  { id: "journey", label: "Experience & Education" },
  { id: "skills", label: "Technical Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];