export interface PersonalInfo {
  name: string;
  title: string;
  photo?: string;
  email: string;
  emailAlt?: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  website: string;
  facebook?: string;
  zalo?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
  bullets: string[];
  logo?: string;
  logoDark?: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content?: string;
  role: string;
  technologies: string[];
  link?: string;
  github?: string;
  bullets?: string[];
  cover?: string;
  year?: string;
  status?: string;
  statusTone?: 'success' | 'warning' | 'info' | 'neutral';
}

export interface SkillCategory {
  id: string;
  name: string;
  items: string[]; // Simple array of strings for skills (no levels)
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  duration: string;
  details?: string;
  gpa?: string;
  logo?: string;
  logoDark?: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  level: string;
}

export interface PublicationItem {
  id: string;
  slug: string;
  title: string;
  authors: string;
  publisher: string;
  date: string;
  link?: string;
  description?: string;
  certificate?: string;
}

export interface AwardItem {
  id: string;
  title: string;
  date: string;
  issuer?: string;
  details?: string;
  proof?: string;
  certificate?: string;
}

export interface CVContent {
  personalInfo: PersonalInfo;
  summary: string;
  researchInterests: string[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skills: SkillCategory[];
  education: EducationItem[];
  languages: LanguageItem[];
  publications?: PublicationItem[];
  awards?: AwardItem[];
}

export const defaultCVData: CVContent = {
  personalInfo: {
    name: "Quach Gia Bao",
    title: "CS Student",
    photo: "/myself.jpg",
    email: "contact@quachgiabao.com",
    emailAlt: "bao.quach24hcmut@hcmut.edu.vn",
    phone: "+84 912 732 526",
    location: "Ho Chi Minh City, Vietnam",
    github: "https://github.com/culey24",
    linkedin: "https://www.linkedin.com/in/gia-b%E1%BA%A3o-qu%C3%A1ch-243607340",
    website: "https://quachgiabao.com",
    facebook: "https://www.facebook.com/zabao.quach/",
    zalo: "https://zalo.me/84912732526"
  },
  summary: "A Computer Science & Engineering sophomore at HCMUT with a deep passion for Software Engineering and Artificial Intelligence. My expertise spans ML/DL foundations, NLP, and Generative AI systems. I am highly motivated to bridge the gap between core machine learning research and high-performance software applications to solve complex, real-world problems.",
  researchInterests: [
    "Machine Learning",
    "Deep Learning",
    "Natural Language Processing",
    "Generative AI"
  ],
  experience: [
    {
      id: "school",
      company: "Unlimited AI Research Lab (URA) — HCMUT",
      role: "Student Researcher",
      duration: "2024 - present",
      description: "Research member working on NLP and generative AI, focusing on cost-effective voice cloning and retrieval systems.",
      bullets: [],
      logo: "/01_logobachkhoasang.png",
      logoDark: "/01_logobachkhoatoi.png"
    }
  ],
  projects: [
    {
      id: "proj-1",
      slug: "bkhome-chatbot",
      title: "BKHome Chatbot",
      cover: "/projects/bkhome-chatbot.png",
      year: "2024 - present",
      status: "In development",
      statusTone: "warning",
      summary: "An agentic campus assistant for HCMUT, answering questions across academic regulations, internships and CSE documents.",
      content: [
        "BKHome Chatbot is an **agentic campus assistant** for HCMUT students and staff. It answers questions across several campus domains — academic regulations, internships and CSE programme documents — and is built as a microservices web platform.",
        "",
        "## Architecture",
        "",
        "- **Microservices:** a Fastify API gateway (auth, single entry point), a FastAPI RAG service and a React frontend.",
        "- **Storage:** PostgreSQL + pgvector for hybrid document search; Neo4j for the document heading tree and glossary graph.",
        "- **Agent layer:** a discovery agent (planner, analyzer, clustering) with tool calling, including web search.",
        "",
        "## Retrieval",
        "",
        "- **Two-stage retrieval:** FAQ semantic matching short-circuits the LLM above a 0.90 similarity threshold; otherwise a hierarchical parent–child document RAG runs.",
        "- **Precision:** cross-encoder reranking (Cohere rerank-v3.5) plus metadata filters on domain, major and document type.",
        "- **Latency:** semantic caching for repeated questions and LLM query rewriting that expands Vietnamese abbreviations (HP, ĐKMH, HK232…).",
        "",
        "## Status",
        "",
        "In active development — expanding domain coverage and agent tools.",
      ].join("\n"),
      bullets: [
        "Architected and deployed a full-stack microservices platform — Fastify gateway, FastAPI RAG service, React frontend — with an agentic chatbot at its core.",
        "Built a two-stage retrieval engine: FAQ semantic matching that skips the LLM above 0.90 similarity, plus hierarchical parent-child RAG with cross-encoder reranking.",
        "Cut retrieval latency and raised context precision across campus domains via semantic caching, metadata filters and Vietnamese query rewriting.",
      ],
      role: "Lead Developer",
      technologies: ["Python", "FastAPI", "Node.js / Fastify", "React", "PostgreSQL + pgvector", "Neo4j", "Docker"],
      link: "https://cse.hcmut.edu.vn/en/chatbot",
      github: "https://github.com/culey24/bkhome-chatbot"
    }
  ],
  skills: [
    {
      id: "skill-lang",
      name: "Programming Languages",
      items: ["TypeScript", "Python", "Java", "C++", "SQL"]
    },
    {
      id: "skill-frame",
      name: "Frameworks & Libraries",
      items: ["Pydantic", "LangChain", "React", "Next.js", "Node.js / Express", "Tailwind CSS"]
    },
    {
      id: "skill-mldl",
      name: "ML/DL",
      items: ["PyTorch", "TensorFlow", "Scikit-Learn", "NLP", "Generative AI"]
    },
    {
      id: "skill-tools",
      name: "Tools",
      items: ["Git & GitHub Actions", "Docker", "PostgreSQL", "Linux", "LaTeX", "UML"]
    }
  ],
  education: [
    {
      id: "edu-1",
      school: "Ho Chi Minh City University of Technology",
      degree: "Bachelor of Science in Computer Science and Engineering",
      duration: "2024 - present",
      details: "Expected graduation: 2028",
      gpa: "3.9 / 4.0",
      logo: "/01_logobachkhoasang.png",
      logoDark: "/01_logobachkhoatoi.png"
    }
  ],
  languages: [
    { id: "lang-vi", name: "Vietnamese", level: "Native / Bilingual" },
    { id: "lang-en", name: "English", level: "IELTS 6.5" }
  ],
  publications: [
    {
      id: "pub-1",
      slug: "cost-effective-voice-cloning-vietnamese-tts",
      title: "Towards Cost-Effective Voice Cloning System for Vietnamese TTS: A Case Study at HCMUT",
      authors: "Vinh Q. Vo, Bao G. Quach, Quyen T. Bui, Khai Q. Truong, Long S. T. Nguyen, Fabien Baldacci, Tho T. Quan",
      publisher: "Springer, Singapore",
      date: "Nov 22, 2025",
      link: "https://doi.org/10.1007/978-981-95-4963-4_18",
      certificate: "/certificates/miwai-2025.pdf",
      description: "Proposed a voice cloning method for data-scarce scenarios, requiring only 10–30 minutes of speech and optimized for low-complexity environments like Google Colab. By leveraging So-VITS-SVC, a robust voice conversion model, and the acoustic precision of Parselmouth, the system achieves high-quality, low-latency voice synthesis suitable for both research and practical applications."
    }
  ],
  awards: [
    {
      id: "award-2",
      title: "First Prize | The 9th OISP Science and Technology Symposium (OSTS 2025)",
      date: "July 2025",
      issuer: "Ho Chi Minh City University of Technology (HCMUT)",
      details: "Awarded for the good performance of the paper: 'Towards Cost-Effective Voice Cloning System for Vietnamese TTS: A Case Study at HCMUT'",
      proof: "https://doi.org/10.1007/978-981-95-4963-4_18",
      certificate: "/certificates/osts-2025-first-prize.pdf"
    },
    {
      id: "award-1",
      title: "Academic Incentive Scholarship",
      date: "Semester 241, 242",
      issuer: "Ho Chi Minh City University of Technology (HCMUT)",
      details: "Awarded for good academic performance"
    }
  ]
};
