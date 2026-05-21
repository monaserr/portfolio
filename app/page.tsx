"use client";
import { useState, useEffect } from "react";
import { loadData, saveData, type PortfolioData } from "@/lib/store";
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, ChevronDown, Star, Award, BookOpen, Menu, X, User, Zap, ArrowUpRight } from "lucide-react";

function useReveal() {
  // Add js-loaded class so CSS animations activate
  useEffect(() => {
    document.body.classList.add("js-loaded");
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function NavBar({ name }: { name: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const initials = name.split(" ").slice(0,2).map(w=>w[0]).join("");
  const links = ["About","Skills","Projects","Experience","Contact"];
  return (
    <>
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden md:block w-full max-w-2xl px-4">
        <nav className="flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500"
          style={{ background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.75)", border:"1px solid rgba(255,255,255,0.95)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.08)" : "0 2px 12px rgba(0,0,0,0.04)" }}>
          <span className="text-sm font-bold text-ink tracking-widest">{initials}</span>
          <ul className="flex items-center gap-7">
            {links.map(l => (
              <li key={l}><a href={`#${l.toLowerCase()}`} className="text-xs text-muted hover:text-ink transition-colors duration-200" style={{ fontFamily:"var(--font-mono)" }}>{l}</a></li>
            ))}
          </ul>
          <a href="#contact" className="px-4 py-1.5 text-xs font-semibold rounded-full transition-all hover:opacity-80" style={{ background:"#111", color:"#fff" }}>
            Hire Me
          </a>
        </nav>
      </div>
      <div className="fixed top-4 left-4 right-4 z-50 md:hidden">
        <nav className="flex items-center justify-between px-5 py-3 rounded-full glass" style={{ boxShadow:"0 2px 12px rgba(0,0,0,0.06)" }}>
          <span className="text-sm font-bold text-ink">{initials}</span>
          <button onClick={() => setOpen(!open)} className="text-muted hover:text-ink">{open ? <X size={18}/> : <Menu size={18}/>}</button>
        </nav>
        {open && (
          <div className="mt-2 rounded-2xl p-4 flex flex-col gap-3 glass" style={{ boxShadow:"0 8px 32px rgba(0,0,0,0.08)" }}>
            {links.map(l => <a key={l} href={`#${l.toLowerCase()}`} onClick={()=>setOpen(false)} className="text-sm text-muted hover:text-ink transition-colors" style={{ fontFamily:"var(--font-mono)" }}>{l}</a>)}
            <a href="#contact" onClick={()=>setOpen(false)} className="mt-1 text-center py-2 rounded-full text-xs font-semibold" style={{ background:"#111", color:"#fff" }}>Hire Me</a>
          </div>
        )}
      </div>
    </>
  );
}

function Hero({ data }: { data: PortfolioData }) {
  const { personal } = data;
  const firstName = personal.name.split(" ")[0];
  const restName  = personal.name.split(" ").slice(1).join(" ");
  return (
    <section id="about" className="relative min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto px-6 w-full pt-28 pb-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 glass" style={{ boxShadow:"0 2px 8px rgba(0,0,0,0.04)", fontFamily:"var(--font-mono)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" style={{ boxShadow:"0 0 6px #22c55e" }} />
              <span className="text-xs text-muted">Available for opportunities</span>
            </div>
            <h1 className="leading-none mb-3" style={{ fontSize:"clamp(52px,7vw,84px)", fontWeight:700, letterSpacing:"-3px" }}>
              <span className="text-ink block">{firstName}</span>
              <span className="block" style={{ color:"#d1d5db" }}>{restName}.</span>
            </h1>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-ink" />
              <p className="text-sm text-muted" style={{ fontFamily:"var(--font-mono)" }}>/ {personal.subtitle}</p>
            </div>
            <p className="leading-relaxed mb-10 max-w-md text-sm text-muted">{personal.summary}</p>

            <div className="grid grid-cols-4 gap-3 mb-10">
              {personal.stats.map(s => (
                <div key={s.label} className="glass-card rounded-2xl p-4 text-center" style={{ boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
                  <div className="text-xl font-bold text-ink">{s.value}</div>
                  <div className="text-xs mt-1 text-muted" style={{ fontFamily:"var(--font-mono)" }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              <a href="#contact" className="flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm text-white transition-all hover:opacity-85 hover:scale-105" style={{ background:"#111" }}>
                Hire Me <ArrowUpRight size={14}/>
              </a>
              <a href="#projects" className="flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm text-muted transition-all hover:text-ink hover:scale-105 glass-card">
                Projects
              </a>
              <a href={personal.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm text-muted transition-all hover:text-ink hover:scale-105 glass-card">
                <Github size={14}/> GitHub
              </a>
            </div>

            <div className="flex flex-wrap gap-5 text-xs text-muted" style={{ fontFamily:"var(--font-mono)" }}>
              <span className="flex items-center gap-1.5"><MapPin size={12} className="text-ink"/>{personal.location}</span>
              <span className="flex items-center gap-1.5"><Mail size={12} className="text-ink"/>{personal.email}</span>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden glass-card" style={{ boxShadow:"0 16px 48px rgba(0,0,0,0.08)" }}>
                {personal.photoUrl ? (
                  <img src={personal.photoUrl} alt={personal.name} className="w-full h-full object-cover"/>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gray-50">
                    <User size={56} className="text-gray-200"/>
                    <span className="text-xs text-center px-6 text-muted" style={{ fontFamily:"var(--font-mono)" }}>Upload photo from<br/>Admin Dashboard</span>
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl px-4 py-3 glass" style={{ boxShadow:"0 4px 16px rgba(0,0,0,0.06)" }}>
                  <div className="text-sm font-semibold text-ink">{personal.name}</div>
                  <div className="text-xs mt-0.5 text-muted" style={{ fontFamily:"var(--font-mono)" }}>{personal.title}</div>
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 w-full h-full rounded-3xl pointer-events-none" style={{ border:"1px solid #e5e7eb" }}/>
              <div className="absolute -bottom-6 -right-6 w-full h-full rounded-3xl pointer-events-none" style={{ border:"1px solid #f3f4f6" }}/>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce text-muted">
        <span className="text-xs" style={{ fontFamily:"var(--font-mono)" }}>scroll</span>
        <ChevronDown size={14}/>
      </div>
    </section>
  );
}

function SectionHead({ label, title }: { label:string; title:string }) {
  return (
    <div className="mb-14 reveal">
      <div className="flex items-center gap-3 mb-3">
        <span className="w-5 h-px bg-ink"/>
        <span className="text-xs text-muted uppercase tracking-widest" style={{ fontFamily:"var(--font-mono)" }}>{label}</span>
      </div>
      <h2 className="font-bold text-ink" style={{ fontSize:"clamp(28px,4vw,44px)", letterSpacing:"-1.5px" }}>{title}</h2>
    </div>
  );
}

function Skills({ data }: { data:PortfolioData }) {
  return (
    <section id="skills" className="py-28" style={{ borderTop:"1px solid #f3f4f6" }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHead label="Expertise" title="Skills & Technologies"/>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.skills.map((skill,i) => (
            <div key={skill.category} className={`glass-card rounded-2xl p-5 reveal reveal-d${Math.min(i%4+1,3)}`} style={{ boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
              <div className="text-xs font-semibold text-ink mb-3">{skill.category}</div>
              <div className="flex flex-wrap gap-2">
                {skill.items.map(item => (
                  <span key={item} className="text-xs px-2.5 py-1 rounded-lg text-muted" style={{ background:"#f9fafb", border:"1px solid #f3f4f6", fontFamily:"var(--font-mono)" }}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects({ data }: { data:PortfolioData }) {
  return (
    <section id="projects" className="py-28" style={{ borderTop:"1px solid #f3f4f6" }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHead label="Work" title="Featured Projects"/>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.projects.map((p,i) => (
            <div key={p.id} className={`glass-card rounded-2xl p-6 flex flex-col reveal reveal-d${Math.min(i%3+1,3)}`} style={{ boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2.5 py-1 rounded-full" style={{ fontFamily:"var(--font-mono)", background:p.status==="live"?"#f0fdf4":"#fffbeb", border:`1px solid ${p.status==="live"?"#dcfce7":"#fef3c7"}`, color:p.status==="live"?"#16a34a":"#d97706" }}>
                      {p.status==="live"?"● Live":"◐ WIP"}
                    </span>
                    <span className="text-xs text-muted" style={{ fontFamily:"var(--font-mono)" }}>{p.year}</span>
                  </div>
                  <h3 className="font-bold text-lg text-ink" style={{ letterSpacing:"-0.3px" }}>{p.title}</h3>
                  <p className="text-xs mt-0.5 text-muted" style={{ fontFamily:"var(--font-mono)" }}>{p.subtitle}</p>
                </div>
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-ink transition-colors mt-1"><ExternalLink size={15}/></a>
              </div>
              <p className="text-sm leading-relaxed mb-4 flex-1 text-muted">{p.description}</p>
              <ul className="mb-4 space-y-1.5">
                {p.highlights.map(h => (
                  <li key={h} className="flex items-start gap-2 text-xs text-muted">
                    <span className="text-ink mt-0.5 shrink-0">›</span>{h}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5">
                {p.tech.map(t => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded-lg text-muted" style={{ background:"#f9fafb", border:"1px solid #f3f4f6", fontFamily:"var(--font-mono)" }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience({ data }: { data:PortfolioData }) {
  return (
    <section id="experience" className="py-28" style={{ borderTop:"1px solid #f3f4f6" }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHead label="Journey" title="Experience & Education"/>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="reveal">
            <div className="flex items-center gap-2 mb-6 text-xs text-muted uppercase tracking-widest" style={{ fontFamily:"var(--font-mono)" }}>
              <Zap size={12} className="text-ink"/> Experience
            </div>
            {data.experience.map((exp,i) => (
              <div key={i} className="glass-card rounded-2xl p-6 relative" style={{ boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
                <div className="absolute top-6 left-0 w-0.5 h-10 bg-ink rounded-r-full"/>
                <h3 className="font-semibold text-ink">{exp.title}</h3>
                <p className="text-xs mt-0.5 mb-1 text-muted" style={{ fontFamily:"var(--font-mono)" }}>{exp.company}</p>
                <p className="text-xs mb-4 text-muted" style={{ fontFamily:"var(--font-mono)" }}>{exp.period}</p>
                <ul className="space-y-2">
                  {exp.bullets.map((b,j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted">
                      <span className="text-ink mt-0.5 shrink-0">›</span>{b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="space-y-6 reveal reveal-d1">
            <div>
              <div className="flex items-center gap-2 mb-6 text-xs text-muted uppercase tracking-widest" style={{ fontFamily:"var(--font-mono)" }}>
                <BookOpen size={12} className="text-ink"/> Education
              </div>
              {data.education.map((edu,i) => (
                <div key={i} className="glass-card rounded-2xl p-6 mb-4" style={{ boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
                  <h3 className="font-semibold text-sm text-ink">{edu.degree}</h3>
                  <p className="text-xs mt-1 text-muted" style={{ fontFamily:"var(--font-mono)" }}>{edu.school}</p>
                  <p className="text-xs mt-0.5 text-muted" style={{ fontFamily:"var(--font-mono)" }}>{edu.period}</p>
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-card">
                    <Star size={11} className="text-ink"/><span className="text-xs text-muted" style={{ fontFamily:"var(--font-mono)" }}>GPA {edu.gpa}</span>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-6 text-xs text-muted uppercase tracking-widest" style={{ fontFamily:"var(--font-mono)" }}>
                <Award size={12} className="text-ink"/> Certifications
              </div>
              <div className="space-y-2">
                {data.certifications.map((cert,i) => (
                  <div key={i} className="glass-card rounded-xl p-4 flex items-center gap-3" style={{ boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
                    <span className="text-xl">{cert.icon}</span>
                    <div><div className="text-sm font-medium text-ink">{cert.name}</div><div className="text-xs text-muted" style={{ fontFamily:"var(--font-mono)" }}>{cert.issuer}</div></div>
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

function Contact({ data }: { data:PortfolioData }) {
  const { personal } = data;
  const [form, setForm] = useState({ name:"", email:"", message:"" });
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const cur = loadData();
    saveData({ ...cur, messages:[{ id:Date.now().toString(), name:form.name, email:form.email, message:form.message, date:new Date().toISOString().split("T")[0], read:false },...cur.messages] });
    setSent(true); setTimeout(()=>setSent(false),4000); setForm({ name:"", email:"", message:"" });
  };
  const inp: React.CSSProperties = { width:"100%", background:"rgba(255,255,255,0.7)", border:"1px solid #e5e7eb", borderRadius:"12px", padding:"12px 16px", color:"#111", fontSize:"14px", fontFamily:"Inter,sans-serif", outline:"none", backdropFilter:"blur(8px)", transition:"border-color 0.2s" };
  return (
    <section id="contact" className="py-28" style={{ borderTop:"1px solid #f3f4f6" }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHead label="Let's Talk" title="Get In Touch"/>
        <div className="grid md:grid-cols-2 gap-14">
          <div className="reveal">
            <p className="text-sm leading-relaxed mb-8 text-muted">Open to freelance projects, full-time opportunities, and collaborations. Messages go straight to my inbox.</p>
            <div className="space-y-3">
              {[
                { icon:<Mail size={14}/>, label:personal.email, href:`mailto:${personal.email}` },
                { icon:<Phone size={14}/>, label:personal.phone, href:`tel:${personal.phone}` },
                { icon:<Github size={14}/>, label:"github.com/monaserr", href:personal.github },
                { icon:<Linkedin size={14}/>, label:"LinkedIn Profile", href:personal.linkedin },
              ].map(item => (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl glass-card" style={{ boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
                  <span className="text-ink">{item.icon}</span>
                  <span className="text-sm text-muted" style={{ fontFamily:"var(--font-mono)" }}>{item.label}</span>
                </a>
              ))}
            </div>
          </div>
          <form onSubmit={submit} className="space-y-4 reveal reveal-d1">
            {[{ id:"name",label:"Name",type:"text",placeholder:"Your name"},{ id:"email",label:"Email",type:"email",placeholder:"your@email.com"}].map(f=>(
              <div key={f.id}>
                <label className="block text-xs mb-1.5 text-muted uppercase tracking-widest" style={{ fontFamily:"var(--font-mono)" }}>{f.label}</label>
                <input type={f.type} value={form[f.id as keyof typeof form]} onChange={e=>setForm({...form,[f.id]:e.target.value})} placeholder={f.placeholder} required style={inp}
                  onFocus={e=>(e.target.style.borderColor="#111")} onBlur={e=>(e.target.style.borderColor="#e5e7eb")}/>
              </div>
            ))}
            <div>
              <label className="block text-xs mb-1.5 text-muted uppercase tracking-widest" style={{ fontFamily:"var(--font-mono)" }}>Message</label>
              <textarea rows={5} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Tell me about your project..." required style={{ ...inp,resize:"none" }}
                onFocus={e=>(e.target.style.borderColor="#111")} onBlur={e=>(e.target.style.borderColor="#e5e7eb")}/>
            </div>
            <button type="submit" className="w-full py-3 rounded-full font-semibold text-sm text-white transition-all hover:opacity-85 hover:scale-[1.01] flex items-center justify-center gap-2" style={{ background:"#111" }}>
              {sent ? "✓ Sent!" : <><span>Send Message</span><ArrowUpRight size={14}/></>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [data, setData] = useState<PortfolioData|null>(null);
  useReveal();
  useEffect(() => {
    setData(loadData());
    const h = () => setData(loadData());
    window.addEventListener("portfolio-updated", h);
    return () => window.removeEventListener("portfolio-updated", h);
  }, []);
  if (!data) return <div className="min-h-screen flex items-center justify-center text-xs text-muted" style={{ fontFamily:"var(--font-mono)" }}>Loading...</div>;
  return (
    <main>
      <NavBar name={data.personal.name}/>
      <Hero data={data}/>
      <Skills data={data}/>
      <Projects data={data}/>
      <Experience data={data}/>
      <Contact data={data}/>
      <footer className="py-8 text-center text-xs text-muted" style={{ borderTop:"1px solid #f3f4f6", fontFamily:"var(--font-mono)" }}>
        {data.personal.name} · {new Date().getFullYear()}
      </footer>
    </main>
  );
}