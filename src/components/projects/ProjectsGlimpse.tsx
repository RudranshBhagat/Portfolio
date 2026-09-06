"use client";

import React from "react";
import Image from "next/image";
import { projectsData } from "@/data/projectsData";
import { usePageTransition } from "@/components/TransitionRouter";
import { playClick, playHover } from "@/lib/soundEffects";

// How many projects to tease on the home page. Keep this small on purpose,
// the point is to give a taste and push people to /projects for the rest.
const GLIMPSE_COUNT = 3;

export default function ProjectsGlimpse() {
  const { navigate } = usePageTransition();
  const featured = projectsData.slice(0, GLIMPSE_COUNT);

  const goTo = (href: string) => {
    playClick();
    navigate(href);
  };

  return (
    <section className="relative w-full py-16 md:py-28 border-t border-[#272522] text-center">
      <p className="font-barlow-condensed text-xs sm:text-sm md:text-base tracking-[.35rem] sm:tracking-[.5rem] pb-4 uppercase text-orange font-bold">
        Selected Work
      </p>
      <h2 className="font-bigger-display uppercase text-3xl sm:text-4xl md:text-5xl tracking-wide px-4 pb-10 md:pb-16 text-foreground">
        A Few Things I&apos;ve Built
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto px-4 md:px-8">
        {featured.map((p) => {
          const poster = p.projectImages[0]?.url || p.img;
          return (
            <button
              key={p.id}
              onClick={() => goTo(`/projects/${p.id}`)}
              onMouseEnter={() => playHover()}
              className="group relative aspect-[4/5] w-full overflow-hidden bg-[#131212] text-left cursor-pointer"
            >
              <Image
                src={poster}
                alt={p.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover grayscale contrast-110 brightness-90 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 w-full p-5 md:p-6">
                <span className="font-barlow-condensed tracking-[.25rem] text-[10px] md:text-xs uppercase text-orange/90 font-semibold">
                  {p.client}
                </span>
                <h3 className="font-bigger-display uppercase text-2xl md:text-3xl text-white leading-tight mt-1">
                  {p.title}
                </h3>
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => goTo("/projects")}
        onMouseEnter={() => playHover()}
        className="group cursor-pointer mt-12 md:mt-16 inline-flex items-center gap-3 font-barlow-condensed tracking-[.3rem] text-xs md:text-sm uppercase font-bold text-foreground border border-foreground/30 rounded-full px-8 py-4 hover:bg-orange hover:text-[#131212] hover:border-orange transition-all duration-300"
      >
        View All Projects
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="group-hover:translate-x-0.5 transition-transform"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </button>
    </section>
  );
}
