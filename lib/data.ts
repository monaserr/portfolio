export const PORTFOLIO_DATA = {
  personal: {
    name: "Mohamed Nasser Gamal",
    title: "Full Stack Software Engineer",
    subtitle: "React · Node.js · Bioinformatics",
    location: "Cairo, Egypt",
    email: "monaserrrrrr@gmail.com",
    phone: "+20 106 196 4236",
    github: "https://github.com/monaserr",
    linkedin: "http://www.linkedin.com/in/mohamed-nasser-9588a533b",
    summary:
      "Full Stack Software Engineer focused on building scalable web applications using React, Node.js, and modern cloud infrastructure. Experienced in designing RESTful APIs, backend systems, and deploying production-ready applications. Built 5+ real-world projects including e-commerce and bioinformatics platforms with end-to-end ownership.",
    stats: [
      { label: "Projects Delivered", value: "5+" },
      { label: "Performance Boost", value: "40%" },
      { label: "GPA", value: "3.74" },
      { label: "Years Experience", value: "2+" },
    ],
  },

  skills: [
    {
      category: "Languages",
      icon: "Code2",
      items: ["JavaScript (ES6+)", "Python", "C++", "Java"],
    },
    {
      category: "Frontend",
      icon: "Monitor",
      items: ["React", "Next.js", "Vite", "HTML5", "CSS3", "Tailwind CSS"],
    },
    {
      category: "Backend",
      icon: "Server",
      items: ["Node.js", "Express.js", "REST APIs", "tRPC"],
    },
    {
      category: "Databases",
      icon: "Database",
      items: ["MongoDB", "MySQL", "Supabase", "Prisma"],
    },
    {
      category: "Cloud / DevOps",
      icon: "Cloud",
      items: ["Firebase", "Vercel", "Railway", "Render"],
    },
    {
      category: "Tools",
      icon: "Wrench",
      items: ["Git", "GitHub", "Linux", "Postman", "VS Code"],
    },
    {
      category: "Concepts",
      icon: "Brain",
      items: ["Data Structures", "OOP", "SDLC", "Agile", "System Design"],
    },
    {
      category: "Bioinformatics",
      icon: "Dna",
      items: ["DNA/RNA Analysis", "FASTA Parsing", "GC Content"],
    },
  ],

  projects: [
    {
      id: "rfouf",
      title: "Rfouf",
      subtitle: "Full Stack E-Commerce Platform",
      year: "2025 – Present",
      status: "live",
      description:
        "Production-ready Arabic e-commerce platform for books and products. Includes full authentication, order management, and product catalog.",
      tech: ["React", "Node.js", "Express", "MongoDB", "Firebase", "Railway"],
      highlights: [
        "Arabic-first UX with RTL support",
        "Optimized MongoDB queries for performance",
        "Firebase frontend + Railway backend deployment",
        "Full auth, orders & product management",
      ],
      github: "https://github.com/monaserr",
    },
    {
      id: "genbyte",
      title: "GenByte Hub",
      subtitle: "Full Stack Bioinformatics Platform",
      year: "2026",
      status: "live",
      description:
        "Full-stack system for biological data analysis and visualization. REST APIs for DNA/RNA processing with interactive scientific workflows.",
      tech: ["React", "Node.js", "Express", "MongoDB", "Vercel", "Railway"],
      highlights: [
        "DNA/RNA dataset analysis at scale",
        "Interactive data visualization",
        "REST APIs for scientific computation",
        "Deployed on Vercel & Railway",
      ],
      github: "https://github.com/monaserr",
    },
    {
      id: "freelance",
      title: "Client Projects",
      subtitle: "SDESIGNS Studio, Mariam Hany",
      year: "2024 – 2025",
      status: "live",
      description:
        "Responsive, SEO-optimized websites for real clients. Multi-page agency site with animations, branding system, and 95+ Lighthouse score.",
      tech: ["React", "HTML5", "CSS3", "JavaScript", "SEO"],
      highlights: [
        "95+ Lighthouse performance score",
        "Multi-page with animations",
        "Full branding system",
        "SEO-optimized",
      ],
      github: "https://github.com/monaserr",
    },
    {
      id: "gc-analyzer",
      title: "GC Content Analyzer",
      subtitle: "Python Bioinformatics Tool",
      year: "2026 (In Progress)",
      status: "wip",
      description:
        "Python tool for DNA/RNA FASTA sequence analysis with automated GC content calculation and visualization using Matplotlib.",
      tech: ["Python", "Matplotlib", "FASTA", "Bioinformatics"],
      highlights: [
        "60% reduction in manual analysis time",
        "Automated GC content calculation",
        "Matplotlib visualizations",
        "FASTA format parsing",
      ],
      github: "https://github.com/monaserr",
    },
    {
      id: "student-hub",
      title: "Bioinformatics Student Hub",
      subtitle: "Academic Platform",
      year: "2024",
      status: "live",
      description:
        "Academic platform adopted by the entire student cohort at Benha University, centralizing study resources and communication channels.",
      tech: ["React", "Node.js", "MongoDB"],
      highlights: [
        "Adopted by full student cohort",
        "Centralized study resources",
        "Communication channels",
        "University-scale deployment",
      ],
      github: "https://github.com/monaserr",
    },
    {
      id: "fullstackopen",
      title: "Full Stack Open",
      subtitle: "University of Helsinki",
      year: "2025 – Present",
      status: "wip",
      description:
        "Structured full-stack training covering React, Node.js, APIs, and databases from the University of Helsinki.",
      tech: ["React", "Node.js", "Express", "MongoDB", "Testing"],
      highlights: [
        "Part 0-1 completed",
        "React components & Vite",
        "REST API design",
        "Ongoing certification",
      ],
      github: "https://github.com/monaserr/fullstackopen",
    },
  ],

  experience: [
    {
      title: "Freelance Full Stack Developer",
      company: "Remote",
      period: "Jan 2024 – Present",
      bullets: [
        "Delivered 5+ full-stack applications with full lifecycle ownership",
        "Improved application performance by up to 40% via optimization",
        "Built REST APIs and backend services using Node.js & Express",
        "Designed responsive, SEO-optimized UIs improving engagement",
        "Managed end-to-end delivery: design → development → deployment",
      ],
    },
  ],

  education: [
    {
      degree: "B.Sc. Computing & Bioinformatics Engineering",
      school: "Benha University",
      period: "2024 – 2028 Expected",
      gpa: "3.74 / 4.0",
    },
  ],

  certifications: [
    {
      name: "Deep Learning Fundamentals",
      issuer: "NVIDIA Deep Learning Institute",
      icon: "🧠",
    },
    {
      name: "Cybersecurity Bootcamp",
      issuer: "GDG & Benha University",
      icon: "🔐",
    },
    {
      name: "Full Stack Open",
      issuer: "University of Helsinki",
      icon: "🌐",
    },
    {
      name: "Best Member Award – Frontend Track",
      issuer: "GDG Benha National University",
      icon: "🏆",
    },
  ],

  languages: [
    { name: "Arabic", level: "Native", pct: 100 },
    { name: "English", level: "B2 Upper Intermediate", pct: 75 },
  ],
};

export type Project = (typeof PORTFOLIO_DATA.projects)[0];
export type Skill = (typeof PORTFOLIO_DATA.skills)[0];
