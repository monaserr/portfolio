"use client";

import { useState, useEffect, useRef } from "react";
import {
  loadData, saveData, resetData,
  type PortfolioData, type Project, type SkillCategory,
  type Experience, type Education, type Certification, type Message,
} from "@/lib/store";
import {
  LayoutDashboard, FolderOpen, Code2, MessageSquare,
  User, LogOut, Eye, Plus, Pencil, Trash2, Save, X,
  Check, ChevronRight, Star, Award, Zap, BookOpen,
  Upload, RefreshCw, Menu, Bell, GraduationCap,
} from "lucide-react";

type Tab = "overview" | "personal" | "projects" | "skills" | "experience" | "education" | "certifications" | "messages";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function toast(msg: string, setMsg: (s: string) => void) {
  setMsg(msg); setTimeout(() => setMsg(""), 2500);
}

// ─── Login ────────────────────────────────────────────────────────────────────
function Login({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [err, setErr] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (locked) return;
    if (pw === (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "MN@2026!secure")) {
      onLogin();
    } else {
      const next = attempts + 1;
      setAttempts(next);
      setErr(true);
      setTimeout(() => setErr(false), 2000);
      if (next >= 3) {
        setLocked(true);
        setTimeout(() => { setLocked(false); setAttempts(0); }, 30000);
      }
    }
  };
  return (
    <div className="min-h-screen bg-bg dot-bg flex items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="font-display text-white text-xl">MN</span>
          </div>
          <h1 className="text-ink text-xl font-semibold">Admin Dashboard</h1>
          <p className="text-muted text-sm mt-1">Mohamed Nasser Portfolio</p>
        </div>
        <form onSubmit={submit} className="bg-white border border-border rounded-2xl p-8 card-shadow space-y-4">
          <div>
            <label className="block text-xs text-muted font-mono mb-2 uppercase tracking-widest">Password</label>
            <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="Enter password"
              disabled={locked}
              className={`w-full bg-soft border rounded-xl px-4 py-3 text-ink text-sm placeholder:text-muted focus:outline-none transition-all ${locked ? "opacity-50 cursor-not-allowed border-border" : err ? "border-red-400 ring-2 ring-red-100" : "border-border focus:border-accent focus:ring-2 focus:ring-accent/10"}`} />
            {err && !locked && <p className="text-red-500 text-xs mt-1">Wrong password · {3 - attempts} attempts left</p>}
            {locked && <p className="text-red-500 text-xs mt-1">Too many attempts. Try again in 30 seconds.</p>}
          </div>
          <button type="submit" disabled={locked} className="w-full py-3 bg-accent text-white font-semibold text-sm rounded-xl hover:bg-accent/90 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
            {locked ? "Locked..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ tab, setTab, onLogout, unread, mobile, onClose }: {
  tab: Tab; setTab: (t: Tab) => void; onLogout: () => void;
  unread: number; mobile: boolean; onClose: () => void;
}) {
  const items: { id: Tab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: "overview",       label: "Overview",       icon: <LayoutDashboard size={17} /> },
    { id: "personal",       label: "Personal Info",  icon: <User size={17} /> },
    { id: "projects",       label: "Projects",       icon: <FolderOpen size={17} /> },
    { id: "skills",         label: "Skills",         icon: <Code2 size={17} /> },
    { id: "experience",     label: "Experience",     icon: <Zap size={17} /> },
    { id: "education",      label: "Education",      icon: <GraduationCap size={17} /> },
    { id: "certifications", label: "Certifications", icon: <Award size={17} /> },
    { id: "messages",       label: "Messages",       icon: <MessageSquare size={17} />, badge: unread },
  ];
  return (
    <aside className={`${mobile ? "fixed inset-0 z-50 flex" : "w-60 h-screen fixed left-0 top-0 flex flex-col"}`}>
      {mobile && <div className="absolute inset-0 bg-black/30" onClick={onClose} />}
      <div className={`${mobile ? "relative z-10 w-60" : "w-full"} bg-white border-r border-border flex flex-col h-full`}>
        <div className="p-5 border-b border-border flex items-center gap-3">
          <div className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center shrink-0">
            <span className="font-display text-white text-sm">MN</span>
          </div>
          <div>
            <div className="text-ink text-sm font-semibold">Admin Panel</div>
            <div className="text-muted text-xs">Portfolio CMS</div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {items.map(item => (
            <button key={item.id} onClick={() => { setTab(item.id); onClose(); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${tab === item.id ? "bg-accent text-white shadow-sm" : "text-muted hover:text-ink hover:bg-soft"}`}>
              {item.icon}
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && item.badge > 0 && (
                <span className={`text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold ${tab === item.id ? "bg-white/20 text-white" : "bg-accent text-white"}`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-border space-y-1">
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted hover:text-ink hover:bg-soft transition-all">
            <Eye size={17} /> View Site <ChevronRight size={13} className="ml-auto" />
          </a>
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted hover:text-red-500 hover:bg-red-50 transition-all">
            <LogOut size={17} /> Logout
          </button>
        </div>
      </div>
    </aside>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ msg }: { msg: string }) {
  if (!msg) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-ink text-white text-sm px-4 py-3 rounded-xl shadow-lg animate-slide-up">
      <Check size={15} className="text-green-400" /> {msg}
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h2 className="text-ink text-xl font-semibold">{title}</h2>
        {subtitle && <p className="text-muted text-sm mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

// ─── Input / Textarea ─────────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs text-muted font-mono mb-1.5 uppercase tracking-widest">{label}</label>
      {children}
    </div>
  );
}
const inp = "w-full bg-soft border border-border rounded-xl px-4 py-2.5 text-ink text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all";

// ─── Overview ─────────────────────────────────────────────────────────────────
function Overview({ data, setTab }: { data: PortfolioData; setTab: (t: Tab) => void }) {
  const stats = [
    { label: "Projects", value: data.projects.length, color: "text-accent", tab: "projects" as Tab },
    { label: "Skill Items", value: data.skills.reduce((a, s) => a + s.items.length, 0), color: "text-purple-500", tab: "skills" as Tab },
    { label: "Unread Msgs", value: data.messages.filter(m => !m.read).length, color: "text-green-500", tab: "messages" as Tab },
    { label: "Certifications", value: data.certifications.length, color: "text-amber-500", tab: "certifications" as Tab },
  ];
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-accent to-accent2 rounded-2xl p-6 text-white">
        <p className="text-white/70 text-sm mb-1">Welcome back 👋</p>
        <h2 className="text-2xl font-semibold">{data.personal.name}</h2>
        <p className="text-white/80 text-sm mt-1">{data.personal.title}</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <button key={s.label} onClick={() => setTab(s.tab)}
            className="bg-white border border-border rounded-xl p-5 card-shadow text-left hover:card-shadow-hover hover:border-accent/30 transition-all">
            <div className={`font-display text-3xl ${s.color}`}>{s.value}</div>
            <div className="text-muted text-xs mt-1">{s.label}</div>
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white border border-border rounded-xl p-5 card-shadow">
          <h3 className="text-ink font-semibold text-sm mb-4">Recent Projects</h3>
          <div className="space-y-2.5">
            {data.projects.slice(0, 4).map(p => (
              <div key={p.id} className="flex items-center justify-between">
                <span className="text-ink/80 text-sm">{p.title}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${p.status === "live" ? "bg-green-50 text-green-600 border border-green-200" : "bg-amber-50 text-amber-600 border border-amber-200"}`}>
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-border rounded-xl p-5 card-shadow">
          <h3 className="text-ink font-semibold text-sm mb-4">Recent Messages</h3>
          <div className="space-y-3">
            {data.messages.slice(0, 3).map(m => (
              <div key={m.id} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${m.read ? "bg-border" : "bg-accent"}`} />
                <div>
                  <div className="text-ink/80 text-sm font-medium">{m.name}</div>
                  <div className="text-muted text-xs line-clamp-1">{m.message}</div>
                </div>
              </div>
            ))}
            {data.messages.length === 0 && <p className="text-muted text-sm">No messages yet</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Personal Info ────────────────────────────────────────────────────────────
function PersonalEditor({ data, onChange, onToast }: { data: PortfolioData; onChange: (d: PortfolioData) => void; onToast: (s: string) => void }) {
  const [form, setForm] = useState(data.personal);
  const fileRef = useRef<HTMLInputElement>(null);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm(f => ({ ...f, photoUrl: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const save = () => {
    const updated = { ...data, personal: form };
    onChange(updated);
    saveData(updated);
    onToast("Personal info saved!");
  };

  return (
    <div className="space-y-6">
      <Section title="Personal Info" subtitle="Edit your profile information" />

      {/* Photo Upload */}
      <div className="bg-white border border-border rounded-2xl p-6 card-shadow">
        <h3 className="text-ink font-semibold text-sm mb-4">Profile Photo</h3>
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-border bg-soft flex items-center justify-center shrink-0">
            {form.photoUrl ? (
              <img src={form.photoUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User size={32} className="text-border" />
            )}
          </div>
          <div className="space-y-2">
            <button onClick={() => fileRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent/90 transition-all">
              <Upload size={15} /> Upload Photo
            </button>
            {form.photoUrl && (
              <button onClick={() => setForm(f => ({ ...f, photoUrl: "" }))}
                className="flex items-center gap-2 px-4 py-2 border border-border text-muted text-sm rounded-xl hover:border-red-300 hover:text-red-500 transition-all">
                <X size={15} /> Remove
              </button>
            )}
            <p className="text-muted text-xs">JPG, PNG · Max 5MB</p>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="bg-white border border-border rounded-2xl p-6 card-shadow grid md:grid-cols-2 gap-4">
        <Field label="Full Name">
          <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inp} />
        </Field>
        <Field label="Title">
          <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className={inp} />
        </Field>
        <Field label="Subtitle">
          <input value={form.subtitle} onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))} className={inp} />
        </Field>
        <Field label="Location">
          <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} className={inp} />
        </Field>
        <Field label="Email">
          <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={inp} />
        </Field>
        <Field label="Phone">
          <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className={inp} />
        </Field>
        <Field label="GitHub URL">
          <input value={form.github} onChange={e => setForm(f => ({ ...f, github: e.target.value }))} className={inp} />
        </Field>
        <Field label="LinkedIn URL">
          <input value={form.linkedin} onChange={e => setForm(f => ({ ...f, linkedin: e.target.value }))} className={inp} />
        </Field>
        <div className="md:col-span-2">
          <Field label="Summary">
            <textarea rows={4} value={form.summary} onChange={e => setForm(f => ({ ...f, summary: e.target.value }))} className={`${inp} resize-none`} />
          </Field>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border border-border rounded-2xl p-6 card-shadow">
        <h3 className="text-ink font-semibold text-sm mb-4">Hero Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {form.stats.map((s, i) => (
            <div key={i} className="bg-soft border border-border rounded-xl p-3 space-y-2">
              <input value={s.value} onChange={e => setForm(f => ({ ...f, stats: f.stats.map((x, j) => j === i ? { ...x, value: e.target.value } : x) }))}
                placeholder="Value" className="w-full bg-white border border-border rounded-lg px-3 py-1.5 text-sm text-ink focus:outline-none focus:border-accent" />
              <input value={s.label} onChange={e => setForm(f => ({ ...f, stats: f.stats.map((x, j) => j === i ? { ...x, label: e.target.value } : x) }))}
                placeholder="Label" className="w-full bg-white border border-border rounded-lg px-3 py-1.5 text-xs text-muted focus:outline-none focus:border-accent" />
            </div>
          ))}
        </div>
      </div>

      <button onClick={save} className="flex items-center gap-2 px-6 py-2.5 bg-accent text-white font-semibold text-sm rounded-xl hover:bg-accent/90 transition-all shadow-sm">
        <Save size={15} /> Save Changes
      </button>
    </div>
  );
}

// ─── Projects Manager ─────────────────────────────────────────────────────────
function ProjectsManager({ data, onChange, onToast }: { data: PortfolioData; onChange: (d: PortfolioData) => void; onToast: (s: string) => void }) {
  const [editing, setEditing] = useState<Project | null>(null);

  const blank: Project = { id: Date.now().toString(), title: "", subtitle: "", year: new Date().getFullYear().toString(), status: "wip", description: "", tech: [], highlights: [], github: "https://github.com/monaserr" };

  const save = (p: Project) => {
    const exists = data.projects.find(x => x.id === p.id);
    const projects = exists ? data.projects.map(x => x.id === p.id ? p : x) : [...data.projects, p];
    const updated = { ...data, projects };
    onChange(updated); saveData(updated);
    setEditing(null); onToast("Project saved!");
  };

  const del = (id: string) => {
    const updated = { ...data, projects: data.projects.filter(p => p.id !== id) };
    onChange(updated); saveData(updated); onToast("Project deleted.");
  };

  if (editing) return <ProjectForm project={editing} onSave={save} onCancel={() => setEditing(null)} />;

  return (
    <div className="space-y-4">
      <Section title="Projects" subtitle={`${data.projects.length} projects`}
        action={<button onClick={() => setEditing(blank)} className="flex items-center gap-2 px-4 py-2 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent/90 transition-all shadow-sm"><Plus size={15} /> Add Project</button>} />
      <div className="space-y-3">
        {data.projects.map(p => (
          <div key={p.id} className="bg-white border border-border rounded-xl p-5 flex items-start justify-between gap-4 card-shadow hover:border-accent/30 transition-all">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2 py-0.5 text-xs font-mono rounded-full ${p.status === "live" ? "bg-green-50 text-green-600 border border-green-200" : "bg-amber-50 text-amber-600 border border-amber-200"}`}>
                  {p.status === "live" ? "● Live" : "◐ WIP"}
                </span>
                <span className="text-muted text-xs">{p.year}</span>
              </div>
              <h3 className="text-ink font-semibold">{p.title || <span className="text-muted italic">Untitled</span>}</h3>
              <p className="text-accent text-xs font-mono">{p.subtitle}</p>
              <p className="text-muted text-sm mt-1 line-clamp-1">{p.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {p.tech.slice(0, 5).map(t => <span key={t} className="px-1.5 py-0.5 text-xs font-mono text-accent bg-accent/8 border border-accent/15 rounded">{t}</span>)}
                {p.tech.length > 5 && <span className="text-muted text-xs self-center">+{p.tech.length - 5}</span>}
              </div>
            </div>
            <div className="flex gap-1.5 shrink-0">
              <button onClick={() => setEditing(p)} className="p-2 text-muted hover:text-accent hover:bg-accent/8 rounded-lg transition-all"><Pencil size={15} /></button>
              <button onClick={() => del(p.id)} className="p-2 text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectForm({ project, onSave, onCancel }: { project: Project; onSave: (p: Project) => void; onCancel: () => void }) {
  const [form, setForm] = useState({ ...project, techStr: project.tech.join(", "), hlStr: project.highlights.join("\n") });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...form, tech: form.techStr.split(",").map(t => t.trim()).filter(Boolean), highlights: form.hlStr.split("\n").filter(Boolean) });
  };
  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="flex items-center gap-3 mb-2">
        <button type="button" onClick={onCancel} className="p-2 text-muted hover:text-ink hover:bg-soft rounded-lg transition-all"><X size={18} /></button>
        <h2 className="text-ink text-xl font-semibold">{project.title ? "Edit Project" : "New Project"}</h2>
      </div>
      <div className="bg-white border border-border rounded-2xl p-6 card-shadow grid md:grid-cols-2 gap-4">
        <Field label="Title"><input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required className={inp} /></Field>
        <Field label="Subtitle"><input value={form.subtitle} onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))} className={inp} /></Field>
        <Field label="Year"><input value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))} className={inp} /></Field>
        <Field label="Status">
          <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as "live" | "wip" }))} className={inp}>
            <option value="live">Live</option>
            <option value="wip">WIP</option>
          </select>
        </Field>
        <Field label="GitHub URL"><input value={form.github} onChange={e => setForm(f => ({ ...f, github: e.target.value }))} className={inp} /></Field>
        <Field label="Live URL (optional)"><input value={form.liveUrl ?? ""} onChange={e => setForm(f => ({ ...f, liveUrl: e.target.value }))} className={inp} /></Field>
        <div className="md:col-span-2">
          <Field label="Description"><textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className={`${inp} resize-none`} /></Field>
        </div>
        <div className="md:col-span-2">
          <Field label="Technologies (comma separated)"><input value={form.techStr} onChange={e => setForm(f => ({ ...f, techStr: e.target.value }))} placeholder="React, Node.js, MongoDB" className={inp} /></Field>
        </div>
        <div className="md:col-span-2">
          <Field label="Highlights (one per line)"><textarea rows={4} value={form.hlStr} onChange={e => setForm(f => ({ ...f, hlStr: e.target.value }))} className={`${inp} resize-none`} /></Field>
        </div>
      </div>
      <div className="flex gap-3">
        <button type="submit" className="flex items-center gap-2 px-6 py-2.5 bg-accent text-white font-semibold text-sm rounded-xl hover:bg-accent/90 shadow-sm transition-all"><Save size={15} /> Save</button>
        <button type="button" onClick={onCancel} className="px-6 py-2.5 border border-border text-muted text-sm rounded-xl hover:border-accent hover:text-accent transition-all">Cancel</button>
      </div>
    </form>
  );
}

// ─── Skills Manager ───────────────────────────────────────────────────────────
function SkillsManager({ data, onChange, onToast }: { data: PortfolioData; onChange: (d: PortfolioData) => void; onToast: (s: string) => void }) {
  const [newItems, setNewItems] = useState<Record<string, string>>({});

  const addItem = (cat: string, item: string) => {
    if (!item.trim()) return;
    const updated = { ...data, skills: data.skills.map(s => s.category === cat ? { ...s, items: [...s.items, item.trim()] } : s) };
    onChange(updated); saveData(updated);
    setNewItems(n => ({ ...n, [cat]: "" }));
    onToast("Skill added!");
  };

  const removeItem = (cat: string, item: string) => {
    const updated = { ...data, skills: data.skills.map(s => s.category === cat ? { ...s, items: s.items.filter(i => i !== item) } : s) };
    onChange(updated); saveData(updated);
  };

  const addCategory = () => {
    const name = prompt("Category name?");
    if (!name?.trim()) return;
    const updated = { ...data, skills: [...data.skills, { category: name.trim(), icon: "Code2", items: [] }] };
    onChange(updated); saveData(updated); onToast("Category added!");
  };

  const delCategory = (cat: string) => {
    const updated = { ...data, skills: data.skills.filter(s => s.category !== cat) };
    onChange(updated); saveData(updated); onToast("Category deleted.");
  };

  return (
    <div className="space-y-4">
      <Section title="Skills" subtitle={`${data.skills.reduce((a, s) => a + s.items.length, 0)} items across ${data.skills.length} categories`}
        action={<button onClick={addCategory} className="flex items-center gap-2 px-4 py-2 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent/90 shadow-sm transition-all"><Plus size={15} /> Add Category</button>} />
      <div className="grid md:grid-cols-2 gap-4">
        {data.skills.map(skill => (
          <div key={skill.category} className="bg-white border border-border rounded-xl p-5 card-shadow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-ink font-semibold text-sm">{skill.category}</h3>
              <button onClick={() => delCategory(skill.category)} className="p-1.5 text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={14} /></button>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {skill.items.map(item => (
                <div key={item} className="flex items-center gap-1 px-2.5 py-1 bg-soft border border-border rounded-lg font-mono text-xs text-muted group">
                  {item}
                  <button onClick={() => removeItem(skill.category, item)} className="ml-1 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"><X size={10} /></button>
                </div>
              ))}
              {skill.items.length === 0 && <span className="text-muted text-xs italic">No items yet</span>}
            </div>
            <div className="flex gap-2">
              <input value={newItems[skill.category] ?? ""} onChange={e => setNewItems(n => ({ ...n, [skill.category]: e.target.value }))}
                onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addItem(skill.category, newItems[skill.category] ?? ""))}
                placeholder="Add skill..." className="flex-1 bg-soft border border-border rounded-lg px-3 py-1.5 text-ink text-xs focus:outline-none focus:border-accent transition-all" />
              <button onClick={() => addItem(skill.category, newItems[skill.category] ?? "")} className="px-3 py-1.5 bg-accent text-white text-xs rounded-lg hover:bg-accent/90 transition-all"><Plus size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Experience Manager ───────────────────────────────────────────────────────
function ExperienceManager({ data, onChange, onToast }: { data: PortfolioData; onChange: (d: PortfolioData) => void; onToast: (s: string) => void }) {
  const [editing, setEditing] = useState<Experience & { _idx: number } | null>(null);
  const blank: Experience = { title: "", company: "", period: "", bullets: [] };

  const save = (exp: Experience, idx: number) => {
    const experience = idx === -1 ? [...data.experience, exp] : data.experience.map((x, i) => i === idx ? exp : x);
    const updated = { ...data, experience };
    onChange(updated); saveData(updated); setEditing(null); onToast("Saved!");
  };

  const del = (idx: number) => {
    const updated = { ...data, experience: data.experience.filter((_, i) => i !== idx) };
    onChange(updated); saveData(updated); onToast("Deleted.");
  };

  if (editing) {
    const { _idx, ...exp } = editing;
    return <ExpForm exp={exp} onSave={e => save(e, _idx)} onCancel={() => setEditing(null)} />;
  }

  return (
    <div className="space-y-4">
      <Section title="Experience" subtitle={`${data.experience.length} entries`}
        action={<button onClick={() => setEditing({ ...blank, _idx: -1 })} className="flex items-center gap-2 px-4 py-2 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent/90 shadow-sm transition-all"><Plus size={15} /> Add</button>} />
      {data.experience.map((exp, i) => (
        <div key={i} className="bg-white border border-border rounded-xl p-5 card-shadow flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-ink font-semibold">{exp.title}</h3>
            <p className="text-accent text-sm font-mono">{exp.company} · {exp.period}</p>
            <ul className="mt-2 space-y-1">{exp.bullets.slice(0, 2).map((b, j) => <li key={j} className="text-muted text-xs flex gap-2"><span>›</span>{b}</li>)}</ul>
          </div>
          <div className="flex gap-1.5 shrink-0">
            <button onClick={() => setEditing({ ...exp, _idx: i })} className="p-2 text-muted hover:text-accent hover:bg-accent/8 rounded-lg transition-all"><Pencil size={15} /></button>
            <button onClick={() => del(i)} className="p-2 text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={15} /></button>
          </div>
        </div>
      ))}
    </div>
  );
}

function ExpForm({ exp, onSave, onCancel }: { exp: Experience; onSave: (e: Experience) => void; onCancel: () => void }) {
  const [form, setForm] = useState({ ...exp, bulletsStr: exp.bullets.join("\n") });
  const submit = (e: React.FormEvent) => { e.preventDefault(); onSave({ ...form, bullets: form.bulletsStr.split("\n").filter(Boolean) }); };
  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <button type="button" onClick={onCancel} className="p-2 text-muted hover:text-ink hover:bg-soft rounded-lg transition-all"><X size={18} /></button>
        <h2 className="text-ink text-xl font-semibold">Experience</h2>
      </div>
      <div className="bg-white border border-border rounded-2xl p-6 card-shadow space-y-4">
        <Field label="Job Title"><input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required className={inp} /></Field>
        <Field label="Company"><input value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} className={inp} /></Field>
        <Field label="Period"><input value={form.period} onChange={e => setForm(f => ({ ...f, period: e.target.value }))} placeholder="Jan 2024 – Present" className={inp} /></Field>
        <Field label="Bullet Points (one per line)"><textarea rows={5} value={form.bulletsStr} onChange={e => setForm(f => ({ ...f, bulletsStr: e.target.value }))} className={`${inp} resize-none`} /></Field>
      </div>
      <div className="flex gap-3">
        <button type="submit" className="flex items-center gap-2 px-6 py-2.5 bg-accent text-white font-semibold text-sm rounded-xl hover:bg-accent/90 shadow-sm"><Save size={15} /> Save</button>
        <button type="button" onClick={onCancel} className="px-6 py-2.5 border border-border text-muted text-sm rounded-xl hover:border-accent hover:text-accent transition-all">Cancel</button>
      </div>
    </form>
  );
}

// ─── Education Manager ────────────────────────────────────────────────────────
function EducationManager({ data, onChange, onToast }: { data: PortfolioData; onChange: (d: PortfolioData) => void; onToast: (s: string) => void }) {
  const [editing, setEditing] = useState<(Education & { _idx: number }) | null>(null);
  const blank: Education = { degree: "", school: "", period: "", gpa: "" };

  const save = (edu: Education, idx: number) => {
    const education = idx === -1 ? [...data.education, edu] : data.education.map((x, i) => i === idx ? edu : x);
    const updated = { ...data, education };
    onChange(updated); saveData(updated); setEditing(null); onToast("Saved!");
  };
  const del = (idx: number) => { const updated = { ...data, education: data.education.filter((_, i) => i !== idx) }; onChange(updated); saveData(updated); onToast("Deleted."); };

  return (
    <div className="space-y-4">
      <Section title="Education" subtitle={`${data.education.length} entries`}
        action={<button onClick={() => setEditing({ ...blank, _idx: -1 })} className="flex items-center gap-2 px-4 py-2 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent/90 shadow-sm transition-all"><Plus size={15} /> Add</button>} />
      {editing && (
        <form onSubmit={e => { e.preventDefault(); const { _idx, ...edu } = editing; save(edu, _idx); }} className="bg-white border border-border rounded-2xl p-6 card-shadow space-y-4">
          <Field label="Degree"><input value={editing.degree} onChange={e => setEditing(f => f && ({ ...f, degree: e.target.value }))} required className={inp} /></Field>
          <Field label="School"><input value={editing.school} onChange={e => setEditing(f => f && ({ ...f, school: e.target.value }))} className={inp} /></Field>
          <Field label="Period"><input value={editing.period} onChange={e => setEditing(f => f && ({ ...f, period: e.target.value }))} className={inp} /></Field>
          <Field label="GPA"><input value={editing.gpa} onChange={e => setEditing(f => f && ({ ...f, gpa: e.target.value }))} placeholder="3.74 / 4.0" className={inp} /></Field>
          <div className="flex gap-3">
            <button type="submit" className="flex items-center gap-2 px-5 py-2 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent/90"><Save size={14} /> Save</button>
            <button type="button" onClick={() => setEditing(null)} className="px-5 py-2 border border-border text-muted text-sm rounded-xl hover:border-accent hover:text-accent">Cancel</button>
          </div>
        </form>
      )}
      {data.education.map((edu, i) => (
        <div key={i} className="bg-white border border-border rounded-xl p-5 card-shadow flex items-start justify-between gap-4">
          <div>
            <h3 className="text-ink font-semibold">{edu.degree}</h3>
            <p className="text-accent text-sm font-mono">{edu.school}</p>
            <p className="text-muted text-xs mt-1">{edu.period}</p>
            {edu.gpa && <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-accent/8 border border-accent/20 rounded-full"><Star size={11} className="text-accent" /><span className="text-accent text-xs font-mono">GPA {edu.gpa}</span></div>}
          </div>
          <div className="flex gap-1.5">
            <button onClick={() => setEditing({ ...edu, _idx: i })} className="p-2 text-muted hover:text-accent hover:bg-accent/8 rounded-lg transition-all"><Pencil size={15} /></button>
            <button onClick={() => del(i)} className="p-2 text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={15} /></button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Certifications ───────────────────────────────────────────────────────────
function CertsManager({ data, onChange, onToast }: { data: PortfolioData; onChange: (d: PortfolioData) => void; onToast: (s: string) => void }) {
  const [form, setForm] = useState<Certification>({ name: "", issuer: "", icon: "🏆" });
  const [adding, setAdding] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { ...data, certifications: [...data.certifications, form] };
    onChange(updated); saveData(updated); setAdding(false); setForm({ name: "", issuer: "", icon: "🏆" }); onToast("Cert added!");
  };
  const del = (i: number) => { const updated = { ...data, certifications: data.certifications.filter((_, j) => j !== i) }; onChange(updated); saveData(updated); onToast("Deleted."); };

  return (
    <div className="space-y-4">
      <Section title="Certifications" subtitle={`${data.certifications.length} entries`}
        action={<button onClick={() => setAdding(!adding)} className="flex items-center gap-2 px-4 py-2 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent/90 shadow-sm transition-all"><Plus size={15} /> Add</button>} />
      {adding && (
        <form onSubmit={add} className="bg-white border border-border rounded-2xl p-6 card-shadow space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <Field label="Icon (emoji)"><input value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} className={inp} /></Field>
            <Field label="Name"><input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required className={inp} /></Field>
            <Field label="Issuer"><input value={form.issuer} onChange={e => setForm(f => ({ ...f, issuer: e.target.value }))} className={inp} /></Field>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="flex items-center gap-2 px-5 py-2 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent/90"><Save size={14} /> Save</button>
            <button type="button" onClick={() => setAdding(false)} className="px-5 py-2 border border-border text-muted text-sm rounded-xl hover:border-accent hover:text-accent">Cancel</button>
          </div>
        </form>
      )}
      <div className="space-y-2.5">
        {data.certifications.map((cert, i) => (
          <div key={i} className="bg-white border border-border rounded-xl p-4 card-shadow flex items-center gap-3">
            <span className="text-2xl">{cert.icon}</span>
            <div className="flex-1">
              <div className="text-ink text-sm font-medium">{cert.name}</div>
              <div className="text-muted text-xs">{cert.issuer}</div>
            </div>
            <button onClick={() => del(i)} className="p-2 text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={15} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Messages ─────────────────────────────────────────────────────────────────
function MessagesView({ data, onChange, onToast }: { data: PortfolioData; onChange: (d: PortfolioData) => void; onToast: (s: string) => void }) {
  const [selected, setSelected] = useState<Message | null>(null);

  const markRead = (id: string) => {
    const updated = { ...data, messages: data.messages.map(m => m.id === id ? { ...m, read: true } : m) };
    onChange(updated); saveData(updated);
  };
  const del = (id: string) => {
    const updated = { ...data, messages: data.messages.filter(m => m.id !== id) };
    onChange(updated); saveData(updated); setSelected(null); onToast("Deleted.");
  };
  const markAllRead = () => {
    const updated = { ...data, messages: data.messages.map(m => ({ ...m, read: true })) };
    onChange(updated); saveData(updated); onToast("All marked as read.");
  };

  const unread = data.messages.filter(m => !m.read).length;

  return (
    <div className="space-y-4">
      <Section title="Messages" subtitle={`${unread} unread · ${data.messages.length} total`}
        action={unread > 0 ? <button onClick={markAllRead} className="flex items-center gap-2 px-4 py-2 border border-border text-muted text-sm rounded-xl hover:border-accent hover:text-accent transition-all"><Check size={15} /> Mark all read</button> : undefined} />
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          {data.messages.length === 0 && (
            <div className="bg-white border border-border rounded-xl p-12 card-shadow text-center">
              <MessageSquare size={32} className="mx-auto mb-3 text-border" />
              <p className="text-muted text-sm">No messages yet</p>
            </div>
          )}
          {data.messages.map(m => (
            <button key={m.id} onClick={() => { setSelected(m); markRead(m.id); }}
              className={`w-full text-left p-4 rounded-xl border transition-all ${selected?.id === m.id ? "border-accent/40 bg-accent/4 card-shadow-hover" : "border-border bg-white card-shadow hover:border-accent/20"}`}>
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className={`text-sm font-semibold ${m.read ? "text-ink/70" : "text-ink"}`}>{m.name}</span>
                <div className="flex items-center gap-2 shrink-0">
                  {!m.read && <span className="w-2 h-2 rounded-full bg-accent shrink-0" />}
                  <span className="text-muted text-xs">{m.date}</span>
                </div>
              </div>
              <p className="text-muted text-xs">{m.email}</p>
              <p className="text-ink/50 text-xs mt-1 line-clamp-2">{m.message}</p>
            </button>
          ))}
        </div>
        <div>
          {selected ? (
            <div className="bg-white border border-border rounded-xl p-6 card-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-ink font-semibold">{selected.name}</h3>
                  <a href={`mailto:${selected.email}`} className="text-accent text-sm hover:underline">{selected.email}</a>
                  <p className="text-muted text-xs mt-0.5">{selected.date}</p>
                </div>
                <button onClick={() => del(selected.id)} className="p-2 text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={15} /></button>
              </div>
              <div className="bg-soft border border-border rounded-xl p-4 mb-4">
                <p className="text-ink/80 text-sm leading-relaxed">{selected.message}</p>
              </div>
              <a href={`mailto:${selected.email}?subject=Re: Portfolio Inquiry`}
                className="flex items-center justify-center gap-2 py-2.5 bg-accent text-white font-semibold text-sm rounded-xl hover:bg-accent/90 transition-all shadow-sm">
                <Zap size={15} /> Reply via Email
              </a>
            </div>
          ) : (
            <div className="bg-white border border-border rounded-xl p-6 card-shadow flex flex-col items-center justify-center h-40 text-muted">
              <MessageSquare size={28} className="mb-2 text-border" />
              <p className="text-sm">Select a message</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<Tab>("overview");
  const [data, setData] = useState<PortfolioData | null>(null);
  const [toastMsg, setToastMsg] = useState("");
  const [mobileNav, setMobileNav] = useState(false);

  useEffect(() => {
    setData(loadData());
  }, []);

  if (!authed) return <Login onLogin={() => setAuthed(true)} />;
  if (!data) return <div className="min-h-screen bg-bg flex items-center justify-center text-muted">Loading...</div>;

  const unread = data.messages.filter(m => !m.read).length;
  const onToast = (msg: string) => toast(msg, setToastMsg);

  const tabContent: Record<Tab, React.ReactNode> = {
    overview:       <Overview data={data} setTab={setTab} />,
    personal:       <PersonalEditor data={data} onChange={setData} onToast={onToast} />,
    projects:       <ProjectsManager data={data} onChange={setData} onToast={onToast} />,
    skills:         <SkillsManager data={data} onChange={setData} onToast={onToast} />,
    experience:     <ExperienceManager data={data} onChange={setData} onToast={onToast} />,
    education:      <EducationManager data={data} onChange={setData} onToast={onToast} />,
    certifications: <CertsManager data={data} onChange={setData} onToast={onToast} />,
    messages:       <MessagesView data={data} onChange={setData} onToast={onToast} />,
  };

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar tab={tab} setTab={setTab} onLogout={() => setAuthed(false)} unread={unread} mobile={false} onClose={() => {}} />
      </div>

      {/* Mobile sidebar */}
      {mobileNav && (
        <Sidebar tab={tab} setTab={setTab} onLogout={() => setAuthed(false)} unread={unread} mobile={true} onClose={() => setMobileNav(false)} />
      )}

      {/* Main */}
      <main className="flex-1 md:ml-60 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-white border-b border-border px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 text-muted hover:text-ink hover:bg-soft rounded-lg transition-all" onClick={() => setMobileNav(true)}>
              <Menu size={18} />
            </button>
            <div className="flex items-center gap-1.5 text-muted text-xs font-mono">
              <span>admin</span><ChevronRight size={12} /><span className="text-accent capitalize">{tab}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {unread > 0 && (
              <button onClick={() => setTab("messages")} className="relative p-2 text-muted hover:text-accent hover:bg-soft rounded-lg transition-all">
                <Bell size={17} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
              </button>
            )}
            <button onClick={() => { resetData(); setData(loadData()); onToast("Reset to defaults!"); }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-muted text-xs border border-border rounded-lg hover:border-red-300 hover:text-red-500 transition-all">
              <RefreshCw size={12} /> Reset
            </button>
            <a href="/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-muted text-xs border border-border rounded-lg hover:border-accent hover:text-accent transition-all">
              <Eye size={12} /> Preview
            </a>
          </div>
        </header>

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {tabContent[tab]}
          </div>
        </div>
      </main>

      <Toast msg={toastMsg} />
    </div>
  );
}
