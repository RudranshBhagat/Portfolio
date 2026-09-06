#  Rudransh Bhagat — Full-Stack Developer Portfolio

> **Note on Design & Code Study**
>
> This project is my personal portfolio website and an independent technical recreation/code study inspired by an existing creative developer portfolio design.
>
> I rebuilt and customized the project using **Next.js 15 (App Router)**, **React**, **Three.js & React Three Fiber**, **GSAP**, and **TypeScript**, while adapting the content, projects, animations, interactions, and developer information to represent my own work and experience.
>
> The project was developed as a hands-on engineering exercise to explore **WebGL, 3D interactions, GSAP animations, page transitions, smooth scrolling, interactive galleries, responsive UI, and modern frontend architecture**.
>
> **All portfolio content, project information, developer details, and customizations in this repository represent my own work and experience.**

🔗 **Live Demo:** Coming Soon

👨‍💻 **Developer:** Rudransh Bhagat  
📍 **Pune, India**

---

## ✨ Features & Architecture

### 1. 🌌 Interactive Hero Experience

- Creative animated hero section built with **React and Three.js**.
- Interactive WebGL elements and mouse-based visual interactions.
- GSAP-powered entrance animations and UI choreography.
- Responsive layout adapted for desktop and smaller screens.
- Animated social links and interactive navigation elements.

### 2. 👨‍💻 About & Experience Section

- Dedicated About section showcasing my development journey and technical skills.
- Technology showcase featuring:
  - React
  - Next.js
  - Angular
  - TypeScript
  - JavaScript
  - Tailwind CSS
  - Node.js
  - Express.js
  - MongoDB
  - GSAP
  - Git
  - GitHub
- Experience section highlighting my progression from **Frontend Developer Intern** to **Full-Stack Developer through freelance development**.
- Education and professional background presented through interactive sections.

### 3. 🎬 Interactive Projects Showcase

- Animated project showcase built around interactive project cards.
- Smooth project transitions and hover interactions.
- Responsive project presentation.
- Project information separated into reusable data structures.
- Featured projects include:
  - Event Registration & Management System
  - School Management Application
  - Movie Library
  - Shreeji Projects

### 4. 🖼️ Dynamic Case Studies & Three.js Gallery (`/projects/[id]`)
- **Case Study Deep Dives**: Rich project breakdown for 5 featured projects (`staurga`, `linkryse`, `patreon`, `orunk`, `yappedin`).
- **Parallax Hero Showcase**: Scrubbed video/image presentation with SplitText line reveals and metadata specs.
- **WebGL Barrel Distortion Gallery**: Interactive infinite draggable Three.js canvas texture atlas with custom barrel distortion vertex and fragment GLSL shaders.
- **Dual-Split Bottom Nav**: Seamless Next/Previous project switcher.

### 5. 📬 Animated Contact Experience (`/contact`)
- **Morphing Submit Button**: Pill-shaped action button smoothly collapsing into a progress bar line, expanding into a circular badge, and drawing SVG status checkmark with signature letter staggers.
- **Dynamic Social Tooltips**: Staggered center-aligned social tooltips with interactive hover micro-animations.

### 6. 🔊 Zero-Latency Sound Effects Engine
- **Preloaded Audio Pool System**: Multi-instance audio pool allowing simultaneous overlapping clicks and hovers without cutting off audio channels.
- **Interactive Micro-Acoustics**: Tactile `click.mp3` on navigation buttons, slider controls, and form submit; gentle `hover.mp3` on social link interactions.

---

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── 3D/                    # 3D assets and models
│   ├── Images/                # Portfolio images and project assets
│   ├── Videos/                # Project videos and media
│   ├── sounds/                # UI sound effects
│   └── fonts/                 # Custom fonts
│
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── globals.css        # Global styles
│   │   ├── about/
│   │   │   └── page.tsx       # About page
│   │   ├── contact/
│   │   │   └── page.tsx       # Contact page
│   │   └── projects/
│   │       ├── page.tsx       # Projects showcase
│   │       └── [id]/
│   │           └── page.tsx   # Dynamic project pages
│   │
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── SmoothScroll.tsx
│   │   ├── TransitionRouter.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── HeroEffects.tsx
│   │   ├── SocialLinks.tsx
│   │   ├── about/
│   │   ├── projects/
│   │   └── contact/
│   │
│   ├── data/
│   │   ├── aboutData.ts       # About, skills & experience data
│   │   └── projectsData.ts    # Project metadata & case studies
│   │
│   └── lib/
│       └── utils.ts            # Utility functions
│
├── package.json
├── tsconfig.json
├── next.config.ts
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: `v18.18.0` or higher (Node 20+ recommended)
- **npm** or **pnpm** or **yarn**

### 1. Clone the Repository
```bash
git clone https://github.com/RudranshBhagat/Portfolio.git

```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:4005](http://localhost:4005) in your browser. Fast Refresh / HMR is active for instant real-time updates.

### 4. Build for Production & Static Export
```bash
npm run build
```
Generates a fully optimized static export in the `/out` directory, ready for Cloudflare Pages, Vercel, or AWS S3.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 15 (App Router)** | Framework, static HTML generation & server components |
| **React 19** | UI components & state orchestration |
| **Three.js & React Three Fiber** | 3D Marcus Aurelius bust, WebGL particle simulation & barrel distortion gallery |
| **GSAP & ScrollTrigger** | Scroll animations, SplitText character choreography & SVG path morphing |
| **Web Audio API** | Zero-latency preloaded audio pooling for sound effects |
| **Lenis** | Momentum smooth scroll engine |
| **Tailwind CSS 4** | Utility styling & responsive layout system |
| **TypeScript** | Type safety across metadata and 3D scenes |


---


