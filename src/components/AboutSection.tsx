"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import SmudgeMask from "@/components/about/SmudgeMask";
import ServicesSection from "@/components/about/ServicesSection";
import WhatTheySaid from "@/components/about/WhatTheySaid";
import ScrollRevealText from "@/components/about/ScrollRevealText";
import MarcusAureliusModel from "@/components/about/MarcusAureliusModel";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { lenisStore } from "@/components/SmoothScroll";
import TechnologyShowcase from "@/components/TechnologyShowcase";
import { aboutQuoteBlocks, philosophyContent } from "@/data/aboutData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroPathRef = useRef<SVGPathElement>(null);
  const aboutMeRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);

  // The Philosophy block mounts two simultaneous 3D Canvases (foreground +
  // background layers of the hover-reveal). That's on top of the Hero's own
  // WebGL canvases already running above it — four+ concurrent GPU contexts
  // on page load risks the browser/driver force-losing one (visible as a
  // black flash). Only mount these once the section is actually approaching
  // the viewport, instead of the instant the page loads.
  const [showPhilosophyModels, setShowPhilosophyModels] = useState(false);

  useEffect(() => {
    const el = philosophyRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowPhilosophyModels(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" } // start loading well before it scrolls into view
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // If we arrived here because the Navbar "About" link was clicked from a
  // different page, scroll smoothly to this section once it has mounted.
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const pending = sessionStorage.getItem("scrollTo");
    if (pending === "about-section" && sectionRef.current) {
      sessionStorage.removeItem("scrollTo");
      requestAnimationFrame(() => {
        const lenis = lenisStore.current;
        if (lenis) {
          lenis.scrollTo(sectionRef.current as HTMLElement, { offset: -20 });
        } else {
          sectionRef.current?.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  }, []);

  // Hero SVG organic curve morphing animation on scroll
  useGSAP(
    () => {
      const heroPath = heroPathRef.current;
      const section = sectionRef.current;
      if (!heroPath || !section) return;

      gsap.to(heroPath, {
        attr: {
          d: "M 0,0 L 1,0 L 1,1 Q 0.7,1 0.4,1 Q 0.15,1 0,1 Z",
        },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "50% bottom",
          scrub: 1,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about-section"
      className="about-section w-full min-h-screen text-foreground text-center"
    >
      {/* ─────────────────────────────────────────────────────────────
          Hero Section with SVG Organic Bottom Wave Morphing
         ───────────────────────────────────────────────────────────── */}
      <div className="relative">
        <svg width="0" height="0" className="absolute">
          <defs>
            <clipPath id="my-clip-path" clipPathUnits="objectBoundingBox">
              <path
                ref={heroPathRef}
                d="M 0,0 L 1,0 L 1,0.85 Q 0.7,0.95 0.4,0.95 Q 0.15,0.9 0,0.8 Z"
              />
            </clipPath>
          </defs>
        </svg>
        {/* <div className="relative w-full h-svh mx-auto [clip-path:url(#my-clip-path)] bg-[#282a2c] pointer-events-none select-none [-webkit-touch-callout:none]">
          <Image
            src="/Images/About/About_Main_Img.webp"
            alt="A portrait of Rudransh Bhagat"
            fill
            draggable={false}
            className="object-cover -translate-y-[5%] scale-105 pointer-events-none select-none [-webkit-touch-callout:none]"
            priority
          />
        </div> */}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          Main Content Sections (All 5 sections with uppercase typography)
         ───────────────────────────────────────────────────────────── */}
      {/* 1. About Me Section (Double Smudge Mask Reveal) */}
      <div ref={aboutMeRef} className="relative py-10 md:py-20">
        <p className="font-barlow-condensed text-xs sm:text-sm md:text-base tracking-[.35rem] sm:tracking-[.5rem] pb-8 sm:pb-12 uppercase text-orange font-bold">
          {aboutQuoteBlocks[0].label}
        </p>

        <div className="max-w-4xl mx-auto px-4">
          <SmudgeMask
            className="!p-0 !-my-0"
            foreground={
              <ScrollRevealText triggerStart="top 98%" triggerEnd="top 45%">
                <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-wide leading-snug sm:leading-tight md:leading-[4.5rem] font-bigger-display uppercase">
                  {aboutQuoteBlocks[0].foregroundQuote}
                </h2>
              </ScrollRevealText>
            }
            background={
              <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-wide leading-snug sm:leading-tight md:leading-[4.5rem] font-bigger-display uppercase text-[#131212]">
                {aboutQuoteBlocks[0].backgroundQuote}
              </h2>
            }
          />
        </div>
      </div>

      {/* 2. What I Do Section (12 Rolling Categories with Sarcastic Quotes) */}
      <ServicesSection />

      {/* 3. My Experience Section (Dedicated Experience Smudge Mask) */}
      <div className="relative py-10 md:py-20">
        <p className="font-barlow-condensed text-xs sm:text-sm md:text-base tracking-[.35rem] sm:tracking-[.5rem] pb-8 sm:pb-12 uppercase text-orange font-bold">
          {aboutQuoteBlocks[1].label}
        </p>

        <div className="max-w-4xl mx-auto px-4">
          <SmudgeMask
            className="!p-0 !-my-0"
            foreground={
              <ScrollRevealText triggerStart="top 98%" triggerEnd="top 45%">
                <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-wide leading-snug sm:leading-tight md:leading-[4.5rem] font-bigger-display uppercase">
                  {aboutQuoteBlocks[1].foregroundQuote}
                </h2>
              </ScrollRevealText>
            }
            background={
              <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-wide leading-snug sm:leading-tight md:leading-[4.5rem] font-bigger-display uppercase text-[#131212]">
                {aboutQuoteBlocks[1].backgroundQuote}
              </h2>
            }
          />
        </div>
      </div>

      {/* 4. My Education Section (Full-Width Smudge Mask) */}
      <div className="relative py-10 md:py-20 border-t border-[#272522]">
        <p className="font-barlow-condensed text-xs sm:text-sm md:text-base tracking-[.35rem] sm:tracking-[.5rem] pb-8 sm:pb-12 uppercase text-orange font-bold">
          {aboutQuoteBlocks[2].label}
        </p>

        <div className="max-w-4xl mx-auto px-4">
          <SmudgeMask
            className="!p-0 !-my-0"
            foreground={
              <ScrollRevealText triggerStart="top 98%" triggerEnd="top 45%">
                <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-wide leading-snug sm:leading-tight md:leading-[4.5rem] font-bigger-display uppercase">
                  {aboutQuoteBlocks[2].foregroundQuote}
                </h2>
              </ScrollRevealText>
            }
            background={
              <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-wide leading-snug sm:leading-tight md:leading-[4.5rem] font-bigger-display uppercase text-[#131212]">
                {aboutQuoteBlocks[2].backgroundQuote}
              </h2>
            }
          />
        </div>
      </div>

      {/* 5. What They Said Section (Testimonials Circular Dial & Full Review Modal) */}
      {/* <WhatTheySaid /> */}

      {/* 5. My Philosophy Section with 3D Marcus Aurelius & Smudge Reveal */}
      <div ref={philosophyRef} className="py-20 md:py-20 border-t border-[#272522]">
        <p className="font-barlow-condensed text-xs sm:text-sm md:text-base tracking-[.35rem] sm:tracking-[.5rem] pb-8 sm:pb-10 uppercase text-orange font-bold">
          {philosophyContent.label}
        </p>

        <SmudgeMask
          className="!p-0 !-my-0 w-full"
          foreground={
            <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto px-4 w-full gap-8 md:gap-12">
              <div className="md:h-[27rem] h-[20rem] w-[18rem] sm:w-[22rem] shrink-0">
                {showPhilosophyModels && (
                  <MarcusAureliusModel
                    containerRef={philosophyRef}
                    showGoggles={false}
                    className="w-full h-full"
                  />
                )}
              </div>
              <div className="md:px-6 px-4 max-w-3xl flex-1 flex flex-col items-center justify-center text-center">
                <ScrollRevealText triggerStart="top 98%" triggerEnd="top 45%">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] tracking-wide leading-tight md:leading-[3.6rem] lg:leading-[4rem] font-bigger-display uppercase text-foreground">
                    {philosophyContent.foregroundQuote}
                  </h2>
                </ScrollRevealText>
                <p className="font-barlow-condensed tracking-[.3rem] pt-5 capitalize text-foreground text-sm md:text-base">
                  {philosophyContent.foregroundAttribution}
                </p>
              </div>
            </div>
          }
          background={
            <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto px-4 w-full gap-8 md:gap-12">
              <div className="md:h-[27rem] h-[20rem] w-[18rem] sm:w-[22rem] shrink-0">
                {showPhilosophyModels && (
                  <MarcusAureliusModel
                    containerRef={philosophyRef}
                    showGoggles={true}
                    className="w-full h-full"
                  />
                )}
              </div>
              <div className="md:px-6 px-4 max-w-3xl flex-1 flex flex-col items-center justify-center text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] tracking-wide leading-tight md:leading-[3.6rem] lg:leading-[4rem] font-bigger-display uppercase text-[#131212]">
                  {philosophyContent.backgroundQuote}
                </h2>
                <p className="font-barlow-condensed tracking-[.3rem] pt-5 capitalize text-[#131212] text-sm md:text-base">
                  {philosophyContent.backgroundAttribution}
                </p>
              </div>
            </div>
          }
        />
      </div>

       {/* TECHNOLOGIES */}
      <TechnologyShowcase />
    </section>
  );
}
