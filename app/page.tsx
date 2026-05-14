import { Inter, EB_Garamond } from "next/font/google";
import JoinForm from "./components/JoinForm";
import About from "./components/About";
import Events from "./components/Events";
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
// const EVENTS = [
//   {
//     id: "e1",
//     title: "The Midnight Library",
//     author: "Matt Haig",
//     isbn: "9780525559474",
//     date: "Friday 17 May 2025",
//     time: "7:00 PM",
//     location: "Alserkal Avenue, Dubai",
//     spots: 12,
//     description: "A story about all the lives we ever dreamed of living.",
//   },
//   {
//     id: "e2",
//     title: "Yellowface",
//     author: "R.F. Kuang",
//     isbn: "9780063250994",
//     date: "Friday 7 June 2025",
//     time: "7:00 PM",
//     location: "Alserkal Avenue, Dubai",
//     spots: 12,
//     description: "Publishing, identity, and who gets to tell whose story.",
//   },
//   {
//     id: "e3",
//     title: "Tomorrow, and Tomorrow, and Tomorrow",
//     author: "Gabrielle Zevin",
//     isbn: "9780593321201",
//     date: "Friday 4 July 2025",
//     time: "7:00 PM",
//     location: "Alserkal Avenue, Dubai",
//     spots: 12,
//     description: "Love, creativity, and what it means to make something.",
//   },
//   {
//     id: "e4",
//     title: "Demon Copperhead",
//     author: "Barbara Kingsolver",
//     isbn: "9780063251922",
//     date: "Friday 1 August 2025",
//     time: "7:00 PM",
//     location: "Alserkal Avenue, Dubai",
//     spots: 12,
//     description: "A modern Dickens set in Appalachia. Devastating and necessary.",
//   },
//   {
//     id: "e5",
//     title: "The Covenant of Water",
//     author: "Abraham Verghese",
//     isbn: "9780802162175",
//     date: "Friday 5 September 2025",
//     time: "7:00 PM",
//     location: "Alserkal Avenue, Dubai",
//     spots: 12,
//     description: "Three generations of a South Indian family. Vast, warm, unforgettable.",
//   },
//   {
//     id: "e6",
//     title: "James",
//     author: "Percival Everett",
//     isbn: "9780385550888",
//     date: "Friday 3 October 2025",
//     time: "7:00 PM",
//     location: "Alserkal Avenue, Dubai",
//     spots: 12,
//     description: "Huckleberry Finn retold from Jim's perspective. Brilliant and overdue.",
//   },
// ];
const EVENTS = [
  {
    id: "e1",
    title: "Girl on Girl",
    author: "Sophie Gilbert",
    isbn: "9780593656297",
    date: "Friday 5 June 2026",
    time: "7:00 PM",
    location: "Alserkal Avenue, Dubai",
    spots: 12,
    description: "A blazing critique of how early-aughts pop culture turned women against themselves.",
  },
  {
    id: "e2",
    title: "Penance",
    author: "Eliza Clark",
    isbn: "9780063327856",
    date: "Friday 3 July 2026",
    time: "7:00 PM",
    location: "Alserkal Avenue, Dubai",
    spots: 12,
    description: "A chilling story of murder among teenage girls. Unputdownable.",
  },
  {
    id: "e3",
    title: "Margo's Got Money Troubles",
    author: "Rufi Thorpe",
    isbn: "9781399732512",
    date: "Friday 7 August 2026",
    time: "7:00 PM",
    location: "Alserkal Avenue, Dubai",
    spots: 12,
    description: "Blisteringly funny. A young mother's wildly original fight to make it.",
  },
  {
    id: "e4",
    title: "Women, Race & Class",
    author: "Angela Y. Davis",
    isbn: "0394713516",
    date: "Friday 4 September 2026",
    time: "7:00 PM",
    location: "Alserkal Avenue, Dubai",
    spots: 12,
    description: "The landmark text on intersectionality. Essential reading.",
  },
  {
    id: "e5",
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    isbn: "9780593321201",
    date: "Friday 2 October 2026",
    time: "7:00 PM",
    location: "Alserkal Avenue, Dubai",
    spots: 12,
    description: "Love, creativity, and what it means to make something. One of the best novels of the decade.",
  },
  {
    id: "e6",
    title: "Yellowface",
    author: "R.F. Kuang",
    isbn: "9780063250864",
    date: "Friday 6 November 2026",
    time: "7:00 PM",
    location: "Alserkal Avenue, Dubai",
    spots: 12,
    description: "Publishing, identity, and who gets to tell whose story.",
  },
  // Reserve pool — not displayed, available to swap in
  {
    id: "e7",
    title: "The Midnight Library",
    author: "Matt Haig",
    isbn: "9780525559474",
    date: "Friday 4 December 2026",
    time: "7:00 PM",
    location: "Alserkal Avenue, Dubai",
    spots: 12,
    description: "A story about all the lives we ever dreamed of living.",
  },
  {
    id: "e8",
    title: "Demon Copperhead",
    author: "Barbara Kingsolver",
    isbn: "9780063251922",
    date: "Friday 1 January 2027",
    time: "7:00 PM",
    location: "Alserkal Avenue, Dubai",
    spots: 12,
    description: "A modern Dickens set in Appalachia. Devastating and necessary.",
  },
  {
    id: "e9",
    title: "The Covenant of Water",
    author: "Abraham Verghese",
    isbn: "9780802162175",
    date: "Friday 5 February 2027",
    time: "7:00 PM",
    location: "Alserkal Avenue, Dubai",
    spots: 12,
    description: "Three generations of a South Indian family. Vast, warm, unforgettable.",
  },
  {
    id: "e10",
    title: "James",
    author: "Percival Everett",
    isbn: "9780385550369",
    date: "Friday 5 March 2027",
    time: "7:00 PM",
    location: "Alserkal Avenue, Dubai",
    spots: 12,
    description: "Huckleberry Finn retold from Jim's perspective. Brilliant and overdue.",
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
      <Events events={EVENTS.slice(0, 6)} />
      {/* <Join /> */}
      <JoinIntro />
      <JoinFormSection />
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <section className="snap-section flex flex-col gap-8 items-center justify-center text-center overflow-hidden" style={{ background: "var(--color-hero-bg)", color: "var(--color-hero-ink)" }}>
      <h1
        className="font-display uppercase text-center leading-none w-full px-4"
        style={{
          fontSize: "clamp(40px, min(25vh,20vw), 320px)",
          letterSpacing: "-0.04em",
          color: "var(--color-hero-ink)",
          wordBreak: "break-word",
        }}
      >
        IT'S A SECRET BOOK CLUB
      </h1>
      <p className="font-body text-xl md:text-xl max-w-1/2 opacity-80">We meet monthly. We read seriously. We don't tell everyone.</p>
    </section>
  );
}

//dont need do we? here?
// function About() {
//   return (
//     <section className="snap-section flex flex-col md:flex-row" style={{ background: "var(--color-about-bg)", color: "var(--color-about-ink)" }}>
//       {/* Left — big label */}
//       <div className="flex items-center justify-center md:w-1/2 p-16 border-b md:border-b-0 md:border-r" style={{ borderColor: "var(--color-about-ink)" }}>
//         <h2 className="font-display uppercase leading-none" style={{ fontSize: "clamp(48px, 8vw, 120px)", letterSpacing: "-0.03em" }}>
//           WHO
//           <br />
//           WE
//           <br />
//           ARE
//         </h2>
//       </div>

//       {/* Right — text */}
//       <div className="flex flex-col justify-center md:w-1/2 p-16 gap-8">
//         <p className="font-body text-xl leading-relaxed" style={{ color: "var(--color-about-ink)", opacity: 0.7 }}>
//           It's A Secret Book Club is a monthly reading group for people who take books seriously. No gatekeeping. No pretension. Just good readers and honest conversation.
//         </p>
//         <p className="font-body text-xl leading-relaxed" style={{ color: "var(--color-about-ink)", opacity: 0.7 }}>
//           We meet in person in Dubai, keep groups small at 12 people maximum, and rotate through fiction that makes you think differently about the world.
//         </p>
//         <div className="grid grid-cols-3 gap-6 pt-8 border-t" style={{ borderColor: "var(--color-about-ink)" }}>
//           {[
//             { value: "12", label: "Members per session" },
//             { value: "Monthly", label: "How often we meet" },
//             { value: "Dubai", label: "Where we gather" },
//           ].map(({ value, label }) => (
//             <div key={label}>
//               <div className="font-display text-3xl md:text-4xl uppercase" style={{ color: "var(--color-about-ink)" }}>
//                 {value}
//               </div>
//               <div className="font-body text-xs uppercase tracking-widest mt-1" style={{ color: "var(--color-about-ink)", opacity: 0.4 }}>
//                 {label}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

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

// function Join() {
//   return (
//     <section id="join" className="snap-section flex flex-col md:flex-row" style={{ background: "var(--color-join-bg)", color: "var(--color-join-ink)" }}>
//       {/* Left */}
//       <div className="flex flex-col justify-center md:w-1/2 p-16 border-b md:border-b-0 md:border-r" style={{ borderColor: "var(--color-join-ink)" }}>
//         <p className="font-body text-xs uppercase tracking-[0.4em] mb-6 opacity-70" style={{ color: "var(--color-join-ink)", opacity: 0.7 }}>
//           Membership
//         </p>
//         <h2 className="font-display uppercase leading-none mb-8" style={{ color: "var(--color-join-ink)", opacity: 0.8, fontSize: "clamp(48px, 7vw, 100px)", letterSpacing: "-0.03em" }}>
//           WANT
//           <br />
//           IN?
//         </h2>
//         <p className="font-body text-lg leading-relaxed opacity-80 max-w-sm" style={{ color: "var(--color-join-ink)", opacity: 0.8 }}>
//           Sessions are free. Spots are limited to 12. Tell us a little about yourself and the book that changed you.
//         </p>
//       </div>

//       {/* Right — form */}
//       <JoinForm />
//     </section>
//   );
// }
function JoinIntro() {
  return (
    <section className="snap-section flex flex-col items-center justify-center text-center px-8 md:px-24 gap-8" style={{ background: "var(--color-join-bg)", color: "var(--color-join-ink)" }}>
      <p className="font-body text-xs uppercase tracking-[0.4em]" style={{ opacity: 0.5 }}>
        Membership
      </p>
      <h2
        className="font-display uppercase leading-none"
        style={{
          fontSize: "clamp(60px, min(20vh, 18vw), 280px)",
          letterSpacing: "-0.03em",
        }}
      >
        WANT IN?
      </h2>
      <p className="font-body text-lg md:text-xl max-w-md leading-relaxed" style={{ opacity: 0.75 }}>
        Sessions are free. Just show up, grab a seat, and enjoy the conversation. Tell us a little about yourself below.
      </p>

      <a
        href="#join-form"
        className="font-display uppercase px-10 py-5 rounded-full border-2 transition-opacity duration-300 hover:opacity-70 no-underline"
        style={{
          fontSize: "clamp(16px, 2vw, 24px)",
          borderColor: "var(--color-join-ink)",
          color: "var(--color-join-ink)",
        }}
      >
        Join us
      </a>
    </section>
  );
}

function JoinFormSection() {
  return (
    <section id="join-form" className="snap-section flex flex-col items-center justify-center px-8 md:px-24 py-16" style={{ background: "var(--color-join-bg)", color: "var(--color-join-ink)" }}>
      <div className="w-full flex flex-col items-center">
        <h3
          className="font-display uppercase leading-none mb-10"
          style={{
            fontSize: "clamp(40px, 2vw, 6vw)",
            letterSpacing: "-0.03em",
          }}
        >
          Tell us about yourself.
        </h3>
        <JoinForm />
      </div>
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
