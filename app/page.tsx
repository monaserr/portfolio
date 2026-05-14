"use client";

import { useState, useEffect } from "react";
import { loadData, saveData, type PortfolioData } from "@/lib/store";
import {
  Github, Linkedin, Mail, Phone, MapPin, ExternalLink,
  ChevronDown, Code2, Monitor, Server, Database, Cloud,
  Wrench, Brain, Star, Award, BookOpen, Menu, X, User, Zap,
} from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
  Code2:    <Code2 size={15} />,
  Monitor:  <Monitor size={15} />,
  Server:   <Server size={15} />,
  Database: <Database size={15} />,
  Cloud:    <Cloud size={15} />,
  Wrench:   <Wrench size={15} />,
  Brain:    <Brain size={15} />,
  Dna:      <span className="text-sm leading-none">🧬</span>,
};

/* ── Floating Pill Navbar ──────────────────────────────────────────────────── */
function NavBar({ name }: { name: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const initials = name.split(" ").slice(0, 2).map(w => w[0]).join("");
  const links = ["About", "Skills", "Projects", "Experience", "Contact"];

  return (
    <>
      {/* Desktop — floating pill */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden md:block w-full max-w-2xl px-4">
        <nav
          className="flex items-center justify-between px-5 py-3 rounded-full border transition-all duration-500"
          style={{
            background: scrolled ? "rgba(8,8,8,0.92)" : "rgba(20,20,20,0.7)",
            borderColor: scrolled ? "#2a2a2a" : "#1e1e1e",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <span
            className="font-display text-soft text-sm font-bold tracking-widest uppercase"
            style={{ letterSpacing: "0.2em" }}
          >
            {initials}
          </span>

          <ul className="flex items-center gap-6">
            {links.map(l => (
              <li key={l}>
                <a
                  href={`#${l.toLowerCase()}`}
                  className="text-muted hover:text-soft text-xs tracking-wide transition-colors duration-200"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200"
            style={{
              background: "#f0ede8",
              color: "#080808",
              fontFamily: "var(--font-mono)",
            }}
          >
            Hire Me
          </a>
        </nav>
      </div>

      {/* Mobile */}
      <div className="fixed top-4 left-4 right-4 z-50 md:hidden">
        <nav
          className="flex items-center justify-between px-5 py-3 rounded-full border"
          style={{
            background: "rgba(14,14,14,0.95)",
            borderColor: "#222",
            backdropFilter: "blur(20px)",
          }}
        >
          <span className="font-display text-soft text-sm font-bold tracking-widest">{initials}</span>
          <button onClick={() => setOpen(!open)} className="text-muted hover:text-soft transition-colors">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
        {open && (
          <div
            className="mt-2 rounded-2xl border p-4 flex flex-col gap-3"
            style={{ background: "rgba(14,14,14,0.98)", borderColor: "#222" }}
          >
            {links.map(l => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="text-muted hover:text-soft text-sm transition-colors"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {l}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)}
              className="mt-1 text-center py-2 rounded-full text-xs font-semibold"
              style={{ background: "#f0ede8", color: "#080808" }}>
              Hire Me
            </a>
          </div>
        )}
      </div>
    </>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────────── */
function Hero({ data }: { data: PortfolioData }) {
  const { personal } = data;
  const firstName = personal.name.split(" ")[0];
  const lastName  = personal.name.split(" ").slice(1).join(" ");

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(240,237,232,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 w-full pt-28 pb-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT — text */}
          <div>
            {/* Available badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-10 text-xs"
              style={{
                borderColor: "#2a2a2a",
                color: "#888",
                fontFamily: "var(--font-mono)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#4ade80", boxShadow: "0 0 6px #4ade80" }}
              />
              Available for opportunities
            </div>

            {/* Name */}
            <h1
              className="font-display mb-3 leading-none"
              style={{ fontSize: "clamp(48px, 7vw, 80px)", fontWeight: 800 }}
            >
              <span style={{ color: "#f0ede8" }}>{firstName}</span>
              <br />
              <span style={{ color: "#333" }}>{lastName}</span>
            </h1>

            {/* Mono subtitle */}
            <p
              className="mb-6 text-sm"
              style={{ color: "#444", fontFamily: "var(--font-mono)" }}
            >
              &lt; {personal.subtitle} /&gt;
            </p>

            {/* Summary */}
            <p
              className="leading-relaxed mb-10 max-w-md text-sm"
              style={{ color: "#666" }}
            >
              {personal.summary}
            </p>

            {/* Stats */}
            <div
              className="flex flex-wrap gap-8 pb-10 mb-10"
              style={{ borderBottom: "1px solid #1a1a1a" }}
            >
              {personal.stats.map(s => (
                <div key={s.label}>
                  <div
                    className="font-display text-2xl font-bold"
                    style={{ color: "#f0ede8" }}
                  >
                    {s.value}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "#444", fontFamily: "var(--font-mono)" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href="#contact"
                className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105"
                style={{ background: "#f0ede8", color: "#080808" }}
              >
                Hire Me
              </a>
              <a
                href="#projects"
                className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105"
                style={{ border: "1px solid #2a2a2a", color: "#888" }}
              >
                Projects
              </a>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 flex items-center gap-2"
                style={{ border: "1px solid #2a2a2a", color: "#888" }}
              >
                <Github size={14} /> GitHub
              </a>
            </div>

            {/* Contact info */}
            <div className="flex flex-wrap gap-5 text-xs" style={{ color: "#444", fontFamily: "var(--font-mono)" }}>
              <span className="flex items-center gap-1.5">
                <MapPin size={12} style={{ color: "#f0ede8" }} /> {personal.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail size={12} style={{ color: "#f0ede8" }} /> {personal.email}
              </span>
            </div>
          </div>

          {/* RIGHT — photo */}
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              {/* Decorative frame */}
              <div
                className="absolute -inset-3 rounded-3xl"
                style={{ border: "1px solid #1a1a1a" }}
              />
              <div
                className="absolute -inset-6 rounded-3xl"
                style={{ border: "1px solid #111" }}
              />

              {/* Photo box */}
              <div
                className="relative w-72 h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden"
                style={{ border: "1px solid #222", background: "#111" }}
              >
                {personal.photoUrl ? (
                  <img
                    src={personal.photoUrl}
                    alt={personal.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                    <User size={52} style={{ color: "#2a2a2a" }} />
                    <span
                      className="text-xs text-center px-6"
                      style={{ color: "#333", fontFamily: "var(--font-mono)" }}
                    >
                      Upload photo from<br />Admin Dashboard
                    </span>
                  </div>
                )}

                {/* Name tag overlay at bottom */}
                <div
                  className="absolute bottom-4 left-4 right-4 rounded-2xl px-4 py-3"
                  style={{
                    background: "rgba(8,8,8,0.85)",
                    border: "1px solid #2a2a2a",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div className="text-sm font-semibold" style={{ color: "#f0ede8", fontFamily: "var(--font-display)" }}>
                    {personal.name}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "#555", fontFamily: "var(--font-mono)" }}>
                    {personal.title}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
        style={{ color: "#333" }}
      >
        <span className="text-xs" style={{ fontFamily: "var(--font-mono)" }}>scroll</span>
        <ChevronDown size={14} />
      </div>
    </section>
  );
}

/* ── Section Header ───────────────────────────────────────────────────────── */
function SectionHead({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-12">
      <div
        className="inline-flex items-center gap-3 mb-4 text-xs uppercase tracking-widest"
        style={{ color: "#444", fontFamily: "var(--font-mono)" }}
      >
        <span className="w-6 h-px" style={{ background: "#f0ede8" }} />
        {label}
      </div>
      <h2
        className="font-display font-bold"
        style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#f0ede8" }}
      >
        {title}
      </h2>
    </div>
  );
}

/* ── Skills ───────────────────────────────────────────────────────────────── */
function Skills({ data }: { data: PortfolioData }) {
  return (
    <section
      id="skills"
      className="py-28"
      style={{ borderTop: "1px solid #111" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <SectionHead label="Expertise" title="Skills & Technologies" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {data.skills.map(skill => (
            <div
              key={skill.category}
              className="rounded-2xl p-5 transition-all duration-300 group"
              style={{ background: "#111", border: "1px solid #1a1a1a" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "#2a2a2a";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "#1a1a1a";
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: "#1a1a1a", color: "#f0ede8" }}
                >
                  {ICON_MAP[skill.icon]}
                </div>
                <span className="text-sm font-semibold" style={{ color: "#f0ede8" }}>
                  {skill.category}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skill.items.map(item => (
                  <span
                    key={item}
                    className="text-xs px-2 py-1 rounded-lg"
                    style={{
                      background: "#0e0e0e",
                      border: "1px solid #1e1e1e",
                      color: "#555",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Projects ─────────────────────────────────────────────────────────────── */
function Projects({ data }: { data: PortfolioData }) {
  return (
    <section
      id="projects"
      className="py-28"
      style={{ borderTop: "1px solid #111" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <SectionHead label="Work" title="Featured Projects" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.projects.map(p => (
            <div
              key={p.id}
              className="rounded-2xl p-6 flex flex-col transition-all duration-300 group"
              style={{ background: "#111", border: "1px solid #1a1a1a" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "#2a2a2a";
                (e.currentTarget as HTMLDivElement).style.background = "#141414";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "#1a1a1a";
                (e.currentTarget as HTMLDivElement).style.background = "#111";
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: p.status === "live" ? "rgba(74,222,128,0.08)" : "rgba(251,191,36,0.08)",
                        border: `1px solid ${p.status === "live" ? "rgba(74,222,128,0.15)" : "rgba(251,191,36,0.15)"}`,
                        color: p.status === "live" ? "#4ade80" : "#fbbf24",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {p.status === "live" ? "● Live" : "◐ WIP"}
                    </span>
                    <span className="text-xs" style={{ color: "#333", fontFamily: "var(--font-mono)" }}>{p.year}</span>
                  </div>
                  <h3
                    className="font-display font-bold text-lg"
                    style={{ color: "#f0ede8" }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-xs mt-0.5" style={{ color: "#444", fontFamily: "var(--font-mono)" }}>
                    {p.subtitle}
                  </p>
                </div>
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  style={{ color: "#333" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#f0ede8")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#333")}
                >
                  <ExternalLink size={15} />
                </a>
              </div>

              <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "#555" }}>
                {p.description}
              </p>

              <ul className="mb-4 space-y-1.5">
                {p.highlights.map(h => (
                  <li
                    key={h}
                    className="flex items-start gap-2 text-xs"
                    style={{ color: "#444" }}
                  >
                    <span style={{ color: "#f0ede8", marginTop: "2px" }}>›</span>
                    {h}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5">
                {p.tech.map(t => (
                  <span
                    key={t}
                    className="text-xs px-2 py-0.5 rounded-lg"
                    style={{
                      background: "#0e0e0e",
                      border: "1px solid #1e1e1e",
                      color: "#888",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Experience ───────────────────────────────────────────────────────────── */
function Experience({ data }: { data: PortfolioData }) {
  return (
    <section
      id="experience"
      className="py-28"
      style={{ borderTop: "1px solid #111" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <SectionHead label="Journey" title="Experience & Education" />
        <div className="grid md:grid-cols-2 gap-8">

          {/* Experience */}
          <div>
            <div
              className="flex items-center gap-2 mb-6 text-xs uppercase tracking-widest"
              style={{ color: "#444", fontFamily: "var(--font-mono)" }}
            >
              <Zap size={12} style={{ color: "#f0ede8" }} /> Experience
            </div>
            {data.experience.map((exp, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 relative"
                style={{ background: "#111", border: "1px solid #1a1a1a" }}
              >
                <div
                  className="absolute top-6 left-0 w-0.5 h-10 rounded-r-full"
                  style={{ background: "#f0ede8" }}
                />
                <h3 className="font-semibold" style={{ color: "#f0ede8" }}>{exp.title}</h3>
                <p className="text-xs mt-0.5 mb-1" style={{ color: "#888", fontFamily: "var(--font-mono)" }}>
                  {exp.company}
                </p>
                <p className="text-xs mb-4" style={{ color: "#333", fontFamily: "var(--font-mono)" }}>
                  {exp.period}
                </p>
                <ul className="space-y-2">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm" style={{ color: "#555" }}>
                      <span style={{ color: "#f0ede8", marginTop: "2px", flexShrink: 0 }}>›</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education + Certs */}
          <div className="space-y-6">
            <div>
              <div
                className="flex items-center gap-2 mb-6 text-xs uppercase tracking-widest"
                style={{ color: "#444", fontFamily: "var(--font-mono)" }}
              >
                <BookOpen size={12} style={{ color: "#f0ede8" }} /> Education
              </div>
              {data.education.map((edu, i) => (
                <div key={i} className="rounded-2xl p-6" style={{ background: "#111", border: "1px solid #1a1a1a" }}>
                  <h3 className="font-semibold text-sm" style={{ color: "#f0ede8" }}>{edu.degree}</h3>
                  <p className="text-xs mt-1" style={{ color: "#888", fontFamily: "var(--font-mono)" }}>{edu.school}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#333", fontFamily: "var(--font-mono)" }}>{edu.period}</p>
                  <div
                    className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full"
                    style={{ background: "#1a1a1a", border: "1px solid #2a2a2a" }}
                  >
                    <Star size={11} style={{ color: "#f0ede8" }} />
                    <span className="text-xs" style={{ color: "#f0ede8", fontFamily: "var(--font-mono)" }}>
                      GPA {edu.gpa}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div
                className="flex items-center gap-2 mb-6 text-xs uppercase tracking-widest"
                style={{ color: "#444", fontFamily: "var(--font-mono)" }}
              >
                <Award size={12} style={{ color: "#f0ede8" }} /> Certifications
              </div>
              <div className="space-y-2">
                {data.certifications.map((cert, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 rounded-xl"
                    style={{ background: "#111", border: "1px solid #1a1a1a" }}
                  >
                    <span className="text-xl">{cert.icon}</span>
                    <div>
                      <div className="text-sm font-medium" style={{ color: "#f0ede8" }}>{cert.name}</div>
                      <div className="text-xs" style={{ color: "#444", fontFamily: "var(--font-mono)" }}>{cert.issuer}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Contact ──────────────────────────────────────────────────────────────── */
function Contact({ data }: { data: PortfolioData }) {
  const { personal } = data;
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const current = loadData();
    saveData({
      ...current,
      messages: [
        { id: Date.now().toString(), name: form.name, email: form.email, message: form.message, date: new Date().toISOString().split("T")[0], read: false },
        ...current.messages,
      ],
    });
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  const inputStyle = {
    width: "100%",
    background: "#111",
    border: "1px solid #222",
    borderRadius: "12px",
    padding: "12px 16px",
    color: "#f0ede8",
    fontSize: "14px",
    fontFamily: "var(--font-body)",
    outline: "none",
  };

  return (
    <section
      id="contact"
      className="py-28"
      style={{ borderTop: "1px solid #111" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <SectionHead label="Let's Talk" title="Get In Touch" />
        <div className="grid md:grid-cols-2 gap-14">
          <div>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "#555" }}>
              Open to freelance projects, full-time opportunities, and interesting collaborations.
              Messages go straight to my inbox.
            </p>
            <div className="space-y-3">
              {[
                { icon: <Mail size={14} />, label: personal.email, href: `mailto:${personal.email}` },
                { icon: <Phone size={14} />, label: personal.phone, href: `tel:${personal.phone}` },
                { icon: <Github size={14} />, label: "github.com/monaserr", href: personal.github },
                { icon: <Linkedin size={14} />, label: "LinkedIn Profile", href: personal.linkedin },
              ].map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200"
                  style={{ background: "#111", border: "1px solid #1a1a1a" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "#2a2a2a")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "#1a1a1a")}
                >
                  <span style={{ color: "#f0ede8" }}>{item.icon}</span>
                  <span className="text-sm" style={{ color: "#555", fontFamily: "var(--font-mono)" }}>
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { id: "name",  label: "Name",  type: "text",  placeholder: "Your name" },
              { id: "email", label: "Email", type: "email", placeholder: "your@email.com" },
            ].map(f => (
              <div key={f.id}>
                <label
                  className="block text-xs mb-1.5 uppercase tracking-widest"
                  style={{ color: "#444", fontFamily: "var(--font-mono)" }}
                >
                  {f.label}
                </label>
                <input
                  type={f.type}
                  value={form[f.id as keyof typeof form]}
                  onChange={e => setForm({ ...form, [f.id]: e.target.value })}
                  placeholder={f.placeholder}
                  required
                  style={inputStyle}
                />
              </div>
            ))}
            <div>
              <label
                className="block text-xs mb-1.5 uppercase tracking-widest"
                style={{ color: "#444", fontFamily: "var(--font-mono)" }}
              >
                Message
              </label>
              <textarea
                rows={5}
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project..."
                required
                style={{ ...inputStyle, resize: "none" }}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-[1.02]"
              style={{ background: "#f0ede8", color: "#080808" }}
            >
              {sent ? "✓ Sent!" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ── Main ─────────────────────────────────────────────────────────────────── */
export default function Home() {
  const [data, setData] = useState<PortfolioData | null>(null);

  useEffect(() => {
    setData(loadData());
    const handler = () => setData(loadData());
    window.addEventListener("portfolio-updated", handler);
    return () => window.removeEventListener("portfolio-updated", handler);
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center text-xs" style={{ color: "#333", fontFamily: "var(--font-mono)" }}>
        Loading...
      </div>
    );
  }

  return (
    <main className="noise-bg" style={{ background: "#080808" }}>
      <NavBar name={data.personal.name} />
      <Hero data={data} />
      <Skills data={data} />
      <Projects data={data} />
      <Experience data={data} />
      <Contact data={data} />
      <footer
        className="py-8 text-center text-xs"
        style={{ borderTop: "1px solid #111", color: "#333", fontFamily: "var(--font-mono)" }}
      >
        {data.personal.name} · {new Date().getFullYear()}
      </footer>
    </main>
  );
}
