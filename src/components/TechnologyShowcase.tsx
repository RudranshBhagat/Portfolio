"use client";

import React from "react";
import { technologiesData } from "@/data/aboutData";

export default function TechnologySection() {
  return (
    <section
      id="technologies"
      className="relative w-full py-16 md:py-28 border-t border-foreground/10 text-center"
    >
      {/* HEADER */}
      <p className="font-barlow-condensed text-xs sm:text-sm md:text-base tracking-[.35rem] sm:tracking-[.5rem] pb-4 uppercase text-orange font-bold">
        Tech Stack
      </p>
      <h2 className="font-bigger-display uppercase text-3xl sm:text-4xl md:text-5xl tracking-wide px-4 pb-14 md:pb-20 text-foreground">
        Professional <span className="text-orange">Skillset</span>
      </h2>

      {/* PILL BADGE GRID */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-5xl mx-auto px-4">
        {technologiesData.map((tech) => {
          const Icon = tech.icon;
          return (
            <div
              key={tech.name}
              tabIndex={0}
              className="group flex items-center gap-2.5 rounded-full border border-foreground/15 bg-light-background px-5 py-3 outline-none transition-all duration-300 hover:border-orange/60 hover:bg-orange/[0.06] hover:-translate-y-1 hover:shadow-[0_8px_24px_-8px_rgba(249,52,52,0.35)] focus-visible:border-orange/60 focus-visible:-translate-y-1"
            >
              <Icon
                size={20}
                style={{ color: tech.color }}
                className="opacity-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"
              />
              <span className="font-barlow-condensed text-sm font-medium text-light-foreground transition-colors duration-300 group-hover:text-foreground">
                {tech.name}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}