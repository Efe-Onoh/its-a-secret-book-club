"use client";

import { useEffect, useRef, useState } from "react";

interface Event {
  id: string;
  title: string;
  author: string;
  isbn: string;
  date: string;
  time: string;
  location: string;
  spots: number;
  description: string;
}

// Ticket component — one per event
// Image left, perforated edge, details right
function EventTicket({ event, visible, delay }: { event: Event; visible: boolean; delay: number }) {
  const coverUrl = `https://covers.openlibrary.org/b/isbn/${event.isbn}-L.jpg`;

  return (
    <div
      className="w-full h-[150] flex rounded-2xl overflow-hidden bg-white transition-all duration-700"
      style={{
        transform: visible ? "translateY(0)" : "translateY(60px)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${delay}ms`,
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        // On mobile — fixed width for carousel
        // On desktop — full width of grid cell
      }}
    >
      {/* Left — book cover fills entire left side with padding */}
      <div className="max-w-[120] flex-shrink-0 p-2" style={{ background: "#f0f0f0" }}>
        <img
          src={coverUrl}
          alt={event.title}
          className="h-full md:w-full md:h-full object-cover rounded-xl"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>

      {/* Perforated edge — small circles stacked vertically */}
      {/* repeating-linear-gradient creates the dot pattern */}
      <div className="flex-shrink-0 w-[15] md:w-[20] relative flex flex-col gap-1">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#000", opacity: 0.4 }} />
        ))}
        {/* Top notch */}
        <div className="absolute -left-2 -top-2 w-5 h-5 rounded-full" style={{ background: "var(--color-events-bg)" }} />
        {/* Bottom notch */}
        <div className="absolute -left-2 -bottom-2 w-5 h-5 rounded-full" style={{ background: "var(--color-events-bg)" }} />
      </div>
      <div className="flex flex-col flex-1 px-2 md:px-4 py-3 min-w-0 justify-between">
        <p className=" font-body text-[8px] md:text-[10px] uppercase tracking-[0.2em] truncate" style={{ color: "#000", opacity: 0.5 }}>
          {event.date} · {event.time}
        </p>
        {/* Right — event details + big RSVP */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 flex-1 min-w-0">
          {/* Left side of details */}
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <h3
              className="font-display uppercase leading-none"
              style={{
                fontSize: "clamp(12px, 2vw, 18px)",
                letterSpacing: "-0.02em",
                color: "#000",
              }}
            >
              {event.title}
            </h3>
            <p className="font-body text-[12px] md:text-xs truncate" style={{ color: "#000", opacity: 0.6 }}>
              by {event.author}
            </p>
            <p className="font-body text-[10px] md:text-[10px] truncate" style={{ color: "#000", opacity: 0.4 }}>
              {event.location} · {event.spots} spots
            </p>
          </div>
          {/* RSVP — right side, big and bold */}
          <button
            className="font-display uppercase flex-shrink-0 px-4 py-2 rounded-full border-2 transition-all duration-200 hover:opacity-70"
            style={{
              fontSize: "clamp(12px, 1.5vw, 18px)",
              letterSpacing: "-0.01em",
              borderColor: "#000",
              color: "#000",
            }}
          >
            RSVP
          </button>
        </div>
      </div>
    </div>
  );
}
export default function Events({ events }: { events: Event[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  // visible controls whether tickets have animated in
  // starts false — tickets are below screen
  // becomes true when section enters viewport
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Intersection Observer watches the section
    // When it enters the viewport, we set visible to true
    // This triggers the CSS transition on each ticket
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else {
          // Reset when section leaves — so animation replays on re-entry
          setVisible(false);
        }
      },
      // threshold: 0.2 means the animation triggers when
      // 20% of the section is visible in the viewport
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  // useEffect(() => {
  //   // Intersection Observer watches the section
  //   // When it enters the viewport, we set visible to true
  //   // This triggers the CSS transition on each ticket
  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       if (entry.isIntersecting) {
  //         setVisible(true);
  //       } else {
  //         // Reset when section leaves — so animation replays on re-entry
  //         setVisible(false);
  //       }
  //     },
  //     // threshold: 0.2 means the animation triggers when
  //     // 20% of the section is visible in the viewport
  //     { threshold: 0.2 },
  //   );

  //   // Small timeout gives the browser time to finish
  //   // painting before the observer starts watching
  //   const timer = setTimeout(() => {
  //     if (sectionRef.current) {
  //       observer.observe(sectionRef.current);
  //     }
  //   }, 100);

  //   return () => {
  //     clearTimeout(timer);
  //     observer.disconnect();
  //   };
  // }, []);

  return (
    <section
      ref={sectionRef}
      className="snap-section flex flex-col justify-center px-8 md:px-16 py-16 gap-8"
      style={{
        background: "var(--color-events-bg)",
        color: "var(--color-events-ink)",
      }}
    >
      {/* Section header */}
      <div>
        <p className="font-body text-xs uppercase tracking-[0.4em] mb-3" style={{ opacity: 0.5 }}>
          What's coming up
        </p>
        <h2
          className="font-display uppercase leading-none"
          style={{
            fontSize: "clamp(36px, 6vw, 80px)",
            letterSpacing: "-0.03em",
          }}
        >
          Upcoming Events
        </h2>
      </div>
      {/* 
        Mobile — horizontal carousel, swipe left/right
        Desktop — 2 column grid 
      */}

      {/* Mobile carousel — hidden on md and above */}
      <div
        className="flex md:hidden gap-6 overflow-x-auto pb-2"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}
      >
        {events.map((event, i) => (
          <div key={event.id} className="flex-shrink-0 w-[80vw]" style={{ scrollSnapAlign: "start" }}>
            <EventTicket event={event} visible={visible} delay={i * 100} />
          </div>
        ))}
      </div>
      {/* Ticket grid */}
      {/* 1 column mobile, 2 columns from md, 3 from lg */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {events.map((event, i) => (
          <EventTicket
            key={event.id}
            event={event}
            visible={visible}
            // Each ticket gets a staggered delay — 0ms, 150ms, 300ms
            // So they fly in one after another, not all at once
            delay={i * 150}
          />
        ))}
      </div>
      {/* Swipe hint — mobile only */}
      <p className="flex md:hidden font-body text-xs uppercase tracking-widest" style={{ opacity: 0.4, color: "var(--color-events-ink, #0a0a0a)" }}>
        Swipe to see more →
      </p>
    </section>
  );
}
