"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import {
  heroSkills,
  heroBackgroundLabels,
  heroSocialLinks,
  heroContent,
} from "@/data/homeData";

/* ==========================================
   HERO
========================================== */

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  /* ========================================
     GSAP ANIMATION
  ======================================== */

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    const ctx = gsap.context(() => {
      const skillElements = skillsRef.current?.children;

      gsap.set(eyebrowRef.current, {
        opacity: 0,
        y: -15,
      });

      gsap.set(titleRef.current, {
        opacity: 0,
        y: 40,
        scale: 0.97,
      });

      gsap.set(skillElements || [], {
        opacity: 0,
        scale: 0.65,
      });

      gsap.set(metaRef.current, {
        opacity: 0,
        y: 15,
      });

      const timeline = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      timeline
        .to(eyebrowRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
        })

        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
          },
          "-=0.2"
        )

        .to(
          skillElements || [],
          {
            opacity: 1,
            scale: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: "back.out(1.4)",
          },
          "-=0.7"
        )

        .to(
          metaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
          },
          "-=0.3"
        );

      /* ======================================
         FLOATING ICONS
      ====================================== */

      Array.from(skillElements || []).forEach((element, index) => {
        gsap.to(element, {
          y: index % 2 === 0 ? -8 : 8,
          x: index % 3 === 0 ? 5 : -4,
          rotation: index % 2 === 0 ? 3 : -3,
          duration: 3.2 + index * 0.25,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.15,
        });
      });

      /* ======================================
         MOUSE PARALLAX
      ====================================== */

      const handleMouseMove = (event: MouseEvent) => {
        const rect = hero.getBoundingClientRect();

        const mouseX =
          (event.clientX - rect.left) / rect.width - 0.5;

        const mouseY =
          (event.clientY - rect.top) / rect.height - 0.5;

        gsap.to(titleRef.current, {
          x: mouseX * 10,
          y: mouseY * 7,
          duration: 1.2,
          ease: "power3.out",
        });

        gsap.to(skillsRef.current, {
          x: mouseX * -20,
          y: mouseY * -14,
          duration: 1.5,
          ease: "power3.out",
        });
      };

      hero.addEventListener("mousemove", handleMouseMove);

      return () => {
        hero.removeEventListener("mousemove", handleMouseMove);
      };
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="
        relative
        min-h-[100svh]
        w-full
        overflow-hidden
        bg-[#0B0B0B]
        text-[#F1EBDD]
      "
    >
      {/* ======================================
          BACKGROUND GEOMETRY
      ====================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-[14%]
          -top-[20%]
          h-[150%]
          w-[30%]
          rotate-[23deg]
          bg-white/[0.025]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          left-[29%]
          -top-[25%]
          h-[155%]
          w-[13%]
          rotate-[23deg]
          bg-white/[0.015]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-[4%]
          -top-[20%]
          h-[150%]
          w-[18%]
          rotate-[23deg]
          bg-white/[0.02]
        "
      />

      {/* ======================================
          GOLD GRID
      ====================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(200, 169, 81, 0.18) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(200, 169, 81, 0.18) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "16.6667% 25%",
        }}
      />

      {/* ======================================
          SUBTLE BACKGROUND LABELS
      ====================================== */}

      {heroBackgroundLabels.map((label) => (
        <div
          key={label.text}
          className={`
            pointer-events-none
            absolute
            select-none
            text-[6px]
            uppercase
            tracking-[0.45rem]
            text-[#C8A951]/10
            ${label.className}
          `}
        >
          {label.text}
        </div>
      ))}

      {/* ======================================
          HERO EYEBROW
      ====================================== */}

      <div
        ref={eyebrowRef}
        className="
          absolute
          left-6
          top-5
          z-30
          sm:left-10
          sm:top-7
          md:left-14
          md:top-8
        "
      >
        <div className="flex items-start gap-2">
          <span
            className="
              mt-[2px]
              block
              h-[7px]
              w-[7px]
              rounded-full
              bg-[#C8A951]
            "
          />
        </div>
      </div>

      {/* ======================================
          FLOATING SKILL ICONS
      ====================================== */}

      <div
        ref={skillsRef}
        className="
          pointer-events-none
          absolute
          inset-0
          z-30
        "
      >
        {heroSkills.map((skill) => {
          const Icon = skill.Icon;

          return (
            <div
              key={skill.name}
              className="
                absolute
                flex
                -translate-x-1/2
                -translate-y-1/2
                items-center
                gap-2
              "
              style={{
                left: skill.x,
                top: skill.y,
                transform: `translate(-50%, -50%) rotate(${skill.rotate}deg)`,
              }}
            >
              {/* ICON */}

              <div
                className="
                  flex
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#C8A951]/20
                  bg-[#0B0B0B]/80
                  p-2.5
                  backdrop-blur-sm
                "
              >
                <Icon
                  className="shrink-0"
                  style={{
                    width: skill.size,
                    height: skill.size,
                    color: skill.color,
                  }}
                />
              </div>

              {/* LABEL */}

              <span
                className="
                  hidden
                  whitespace-nowrap
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-[0.22rem]
                  text-[#F1EBDD]/30
                  sm:block
                "
              >
                {skill.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* ======================================
          MAIN NAME
      ====================================== */}

      <div
        ref={titleRef}
        className="
          absolute
          left-1/2
          top-[47%]
          z-20
          w-full
          -translate-x-1/2
          -translate-y-1/2
          text-center
        "
      >
        <div className="mx-auto w-fit">

          {/* FIRST NAME */}

          <h1
            className="
              font-bigger-display
              whitespace-nowrap
              text-[19vw]
              font-normal
              uppercase
              leading-[0.82]
              tracking-[0.015em]
              text-[#F1EBDD]
              sm:text-[15vw]
              md:text-[11.5vw]
              lg:text-[10.5vw]
            "
          >
            {heroContent.firstName}
          </h1>

          {/* LAST NAME */}

          <h1
            className="
              mt-2
              font-bigger-display
              whitespace-nowrap
              text-[19vw]
              font-normal
              uppercase
              leading-[0.82]
              tracking-[0.015em]
              text-[#C8A951]
              sm:text-[15vw]
              md:text-[11.5vw]
              lg:text-[10.5vw]
            "
          >
            {heroContent.lastName}
          </h1>

          {/* DESCRIPTION */}

          <div
            className="
              mt-8
              flex
              items-center
              justify-center
              gap-3
            "
          >
            <span
              className="
                text-[11px]
                uppercase
                tracking-[0.28rem]
                text-[#F1EBDD]/60
                sm:text-[12px]
                md:text-[13px]
              "
            >
              {heroContent.roles[0]}
            </span>

            <span
              className="
                text-[11px]
                font-semibold
                text-[#C8A951]
              "
            >
              /
            </span>

            <span
              className="
                text-[11px]
                uppercase
                tracking-[0.28rem]
                text-[#F1EBDD]/60
                sm:text-[12px]
                md:text-[13px]
              "
            >
              {heroContent.roles[1]}
            </span>
          </div>

        {/* CTA BUTTONS + SOCIAL LINKS */}
<div className="mt-8 flex flex-col items-center">

  {/* Main CTA Buttons */}
  <div className="flex items-center justify-center gap-3">
    <a
      href={heroContent.resumeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="
        cursor-pointer
        inline-flex items-center
        text-[11px] uppercase tracking-[0.2rem]
        font-semibold
        text-[#0B0B0B]
        bg-[#C8A951]
        rounded-full
        px-6 py-3
        hover:bg-[#F1EBDD]
        hover:scale-105
        transition-all duration-300
      "
    >
      Resume
    </a>

    <div className="relative group/tooltip">
      <a
        href={heroContent.hireMeUrl}
        className="
          cursor-pointer
          inline-flex items-center
          text-[11px] uppercase tracking-[0.2rem]
          font-semibold
          text-[#F1EBDD]
          border border-[#C8A951]/50
          rounded-full
          px-6 py-3
          hover:bg-[#C8A951]
          hover:text-[#0B0B0B]
          hover:border-[#C8A951]
          hover:scale-105
          transition-all duration-300
        "
      >
        Hire Me
      </a>

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-full
          mt-2
          -translate-x-1/2
          whitespace-nowrap
          rounded-md
          bg-[#F1EBDD]
          px-3 py-1.5
          text-[10px]
          font-medium
          text-[#0B0B0B]
          opacity-0
          scale-95
          transition-all duration-200
          group-hover/tooltip:opacity-100
          group-hover/tooltip:scale-100
          z-40
        "
      >
        {heroContent.hireMeTooltip}
      </div>
    </div>
  </div>


  {/* Social Section */}
  <div className="mt-5 flex flex-col items-center">

    {/* Small visual label */}
    <span
      className="
        mb-2
        text-[9px]
        uppercase
        tracking-[0.3rem]
        text-[#F1EBDD]/50
      "
    >
      {heroContent.connectLabel}
    </span>

    <div className="flex items-center gap-3">
      {heroSocialLinks.map((social) => {
        const Icon = social.Icon;

        return (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.ariaLabel}
            className="
              group
              flex items-center justify-center
              w-12 h-12
              rounded-full
              border border-[#C8A951]/50
              bg-[#060606]
              text-[#F1EBDD]
              shadow-[0_0_15px_rgba(200,169,81,0.08)]
              hover:bg-[#C8A951]
              hover:text-[#0B0B0B]
              hover:border-[#C8A951]
              hover:shadow-[0_0_20px_rgba(200,169,81,0.35)]
              hover:scale-110
              transition-all duration-300
            "
          >
            <Icon
              size={19}
              className="transition-transform duration-300 group-hover:scale-110"
            />
          </a>
        );
      })}
    </div>
  </div>

</div>



        </div>
      </div>

      {/* ======================================
          BOTTOM META
      ====================================== */}

      <div
        ref={metaRef}
        className="
          absolute
          bottom-7
          left-6
          right-6
          z-30
          flex
          items-end
          justify-between
          sm:left-10
          sm:right-10
          md:left-14
          md:right-14
        "
      >
        <span
          className="
            text-[9px]
            uppercase
            tracking-[0.05rem]
            text-[#F1EBDD]/50
            sm:text-[10px]
          "
        >
          {heroContent.metaName}
        </span>

        <span
          className="
            text-[9px]
            uppercase
            tracking-[0.05rem]
            text-[#F1EBDD]/50
            sm:text-[10px]
          "
        >
          {heroContent.metaLocation}
        </span>
      </div>

      {/* ======================================
          SCROLL INDICATOR
      ====================================== */}

      <div
        className="
          absolute
          bottom-6
          left-1/2
          z-30
          hidden
          -translate-x-1/2
          flex-col
          items-center
          md:flex
        "
      >
        <span
          className="
            mb-2
            text-[6px]
            uppercase
            tracking-[0.45rem]
            text-[#F1EBDD]/25
          "
        >
          {heroContent.scrollLabel}
        </span>

        <div
          className="
            relative
            h-7
            w-px
            overflow-hidden
            bg-[#F1EBDD]/10
          "
        >
          <div
            className="
              absolute
              left-0
              top-0
              h-3
              w-px
              animate-[scrollLine_2s_ease-in-out_infinite]
              bg-[#C8A951]
            "
          />
        </div>
      </div>
    </section>
  );
}
