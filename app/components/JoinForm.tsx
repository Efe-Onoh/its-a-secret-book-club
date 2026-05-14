"use client";

import { useState } from "react";

export default function JoinForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bookAnswer, setBookAnswer] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, whatsapp, bookAnswer }),
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setWhatsapp("");
        setBookAnswer("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const fieldStyle = {
    borderColor: "var(--color-join-ink)",
    color: "var(--color-join-ink)",
  };

  const inputClass = "w-full bg-transparent border-b-2 py-2 font-body text-lg outline-none placeholder:opacity-50 transition-all duration-200";

  if (status === "success") {
    return (
      <div className="flex flex-col justify-center md:w-1/2 p-16 gap-4">
        <h3 className="font-display uppercase text-4xl leading-none" style={{ color: "var(--color-join-ink)" }}>
          YOU'RE
          <br />
          ON THE
          <br />
          LIST.
        </h3>
        <p className="font-body text-lg opacity-70" style={{ color: "var(--color-join-ink)" }}>
          We'll be in touch before the next session.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full md:w-2/3 p-16 gap-5">
      <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required className={inputClass} style={fieldStyle} />
      <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass} style={fieldStyle} />
      <input type="tel" placeholder="WhatsApp number" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} required className={inputClass} style={fieldStyle} />
      <textarea
        placeholder="What book changed you and why?"
        value={bookAnswer}
        onChange={(e) => setBookAnswer(e.target.value)}
        rows={3}
        required
        className={`${inputClass} resize-none`}
        style={fieldStyle}
      />

      {status === "error" && (
        <p className="font-body text-sm opacity-70" style={{ color: "var(--color-join-ink)" }}>
          Something went wrong. Try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="md:w-1/2 mt-4 font-display uppercase px-10 py-5 rounded-full border-2 transition-opacity duration-300 hover:opacity-70 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          fontSize: "clamp(16px, 2vw, 24px)",
          letterSpacing: "-0.01em",
          borderColor: "var(--color-join-ink)",
          color: "var(--color-join-ink)",
        }}
      >
        {status === "loading" ? "Sending..." : "Apply to join"}
      </button>
    </form>
  );
}
