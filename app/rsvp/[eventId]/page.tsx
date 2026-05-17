"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { Inter } from "next/font/google";
import { Playfair_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["900"], variable: "--font-display" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-body" });

function RSVPContent({ eventId }: { eventId: string }) {
  const params = useSearchParams();

  // Decode the entire event object from one URL param
  const event = JSON.parse(decodeURIComponent(params.get("data") ?? "{}"));
  const coverUrl = `https://covers.openlibrary.org/b/isbn/${event.isbn}-L.jpg`;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          whatsapp,
          eventId: event.id,
          eventTitle: event.title,
          eventDate: event.date,
          eventTime: event.time,
          eventLocation: event.location,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
      } else {
        setErrorMessage(data.error || "Something went wrong");
        setStatus("error");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  const inputClass = "w-full bg-transparent border-b-2 border-black py-3 font-body text-base outline-none placeholder:opacity-40 text-black transition-all duration-200";

  if (status === "success") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-8 bg-white gap-6">
        <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center text-white text-2xl flex-shrink-0">✓</div>
        <h3 className="font-display uppercase leading-none" style={{ fontSize: "clamp(32px, 5vw, 56px)", letterSpacing: "-0.03em" }}>
          You're in.
        </h3>
        <p className="font-body text-base text-gray-500 leading-relaxed max-w-sm">Check your email for confirmation details. See you at {event.location}.</p>

        <a href="/" className="font-display uppercase text-sm tracking-widest px-8 py-4 rounded-full border-2 border-black text-black hover:opacity-70 transition-opacity no-underline">
          Back to home
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen h-full flex flex-col px-4 py-8" style={{ background: "var(--color-events-bg)" }}>
      {/* Back button */}
      <div className="w-full p-4 mb-4" style={{ color: "var(--color-events-ink)" }}>
        <a href="/" className="font-body text-xs uppercase tracking-widest text-gray-400 hover:text-black transition-colors no-underline">
          ← Back
        </a>
      </div>

      {/* Card — identical to the modal */}
      <div className=" bg-white flex flex-col md:flex-row w-full rounded-3xl overflow-hidden" style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.2)" }}>
        {/* Event details header */}
        <div className="flex flex-col flex-1 md:flex-row gap-0">
          {/* Book cover */}
          <div className="w-full md:w-1/3 h-[15vh] md:h-auto flex-shrink-0 bg-gray-100">
            <img
              src={coverUrl}
              alt={event.title}
              className="w-full h-full md:h-full object-cover md:rounded-l-2xl"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>

          {/* Event info */}
          <div className="flex flex-col p-4 md:p-8 flex-1 md:gap-5 bg-black text-white">
            <div className="flex justify-between items-start">
              <p className="font-body text-[8px] md:text-xs uppercase tracking-[0.2em] opacity-50">
                {event.date} · {event.time}
              </p>
            </div>
            <div className="flex flex-col gap-0 md:gap-2">
              <h2 className="font-display uppercase leading-none" style={{ fontSize: "clamp(16px, 3vw, 36px)", letterSpacing: "-0.02em" }}>
                {event.title}
              </h2>
              <p className="font-body text-[10px] md:text-sm opacity-60">by {event.author}</p>
              <p className="font-body text-[10px] md:text-sm opacity-50">{event.location}</p>
              <p className="font-body text-[10px] md:text-sm opacity-50">{event.spots} spots available</p>
            </div>
            <p className="font-body text-[10px] md:text-sm opacity-70 leading-relaxed mt-2 line-clamp-3">{event.description}</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-1 md:gap-4 p-4 md:p-8">
          <h3 className="font-display uppercase leading-none w-full" style={{ fontSize: "clamp(20px, 3vw, 32px)", letterSpacing: "-0.02em" }}>
            Reserve your spot
          </h3>

          <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required className={inputClass} />
          <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass} />
          <input type="tel" placeholder="WhatsApp number" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} required className={inputClass} />

          {status === "error" && <p className="font-body text-sm text-red-500 w-full">{errorMessage}</p>}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full font-display uppercase py-4 md:py-8 mt-4 rounded-full bg-black text-white hover:opacity-80 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ fontSize: "clamp(11px, 2vw, 20px)", letterSpacing: "-0.01em" }}
          >
            {status === "loading" ? "Confirming..." : "Confirm RSVP"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function RSVPPage({ params }: { params: { eventId: string } }) {
  return (
    <div className={`${inter.variable} ${playfair.variable}`}>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-white">
            <p className="font-body text-sm text-gray-400 uppercase tracking-widest">Loading...</p>
          </div>
        }
      >
        <RSVPContent eventId={params.eventId} />
      </Suspense>
    </div>
  );
}
