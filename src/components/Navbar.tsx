"use client";

import React, { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useAppContext } from "@/context/AppContext";
import { SplitText } from "@/lib/splitText";
import { usePageTransition } from "./TransitionRouter";
import { playClick } from "@/lib/soundEffects";
import { lenisStore } from "@/components/SmoothScroll";

const navLinks = ["Home", "About", "Projects", "Contact"];

export default function Navbar() {
  const { isNavbarOpen } = useAppContext();
  const { navigate } = usePageTransition();
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const logoTlRef = useRef<gsap.core.Timeline | null>(null);
  const hasAnimatedLogo = useRef(false);

  // Desktop links refs
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const desktopIntroTl = useRef<gsap.core.Timeline | null>(null);

  // Mobile menu state & refs
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileScopeRef = useRef<HTMLDivElement>(null);
  const hamburgerTl = useRef<gsap.core.Timeline | null>(null);
  const mobileMenuTl = useRef<gsap.core.Timeline | null>(null);

  // Scroll-spy: Home and About now share the "/" path, so track which
  // section is actually in view to highlight the right nav link.
  const [activeSection, setActiveSection] = useState<"home" | "about">("home");

  useEffect(() => {
    if (pathname !== "/") return;

    let observer: IntersectionObserver | null = null;
    let rafId: number;

    const setup = () => {
      const aboutEl = document.getElementById("about-section");
      if (!aboutEl) {
        rafId = requestAnimationFrame(setup);
        return;
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          setActiveSection(entry.isIntersecting ? "about" : "home");
        },
        // Section counts as "active" once its top passes roughly the middle
        // of the viewport, so it flips exactly when it visually takes over.
        { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
      );
      observer.observe(aboutEl);
    };

    setup();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      observer?.disconnect();
    };
  }, [pathname]);

  // ─────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────
// 1. Logo Text Reveal Animation
// ─────────────────────────────────────────────────────────────
useGSAP(
  () => {
    const logo = logoRef.current;
    if (!logo) return;

    const split = new SplitText(logo, { type: "chars" });
    gsap.set(split.chars, { yPercent: 120 });

    // Initial reveal — chars rise into place, same power4.out stagger
    // language used by the desktop nav links' intro animation.
    if (isNavbarOpen && !hasAnimatedLogo.current) {
      hasAnimatedLogo.current = true;
      gsap.to(split.chars, {
        yPercent: 0,
        duration: 0.9,
        ease: "power4.out",
        stagger: { each: 0.04, from: "start" },
        delay: 0.15,
      });
    } else {
      gsap.set(split.chars, { yPercent: 0 });
    }

    // Hover: chars lift slightly and shift to the accent color, then
    // settle back — same play()/reverse() pattern used by the nav links.
    const hoverTl = gsap.timeline({ paused: true });
    hoverTl.to(split.chars, {
      y: -4,
      color: "var(--orange)",
      duration: 0.35,
      ease: "power2.out",
      stagger: { each: 0.02, from: "center" },
    });

    const onEnter = () => hoverTl.play();
    const onLeave = () => hoverTl.reverse();
    logo.addEventListener("mouseenter", onEnter);
    logo.addEventListener("mouseleave", onLeave);

    return () => {
      logo.removeEventListener("mouseenter", onEnter);
      logo.removeEventListener("mouseleave", onLeave);
      split.revert();
    };
  },
  { scope: navRef, dependencies: [isNavbarOpen] }
);

  // ─────────────────────────────────────────────────────────────
  // 2. Desktop Navigation Links (Center SplitText + Rolling Hover)
  // ─────────────────────────────────────────────────────────────
  useGSAP(
    () => {
      if (!desktopNavRef.current) return;
      const links = gsap.utils.toArray<HTMLElement>(".desktop-link");
      const introTl = gsap.timeline({ paused: true });

      links.forEach((link) => {
        const firstSpan = link.children[0] as HTMLElement;
        if (!firstSpan) return;
        const split = new SplitText(firstSpan, { type: "chars" });
        gsap.set(split.chars, { yPercent: 100 });

        introTl.to(
          split.chars,
          {
            yPercent: 0,
            ease: "power4.out",
            duration: 1,
            stagger: { each: 0.035, from: "center" },
          },
          0
        );
      });

      desktopIntroTl.current = introTl;
    },
    { scope: desktopNavRef }
  );

  useEffect(() => {
    if (isNavbarOpen) {
      desktopIntroTl.current?.play();
    } else {
      desktopIntroTl.current?.reverse(2);
    }
  }, [isNavbarOpen]);

  // Rolling Hover Effect on Desktop Links
  useGSAP(
    () => {
      if (!desktopNavRef.current) return;
      const links = gsap.utils.toArray<HTMLElement>(".desktop-link");
      const splits: SplitText[] = [];
      const listeners: { link: HTMLElement; onEnter: () => void; onLeave: () => void }[] = [];

      links.forEach((link) => {
        const [span1, span2] = Array.from(link.children) as HTMLElement[];
        if (!span1 || !span2) return;

        const split1 = new SplitText(span1, { type: "chars" });
        const split2 = new SplitText(span2, { type: "chars" });
        splits.push(split1, split2);

        const hoverTl = gsap.timeline({ paused: true });
        hoverTl
          .to(split1.chars, {
            yPercent: -100,
            ease: "power4.out",
            duration: 0.75,
            stagger: { each: 0.035, from: "center" },
          })
          .to(
            split2.chars,
            {
              yPercent: -100,
              ease: "power4.out",
              duration: 0.75,
              stagger: { each: 0.035, from: "center" },
            },
            "<"
          );

        const onEnter = () => hoverTl.play();
        const onLeave = () => hoverTl.reverse();

        link.addEventListener("mouseenter", onEnter);
        link.addEventListener("mouseleave", onLeave);
        listeners.push({ link, onEnter, onLeave });
      });

      return () => {
        listeners.forEach(({ link, onEnter, onLeave }) => {
          link.removeEventListener("mouseenter", onEnter);
          link.removeEventListener("mouseleave", onLeave);
        });
        splits.forEach((s) => s.revert());
      };
    },
    { scope: desktopNavRef }
  );

  // ─────────────────────────────────────────────────────────────
  // 3. Mobile Hamburger & Fullscreen Menu
  // ─────────────────────────────────────────────────────────────
  useGSAP(
    () => {
      if (!mobileScopeRef.current) return;

      const closeSpans = gsap.utils.toArray<HTMLElement>(".hamburger-close span");
      const openSpans = gsap.utils.toArray<HTMLElement>(".hamburger-open span");
      const menu = mobileScopeRef.current.querySelector<HTMLElement>(".mobile-menu");
      const menuLinks = gsap.utils
        .toArray<HTMLElement>(".mobile-menu-link span")
        .map((span) => new SplitText(span, { type: "chars" }));

      // Set initial states
      gsap.set(openSpans, { yPercent: 100 });
      gsap.set(menu, { autoAlpha: 0, display: "none" });
      menuLinks.forEach((s) => gsap.set(s.chars, { yPercent: 100 }));

      // Hamburger Morph Timeline
      const hTl = gsap.timeline({ paused: true });
      hTl
        .fromTo(
          closeSpans,
          { xPercent: 100 },
          { xPercent: 0, duration: 0.5, stagger: { each: 0.1, from: "end" } }
        )
        .fromTo(
          openSpans,
          { yPercent: 100 },
          { yPercent: 0, duration: 0.5, stagger: { each: 0.1, from: "end" } },
          "<"
        );
      hamburgerTl.current = hTl;

      // Mobile Menu Fullscreen Open Timeline
      const mTl = gsap.timeline({
        paused: true,
        onStart: () => {
          gsap.set(menu, { display: "flex" });
        },
        onReverseComplete: () => {
          gsap.set(menu, { display: "none" });
        },
      });

      // SVG morph path animation
      mTl
        .to(".overlay-svg-path", {
          duration: 0.65,
          ease: "linear",
          attr: { d: "M0 1005S175 1000 500 1000s500 5 500 5V0H0Z" },
        })
        .to(menu, { autoAlpha: 1, duration: 0.2 }, "<")
        .to(
          closeSpans,
          { xPercent: -100, duration: 0.5, ease: "power2.inOut", stagger: 0.1 },
          "<"
        )
        .to(
          openSpans,
          { yPercent: 0, duration: 0.5, ease: "power2.inOut", stagger: 0.1 },
          "<"
        );

      menuLinks.forEach((split, idx) => {
        mTl.to(
          split.chars,
          {
            yPercent: 0,
            stagger: { each: 0.025, from: "center" },
            ease: "power4.out",
            duration: 0.75,
          },
          idx === 0 ? "<" : "-=0.7"
        );
      });

      mobileMenuTl.current = mTl;

      return () => {
        menuLinks.forEach((s) => s.revert());
      };
    },
    { scope: mobileScopeRef }
  );

  useEffect(() => {
    if (isNavbarOpen) {
      hamburgerTl.current?.play();
    } else {
      hamburgerTl.current?.reverse();
    }
  }, [isNavbarOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      mobileMenuTl.current?.play();
    } else {
      mobileMenuTl.current?.reverse();
    }

    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  const getHref = (name: string) => {
    if (name === "Home") return "/";
    if (name === "About") return "/#about-section";
    return `/${name.toLowerCase()}`;
  };

  const scrollToAbout = () => {
    const lenis = lenisStore.current;
    const target = document.getElementById("about-section");
    if (lenis && target) {
      lenis.scrollTo(target, { offset: -20 });
    } else if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavClick = (e: React.MouseEvent, name: string, href: string) => {
    e.preventDefault();
    playClick();
    setIsMobileMenuOpen(false);

    if (name === "About") {
      if (pathname === "/") {
        scrollToAbout();
      } else {
        // Flag AboutSection to self-scroll into view once the home page mounts.
        sessionStorage.setItem("scrollTo", "about-section");
        navigate("/");
      }
      return;
    }

    navigate(href);
  };

  return (
    <nav
      ref={navRef}
      className={`w-full fixed top-0 left-0 flex justify-between items-center py-3 px-5 z-50 ${isNavbarOpen ? "pointer-events-auto" : "pointer-events-none"
        } transition-all duration-500 ease-in-out`}
    >
{/* Signature Logo Mark */}
{/* Signature Logo — name as animated text instead of an icon mark */}
<a
  ref={logoRef}
  href="/"
  aria-label="Rudransh - Home"
  className="font-bigger-display text-xl md:text-2xl uppercase tracking-wide text-foreground cursor-pointer select-none overflow-hidden inline-block"
>
  Rudransh
</a>

      {/* Desktop Navigation Links */}
      <div
        ref={desktopNavRef}
        className="hidden md:flex justify-center items-center gap-8 text-foreground"
      >
        {navLinks.map((name) => {
          const href = getHref(name);
          const isActive =
            pathname === "/"
              ? name === "About"
                ? activeSection === "about"
                : name === "Home"
                  ? activeSection === "home"
                  : false
              : href === "/"
                ? pathname === "/"
                : pathname.startsWith(href);
          return (
            <a
              key={name}
              href={href}
              onClick={(e) => handleNavClick(e, name, href)}
              className="cursor-pointer"
            >
              <div
                className={`desktop-link ${isNavbarOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                  } overflow-hidden tracking-[.2rem] relative text-[1em] uppercase leading-[1em] ${isActive ? "text-orange pointer-events-none" : "text-foreground pointer-events-auto"
                  } transition-all duration-300 ease-in-out`}
              >
                <span aria-hidden="true">{name}</span>
                <span aria-hidden="true" className="absolute left-0 top-0 translate-y-full text-orange">
                  {name}
                </span>
              </div>
            </a>
          );
        })}
      </div>

      {/* Mobile Hamburger & Overlay */}
      <div ref={mobileScopeRef} className="md:hidden">
        <button
          className="hamburger relative w-7 h-7 cursor-pointer flex justify-center items-center z-50"
          aria-label="Menu"
          aria-controls="mobile-menu"
          aria-expanded={isMobileMenuOpen}
          onClick={() => { playClick(); setIsMobileMenuOpen((prev) => !prev); }}
        >
          {/* Hamburger Close Icon (3 horizontal bars) */}
          <div className="hamburger-close w-full h-full overflow-hidden flex flex-col gap-1 justify-center items-center">
            <span className="w-full h-1 bg-foreground rounded-4xl" />
            <span className="w-full h-1 bg-foreground rounded-4xl" />
            <span className="w-full h-1 bg-foreground rounded-4xl" />
          </div>

          {/* Hamburger Open Icon (3 vertical bars) */}
          <div className="hamburger-open absolute w-full h-full rounded-[5px] overflow-hidden flex gap-1 justify-center items-center">
            <span className="w-1 h-full bg-foreground rounded-4xl" />
            <span className="w-1 h-full bg-foreground rounded-4xl" />
            <span className="w-1 h-full bg-foreground rounded-4xl" />
          </div>
        </button>

        {/* Mobile SVG Organic Wave Backdrop */}
        <div className="md:hidden absolute top-0 left-0 w-full h-svh pointer-events-none z-30">
          <svg className="w-full h-lvh" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <path
              className="overlay-svg-path fill-background"
              d="M0 2S175 1 500 1s500 1 500 1V0H0Z"
            />
          </svg>
        </div>

        {/* Mobile Fullscreen Menu */}
        <div className="mobile-menu md:hidden fixed inset-0 flex-col justify-center items-center z-40">
          {navLinks.map((name) => {
            const href = getHref(name);
            const isActive =
              pathname === "/"
                ? name === "About"
                  ? activeSection === "about"
                  : name === "Home"
                    ? activeSection === "home"
                    : false
                : href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(href);
            return (
              <a
                key={name}
                href={href}
                onClick={(e) => handleNavClick(e, name, href)}
                className="cursor-pointer"
              >
                <div className="mobile-menu-link text-8xl whitespace-nowrap tracking-wide overflow-hidden leading-25 uppercase cursor-pointer font-bigger-display">
                  <span className={isActive ? "text-orange" : "text-foreground"}>{name}</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}