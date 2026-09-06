"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import ScrollRevealText from "./ScrollRevealText";
import { servicesData, ServiceItemData } from "@/data/aboutData";

export type { ServiceItemData };
export { servicesData };

function ServiceSkillsList({
  skills,
  colorClass = "text-foreground/40",
}: {
  skills: string[];
  colorClass?: string;
}) {
  const responsiveClasses = [
    "hidden md:inline-block",
    "hidden lg:inline-block",
    "hidden xl:inline-block",
    "hidden 2xl:inline-block",
  ];

  return (
    <span
      className={`font-barlow-condensed text-xs sm:text-sm md:text-base tracking-[.2rem] uppercase font-bold ${colorClass}`}
    >
      {skills.map((skill, idx) => {
        const cls = responsiveClasses[idx] || "hidden 2xl:inline-block";
        return (
          <span key={skill} className={cls}>
            {idx > 0 && <span className="mx-1.5 opacity-40">/</span>}
            {skill}
          </span>
        );
      })}
    </span>
  );
}

function ServiceItem({ service }: { service: ServiceItemData }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const paddingClass =
    "pl-6 sm:pl-10 md:pl-16 lg:pl-20 xl:pl-24 pr-4 sm:pr-6 md:pr-8 lg:pr-12 xl:pr-16";

  const handleMouseEnter = () => {
    if (!wrapperRef.current || !itemRef.current) return;
    const h = itemRef.current.clientHeight;
    gsap.to(wrapperRef.current, {
      y: -h,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!wrapperRef.current || !itemRef.current) return;
    const h = itemRef.current.clientHeight;
    const rect = e.currentTarget.getBoundingClientRect();
    const isExitingTop = e.clientY < rect.top + rect.height / 2;

    gsap.to(wrapperRef.current, {
      y: isExitingTop ? -2 * h : 0,
      duration: 0.4,
      ease: "power2.out",
      onComplete: () => {
        if (isExitingTop && wrapperRef.current) {
          gsap.set(wrapperRef.current, { y: 0 });
        }
      },
    });
  };

  return (
    <div
      ref={itemRef}
      className="service-item relative w-full h-[75px] sm:h-[85px] md:h-[100px] lg:h-[115px] overflow-hidden font-bigger-display border-b border-[#272522] cursor-pointer select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={wrapperRef}
        className="service-wrapper relative w-full h-[225px] sm:h-[255px] md:h-[300px] lg:h-[345px] will-change-transform translate-y-0 whitespace-nowrap"
      >
        {/* Tier 1: Normal Resting State */}
        <div
          className={`w-full h-[75px] sm:h-[85px] md:h-[100px] lg:h-[115px] bg-transparent flex items-center justify-center md:justify-between ${paddingClass} text-foreground text-center md:text-left`}
        >
          <ScrollRevealText triggerStart="top 95%" triggerEnd="top 65%">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4.25rem] xl:text-[4.85rem] tracking-wide uppercase leading-none">
              {service.title}
            </h2>
          </ScrollRevealText>
          <ServiceSkillsList skills={service.skills} colorClass="text-foreground/40" />
        </div>

        {/* Tier 2: Hover State (Orange background with humorous punchline) */}
        <div
          className={`w-full h-[75px] sm:h-[85px] md:h-[100px] lg:h-[115px] bg-orange text-background flex items-center justify-center md:justify-between ${paddingClass} text-center md:text-left`}
        >
          {/* Mobile quote view */}
          <div className="w-full md:hidden flex items-center justify-center px-4 text-center">
            <p className="font-barlow-condensed text-xs sm:text-sm tracking-[.08rem] uppercase font-bold text-background whitespace-normal leading-tight max-w-[95%]">
              &quot;{service.sarcasticQuote}&quot;
            </p>
          </div>

          {/* Desktop view */}
          <h2 className="hidden md:block text-3xl sm:text-4xl md:text-5xl lg:text-[4.25rem] xl:text-[4.85rem] tracking-wide uppercase leading-none font-bold">
            {service.title}
          </h2>
          <span className="hidden md:inline-block font-barlow-condensed text-xs sm:text-xs md:text-sm lg:text-base tracking-[.1rem] uppercase font-bold text-background/90 text-right whitespace-nowrap">
            &quot;{service.sarcasticQuote}&quot;
          </span>
        </div>

        {/* Tier 3: Reset State for seamless loop */}
        <div
          className={`w-full h-[75px] sm:h-[85px] md:h-[100px] lg:h-[115px] bg-transparent flex items-center justify-center md:justify-between ${paddingClass} text-foreground text-center md:text-left`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4.25rem] xl:text-[4.85rem] tracking-wide uppercase leading-none">
            {service.title}
          </h2>
          <ServiceSkillsList skills={service.skills} colorClass="text-foreground/40" />
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section className="w-full relative py-12 md:py-24 overflow-hidden">
      <p className="font-barlow-condensed text-xs sm:text-sm md:text-base tracking-[.35rem] sm:tracking-[.5rem] pb-8 md:pb-16 uppercase text-orange font-bold text-center">
        WHAT I DO
      </p>
      <div className="w-full border-t border-[#272522]">
        {servicesData.map((service) => (
          <ServiceItem key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}
