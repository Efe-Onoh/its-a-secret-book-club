"use client";

import { useState } from "react";

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

export default function RSVPModal({ event, onClose }: { event: Event; onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const coverUrl = `https://covers.openlibrary.org/b/isbn/${event.isbn}-L.jpg`;

  const handleSubmit = async (e: React.SubmitEvent) => {
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

  const inputClass = `
    w-full bg-transparent border-b-2 border-black py-2
    font-body text-base outline-none
    placeholder:opacity-40 transition-all duration-200
    text-black
  `;

  return (
    // Backdrop
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 md:px-8" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }} onClick={onClose}>
      {/* Modal card */}
      <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden" style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.3)" }} onClick={(e) => e.stopPropagation()}>
        {status === "success" ? (
          // Success state
          <div className="flex flex-col items-center justify-center text-center p-16 gap-6">
            <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center text-white text-2xl flex-shrink-0">✓</div>
            <h3 className="font-display uppercase leading-none" style={{ fontSize: "clamp(32px, 5vw, 56px)", letterSpacing: "-0.03em" }}>
              You're in.
            </h3>
            <p className="font-body text-base text-gray-500 leading-relaxed max-w-sm">Check your email for confirmation details. See you at {event.location}.</p>
            <button onClick={onClose} className="font-display uppercase text-sm tracking-widest px-8 py-4 rounded-full border-2 border-black text-black hover:opacity-70 transition-opacity">
              Close
            </button>
          </div>
        ) : (
          <>
            {/* Event details header */}
            <div className="flex gap-0">
              {/* Book cover */}
              <div className="w-32 md:w-48 flex-shrink-0 bg-gray-100">
                <img
                  src={coverUrl}
                  alt={event.title}
                  className="w-full h-full object-cover rounded-l-2xl"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              {/* Event info */}
              <div className="flex flex-col justify-between p-6 md:p-8 flex-1 bg-black text-white">
                <div className="flex justify-between items-start">
                  <p className="font-body text-xs uppercase tracking-[0.2em] opacity-50">
                    {event.date} · {event.time}
                  </p>
                  {/* Close button */}
                  <button onClick={onClose} className="text-white opacity-50 hover:opacity-100 transition-opacity text-2xl leading-none ml-4 flex-shrink-0">
                    ×
                  </button>
                </div>
                <div className="flex flex-col gap-2 ">
                  <h2 className="font-display uppercase leading-none" style={{ fontSize: "clamp(20px, 3vw, 36px)", letterSpacing: "-0.02em" }}>
                    {event.title}
                  </h2>
                  <p className="font-body text-sm opacity-60">by {event.author}</p>
                  <p className="font-body text-sm opacity-50">{event.location}</p>
                  <p className="font-body text-sm opacity-50">{event.spots} spots available</p>
                </div>
                <p className="font-body text-sm opacity-70 leading-relaxed mt-2 line-clamp-3">{event.description}</p>{" "}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 md:p-8">
              <h3 className="font-display uppercase leading-none" style={{ fontSize: "clamp(20px, 3vw, 32px)", letterSpacing: "-0.02em" }}>
                Reserve your spot
              </h3>

              <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required className={inputClass} />
              <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass} />
              <input type="tel" placeholder="WhatsApp number" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} required className={inputClass} />

              {status === "error" && <p className="font-body text-sm text-red-500">{errorMessage}</p>}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full font-display uppercase px-8 py-8 mt-2 rounded-full bg-black text-white hover:opacity-80 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ fontSize: "clamp(16px, 2vw, 22px)", letterSpacing: "-0.01em" }}
              >
                {status === "loading" ? "Confirming..." : "Confirm RSVP"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
