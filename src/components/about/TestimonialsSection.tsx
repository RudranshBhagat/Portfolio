"use client";

import React, { useState } from "react";
import Image from "next/image";
import SmudgeMask from "./SmudgeMask";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { playClick } from "@/lib/soundEffects";

import { testimonialsData, Testimonial as TestimonialItem } from "@/data/aboutData";

export type { TestimonialItem };
export { testimonialsData };

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = testimonialsData[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full relative py-12 md:py-24 overflow-hidden border-t border-[#272522]">
      <p className="font-barlow-condensed text-xs sm:text-sm md:text-base tracking-[.35rem] sm:tracking-[.5rem] pb-8 md:pb-16 uppercase text-orange font-bold text-center">
        CLIENT REVIEWS
      </p>

      <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center justify-center">
        {/* Smudge Mask Testimonial Quote */}
        <div className="w-full min-h-[160px] sm:min-h-[180px] md:min-h-[220px] flex items-center justify-center">
          <SmudgeMask
            key={current.id}
            foreground={
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wide font-bigger-display uppercase text-foreground leading-snug md:leading-relaxed text-center">
                &ldquo;{current.quote}&rdquo;
              </h3>
            }
            background={
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wide font-bigger-display uppercase text-[#131212] leading-snug md:leading-relaxed text-center">
                &ldquo;{current.backgroundQuote}&rdquo;
              </h3>
            }
          />
        </div>

        {/* Client Details & Pagination Controls */}
        <div className="w-full mt-10 md:mt-16 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-[#272522] pt-8">
          {/* Client Info */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 md:w-16 md:h-16 relative rounded-full overflow-hidden border border-[#333] bg-[#1e1e1e] shrink-0">
              <Image
                src={current.avatar}
                alt={current.name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div className="text-left">
              <h4 className="font-bigger-display text-lg md:text-xl uppercase tracking-wide text-foreground">
                {current.name}
              </h4>
              <p className="font-barlow-condensed text-sm tracking-widest uppercase text-foreground/50">
                {current.role} &mdash;{" "}
                <a
                  href={current.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange hover:underline font-bold"
                >
                  {current.company}
                </a>
              </p>
            </div>
          </div>

          {/* Prev / Next Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => { playClick(); handlePrev(); }}
              aria-label="Previous review"
              className="w-12 h-12 rounded-full border border-[#333] bg-[#1c1c20] hover:bg-orange hover:text-[#131212] hover:border-orange flex items-center justify-center text-foreground transition-all duration-300 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-bigger-display text-sm tracking-widest text-foreground/50 px-2">
              0{currentIndex + 1} / 0{testimonialsData.length}
            </span>
            <button
              onClick={() => { playClick(); handleNext(); }}
              aria-label="Next review"
              className="w-12 h-12 rounded-full border border-[#333] bg-[#1c1c20] hover:bg-orange hover:text-[#131212] hover:border-orange flex items-center justify-center text-foreground transition-all duration-300 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
