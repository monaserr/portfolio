"use client";
import { useState, useEffect, useRef } from "react";
import { loadData, saveData, resetData, type PortfolioData, type Project, type SkillCategory, type Experience, type Education, type Certification, type Message } from "@/lib/store";
import { LayoutDashboard, FolderOpen, Code2, MessageSquare, User, LogOut, Eye, Plus, Pencil, Trash2, Save, X, Check, ChevronRight, Star, Award, Zap, BookOpen, Upload, RefreshCw, Menu, Bell, GraduationCap } from "lucide-react";

type Tab = "overview"|"personal"|"projects"|"skills"|"experience"|"education"|"certifications"|"messages";

function Login({ onLogin }: { onLogin:()=>void }) {
  const [pw,setPw]=useState(""); const [err,setErr]=useState(false);
  const submit=(e:React.FormEvent)=>{ e.preventDefault(); if(pw===(process.env.NEXT_PUBLIC_ADMIN_PASSWORD||"MN@2026!secure")){onLogin();}else{setErr(true);setTimeout(()=>setErr(false),2000);} };
  const inp="w-full bg-gray-50 border rounded-xl px-4 py-3 text-sm focus:outline-none transition-all";
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background:"#fafafa", backgroundImage:"radial-gradient(circle,#d1d5db 1px,transparent 1px)", backgroundSize:"24px 24px" }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-ink rounded-2xl flex items-center justify-center mx-auto mb-4"><span className="font-bold text-white text-xl">MN</span></div>
          <h1 className="text-xl font-bold text-ink">Admin Dashboard</h1>
          <p className="text-sm text-muted mt-1">Mohamed Nasser Portfolio</p>
        </div>
        <form onSubmit={submit} className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm space-y-4">
          <div>
            <label className="block text-xs text-muted mb-2 uppercase tracking-widest" style={{ fontFamily:"var(--font-mono)" }}>Password</label>
            <input type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="Enter password" className={`${inp} ${err?"border-red-400":"border-gray-200 focus:border-gray-900"}`}/>
            {err&&<p className="text-red-500 text-xs mt-1">Wrong password</p>}
          </div>
          <button type="submit" className="w-full py-3 bg-ink text-white font-semibold text-sm rounded-xl hover:opacity-85 transition-all">Login</button>
          <p className="text-muted text-xs text-center" style={{ fontFamily:"var(--font-mono)" }}>Set password in .env</p>
        </form>
      </div>
    </div>
  );
}

function Sidebar({ tab,setTab,onLogout,unread,mobile,onClose }:{ tab:Tab;setTab:(t:Tab)=>void;onLogout:()=>void;unread:number;mobile:boolean;onClose:()=>void }) {
  const items:[Tab,string,React.ReactNode,number?][] = [["overview","Overview",<LayoutDashboard size={17}/>],["personal","Personal Info",<User size={17}/>],["projects","Projects",<FolderOpen size={17}/>],["skills","Skills",<Code2 size={17}/>],["experience","Experience",<Zap size={17}/>],["education","Education",<GraduationCap size={17}/>],["certifications","Certifications",<Award size={17}/>],["messages","Messages",<MessageSquare size={17}/>,unread]];
  return (
    <aside className={`${mobile?"fixed inset-0 z-50 flex":""}`}>
      {mobile&&<div className="absolute inset-0 bg-black/20" onClick={onClose}/>}
      <div className={`${mobile?"relative z-10 w-60":"w-full"} bg-white border-r border-gray-100 flex flex-col h-full`}>
        <div className="p-5 border-b border-gray-100 flex items-center gap-3">
          <div className="w-9 h-9 bg-ink rounded-xl flex items-center justify-center shrink-0"><span className="font-bold text-white text-sm">MN</span></div>
          <div><div className="text-sm font-semibold text-ink">Admin Panel</div><div className="text-xs text-muted" style={{ fontFamily:"var(--font-mono)" }}>Portfolio CMS</div></div>
        </div>
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {items.map(([id,label,icon,badge])=>(
            <button key={id} onClick={()=>{setTab(id);onClose();}} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${tab===id?"bg-ink text-white":"text-muted hover:text-ink hover:bg-gray-50"}`}>
              {icon}<span className="flex-1 text-left">{label}</span>
              {badge&&badge>0&&<span className={`text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold ${tab===id?"bg-white/20 text-white":"bg-ink text-white"}`}>{badge}</span>}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-gray-100 space-y-1">
          <a href="/" target="_blank" rel="noopener noreferrer" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted hover:text-ink hover:bg-gray-50 transition-all"><Eye size={17}/>View Site<ChevronRight size={13} className="ml-auto"/></a>
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted hover:text-red-500 hover:bg-red-50 transition-all"><LogOut size={17}/>Logout</button>
        </div>
      </div>
    </aside>
  );
}

function Toast({ msg }:{ msg:string }) {
  if(!msg) return null;
  return <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-ink text-white text-sm px-4 py-3 rounded-xl shadow-lg"><Check size={15} className="text-green-400"/>{msg}</div>;
}

const inp2="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-gray-900 transition-all";
function Field({ label,children }:{ label:string;children:React.ReactNode }) {
  return <div><label className="block text-xs text-muted mb-1.5 uppercase tracking-widest" style={{ fontFamily:"var(--font-mono)" }}>{label}</label>{children}</div>;
}

function Overview({ data,setTab }:{ data:PortfolioData;setTab:(t:Tab)=>void }) {
  const stats=[["Projects",data.projects.length,"projects"],["Skill Items",data.skills.reduce((a,s)=>a+s.items.length,0),"skills"],["Unread",data.messages.filter(m=>!m.read).length,"messages"],["Certs",data.certifications.length,"certifications"]] as const;
  return (
    <div className="space-y-6">
      <div className="bg-ink rounded-2xl p-6 text-white"><p className="text-white/60 text-sm mb-1">Welcome back 👋</p><h2 className="text-xl font-bold">{data.personal.name}</h2><p className="text-white/70 text-sm mt-1">{data.personal.title}</p></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(([label,val,tabKey])=>(
          <button key={label} onClick={()=>setTab(tabKey as Tab)} className="bg-white border border-gray-100 rounded-xl p-5 text-left hover:border-gray-300 hover:shadow-sm transition-all">
            <div className="text-3xl font-bold text-ink">{val}</div><div className="text-xs text-muted mt-1" style={{ fontFamily:"var(--font-mono)" }}>{label}</div>
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-ink mb-4">Recent Projects</h3>
          <div className="space-y-2.5">{data.projects.slice(0,4).map(p=>(
            <div key={p.id} className="flex items-center justify-between">
              <span className="text-sm text-ink/80">{p.title}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${p.status==="live"?"bg-green-50 text-green-600 border border-green-200":"bg-amber-50 text-amber-600 border border-amber-200"}`}>{p.status}</span>
            </div>
          ))}</div>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-ink mb-4">Recent Messages</h3>
          <div className="space-y-3">{data.messages.slice(0,3).map(m=>(
            <div key={m.id} className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${m.read?"bg-gray-200":"bg-ink"}`}/>
              <div><div className="text-sm font-medium text-ink/80">{m.name}</div><div className="text-xs text-muted line-clamp-1">{m.message}</div></div>
            </div>
          ))}{data.messages.length===0&&<p className="text-sm text-muted">No messages yet</p>}</div>
        </div>
      </div>
    </div>
  );
}

function PersonalEditor({ data,onChange,onToast }:{ data:PortfolioData;onChange:(d:PortfolioData)=>void;onToast:(s:string)=>void }) {
  const [form,setForm]=useState(data.personal);
  const fileRef=useRef<HTMLInputElement>(null);
  const handlePhoto=(e:React.ChangeEvent<HTMLInputElement>)=>{ const f=e.target.files?.[0]; if(!f)return; const r=new FileReader(); r.onload=()=>setForm(x=>({...x,photoUrl:r.result as string})); r.readAsDataURL(f); };
  const save=()=>{ const u={...data,personal:form}; onChange(u); saveData(u); onToast("Saved!"); };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2"><h2 className="text-xl font-bold text-ink">Personal Info</h2></div>
      <div className="bg-white border border-gray-100 rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-ink mb-4">Profile Photo</h3>
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center shrink-0">
            {form.photoUrl?<img src={form.photoUrl} alt="Profile" className="w-full h-full object-cover"/>:<User size={32} className="text-gray-200"/>}
          </div>
          <div className="space-y-2">
            <button onClick={()=>fileRef.current?.click()} className="flex items-center gap-2 px-4 py-2 bg-ink text-white text-sm font-semibold rounded-xl hover:opacity-85 transition-all"><Upload size={15}/>Upload Photo</button>
            {form.photoUrl&&<button onClick={()=>setForm(f=>({...f,photoUrl:""}))} className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-muted text-sm rounded-xl hover:border-red-300 hover:text-red-500 transition-all"><X size={15}/>Remove</button>}
            <p className="text-muted text-xs" style={{ fontFamily:"var(--font-mono)" }}>JPG, PNG · Max 5MB</p>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto}/>
          </div>
        </div>
      </div>
      <div className="bg-white border border-gray-100 rounded-2xl p-6 grid md:grid-cols-2 gap-4">
        {[["Full Name","name"],["Title","title"],["Subtitle","subtitle"],["Location","location"],["Email","email"],["Phone","phone"],["GitHub URL","github"],["LinkedIn URL","linkedin"]].map(([label,key])=>(
          <Field key={key} label={label}><input value={(form as unknown as Record<string,string>)[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))} className={inp2}/></Field>
        ))}
        <div className="md:col-span-2"><Field label="Summary"><textarea rows={4} value={form.summary} onChange={e=>setForm(f=>({...f,summary:e.target.value}))} className={`${inp2} resize-none`}/></Field></div>
      </div>
      <div className="bg-white border border-gray-100 rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-ink mb-4">Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {form.stats.map((s,i)=>(
            <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-3 space-y-2">
              <input value={s.value} onChange={e=>setForm(f=>({...f,stats:f.stats.map((x,j)=>j===i?{...x,value:e.target.value}:x)}))} placeholder="Value" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-ink focus:outline-none focus:border-gray-900"/>
              <input value={s.label} onChange={e=>setForm(f=>({...f,stats:f.stats.map((x,j)=>j===i?{...x,label:e.target.value}:x)}))} placeholder="Label" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-muted focus:outline-none focus:border-gray-900"/>
            </div>
          ))}
        </div>
      </div>
      <button onClick={save} className="flex items-center gap-2 px-6 py-2.5 bg-ink text-white font-semibold text-sm rounded-xl hover:opacity-85"><Save size={15}/>Save Changes</button>
    </div>
  );
}

function ProjectsManager({ data,onChange,onToast }:{ data:PortfolioData;onChange:(d:PortfolioData)=>void;onToast:(s:string)=>void }) {
  const [editing,setEditing]=useState<Project|null>(null);
  const blank:Project={ id:Date.now().toString(),title:"",subtitle:"",year:new Date().getFullYear().toString(),status:"wip",description:"",tech:[],highlights:[],github:"https://github.com/monaserr" };
  const save=(p:Project)=>{ const exists=data.projects.find(x=>x.id===p.id); const projects=exists?data.projects.map(x=>x.id===p.id?p:x):[...data.projects,p]; const u={...data,projects}; onChange(u);saveData(u);setEditing(null);onToast("Project saved!"); };
  const del=(id:string)=>{ const u={...data,projects:data.projects.filter(p=>p.id!==id)}; onChange(u);saveData(u);onToast("Deleted."); };
  if(editing) return <ProjForm project={editing} onSave={save} onCancel={()=>setEditing(null)}/>;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div><h2 className="text-xl font-bold text-ink">Projects</h2><p className="text-sm text-muted">{data.projects.length} projects</p></div>
        <button onClick={()=>setEditing(blank)} className="flex items-center gap-2 px-4 py-2 bg-ink text-white text-sm font-semibold rounded-xl hover:opacity-85"><Plus size={15}/>Add</button>
      </div>
      <div className="space-y-3">
        {data.projects.map(p=>(
          <div key={p.id} className="bg-white border border-gray-100 rounded-xl p-5 flex items-start justify-between gap-4 hover:border-gray-300 transition-all">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${p.status==="live"?"bg-green-50 text-green-600 border border-green-200":"bg-amber-50 text-amber-600 border border-amber-200"}`}>{p.status}</span>
                <span className="text-xs text-muted" style={{ fontFamily:"var(--font-mono)" }}>{p.year}</span>
              </div>
              <h3 className="font-semibold text-ink">{p.title||<span className="text-muted italic">Untitled</span>}</h3>
              <p className="text-xs text-muted" style={{ fontFamily:"var(--font-mono)" }}>{p.subtitle}</p>
            </div>
            <div className="flex gap-1.5 shrink-0">
              <button onClick={()=>setEditing(p)} className="p-2 text-muted hover:text-ink hover:bg-gray-50 rounded-lg transition-all"><Pencil size={15}/></button>
              <button onClick={()=>del(p.id)} className="p-2 text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={15}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjForm({ project,onSave,onCancel }:{ project:Project;onSave:(p:Project)=>void;onCancel:()=>void }) {
  const [form,setForm]=useState({ ...project,techStr:project.tech.join(", "),hlStr:project.highlights.join("\n") });
  const submit=(e:React.FormEvent)=>{ e.preventDefault(); onSave({ ...form,tech:form.techStr.split(",").map(t=>t.trim()).filter(Boolean),highlights:form.hlStr.split("\n").filter(Boolean) }); };
  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="flex items-center gap-3 mb-2"><button type="button" onClick={onCancel} className="p-2 text-muted hover:text-ink hover:bg-gray-50 rounded-lg"><X size={18}/></button><h2 className="text-xl font-bold text-ink">{project.title?"Edit Project":"New Project"}</h2></div>
      <div className="bg-white border border-gray-100 rounded-2xl p-6 grid md:grid-cols-2 gap-4">
        <Field label="Title"><input value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} required className={inp2}/></Field>
        <Field label="Subtitle"><input value={form.subtitle} onChange={e=>setForm(f=>({...f,subtitle:e.target.value}))} className={inp2}/></Field>
        <Field label="Year"><input value={form.year} onChange={e=>setForm(f=>({...f,year:e.target.value}))} className={inp2}/></Field>
        <Field label="Status"><select value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value as "live"|"wip"}))} className={inp2}><option value="live">Live</option><option value="wip">WIP</option></select></Field>
        <Field label="GitHub URL"><input value={form.github} onChange={e=>setForm(f=>({...f,github:e.target.value}))} className={inp2}/></Field>
        <Field label="Live URL"><input value={form.liveUrl??""} onChange={e=>setForm(f=>({...f,liveUrl:e.target.value}))} className={inp2}/></Field>
        <div className="md:col-span-2"><Field label="Description"><textarea rows={3} value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} className={`${inp2} resize-none`}/></Field></div>
        <div className="md:col-span-2"><Field label="Technologies (comma separated)"><input value={form.techStr} onChange={e=>setForm(f=>({...f,techStr:e.target.value}))} className={inp2}/></Field></div>
        <div className="md:col-span-2"><Field label="Highlights (one per line)"><textarea rows={4} value={form.hlStr} onChange={e=>setForm(f=>({...f,hlStr:e.target.value}))} className={`${inp2} resize-none`}/></Field></div>
      </div>
      <div className="flex gap-3">
        <button type="submit" className="flex items-center gap-2 px-6 py-2.5 bg-ink text-white font-semibold text-sm rounded-xl hover:opacity-85"><Save size={15}/>Save</button>
        <button type="button" onClick={onCancel} className="px-6 py-2.5 border border-gray-200 text-muted text-sm rounded-xl hover:border-gray-400 hover:text-ink transition-all">Cancel</button>
      </div>
    </form>
  );
}

function SkillsManager({ data,onChange,onToast }:{ data:PortfolioData;onChange:(d:PortfolioData)=>void;onToast:(s:string)=>void }) {
  const [newItems,setNewItems]=useState<Record<string,string>>({});
  const addItem=(cat:string,item:string)=>{ if(!item.trim())return; const u={...data,skills:data.skills.map(s=>s.category===cat?{...s,items:[...s.items,item.trim()]}:s)}; onChange(u);saveData(u);setNewItems(n=>({...n,[cat]:""}));onToast("Added!"); };
  const removeItem=(cat:string,item:string)=>{ const u={...data,skills:data.skills.map(s=>s.category===cat?{...s,items:s.items.filter(i=>i!==item)}:s)}; onChange(u);saveData(u); };
  const addCat=()=>{ const name=prompt("Category name?"); if(!name?.trim())return; const u={...data,skills:[...data.skills,{category:name.trim(),icon:"Code2",items:[]}]}; onChange(u);saveData(u);onToast("Category added!"); };
  const delCat=(cat:string)=>{ const u={...data,skills:data.skills.filter(s=>s.category!==cat)}; onChange(u);saveData(u);onToast("Deleted."); };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div><h2 className="text-xl font-bold text-ink">Skills</h2><p className="text-sm text-muted">{data.skills.reduce((a,s)=>a+s.items.length,0)} items</p></div>
        <button onClick={addCat} className="flex items-center gap-2 px-4 py-2 bg-ink text-white text-sm font-semibold rounded-xl hover:opacity-85"><Plus size={15}/>Add Category</button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {data.skills.map(skill=>(
          <div key={skill.category} className="bg-white border border-gray-100 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-ink">{skill.category}</h3>
              <button onClick={()=>delCat(skill.category)} className="p-1.5 text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={14}/></button>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {skill.items.map(item=>(
                <div key={item} className="flex items-center gap-1 px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs text-muted group" style={{ fontFamily:"var(--font-mono)" }}>
                  {item}<button onClick={()=>removeItem(skill.category,item)} className="ml-1 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><X size={10}/></button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={newItems[skill.category]??""} onChange={e=>setNewItems(n=>({...n,[skill.category]:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&(e.preventDefault(),addItem(skill.category,newItems[skill.category]??""))} placeholder="Add skill..." className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-ink focus:outline-none focus:border-gray-900"/>
              <button onClick={()=>addItem(skill.category,newItems[skill.category]??"")} className="px-3 py-1.5 bg-ink text-white text-xs rounded-lg hover:opacity-85"><Plus size={14}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MessagesView({ data,onChange,onToast }:{ data:PortfolioData;onChange:(d:PortfolioData)=>void;onToast:(s:string)=>void }) {
  const [selected,setSelected]=useState<Message|null>(null);
  const markRead=(id:string)=>{ const u={...data,messages:data.messages.map(m=>m.id===id?{...m,read:true}:m)}; onChange(u);saveData(u); };
  const del=(id:string)=>{ const u={...data,messages:data.messages.filter(m=>m.id!==id)}; onChange(u);saveData(u);setSelected(null);onToast("Deleted."); };
  return (
    <div className="space-y-4">
      <div><h2 className="text-xl font-bold text-ink">Messages</h2><p className="text-sm text-muted">{data.messages.filter(m=>!m.read).length} unread · {data.messages.length} total</p></div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          {data.messages.length===0&&<div className="bg-white border border-gray-100 rounded-xl p-12 text-center"><MessageSquare size={32} className="mx-auto mb-3 text-gray-200"/><p className="text-sm text-muted">No messages yet</p></div>}
          {data.messages.map(m=>(
            <button key={m.id} onClick={()=>{setSelected(m);markRead(m.id);}} className={`w-full text-left p-4 rounded-xl border transition-all ${selected?.id===m.id?"border-gray-400 bg-gray-50":"border-gray-100 bg-white hover:border-gray-300"}`}>
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className={`text-sm font-semibold ${m.read?"text-ink/70":"text-ink"}`}>{m.name}</span>
                <div className="flex items-center gap-2 shrink-0">{!m.read&&<span className="w-2 h-2 rounded-full bg-ink shrink-0"/>}<span className="text-xs text-muted">{m.date}</span></div>
              </div>
              <p className="text-xs text-muted">{m.email}</p>
              <p className="text-xs text-ink/50 mt-1 line-clamp-2">{m.message}</p>
            </button>
          ))}
        </div>
        <div>
          {selected?(
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div><h3 className="font-semibold text-ink">{selected.name}</h3><a href={`mailto:${selected.email}`} className="text-sm text-ink hover:underline">{selected.email}</a><p className="text-xs text-muted mt-0.5">{selected.date}</p></div>
                <button onClick={()=>del(selected.id)} className="p-2 text-muted hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={15}/></button>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4"><p className="text-sm text-ink/80 leading-relaxed">{selected.message}</p></div>
              <a href={`mailto:${selected.email}`} className="flex items-center justify-center gap-2 py-2.5 bg-ink text-white font-semibold text-sm rounded-xl hover:opacity-85">Reply via Email</a>
            </div>
          ):(
            <div className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col items-center justify-center h-40 text-muted"><MessageSquare size={28} className="mb-2 text-gray-200"/><p className="text-sm">Select a message</p></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [authed,setAuthed]=useState(false);
  const [tab,setTab]=useState<Tab>("overview");
  const [data,setData]=useState<PortfolioData|null>(null);
  const [toastMsg,setToastMsg]=useState("");
  const [mobileNav,setMobileNav]=useState(false);
  useEffect(()=>{ setData(loadData()); },[]);
  if(!authed) return <Login onLogin={()=>setAuthed(true)}/>;
  if(!data) return <div className="min-h-screen bg-white flex items-center justify-center text-sm text-muted">Loading...</div>;
  const unread=data.messages.filter(m=>!m.read).length;
  const onToast=(msg:string)=>{ setToastMsg(msg);setTimeout(()=>setToastMsg(""),2500); };
  const tabs:Record<Tab,React.ReactNode>={
    overview:<Overview data={data} setTab={setTab}/>,
    personal:<PersonalEditor data={data} onChange={setData} onToast={onToast}/>,
    projects:<ProjectsManager data={data} onChange={setData} onToast={onToast}/>,
    skills:<SkillsManager data={data} onChange={setData} onToast={onToast}/>,
    experience:<div className="text-sm text-muted">Experience editor coming soon</div>,
    education:<div className="text-sm text-muted">Education editor coming soon</div>,
    certifications:<div className="text-sm text-muted">Certifications editor coming soon</div>,
    messages:<MessagesView data={data} onChange={setData} onToast={onToast}/>,
  };
  return (
    <div className="min-h-screen flex" style={{ background:"#fafafa" }}>
      <div className="hidden md:block"><Sidebar tab={tab} setTab={setTab} onLogout={()=>setAuthed(false)} unread={unread} mobile={false} onClose={()=>{}}/></div>
      {mobileNav&&<Sidebar tab={tab} setTab={setTab} onLogout={()=>setAuthed(false)} unread={unread} mobile={true} onClose={()=>setMobileNav(false)}/>}
      <main className="flex-1 md:ml-60 flex flex-col min-h-screen">
        <header className="sticky top-0 z-40 bg-white border-b border-gray-100 px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 text-muted hover:text-ink hover:bg-gray-50 rounded-lg" onClick={()=>setMobileNav(true)}><Menu size={18}/></button>
            <div className="flex items-center gap-1.5 text-xs text-muted" style={{ fontFamily:"var(--font-mono)" }}><span>admin</span><ChevronRight size={12}/><span className="text-ink capitalize">{tab}</span></div>
          </div>
          <div className="flex items-center gap-2">
            {unread>0&&<button onClick={()=>setTab("messages")} className="relative p-2 text-muted hover:text-ink hover:bg-gray-50 rounded-lg"><Bell size={17}/><span className="absolute top-1 right-1 w-2 h-2 bg-ink rounded-full"/></button>}
            <button onClick={()=>{resetData();setData(loadData());onToast("Reset!");}} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted border border-gray-200 rounded-lg hover:border-red-300 hover:text-red-500 transition-all"><RefreshCw size={12}/>Reset</button>
            <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted border border-gray-200 rounded-lg hover:border-gray-400 hover:text-ink transition-all"><Eye size={12}/>Preview</a>
          </div>
        </header>
        <div className="flex-1 p-6 overflow-y-auto"><div className="max-w-4xl mx-auto">{tabs[tab]}</div></div>
      </main>
      <Toast msg={toastMsg}/>
    </div>
  );
}
