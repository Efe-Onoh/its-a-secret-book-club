"use client";

import { useRef, useEffect, useState } from "react";

export default function About() {
  // useRef gives us direct access to the section DOM element
  // We need this to measure how far the user has scrolled through it
  const sectionRef = useRef<HTMLElement>(null);

  // state tracks which of the three views is currently active
  // 0 = WHO WE ARE, 1 = about text, 2 = stats
  const [state, setState] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      // getBoundingClientRect() tells us where the element is
      // relative to the viewport right now
      const rect = sectionRef.current.getBoundingClientRect();

      // How far has the user scrolled INTO this section?
      // rect.top starts at 0 when section hits the top of the viewport
      // As user scrolls down, rect.top goes negative
      const scrolledInto = -rect.top;

      // Each state occupies one viewport height (window.innerHeight)
      // So we divide scrolledInto by viewport height to get which state we're in
      const vh = window.innerHeight;

      if (scrolledInto < vh * 0.5) {
        setState(0); // WHO WE ARE
      } else if (scrolledInto < vh * 1.5) {
        setState(1); // About text
      } else {
        setState(2); // Stats
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // Section is 300vh tall — gives us 3 scroll lengths to work with
    // overflow-hidden prevents content from showing outside the sticky container
    <section className="snap-section" ref={sectionRef} style={{ height: "300vh", background: "var(--color-about-bg)" }}>
      {/* Sticky container — stays pinned to top while parent scrolls */}
      {/* This is the "camera" that never moves */}
      <div className="sticky top-0 flex items-center justify-center overflow-hidden" style={{ height: "100vh" }}>
        {/* WHO WE ARE — State 0 */}
        {/* Always visible as the base layer */}
        <h2
          className="font-display uppercase text-center leading-none w-full px-4 absolute transition-all duration-700"
          style={{
            fontSize: "clamp(40px, min(25vh, 20vw), 320px)",
            letterSpacing: "-0.04em",
            color: "var(--color-about-ink)",
            // When state moves past 0, slide WHO WE ARE to the left and fade out
            transform: state > 0 ? "translateX(-100%)" : "translateX(0)",
            opacity: state > 0 ? 0 : 1,
          }}
        >
          WHO
          <br />
          WE
          <br />
          ARE
        </h2>

        {/* About text — State 1 */}
        {/* Starts off-screen to the right, slides in when state === 1 */}
        <div
          className="absolute w-full max-w-2xl px-12 transition-all duration-700"
          style={{
            // Starts to the right, moves to centre, then exits to the left
            transform:
              state === 0
                ? "translateX(100%)" // waiting off-screen right
                : state === 1
                  ? "translateX(0)" // centre of screen
                  : "translateX(-100%)", // exited off-screen left
            opacity: state === 1 ? 1 : 0,
            color: "var(--color-about-ink)",
          }}
        >
          <p className="font-body text-xl md:text-2xl leading-relaxed mb-8" style={{ opacity: 0.85 }}>
            It's A Secret Book Club is a monthly reading group for people who take books seriously. No gatekeeping. No pretension. Just good readers and honest conversation.
          </p>
          <p className="font-body text-xl md:text-2xl leading-relaxed" style={{ opacity: 0.85 }}>
            We meet in person in Dubai and rotate through fiction that makes you think differently about the world.
          </p>
        </div>

        {/* Stats — State 2 */}
        {/* Starts off-screen to the left, slides in when state === 2 */}
        <div
          className="absolute w-full px-12 transition-all duration-700"
          style={{
            transform: state < 2 ? "translateX(100%)" : "translateX(0)",
            opacity: state === 2 ? 1 : 0,
            color: "var(--color-about-ink)",
          }}
        >
          <div className="flex flex-col gap-12 max-w-3xl mx-auto text-center">
            {[
              { value: "12", label: "Members per session" },
              { value: "Monthly", label: "How often we meet" },
              { value: "Dubai", label: "Where we gather" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-2">
                <span className="font-display uppercase leading-none" style={{ fontSize: "clamp(48px, 10vw, 120px)", letterSpacing: "-0.03em" }}>
                  {value}
                </span>
                <span className="font-body text-xs uppercase tracking-widest" style={{ opacity: 0.5 }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
