// Portfolio data - sourced from API
import apiData from "./apiData.json";

const about = apiData.about.data;
const projectsList = apiData.projects.projects;

// ─── Personal Info ───
export const personalInfo = {
  firstName: "PRANSHU",
  lastName: "CHOURASIA",
  title: "A Creative",
  role1: "Developer",
  role2: "Engineer",
  email: "me@pranshuchourasia.in",
  phone: "+91 83209 48498",
  logo: "Pranshu",
  resumeLink: "#", // update with your resume link
  social: {
    github: "https://github.com/anshc022",
    linkedin: "https://www.linkedin.com/in/pranshuchourasia/",
    twitter: "",
    instagram: "https://www.instagram.com/https.pranshu/",
  },
};

// ─── About ───
export const aboutData = {
  title: "About Me",
  content: about.bio.content,
};

// ─── What I Do ───
export const whatIDoData = [
  {
    title: "DEVELOP",
    description:
      "I build full-stack web applications and AI-powered platforms using modern technologies, from responsive frontends to scalable backend architectures.",
    skills: about.skills.categories
      .filter((c) =>
        ["Web Development", "Backend & Databases"].includes(c.category)
      )
      .flatMap((c) => c.skills)
      .slice(0, 10),
  },
  {
    title: "INNOVATE",
    description:
      "I leverage AI, Machine Learning, and IoT to create intelligent solutions — from smart city systems to computer vision applications and generative AI tools.",
    skills: about.skills.categories
      .filter((c) =>
        ["AI & Machine Learning", "IoT & Embedded", "Cloud & DevOps"].includes(
          c.category
        )
      )
      .flatMap((c) => c.skills)
      .slice(0, 10),
  },
];

// ─── Career ───
export const careerData = [
  {
    role: "Full Stack Developer",
    company: "Freelance",
    year: "2024",
    description:
      "Built production-grade web applications including a dating app and hospital management system using React, Django, Flask, and SQL/NoSQL databases.",
  },
  {
    role: "AI/ML & IoT Developer",
    company: "Academic Projects",
    year: "2023-24",
    description:
      "Developed smart city solutions including a Smart Street Light Management System using LSTM & GenAI, competed in Flipkart GRiD 6.0 Robotics Challenge, and built computer vision applications.",
  },
  {
    role: "Software Engineer",
    company: "Open Source & Personal Projects",
    year: "NOW",
    description:
      "Building AI-powered platforms like ThinkForge (historical debate simulator) and developer tools like GitGen-AI and GitHub Documentation Generator using Next.js, LLMs, and modern web tech.",
  },
];

// ─── Projects / Work ───
export interface Project {
  title: string;
  type: string;
  description: string;
  techStack: string[];
  image: string;
  link?: string;
}

export const projectsData: Project[] = projectsList
  .slice(0, 6)
  .map((p) => ({
    title: p.title.replace(/[🤖🌿🩺🛡️🚦🔬]\s?/g, "").trim(),
    type: p.type,
    description: p.description,
    techStack: p.techStack,
    image:
      p.images && p.images.length > 0 && p.images[0].isBase64
        ? p.images[0].url
        : "/images/placeholder.webp",
    link: undefined,
  }));

// ─── Tech Stack (images for 3D spheres) ───
export const techStackImages = [
  "/images/react2.webp",
  "/images/next2.webp",
  "/images/node2.webp",
  "/images/express.webp",
  "/images/mongo.webp",
  "/images/mysql.webp",
  "/images/typescript.webp",
  "/images/javascript.webp",
];

// ─── All skill categories ───
export const skillCategories = about.skills.categories;
