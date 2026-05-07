import { Inter, EB_Garamond } from "next/font/google";
import JoinForm from "./components/JoinForm";
const inter = Inter({ subsets: ["latin"], weight: ["900"], variable: "--font-display" });
const garamond = EB_Garamond({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-body" });

// Colour swatches — section backgrounds rotate through these randomly via JS
// Each swatch has a bg and a matching ink colour for readable text
const SWATCHES = [
  { bg: "#E63946", ink: "#FFF9F9" },
  { bg: "#2196F3", ink: "#F0F8FF" },
  { bg: "#FF9800", ink: "#1A0A00" },
  { bg: "#9C27B0", ink: "#FAF0FF" },
  { bg: "#4CAF50", ink: "#F0FFF0" },
  { bg: "#FF4081", ink: "#FFF0F5" },
  { bg: "#00BCD4", ink: "#F0FEFF" },
  { bg: "#FFEB3B", ink: "#1A1800" },
  { bg: "#FF5722", ink: "#FFF5F0" },
  { bg: "#3F51B5", ink: "#F0F2FF" },
  { bg: "#F8BBD0", ink: "#1A0A0F" },
  { bg: "#B2EBF2", ink: "#0A1A1C" },
  { bg: "#1B1B1B", ink: "#F9F8F5" },
  { bg: "#FFF9C4", ink: "#1A1800" },
  { bg: "#E8F5E9", ink: "#0A1A0F" },
];

const EVENTS = [
  {
    id: "e1",
    title: "The Midnight Library",
    author: "Matt Haig",
    date: "Friday 17 May 2025",
    time: "7:00 PM",
    location: "Alserkal Avenue, Dubai",
    spots: 12,
    description: "A story about all the lives we ever dreamed of living. Come ready to talk about regret, choice, and second chances.",
  },
  {
    id: "e2",
    title: "Yellowface",
    author: "R.F. Kuang",
    date: "Friday 7 June 2025",
    time: "7:00 PM",
    location: "Alserkal Avenue, Dubai",
    spots: 12,
    description: "Publishing, identity, and who gets to tell whose story. A sharp, uncomfortable, necessary read.",
  },
  {
    id: "e3",
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    date: "Friday 4 July 2025",
    time: "7:00 PM",
    location: "Alserkal Avenue, Dubai",
    spots: 12,
    description: "Love, creativity, and what it means to make something. One of the best novels of the decade.",
  },
];

const CURRENT_BOOK = {
  title: "The Vegetarian",
  author: "Han Kang",
  description: "A woman's quiet act of refusal sends shockwaves through her family. Unsettling, beautiful, unforgettable.",
  meeting: "Friday 3 May 2025 · 7:00 PM · Alserkal Avenue",
};

export default function Home() {
  return (
    <main className={`${inter.variable} ${garamond.variable}`}>
      <Hero />
      <About />
      <CurrentBook />
      <Events />
      <Join />
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <section className="snap-section flex flex-col items-center justify-center text-center px-8 relative" style={{ background: "var(--color-hero-bg)", color: "var(--color-hero-ink)" }}>
      <p className="font-body text-sm uppercase tracking-[0.4em] mb-6 opacity-70">Dubai · Est. 2024</p>
      <h1 className="font-display uppercase leading-none mb-8" style={{ fontSize: "clamp(60px, 14vw, 180px)", letterSpacing: "-0.03em" }}>
        IT'S A<br />
        SECRET
        <br />
        BOOK
        <br />
        CLUB
      </h1>
      <p className="font-body text-lg md:text-xl max-w-md opacity-80 mb-12">We meet monthly. We read seriously. We don't tell everyone.</p>

      <a
        href="#join"
        className="font-display uppercase text-sm tracking-[0.2em] px-10 py-5 border-2 hover:opacity-70 transition-opacity duration-300 no-underline"
        style={{ borderColor: "var(--color-hero-ink)", color: "var(--color-hero-ink)" }}
      >
        Apply to join
      </a>

      {/* Scroll hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="font-body text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-px h-10" style={{ background: "var(--color-hero-ink)" }} />
      </div>
    </section>
  );
}

//dont need do we? here?
function About() {
  return (
    <section className="snap-section flex flex-col md:flex-row" style={{ background: "var(--color-about-bg)", color: "var(--color-about-ink)" }}>
      {/* Left — big label */}
      <div className="flex items-center justify-center md:w-1/2 p-16 border-b md:border-b-0 md:border-r" style={{ borderColor: "var(--color-about-ink)" }}>
        <h2 className="font-display uppercase leading-none" style={{ fontSize: "clamp(48px, 8vw, 120px)", letterSpacing: "-0.03em" }}>
          WHO
          <br />
          WE
          <br />
          ARE
        </h2>
      </div>

      {/* Right — text */}
      <div className="flex flex-col justify-center md:w-1/2 p-16 gap-8">
        <p className="font-body text-xl leading-relaxed" style={{ color: "var(--color-about-ink)", opacity: 0.7 }}>
          It's A Secret Book Club is a monthly reading group for people who take books seriously. No gatekeeping. No pretension. Just good readers and honest conversation.
        </p>
        <p className="font-body text-xl leading-relaxed" style={{ color: "var(--color-about-ink)", opacity: 0.7 }}>
          We meet in person in Dubai, keep groups small at 12 people maximum, and rotate through fiction that makes you think differently about the world.
        </p>
        <div className="grid grid-cols-3 gap-6 pt-8 border-t" style={{ borderColor: "var(--color-about-ink)" }}>
          {[
            { value: "12", label: "Members per session" },
            { value: "Monthly", label: "How often we meet" },
            { value: "Dubai", label: "Where we gather" },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="font-display text-3xl md:text-4xl uppercase" style={{ color: "var(--color-about-ink)" }}>
                {value}
              </div>
              <div className="font-body text-xs uppercase tracking-widest mt-1" style={{ color: "var(--color-about-ink)", opacity: 0.4 }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CurrentBook() {
  return (
    <section className="snap-section flex flex-col items-center justify-center text-center px-8 md:px-24" style={{ background: "var(--color-currentbook-bg)", color: "var(--color-currentbook-ink)" }}>
      <p className="font-body text-xs uppercase tracking-[0.4em] mb-8 opacity-60" style={{ color: "var(--color-currentbook-ink)", opacity: 0.6 }}>
        Currently reading
      </p>
      <h2 className="font-display uppercase leading-none mb-4" style={{ fontSize: "clamp(48px, 10vw, 140px)", letterSpacing: "-0.03em" }}>
        {CURRENT_BOOK.title}
      </h2>
      <p className="font-body text-xl mb-8 opacity-70" style={{ color: "var(--color-currentbook-ink)", opacity: 0.7 }}>
        by {CURRENT_BOOK.author}
      </p>
      <p className="font-body text-lg md:text-xl max-w-lg leading-relaxed mb-10 opacity-80" style={{ color: "var(--color-currentbook-ink)", opacity: 0.8 }}>
        {CURRENT_BOOK.description}
      </p>
      <p className="font-body text-sm uppercase tracking-[0.2em] opacity-60" style={{ color: "var(--color-currentbook-ink)", opacity: 0.6 }}>
        {CURRENT_BOOK.meeting}
      </p>
    </section>
  );
}

function Events() {
  return (
    <section className="snap-section flex flex-col" style={{ background: "var(--color-events-bg)", color: "var(--color-events-ink)" }}>
      {/* Section header */}
      <div className="px-8 md:px-16 pt-16 pb-8 border-b" style={{ borderColor: "var(--color-events-ink)" }}>
        <p className="font-body text-xs uppercase tracking-[0.4em] mb-4">What's coming up</p>
        <h2 className="font-display uppercase leading-none" style={{ fontSize: "clamp(40px, 7vw, 100px)", letterSpacing: "-0.03em" }}>
          Upcoming
          <br />
          Events
        </h2>
      </div>

      {/* Horizontal scrolling ticket cards */}
      <div
        className="flex gap-6 px-8 md:px-16 py-12 overflow-x-auto"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}
      >
        {EVENTS.map((event, i) => (
          <EventTicket key={event.id} event={event} swatchIndex={i} />
        ))}
      </div>

      <p className="px-8 md:px-16 pb-8 font-body text-xs uppercase tracking-widest opacity-40" style={{ color: "var(--color-events-ink)", opacity: 0.4 }}>
        Swipe to see more →
      </p>
    </section>
  );
}

// EventTicket — styled like a physical event ticket
// Each card gets a different swatch colour
//tickets are literally physical ux ticket, white, with the dotted line for tear off style
//rectangular not square, like voucher for internet. dotted circles are vertical
//at the beginning and in the square before the dotted line its an image
// these slide in from left and right one after the other to the
// center of the section to be stacked there in rows as the page scrolls
function EventTicket({ event, swatchIndex }: { event: (typeof EVENTS)[0]; swatchIndex: number }) {
  const swatch = SWATCHES[swatchIndex % SWATCHES.length];

  return (
    <div
      className="flex-shrink-0 flex flex-col rounded-none border-2"
      style={{
        width: "clamp(280px, 38vw, 420px)",
        scrollSnapAlign: "start",
        borderColor: swatch.bg,
        minHeight: "420px",
      }}
    >
      {/* Ticket top — coloured */}
      <div className="flex flex-col gap-2 p-8 flex-1" style={{ background: swatch.bg, color: swatch.ink }}>
        <p className="font-body text-xs uppercase tracking-[0.3em] opacity-70">
          {event.date} · {event.time}
        </p>
        <h3 className="font-display uppercase leading-none mt-2" style={{ fontSize: "clamp(24px, 3vw, 40px)", letterSpacing: "-0.02em" }}>
          {event.title}
        </h3>
        <p className="font-body text-sm opacity-80 mt-1">by {event.author}</p>
        <p className="font-body text-sm leading-relaxed mt-4 opacity-75 flex-1">{event.description}</p>
      </div>

      {/* Ticket divider — perforated line effect */}
      <div className="flex items-center gap-0 px-4 py-3 border-t-2 border-dashed" style={{ borderColor: swatch.bg, background: "#F9F8F5" }}>
        <div className="w-4 h-4 rounded-full -ml-6 border-2" style={{ background: "#F9F8F5", borderColor: swatch.bg }} />
        <div className="flex-1" />
        <div className="w-4 h-4 rounded-full -mr-6 border-2" style={{ background: "#F9F8F5", borderColor: swatch.bg }} />
      </div>

      {/* Ticket bottom — white, booking info */}
      <div className="flex items-center justify-between px-8 py-6" style={{ background: "#F9F8F5" }}>
        <div>
          <p className="font-body text-xs uppercase tracking-widest opacity-50 mb-1">Location</p>
          <p className="font-body text-sm font-medium">{event.location}</p>
        </div>
        <div className="text-right">
          <p className="font-body text-xs uppercase tracking-widest opacity-50 mb-1">Spots</p>
          <p className="font-body text-sm font-medium">{event.spots} available</p>
        </div>
      </div>
    </div>
  );
}

function Join() {
  return (
    <section id="join" className="snap-section flex flex-col md:flex-row" style={{ background: "var(--color-join-bg)", color: "var(--color-join-ink)" }}>
      {/* Left */}
      <div className="flex flex-col justify-center md:w-1/2 p-16 border-b md:border-b-0 md:border-r" style={{ borderColor: "var(--color-join-ink)" }}>
        <p className="font-body text-xs uppercase tracking-[0.4em] mb-6 opacity-70" style={{ color: "var(--color-join-ink)", opacity: 0.7 }}>
          Membership
        </p>
        <h2 className="font-display uppercase leading-none mb-8" style={{ color: "var(--color-join-ink)", opacity: 0.8, fontSize: "clamp(48px, 7vw, 100px)", letterSpacing: "-0.03em" }}>
          WANT
          <br />
          IN?
        </h2>
        <p className="font-body text-lg leading-relaxed opacity-80 max-w-sm" style={{ color: "var(--color-join-ink)", opacity: 0.8 }}>
          Sessions are free. Spots are limited to 12. Tell us a little about yourself and the book that changed you.
        </p>
      </div>

      {/* Right — form */}
      <JoinForm />
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="py-10 px-8 md:px-16 flex flex-col md:flex-row justify-between items-center gap-4 border-t"
      style={{ background: "var(--color-footer-bg)", color: "var(--color-footer-ink)", borderColor: "var(--color-footer-ink)" }}
    >
      <span className="font-display text-lg uppercase tracking-tight">It's A Secret Book Club</span>
      <p className="font-body text-xs uppercase tracking-widest opacity-40">Dubai · {new Date().getFullYear()}</p>

      <a href="https://instagram.com" className="font-body text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity no-underline">
        @itsasecretbookclub
      </a>
    </footer>
  );
}
