export interface Project { id:string; title:string; subtitle:string; year:string; status:"live"|"wip"; description:string; tech:string[]; highlights:string[]; github:string; liveUrl?:string; }
export interface SkillCategory { category:string; icon:string; items:string[]; }
export interface Experience { title:string; company:string; period:string; bullets:string[]; }
export interface Education { degree:string; school:string; period:string; gpa:string; }
export interface Certification { name:string; issuer:string; icon:string; }
export interface Message { id:string; name:string; email:string; message:string; date:string; read:boolean; }
export interface PersonalInfo { name:string; title:string; subtitle:string; location:string; email:string; phone:string; github:string; linkedin:string; summary:string; photoUrl:string; stats:{label:string;value:string}[]; }
export interface PortfolioData { personal:PersonalInfo; skills:SkillCategory[]; projects:Project[]; experience:Experience[]; education:Education[]; certifications:Certification[]; messages:Message[]; }

export const DEFAULT_DATA: PortfolioData = {
  personal: {
    name: "Mohamed Nasser Gamal", title: "Full Stack Software Engineer",
    subtitle: "React · Node.js · Bioinformatics", location: "Cairo, Egypt",
    email: "monaserrrrrr@gmail.com", phone: "+20 106 196 4236",
    github: "https://github.com/monaserr", linkedin: "http://www.linkedin.com/in/mohamed-nasser-9588a533b",
    photoUrl: "", summary: "Full Stack Software Engineer focused on building scalable web applications using React, Node.js, and modern cloud infrastructure. Experienced in designing RESTful APIs, backend systems, and deploying production-ready applications.",
    stats: [{ label:"Projects Delivered", value:"5+" },{ label:"Performance Boost", value:"40%" },{ label:"GPA", value:"3.74" },{ label:"Years Experience", value:"2+" }],
  },
  skills: [
    { category:"Languages", icon:"Code2", items:["JavaScript (ES6+)","Python","C++","Java"] },
    { category:"Frontend", icon:"Monitor", items:["React","Next.js","Vite","HTML5","CSS3","Tailwind CSS"] },
    { category:"Backend", icon:"Server", items:["Node.js","Express.js","REST APIs","tRPC"] },
    { category:"Databases", icon:"Database", items:["MongoDB","MySQL","Supabase","Prisma"] },
    { category:"Cloud / DevOps", icon:"Cloud", items:["Firebase","Vercel","Railway","Render"] },
    { category:"Tools", icon:"Wrench", items:["Git","GitHub","Linux","Postman","VS Code"] },
    { category:"Concepts", icon:"Brain", items:["Data Structures","OOP","SDLC","Agile","System Design"] },
    { category:"Bioinformatics", icon:"Dna", items:["DNA/RNA Analysis","FASTA Parsing","GC Content"] },
  ],
  projects: [
    { id:"rfouf", title:"Rfouf", subtitle:"Full Stack E-Commerce Platform", year:"2025 – Present", status:"live", description:"Production-ready Arabic e-commerce platform for books and products.", tech:["React","Node.js","Express","MongoDB","Firebase","Railway"], highlights:["Arabic-first UX with RTL support","Optimized MongoDB queries","Firebase + Railway deployment","Full auth & order management"], github:"https://github.com/monaserr" },
    { id:"genbyte", title:"GenByte Hub", subtitle:"Full Stack Bioinformatics Platform", year:"2026", status:"live", description:"Full-stack system for biological data analysis and visualization.", tech:["React","Node.js","Express","MongoDB","Vercel","Railway"], highlights:["DNA/RNA dataset analysis","Interactive visualizations","REST APIs for computation","Vercel & Railway deployment"], github:"https://github.com/monaserr" },
    { id:"freelance", title:"Client Projects", subtitle:"SDESIGNS Studio, Mariam Hany", year:"2024 – 2025", status:"live", description:"Responsive, SEO-optimized websites for real clients with 95+ Lighthouse score.", tech:["React","HTML5","CSS3","JavaScript","SEO"], highlights:["95+ Lighthouse score","Multi-page with animations","Full branding system","SEO-optimized"], github:"https://github.com/monaserr" },
    { id:"gc-analyzer", title:"GC Content Analyzer", subtitle:"Python Bioinformatics Tool", year:"2026 (In Progress)", status:"wip", description:"Python tool for DNA/RNA FASTA sequence analysis with Matplotlib visualizations.", tech:["Python","Matplotlib","FASTA","Bioinformatics"], highlights:["60% reduction in analysis time","Automated GC calculation","Matplotlib visualizations","FASTA parsing"], github:"https://github.com/monaserr" },
    { id:"student-hub", title:"Bioinformatics Student Hub", subtitle:"Academic Platform", year:"2024", status:"live", description:"Academic platform adopted by the entire student cohort at Benha University.", tech:["React","Node.js","MongoDB"], highlights:["Adopted by full cohort","Centralized study resources","Communication channels","University-scale"], github:"https://github.com/monaserr" },
    { id:"fullstackopen", title:"Full Stack Open", subtitle:"University of Helsinki", year:"2025 – Present", status:"wip", description:"Structured full-stack training from University of Helsinki.", tech:["React","Node.js","Express","MongoDB"], highlights:["Parts 0-1 completed","React & Vite","REST API design","Ongoing certification"], github:"https://github.com/monaserr/fullstackopen" },
  ],
  experience: [{ title:"Freelance Full Stack Developer", company:"Remote", period:"Jan 2024 – Present", bullets:["Delivered 5+ full-stack applications with full lifecycle ownership","Improved application performance by up to 40% via optimization","Built REST APIs and backend services using Node.js & Express","Designed responsive, SEO-optimized UIs improving engagement","Managed end-to-end delivery: design → development → deployment"] }],
  education: [{ degree:"B.Sc. Computing & Bioinformatics Engineering", school:"Benha University", period:"2024 – 2028 Expected", gpa:"3.74 / 4.0" }],
  certifications: [
    { name:"Deep Learning Fundamentals", issuer:"NVIDIA Deep Learning Institute", icon:"🧠" },
    { name:"Cybersecurity Bootcamp", issuer:"GDG & Benha University", icon:"🔐" },
    { name:"Full Stack Open", issuer:"University of Helsinki", icon:"🌐" },
    { name:"Best Member Award – Frontend Track", issuer:"GDG Benha National University", icon:"🏆" },
  ],
  messages: [],
};

const KEY = "mn_portfolio_data";
export function loadData(): PortfolioData {
  if (typeof window === "undefined") return DEFAULT_DATA;
  try { const r = localStorage.getItem(KEY); return r ? { ...DEFAULT_DATA, ...JSON.parse(r) } : DEFAULT_DATA; } catch { return DEFAULT_DATA; }
}
export function saveData(data: PortfolioData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(data));
  window.dispatchEvent(new Event("portfolio-updated"));
}
export function resetData(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("portfolio-updated"));
}