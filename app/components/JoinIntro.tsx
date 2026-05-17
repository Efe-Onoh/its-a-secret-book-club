"use client";

// Add this at the top of the JoinIntro function
export default function JoinIntro() {
  const handleScroll = () => {
    document.getElementById("join-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="join-intro"
      className="snap-section flex flex-col items-center justify-center text-center px-8 md:px-24 gap-8"
      style={{ background: "var(--color-join-bg)", color: "var(--color-join-ink)" }}
    >
      <p className="font-body text-xs uppercase tracking-[0.4em]" style={{ opacity: 0.5 }}>
        Membership
      </p>
      <h2 className="font-display uppercase leading-none" style={{ fontSize: "clamp(60px, min(20vh, 18vw), 280px)", letterSpacing: "-0.03em" }}>
        WANT IN?
      </h2>
      <p className="font-body text-lg md:text-xl max-w-md leading-relaxed" style={{ opacity: 0.75 }}>
        Sessions are free. Just show up, grab a seat, and enjoy the conversation.
      </p>
      <button
        onClick={handleScroll}
        className="font-display uppercase px-10 py-5 rounded-full border-2 transition-opacity duration-300 hover:opacity-70"
        style={{
          fontSize: "clamp(16px, 2vw, 24px)",
          borderColor: "var(--color-join-ink)",
          color: "var(--color-join-ink)",
          background: "transparent",
          cursor: "pointer",
        }}
      >
        Join us
      </button>
    </section>
  );
}
