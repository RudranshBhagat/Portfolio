"use client";

import React from "react";
import { usePageTransition } from "@/components/TransitionRouter";
import { playClick, playHover } from "@/lib/soundEffects";

// Swap this for your actual resume — either a Drive/Dropbox share link, or a
// PDF dropped into /public (e.g. "/resume.pdf") if you'd rather serve it
// directly from your own site instead of a third-party link.
const RESUME_URL = "/resume.pdf";

export default function HeroCTAButtons() {
  const { navigate } = usePageTransition();

  const handleHireMe = () => {
    playClick();
    navigate("/contact");
  };

  return (
    <div className="flex items-center justify-center gap-3 md:gap-4">
      {/* Resume — solid fill, primary action, opens in a new tab */}
      <a
        href={RESUME_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => playClick()}
        onMouseEnter={() => playHover()}
        className="cursor-pointer inline-flex items-center gap-2 font-barlow-condensed tracking-[.2rem] text-[.7rem] md:text-xs uppercase font-bold text-[#131212] bg-orange rounded-full px-6 py-3 md:px-7 md:py-3.5 hover:bg-foreground transition-all duration-300"
      >
        Resume
      </a>

      {/* Hire Me — outline, secondary action, routes to the contact page */}
      <button
        onClick={handleHireMe}
        onMouseEnter={() => playHover()}
        className="cursor-pointer inline-flex items-center gap-2 font-barlow-condensed tracking-[.2rem] text-[.7rem] md:text-xs uppercase font-bold text-foreground border border-foreground/30 rounded-full px-6 py-3 md:px-7 md:py-3.5 hover:bg-orange hover:text-[#131212] hover:border-orange transition-all duration-300"
      >
        Hire Me
      </button>
    </div>
  );
}