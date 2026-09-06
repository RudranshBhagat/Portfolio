
import type { IconType } from "react-icons";

import {
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiGreensock,
  SiGit,
  SiGithub
} from "react-icons/si";

/* ==========================================
   WHAT I DO / SERVICES
========================================== */

export interface ServiceItemData {
  id: string;
  number: string;
  title: string;
  skills: string[];
  sarcasticQuote: string;
}

export const servicesData: ServiceItemData[] = [
  {
    id: "frontend",
    number: "01",
    title: "FRONTEND DEVELOPMENT",
    skills: ["REACT", "ANGULAR", "TYPESCRIPT", "JAVASCRIPT"],
    sarcasticQuote:
      "Building interfaces that look good, feel smooth, and actually work on every screen.",
  },
  {
    id: "responsive",
    number: "02",
    title: "RESPONSIVE WEB DESIGN",
    skills: ["HTML5", "CSS3", "TAILWIND CSS", "RESPONSIVE UI"],
    sarcasticQuote:
      "Because your website should look right whether it's on a phone, laptop, or something in between.",
  },
  {
    id: "fullstack",
    number: "03",
    title: "FULL-STACK DEVELOPMENT",
    skills: ["NODE.JS", "EXPRESS.JS", "MONGODB", "REST APIS"],
    sarcasticQuote:
      "Connecting the frontend, backend, and database until they finally start behaving like one application.",
  },
  {
    id: "api",
    number: "04",
    title: "API & INTEGRATIONS",
    skills: ["REST APIS", "JWT", "PAYMENT INTEGRATION", "THIRD-PARTY APIS"],
    sarcasticQuote:
      "Making different systems talk to each other without creating a new problem to solve.",
  },
  {
    id: "dashboard",
    number: "05",
    title: "ADMIN DASHBOARDS",
    skills: ["CRUD", "USER MANAGEMENT", "ANALYTICS", "DASHBOARDS"],
    sarcasticQuote:
      "Building dashboards that let clients manage their application without touching the database.",
  },
  {
    id: "deployment",
    number: "06",
    title: "DEPLOYMENT & OPTIMIZATION",
    skills: ["VERCEL", "RENDER", "LAZY LOADING", "PERFORMANCE"],
    sarcasticQuote:
      "Getting the application online and making sure users don't have time to question their Wi-Fi.",
  },
  {
    id: "ai",
    number: "07",
    title: "AI-ASSISTED DEVELOPMENT",
    skills: ["GITHUB COPILOT", "CHATGPT", "CLAUDE", "AI WORKFLOWS"],
    sarcasticQuote:
      "Using AI to move faster while making sure I still understand what actually ships.",
  },
];

/* ==========================================
   TECH STACK / TECHNOLOGY SHOWCASE
========================================== */

export interface TechnologyItem {
  name: string;
  icon: IconType;
  color: string;
}

export const technologiesData: TechnologyItem[] = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#F2F2F2" },
  { name: "Angular", icon: SiAngular, color: "#DD0031" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F0DB4F" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
  { name: "Node.js", icon: SiNodedotjs, color: "#68A063" },
  { name: "Express", icon: SiExpress, color: "#F2F2F2" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "GSAP", icon: SiGreensock, color: "#88CE02" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub", icon: SiGithub, color: "#F0F6FC" },
];

/* ==========================================
   WHAT THEY SAID / TESTIMONIALS
========================================== */

export interface Testimonial {
  id: string;
  quote: string;
  shortQuote?: string;
  backgroundQuote?: string;
  name: string;
  role: string;
  company: string;
  websiteUrl: string;
  avatar: string;
}

export const testimonialsData: Testimonial[] = [];

/* ==========================================
   ABOUT ME / EXPERIENCE / EDUCATION QUOTE BLOCKS 
========================================== */

export interface AboutQuoteBlock {
  id: string;
  label: string;
  foregroundQuote: string;
  backgroundQuote: string;
}

export const aboutQuoteBlocks: AboutQuoteBlock[] = [
  {
    id: "about-me",
    label: "About Me",
    foregroundQuote:
      "\u201CI'M A FULL-STACK DEVELOPER BUILDING RESPONSIVE WEB APPLICATIONS WITH REACT, ANGULAR, NODE.JS, EXPRESS.JS, AND MONGODB.\u201D",
    backgroundQuote:
      "\u201CTURNING IDEAS INTO REAL PRODUCTS, FROM THE FIRST COMPONENT TO THE FINAL DEPLOYMENT.\u201D",
  },
{
  id: "experience",
  label: "My Experience",
  foregroundQuote:
    "\u201C1.5+ YEARS\u201D OF DEVELOPMENT EXPERIENCE — STARTED AS A FRONTEND DEVELOPER AND GREW INTO A FULL-STACK DEVELOPER THROUGH FREELANCE WORK, BUILDING COMPLETE WEB APPLICATIONS FROM UI TO BACKEND.",
  backgroundQuote:
    "\u201CSTARTED WITH ANGULAR AND FRONTEND DEVELOPMENT DURING MY INTERNSHIP, THEN EXPANDED INTO REACT, NODE.JS, EXPRESS.JS, MONGODB, REST APIS, AUTHENTICATION, AND FULL-STACK APPLICATION DEVELOPMENT THROUGH FREELANCING.\u201D",
},
  {
    id: "education",
    label: "My Education",
    foregroundQuote:
      "\u201CI HOLD A B.TECH IN COMPUTER SCIENCE AND ENGINEERING, WITH MY SKILLS BUILT THROUGH A MIX OF FORMAL EDUCATION, REAL PROJECTS, AND CONSTANT PRACTICE.\u201D",
    backgroundQuote:
      "\u201CLEARN THE FUNDAMENTALS, BUILD REAL PROJECTS, BREAK THINGS, FIX THEM, AND KEEP BUILDING.\u201D",
  },
];

/* ==========================================
   MY PHILOSOPHY
========================================== */

export interface PhilosophyContent {
  label: string;
  foregroundQuote: string;
  foregroundAttribution: string;
  backgroundQuote: string;
  backgroundAttribution: string;
}

export const philosophyContent: PhilosophyContent = {
  label: "My Philosophy",
  foregroundQuote:
    "\u201CBUILD THINGS THAT ARE SIMPLE TO USE, SOLID UNDER THE HOOD, AND WORTH MAINTAINING.\u201D",
  foregroundAttribution: "~Rudransh Bhagat",
  backgroundQuote:
    "\u201CIF IT WORKS, SHIP IT. IF IT BREAKS, CHECK THE LOGS. IF THERE ARE NO LOGS, GOOD LUCK.\u201D",
  backgroundAttribution: "~A developer five minutes before production",
};

