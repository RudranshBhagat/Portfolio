import type { IconType } from "react-icons";
import {
  SiReact,
  SiNodedotjs,
  SiNextdotjs,
  SiThreedotjs,
  SiTypescript,
  SiJavascript,
  SiMongodb,
  SiAngular,
  SiGithub,
} from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

/* ==========================================
   TYPES
========================================== */

export interface HeroSkill {
  name: string;
  color: string;
  x: string;
  y: string;
  size: number;
  rotate: number;
  Icon: IconType;
}

export interface HeroBackgroundLabel {
  text: string;
  className: string;
}

export interface HeroSocialLink {
  name: string;
  href: string;
  ariaLabel: string;
  Icon: IconType;
}

export interface HeroContent {
  firstName: string;
  lastName: string;
  roles: [string, string];
  resumeUrl: string;
  hireMeUrl: string;
  hireMeTooltip: string;
  connectLabel: string;
  metaName: string;
  metaLocation: string;
  scrollLabel: string;
}

/* ==========================================
   FLOATING TECHNOLOGY ICONS
========================================== */

export const heroSkills: HeroSkill[] = [
  {
    name: "React",
    color: "#61DAFB",
    x: "16%",
    y: "25%",
    size: 46,
    rotate: -8,
    Icon: SiReact,
  },
  {
    name: "Next.js",
    color: "#F1EBDD",
    x: "84%",
    y: "24%",
    size: 42,
    rotate: 6,
    Icon: SiNextdotjs,
  },
  {
    name: "Node.js",
    color: "#68A063",
    x: "9%",
    y: "53%",
    size: 46,
    rotate: 7,
    Icon: SiNodedotjs,
  },
  {
    name: "Three.js",
    color: "#F1EBDD",
    x: "91%",
    y: "52%",
    size: 42,
    rotate: -7,
    Icon: SiThreedotjs,
  },
  {
    name: "TypeScript",
    color: "#3178C6",
    x: "18%",
    y: "78%",
    size: 43,
    rotate: 5,
    Icon: SiTypescript,
  },
  {
    name: "JavaScript",
    color: "#F0DB4F",
    x: "82%",
    y: "78%",
    size: 43,
    rotate: -5,
    Icon: SiJavascript,
  },
  {
    name: "MongoDB",
    color: "#47A248",
    x: "35%",
    y: "16%",
    size: 38,
    rotate: -4,
    Icon: SiMongodb,
  },
  {
    name: "Angular",
    color: "#DD0031",
    x: "65%",
    y: "17%",
    size: 41,
    rotate: 5,
    Icon: SiAngular,
  },
];

/* ==========================================
   SUBTLE BACKGROUND LABELS
========================================== */

export const heroBackgroundLabels: HeroBackgroundLabel[] = [
  {
    text: "DIGITAL EXPERIENCES",
    className: "left-[20%] top-[15%]",
  },
  {
    text: "CREATIVE TECHNOLOGY",
    className: "left-[44%] top-[10%]",
  },
  {
    text: "DIGITAL CRAFT",
    className: "right-[17%] top-[23%]",
  },
  {
    text: "CODE / DESIGN / MOTION",
    className: "bottom-[22%] left-[18%]",
  },
];

/* ==========================================
   SOCIAL LINKS
========================================== */

export const heroSocialLinks: HeroSocialLink[] = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/rudransh-bhagat",
    ariaLabel: "LinkedIn",
    Icon: FaLinkedin,
  },
  {
    name: "GitHub",
    href: "https://github.com/RudranshBhagat",
    ariaLabel: "GitHub",
    Icon: SiGithub,
  },
];

/* ==========================================
   HERO CONTENT
========================================== */

export const heroContent: HeroContent = {
  firstName: "RUDRANSH",
  lastName: "BHAGAT",
  roles: ["Full Stack Developer", "Frontend Developer"],
  resumeUrl: "/resume.pdf",
  hireMeUrl: "/contact",
  hireMeTooltip: "pls 🥹 🙏",
  connectLabel: "Connect With Me",
  metaName: "Rudransh Bhagat, 2026",
  metaLocation: "Based in India",
  scrollLabel: "Scroll",
};
