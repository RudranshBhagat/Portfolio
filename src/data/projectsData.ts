export interface ProjectImage {
  url: string;
  pageName: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  img: string;
  projectImages: ProjectImage[];
  url: string;
  client: string;
  year: string;
  role: string;
  techStack: string[];
  description: string;
  whatIDid: string;
  howIBuiltThis: string;
  keyTakeaway: string;
  tagline: [string, string];
}

export const projectsData: ProjectItem[] = [
  {
    id: "shree-shital",
    title: "Shree Shital",
    img: "/Images/Projects/project-1-shree-shital/1.png",
    projectImages: [
      { url: "/Images/Projects/project-1-shree-shital/1.png", pageName: "Hero & Strategic Positioning" },
      { url: "/Images/Projects/project-1-shree-shital/2.png", pageName: "The Executive Problem Breakdown" },
      { url: "/Images/Projects/project-1-shree-shital/3.png", pageName: "Services & Done-For-You Offerings" },
      { url: "/Images/Projects/project-1-shree-shital/4.png", pageName: "Brand Story & Methodology" },
      { url: "/Images/Projects/project-1-shree-shital/5.png", pageName: "Founder Growth Case Studies" },
      { url: "/Images/Projects/project-1-shree-shital/6.png", pageName: "Client Social Proof & Testimonials" },

    ],
    url: "https://shrisheetal.com/",
    client: "Brandlift Digital Marketing Consultancy",
    year: "2026",
    role: "Full-Stack Development",
    techStack: [
      "React.js",
      "JavaScript",
      "Tailwind CSS",
    ],
    description:
      "A modern real-estate website built for a real-world client to showcase available properties in a clean and user-friendly experience. Users can explore property listings and open individual properties to view detailed information, images, location, gallery, amenities, and contact options.",

    whatIDid:
      "I handled the complete project single-handedly, from frontend development and responsive UI implementation to property listing and detail experiences. I built the website to give users an intuitive way to explore properties, view their details, and get in touch with the client.",

    howIBuiltThis:
      "Built with React.js, JavaScript, and Tailwind CSS, with a responsive frontend designed for a smooth experience across devices. Property content is intentionally hard-coded based on the client's requirements, keeping the website simple and maintenance-free on the client's side. The contact form is connected to Google Sheets so that submitted inquiries are automatically recorded for the client. The website was deployed on Hostinger.",

    keyTakeaway:
      "Building a real-world client website taught me that a good frontend is about more than just visual design. The goal was to create a responsive and easy-to-navigate property experience while keeping the client's workflow simple, from showcasing properties to receiving inquiries without requiring them to manage a separate system.",

    tagline: [
      "A modern real-estate platform built for a real-world client.",
      "Showcasing properties through a clean, responsive, and user-focused experience.",
    ],
  },
  {
    id: "Tiqo",
    title: "Tiqo",
    img: "/Images/Projects/project-3-event-ticket-platform/1.png",
    projectImages: [
      { url: "/Images/Projects/project-3-event-ticket-platform/1.png", pageName: "Event Landing Page",},
      { url: "/Images/Projects/project-3-event-ticket-platform/2.png", pageName: "Landing Page & Hero Positioning" },
      { url: "/Images/Projects/project-3-event-ticket-platform/3.png", pageName: "Event Details & Ticket Registration", },
    ],
    url: "",
   client: "Brandlift Digital Marketing Consultancy",
year: "2026",
role: "Full-Stack Developer",
techStack: [
  "React.js",
  "JavaScript",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Razorpay",
  
],
description:
  "A reusable event registration and ticketing platform engineered to help event organizers turn event discovery into ticket sales. Each client can receive a customized event experience while the core system handles registration, payments, automated ticket generation, email delivery, and QR-based entry verification.",

whatIDid:
  "I designed and engineered the complete event ecosystem single-handedly, including the client-facing event website, reusable backend, separate admin panel, payment workflows, automated ticket generation and email delivery, and QR-based attendee verification. The architecture was built with reusability in mind so the same core platform can be adapted and deployed for different clients and events.",

howIBuiltThis:
  "Built with React.js, JavaScript, Tailwind CSS, Node.js, Express.js, and MongoDB. The platform supports both Razorpay integrations and custom payment verification flows depending on the client's requirements. Once a registration and payment are verified, the system automatically generates and emails a digital ticket containing a QR code, which can be scanned and verified through the admin system at the event. The frontend can be customized for each client while the core backend remains reusable.",

keyTakeaway:
  "The goal wasn't to build another one-off event website, but to create a reusable ticketing foundation that can power multiple events and clients. By combining a customized frontend with reusable registration, payment, ticketing, and verification infrastructure, the platform can help event organizers streamline operations while directly driving ticket sales and event revenue.",

tagline: [
  "A reusable event ticketing platform built to drive real ticket sales.",
  "Custom event experiences powered by reusable registration, payment, and ticketing infrastructure.",
],
  },


  {
    id: "shreeji-projects",
    title: "Shreeji Projects",
    img: "/Images/Projects/project-2-shreeji-projects/1.png",
    projectImages: [
      { url: "/Images/Projects/project-2-shreeji-projects/1.png", pageName: "Hero Video Showcase & Creator Spotlight" },
      { url: "/Images/Projects/project-2-shreeji-projects/2.png", pageName: "Interactive Creator Carousel" },
      { url: "/Images/Projects/project-2-shreeji-projects/3.png", pageName: "Direct-to-Fan Monetization & Membership" },
      { url: "/Images/Projects/project-2-shreeji-projects/4.png", pageName: "Community Audio & Video Player Hub" },
      { url: "/Images/Projects/project-2-shreeji-projects/5.png", pageName: "Exclusive Creator Commerce & Digital Products" },
      { url: "/Images/Projects/project-2-shreeji-projects/6.png", pageName: "Creator Business Growth & Analytics" },
      { url: "/Images/Projects/project-2-shreeji-projects/7.png", pageName: "Mobile App Ecosystem & Push Notifications" },
      
    ],
    url: "shreeji-projects-mandla.vercel.app",
    client: "Brandlift Digital Marketing Consultancy",
year: "2026",
role: "Frontend Developer",
techStack: [
  "React.js",
  "JavaScript",
  "Tailwind CSS",
  "Vite",
],
description:
  "A modern, responsive corporate website built for Shreeji Projects to establish a strong digital presence and showcase its products, services, and core capabilities through a structured and conversion-focused frontend.",

whatIDid:
  "I designed and developed the complete frontend experience, building the responsive layout, reusable UI components, navigation, product sections, promotional sections, and contact-focused interactions. The site was structured with reusable components and centralized content so future pages and updates can be added efficiently.",

howIBuiltThis:
  "Built with React.js, JavaScript, Tailwind CSS, and Vite, with React Router handling navigation and reusable UI components powering the site's sections and layouts. Content and image paths were separated into dedicated data files, allowing the website's copy, navigation, and visual content to be updated without modifying the core components.",

keyTakeaway:
  "This project strengthened my ability to turn a real business's requirements into a polished, responsive digital presence while keeping the frontend maintainable and reusable. The component-driven structure also makes the foundation easier to extend as the client's website grows.",

tagline: [
  "A modern digital presence engineered for Shreeji Projects.",
  "A responsive, reusable frontend built to showcase products and strengthen the brand online.",
],
  },

];
