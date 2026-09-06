
// "use client";

// import React, { useEffect, useRef } from "react";

// const SPACING = 34;
// const BASE_RADIUS = 1.4;
// const MAX_RADIUS = 4.2;
// const INFLUENCE_RADIUS = 160;
// const EASE = 0.12;

// type Dot = {
//   x: number;
//   y: number;
//   ox: number;
//   oy: number;
// };

// const COLORS = ["#f93434", "#ff7a45", "#f2f2f2", "#8a8a8a"];

// export default function HeroDotField({
//   progressRef,
// }: {
//   progressRef: React.RefObject<number>;
// }) {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const wrapperRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const wrapper = wrapperRef.current;

//     if (!canvas || !wrapper) return;

//     const ctx = canvas.getContext("2d");

//     if (!ctx) return;

//     let dots: Dot[] = [];
//     let colorIndex: number[] = [];
//     let pointer = {
//       x: -9999,
//       y: -9999,
//     };

//     let rafId = 0;
//     let width = 0;
//     let height = 0;

//     const dpr = Math.min(window.devicePixelRatio || 1, 1.75);

//     const buildGrid = () => {
//       width = wrapper.clientWidth;
//       height = wrapper.clientHeight;

//       if (!width || !height) return;

//       canvas.width = Math.floor(width * dpr);
//       canvas.height = Math.floor(height * dpr);

//       canvas.style.width = `${width}px`;
//       canvas.style.height = `${height}px`;

//       ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

//       dots = [];
//       colorIndex = [];

//       const cols = Math.ceil(width / SPACING) + 1;
//       const rows = Math.ceil(height / SPACING) + 1;

//       for (let r = 0; r < rows; r++) {
//         for (let c = 0; c < cols; c++) {
//           dots.push({
//             x: c * SPACING,
//             y: r * SPACING,
//             ox: 0,
//             oy: 0,
//           });

//           colorIndex.push(
//             Math.random() < 0.1
//               ? 1 + Math.floor(Math.random() * 3)
//               : 0
//           );
//         }
//       }
//     };

//     const handlePointerMove = (
//       clientX: number,
//       clientY: number
//     ) => {
//       const rect = wrapper.getBoundingClientRect();

//       pointer.x = clientX - rect.left;
//       pointer.y = clientY - rect.top;
//     };

//     const onMouseMove = (e: MouseEvent) => {
//       handlePointerMove(e.clientX, e.clientY);
//     };

//     const onTouchMove = (e: TouchEvent) => {
//       const touch = e.touches[0];

//       if (touch) {
//         handlePointerMove(touch.clientX, touch.clientY);
//       }
//     };

//     const onPointerLeave = () => {
//       pointer.x = -9999;
//       pointer.y = -9999;
//     };

//     buildGrid();

//     window.addEventListener("mousemove", onMouseMove);
//     window.addEventListener("touchmove", onTouchMove, {
//       passive: true,
//     });
//     window.addEventListener("mouseleave", onPointerLeave);

//     const resizeObserver = new ResizeObserver(() => {
//       buildGrid();
//     });

//     resizeObserver.observe(wrapper);

//     const draw = (time: number) => {
//       ctx.clearRect(0, 0, width, height);

//       const t = time * 0.001;

//       for (let i = 0; i < dots.length; i++) {
//         const d = dots[i];

//         const dx = d.x - pointer.x;
//         const dy = d.y - pointer.y;

//         const dist = Math.sqrt(dx * dx + dy * dy);

//         let targetOx = 0;
//         let targetOy = 0;
//         let sizeBoost = 0;

//         if (dist < INFLUENCE_RADIUS) {
//           const falloff = 1 - dist / INFLUENCE_RADIUS;

//           const push =
//             falloff * falloff * 18;

//           const angle = Math.atan2(dy, dx);

//           targetOx =
//             Math.cos(angle) * push;

//           targetOy =
//             Math.sin(angle) * push;

//           sizeBoost =
//             falloff *
//             (MAX_RADIUS - BASE_RADIUS);
//         }

//         d.ox +=
//           (targetOx - d.ox) * EASE;

//         d.oy +=
//           (targetOy - d.oy) * EASE;

//         const idlePulse =
//           Math.sin(
//             t * 0.8 +
//               d.x * 0.01 +
//               d.y * 0.01
//           ) *
//             0.35 +
//           0.65;

//         const radius =
//           BASE_RADIUS * idlePulse +
//           sizeBoost;

//         const color =
//           COLORS[colorIndex[i]];

//         ctx.beginPath();

//         ctx.fillStyle = color;

//         ctx.globalAlpha =
//           colorIndex[i] === 0
//             ? 0.35 * idlePulse
//             : 0.55 +
//               sizeBoost * 0.08;

//         ctx.arc(
//           d.x + d.ox,
//           d.y + d.oy,
//           Math.max(radius, 0.4),
//           0,
//           Math.PI * 2
//         );

//         ctx.fill();
//       }

//       ctx.globalAlpha = 1;

//       rafId = requestAnimationFrame(draw);
//     };

//     rafId = requestAnimationFrame(draw);

//     return () => {
//       cancelAnimationFrame(rafId);

//       resizeObserver.disconnect();

//       window.removeEventListener(
//         "mousemove",
//         onMouseMove
//       );

//       window.removeEventListener(
//         "touchmove",
//         onTouchMove
//       );

//       window.removeEventListener(
//         "mouseleave",
//         onPointerLeave
//       );
//     };
//   }, []);

//   /*
//    * IMPORTANT:
//    *
//    * Do NOT change the opacity of the entire field to 0.
//    * That was causing the background to suddenly become visible.
//    *
//    * We only use a very subtle scale during scrolling.
//    */
//   useEffect(() => {
//     const wrapper = wrapperRef.current;

//     if (!wrapper) return;

//     let rafId = 0;

//     const update = () => {
//       const p = progressRef.current ?? 0;

//       const scale = 1 + p * 0.15;

//       wrapper.style.transform = `scale(${scale})`;

//       // Keep the field visible.
//       wrapper.style.opacity = "1";

//       rafId = requestAnimationFrame(update);
//     };

//     rafId = requestAnimationFrame(update);

//     return () => {
//       cancelAnimationFrame(rafId);
//     };
//   }, [progressRef]);

//   return (
//     <div
//       ref={wrapperRef}
//       className="absolute inset-0 z-0 h-full w-full pointer-events-none"
//       style={{
//         willChange: "transform",
//       }}
//     >
//       <canvas
//         ref={canvasRef}
//         className="block h-full w-full"
//       />
//     </div>
//   );
// }

"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import ParticleCanvas from "./ParticleCanvas";
import SocialLinks from "./SocialLinks";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const splashRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({
    x: 0,
    y: 0,
  });

  const targetMouse = useRef({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();

      targetMouse.current.x =
        e.clientX - rect.left - rect.width / 2;

      targetMouse.current.y =
        e.clientY - rect.top - rect.height / 2;
    };

    const handleMouseLeave = () => {
      targetMouse.current.x = 0;
      targetMouse.current.y = 0;
    };

    hero.addEventListener("mousemove", handleMouseMove);
    hero.addEventListener("mouseleave", handleMouseLeave);

    let raf = 0;

    const animate = () => {
      mouse.current.x +=
        (targetMouse.current.x - mouse.current.x) * 0.06;

      mouse.current.y +=
        (targetMouse.current.y - mouse.current.y) * 0.06;

      /*
       * Very subtle movement.
       * The splash itself is still controlled
       * by your ParticleCanvas.
       */

      if (bgTextRef.current) {
        bgTextRef.current.style.transform = `
          translate3d(
            ${mouse.current.x * 0.012}px,
            ${mouse.current.y * 0.012}px,
            0
          )
        `;
      }

      if (lineRef.current) {
        lineRef.current.style.transform = `
          translate3d(
            ${mouse.current.x * 0.035}px,
            ${mouse.current.y * 0.035}px,
            0
          )
        `;
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);

      hero.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      hero.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
    };
  }, []);

  useGSAP(
    () => {
      const hero = heroRef.current;
      const splash = splashRef.current;
      const bgText = bgTextRef.current;
      const line = lineRef.current;
      const meta = metaRef.current;
      const scroll = scrollRef.current;

      if (!hero) return;

      /*
       * INTRO
       */

      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      intro
        .fromTo(
          bgText,
          {
            opacity: 0,
            scale: 1.04,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1.5,
          },
          0
        )
        .fromTo(
          splash,
          {
            opacity: 0,
            scale: 0.96,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1.4,
          },
          0.15
        )
        .fromTo(
          meta,
          {
            opacity: 0,
            y: 15,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          0.7
        )
        .fromTo(
          line,
          {
            scaleX: 0,
            transformOrigin: "left center",
          },
          {
            scaleX: 1,
            duration: 1,
          },
          0.5
        )
        .fromTo(
          scroll,
          {
            opacity: 0,
            y: 10,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          1
        );

      /*
       * SCROLL EXIT
       *
       * Hero remains one viewport tall.
       * No 300vh.
       * No pinned black section.
       */

      const exit = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      exit
        .to(
          bgText,
          {
            y: -100,
            scale: 1.08,
            opacity: 0.1,
            ease: "none",
          },
          0
        )
        .to(
          splash,
          {
            y: -80,
            scale: 1.08,
            opacity: 0,
            ease: "none",
          },
          0
        )
        .to(
          meta,
          {
            y: -30,
            opacity: 0,
            ease: "none",
          },
          0
        )
        .to(
          line,
          {
            xPercent: 25,
            opacity: 0,
            ease: "none",
          },
          0
        )
        .to(
          scroll,
          {
            y: 20,
            opacity: 0,
            ease: "none",
          },
          0
        );

      ScrollTrigger.refresh();

      return () => {
        exit.kill();
      };
    },
    {
      scope: heroRef,
    }
  );

  return (
    <section
      ref={heroRef}
      className="
        relative
        h-svh
        min-h-[600px]
        w-full
        overflow-hidden
        bg-background
      "
    >
      {/* =====================================================
          VERY SUBTLE GRAIN
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          opacity-[0.035]
        "
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E\")",
        }}
      />

      {/* =====================================================
          GIANT BACKGROUND TYPOGRAPHY
      ====================================================== */}

      <div
        ref={bgTextRef}
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]
          flex
          items-center
          justify-center
          overflow-hidden
        "
        style={{
          willChange: "transform",
        }}
      >
        <div
          className="
            select-none
            whitespace-nowrap
            font-barlow-condensed
            text-[24vw]
            font-black
            uppercase
            leading-none
            tracking-[-0.08em]
            text-foreground/[0.025]
          "
        >
          RB
        </div>
      </div>

      {/* =====================================================
          TOP NAV / IDENTITY
      ====================================================== */}

      <div
        className="
          absolute
          left-6
          right-6
          top-6
          z-[50]
          flex
          items-start
          justify-between
          md:left-10
          md:right-10
          md:top-8
        "
      >
        <div>
          <div
            className="
              font-barlow-condensed
              text-sm
              font-bold
              tracking-[0.15em]
              text-foreground
            "
          >
            RB.
          </div>

          <div
            className="
              mt-1
              font-barlow-condensed
              text-[8px]
              uppercase
              tracking-[0.32rem]
              text-foreground/35
            "
          >
            Digital Craft
          </div>
        </div>

        <div
          className="
            text-right
            font-barlow-condensed
            text-[8px]
            uppercase
            tracking-[0.3rem]
            text-foreground/40
          "
        >
          <div>
            Portfolio
          </div>

          <div className="mt-1">
            2026
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN SPLASH
      ====================================================== */}

      <div
        ref={splashRef}
        className="
          absolute
          inset-0
          z-[20]
          flex
          items-center
          justify-center
        "
        style={{
          willChange:
            "transform, opacity",
        }}
      >
        <ParticleCanvas
          img="/Images/Home/Home_Particle_Text.webp"
          mixBlend={true}
        />
      </div>

      {/* =====================================================
          CENTRAL RED ART LINE
      ====================================================== */}

      <div
        ref={lineRef}
        className="
          pointer-events-none
          absolute
          left-0
          top-1/2
          z-[25]
          h-px
          w-full
          origin-left
          bg-gradient-to-r
          from-transparent
          via-[#f93434]/60
          to-transparent
        "
        style={{
          willChange:
            "transform",
        }}
      />

      {/* =====================================================
          NAME / ROLE
      ====================================================== */}

      <div
        ref={metaRef}
        className="
          pointer-events-none
          absolute
          bottom-[17%]
          left-1/2
          z-[35]
          w-full
          -translate-x-1/2
          text-center
          px-6
        "
      >
        <h1
          className="
            font-barlow-condensed
            text-[11px]
            font-medium
            uppercase
            tracking-[0.55rem]
            text-foreground/70
            md:text-sm
            md:tracking-[0.75rem]
          "
        >
          Rudransh Bhagat
        </h1>

        <div
          className="
            mx-auto
            mt-3
            h-px
            w-8
            bg-[#f93434]/70
          "
        />

        <p
          className="
            mt-3
            font-barlow-condensed
            text-[8px]
            uppercase
            tracking-[0.38rem]
            text-foreground/35
            md:text-[9px]
          "
        >
          Full Stack Developer · Creative Technologist
        </p>
      </div>

      {/* =====================================================
          LEFT SIDE INDEX
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-6
          top-1/2
          z-[30]
          hidden
          -translate-y-1/2
          md:left-10
          md:block
        "
      >
        <div
          className="
            flex
            flex-col
            gap-2
            font-barlow-condensed
            text-[8px]
            uppercase
            tracking-[0.25rem]
            text-foreground/30
          "
        >
          <span>
            01
          </span>

          <span>
            / Home
          </span>

          <span
            className="
              mt-2
              h-8
              w-px
              bg-foreground/10
            "
          />

          <span>
            Scroll
          </span>
        </div>
      </div>

      {/* =====================================================
          RIGHT SIDE STATUS
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          right-6
          top-1/2
          z-[30]
          hidden
          -translate-y-1/2
          md:right-10
          md:block
        "
      >
        <div
          className="
            flex
            flex-col
            items-end
            gap-2
            font-barlow-condensed
            text-[8px]
            uppercase
            tracking-[0.25rem]
            text-foreground/30
          "
        >
          <span>
            India
          </span>

          <span>
            Available
          </span>

          <span
            className="
              mt-1
              flex
              items-center
              gap-2
              text-foreground/50
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#f93434]
                shadow-[0_0_8px_rgba(249,52,52,0.7)]
              "
            />

            Online
          </span>
        </div>
      </div>

      {/* =====================================================
          SOCIAL LINKS
      ====================================================== */}

      <div
        className="
          absolute
          bottom-7
          left-6
          z-[50]
          md:left-10
        "
      >
        <SocialLinks />
      </div>

      {/* =====================================================
          SCROLL INDICATOR
      ====================================================== */}

      <div
        ref={scrollRef}
        className="
          absolute
          bottom-7
          left-1/2
          z-[50]
          flex
          -translate-x-1/2
          flex-col
          items-center
        "
      >
        <span
          className="
            mb-3
            font-barlow-condensed
            text-[8px]
            uppercase
            tracking-[0.45rem]
            text-foreground/35
          "
        >
          Explore
        </span>

        <div
          className="
            relative
            h-9
            w-px
            overflow-hidden
            bg-foreground/10
          "
        >
          <div
            className="
              absolute
              left-0
              top-0
              h-4
              w-px
              animate-[scrollLine_1.8s_ease-in-out_infinite]
              bg-foreground/60
            "
          />
        </div>
      </div>

      {/* =====================================================
          EDGE VIGNETTE
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[45]
        "
      >
        <div
          className="
            absolute
            inset-x-0
            top-0
            h-32
            bg-gradient-to-b
            from-background/50
            to-transparent
          "
        />

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-32
            bg-gradient-to-t
            from-background/50
            to-transparent
          "
        />
      </div>
    </section>
  );
}