export interface PersonalInfo {
  name: string;
  title: string;
  photo?: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  website: string;
  facebook?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
  bullets: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  role: string;
  technologies: string[];
  link?: string;
  github?: string;
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
}

export interface LanguageItem {
  id: string;
  name: string;
  level: string;
}

export interface PublicationItem {
  id: string;
  title: string;
  authors: string;
  publisher: string;
  date: string;
  link?: string;
  description?: string;
}

export interface AwardItem {
  id: string;
  title: string;
  date: string;
  issuer?: string;
  details?: string;
}

export interface CVContent {
  personalInfo: PersonalInfo;
  summary: string;
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
    photo: "/avatar.png",
    email: "bao.quach24hcmut@hcmut.edu.vn",
    phone: "+84 912 732 526",
    location: "Ho Chi Minh City, Vietnam",
    github: "https://github.com/culey24",
    linkedin: "https://www.linkedin.com/in/qu%C3%A1ch-gia-b%E1%BA%A3o-243607340/",
    website: "https://culey24.github.io",
    facebook: "https://www.facebook.com/zabao.quach/"
  },
  summary: "Computer Science & Engineering sophomore at HCMUT focused on Software Engineering and Artificial Intelligence. Possesses a strong academic and practical interest spanning ML/DL foundations, NLP, and Generative AI systems. Driven to bridge the gap between core machine learning concepts and high-performance software applications.",
  experience: [
    {
      id: "school",
      company: "Ho Chi Minh University of Technology",
      role: "Computer Science",
      duration: "2024 - present",
      description: "My learning journey continues here.",
      bullets: [
      ]
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "BKHome Chatbot",
      description: "An interactive chatbot serves as a comprehensive resource for HCMUT, especially for CSE students, providing quick access to essential information, campus guidance, and AI-powered academic support tools.",
      role: "Creator, Lead Developer",
      technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Python"],
      link: "https://bkhome-chatbot.vercel.app/login",
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
      items: ["React", "Next.js", "Node.js / Express", "Tailwind CSS"]
    },
    {
      id: "skill-tools",
      name: "Tools",
      items: ["Git & GitHub Actions", "Docker", "PostgreSQL", "Linux"]
    }
  ],
  education: [
    {
      id: "edu-1",
      school: "Ho Chi Minh City University of Technology",
      degree: "Bachelor of Science in Computer Science and Engineering",
      duration: "2024 - present",
      details: "GPA: 3.9"
    }
  ],
  languages: [
    { id: "lang-vi", name: "Vietnamese", level: "Native / Bilingual" },
    { id: "lang-en", name: "English", level: "IELTS 6.5" }
  ],
  publications: [
    {
      id: "pub-1",
      title: "Towards Cost-Effective Voice Cloning System for Vietnamese TTS: A Case Study at HCMUT",
      authors: "Vinh Q. Vo, Bao G. Quach, Quyen T. Bui, Khai Q. Truong, Long S. T. Nguyen, Fabien Baldacci, Tho T. Quan",
      publisher: "Springer, Singapore",
      date: "Nov 22, 2025",
      link: "https://doi.org/10.1007/978-981-95-4963-4_18",
      description: "Proposed a voice cloning method for data-scarce scenarios, requiring only 10–30 minutes of speech and optimized for low-complexity environments like Google Colab. By leveraging So-VITS-SVC, a robust voice conversion model, and the acoustic precision of Parselmouth, the system achieves high-quality, low-latency voice synthesis suitable for both research and practical applications."
    }
  ],
  awards: [
    {
      id: "award-2",
      title: "First Prize | The 9th OISP Science and Technology Symposium (OSTS 2025)",
      date: "July 2025",
      issuer: "Ho Chi Minh City University of Technology (HCMUT)",
      details: "Awarded for the good performance of the paper: 'Towards Cost-Effective Voice Cloning System for Vietnamese TTS: A Case Study at HCMUT'"
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
