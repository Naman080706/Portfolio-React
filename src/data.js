// =============================================================
//  EDIT THIS FILE TO MAKE THE PORTFOLIO YOURS.
//  Everything the site displays comes from here. No need to
//  touch the components unless you want to change the layout.
// =============================================================

export const profile = {
  name: 'Naman Jain',
  // Short, punchy. Shows in the hero with a typewriter effect.
  roles: ['Full-Stack Developer', 'AI / ML Builder', 'CS & Blockchain Student'],
  tagline:
    'I build AI-powered, full-stack products — from RAG analytics platforms to multi-agent apps — that turn complex data into something people can actually use.',
  location: 'Vellore – Delhi, India',
  email: 'namanj8762@gmail.com',
  phone: '+91 80762 88234',
  // Your resume PDF lives in /public. Update it there to refresh the download.
  resumeUrl: '/resume.pdf',
  // Use a square image. Drop it in /public and reference it as '/avatar.jpg',
  // or leave as '' to show your initials instead.
  avatar: '',
  socials: [
    { label: 'GitHub', url: 'https://github.com/Naman080706', icon: 'github' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/namanjain777', icon: 'linkedin' },
    { label: 'Email', url: 'mailto:namanj8762@gmail.com', icon: 'mail' },
  ],
}

// Quick numbers shown under the hero. Edit or remove any.
export const stats = [
  { value: '6+', label: 'Projects Built' },
  { value: '2', label: 'Hackathons Won' },
  { value: '8.60', label: 'CGPA / 10' },
]

export const about = {
  // A short narrative — your journey, who you are, what drives you.
  paragraphs: [
    'I’m someone who enjoys turning ideas into reality, solving interesting problems, and constantly learning along the way. I love taking on new challenges, collaborating with amazing people, and creating things that make a real impact. For me, every experience is an opportunity to grow — whether it’s working on a project, participating in a hackathon, or organizing events that bring people together. I’m naturally curious and enjoy exploring new ideas, stepping outside my comfort zone, and learning from every experience. Outside of work, you’ll usually find me discovering new places to eat, catching up with friends over coffee, or simply enjoying moments that help me recharge. I believe that meaningful work comes from staying curious, embracing challenges with a positive mindset, and continuously striving to become a little better every day.',
  ],
}

// Your story as a timeline (roles, milestones, education).
export const timeline = [
  {
    period: 'June 2026 — Present',
    title: 'Founding Member, Developer & Lead Strategist',
    place: 'Make Me World Wide Web (MMEW3)',
    description:
      'Architecting and delivering custom web apps, brand systems, and high-conversion SEO structures — owning product strategy and the end-to-end build across frontend, design, and growth.',
    tags: ['Vite', 'React', 'TypeScript', 'UI/UX Design', 'SEO'],
    link: 'https://www.mmew3.xyz/',
    linkLabel: 'Visit MMEW3',
  },
  {
    period: 'Jan 2025 — Present',
    title: 'Development Mentor',
    place: 'IEEE TEMS, VIT Vellore',
    description:
      'Mentoring junior developers in React, Git and frontend best practices; organizing technical workshops, hackathons and community events; and leading development of IEEE TEMS event websites.',
    tags: ['React', 'Git', 'Event Ops'],
    link: 'https://ieeetemsvit.in/',
    linkLabel: 'Visit IEEE TEMS',
  },
  {
    period: '2024 — 2028 (Expected)',
    title: 'B.Tech, Computer Science & Blockchain Technology',
    place: 'Vellore Institute of Technology (VIT), Vellore',
    description: 'Pursuing my degree with a current CGPA of 8.60/10, focusing on AI, full-stack development, and blockchain.',
  },
  {
    period: '2024',
    title: 'Higher Secondary (CBSE)',
    place: 'OPG World School, Delhi',
    description: 'Completed my higher secondary education and dove deeper into programming and building projects.',
  },
]

// Skills grouped by category. The number (0–100) is the proficiency bar.
export const skills = [
  {
    category: 'Languages',
    items: [
      { name: 'C++', level: 80 },
      { name: 'C', level: 75 },
      { name: 'Python', level: 90 },
      { name: 'Java', level: 70 },
      { name: 'JavaScript', level: 85 },
      { name: 'TypeScript', level: 80 },
      { name: 'SQL', level: 75 },
    ],
  },
  {
    category: 'Frontend',
    items: [
      { name: 'React.js', level: 88 },
      { name: 'HTML5', level: 92 },
      { name: 'CSS3', level: 88 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'GSAP', level: 70 },
      { name: 'Framer Motion', level: 70 },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'FastAPI', level: 88 },
      { name: 'Node.js', level: 78 },
      { name: 'Express.js', level: 75 },
      { name: 'Flask', level: 72 },
    ],
  },
  {
    category: 'AI / ML',
    items: [
      { name: 'RAG & LLM Integration', level: 85 },
      { name: 'LangChain', level: 78 },
      { name: 'FAISS', level: 75 },
      { name: 'Gemini API', level: 82 },
      { name: 'OpenAI API', level: 80 },
    ],
  },
  {
    category: 'Databases',
    items: [
      { name: 'PostgreSQL', level: 78 },
      { name: 'MongoDB', level: 78 },
      { name: 'MySQL', level: 75 },
      { name: 'SQLite', level: 80 },
      { name: 'Firebase', level: 75 },
    ],
  },
  {
    category: 'Tools & Platforms',
    items: [
      { name: 'Git & GitHub', level: 88 },
      { name: 'Docker', level: 65 },
      { name: 'Postman', level: 80 },
      { name: 'VS Code', level: 92 },
    ],
  },
]

// Your projects. Add a screenshot to /public and set `image`, or leave ''
// to show a gradient placeholder.
// `repoUrl` left empty for now — paste the GitHub links later and the flip
// card's back button turns into "View Repository".
export const projects = [
  {
    title: 'IEEE TEMS Website',
    tagline: 'Official chapter & event site',
    description:
      'The official website for IEEE TEMS, VIT Vellore. Led the frontend build — event listings, registrations, and a fast, responsive UI used by the chapter and its events.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    image: '',
    liveUrl: 'https://ieeetemsvit.in/',
    repoUrl: 'https://ieeetemsvit.in/',
    featured: true,
  },
  {
    title: 'FloatChat — AI ARGO Ocean Data Analytics',
    tagline: 'Chat with ocean data',
    description:
      'A RAG-based conversational analytics platform for ARGO ocean datasets. Processed 6,500+ NetCDF files into a compressed SQLite database optimized for 16GB RAM systems, with FastAPI REST APIs and interactive geospatial dashboards.',
    tags: ['Python', 'FastAPI', 'Streamlit', 'SQLite', 'FAISS', 'RAG'],
    image: '',
    liveUrl: '',
    repoUrl: 'https://github.com/Naman080706/FloatChat-AI',
    featured: true,
  },
  {
    title: 'upLIFT — AI Career Intelligence Platform',
    tagline: 'AI that levels up your career',
    description:
      'A full-stack AI career platform with secure authentication, scalable backend APIs, AI-powered resume analysis, LLM-based career recommendations, and automated interview preparation.',
    tags: ['Next.js', 'React', 'FastAPI', 'Supabase', 'Gemini AI', 'Firebase'],
    image: '',
    liveUrl: '',
    repoUrl: 'https://github.com/Naman080706/upLift',
    featured: true,
  },
  {
    title: 'NILM — Non-Intrusive Load Monitoring',
    tagline: 'Appliance-level energy insights',
    description:
      'A deep-learning system that disaggregates a home’s total power draw into appliance-level usage from a single smart meter — trained on time-series energy data for real-time, per-device consumption insights.',
    tags: ['Python', 'PyTorch', 'Deep Learning', 'Time-Series'],
    image: '',
    liveUrl: '',
    repoUrl: 'https://github.com/Naman080706/NILM',
    featured: true,
  },
  {
    title: 'MED-Estation — AI Healthcare Platform',
    tagline: 'AI-native pharmacy platform',
    description:
      'An AI-native pharmacy platform — demand forecasting, a FEFO engine to cut waste, expiry-exchange, fake-medicine detection, billing, and a RAG chatbot. Built on FastAPI + Next.js, Docker-ready.',
    tags: ['Next.js', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'RAG'],
    image: '',
    liveUrl: '',
    repoUrl: 'https://github.com/Naman080706/MED-Estation',
    featured: false,
  },
  {
    title: 'Smart ICU Monitoring System',
    tagline: 'ECG + patient digital twins',
    description:
      'An analog neuromorphic cyber-physical ICU system: an ECG spike-encoding hardware front-end on ESP32-S3 with sub-2ms edge inference, fused with adaptive per-patient digital twins that lift beat-classification accuracy from 93.6% to 97.8% and cut false alarms by 64%.',
    tags: ['ESP32-S3', 'FastAPI', 'React / Vite', 'Neuromorphic', 'Digital Twin'],
    image: '',
    liveUrl: '',
    repoUrl: 'https://github.com/Naman080706/Smart-ICU-Monitoring-System-',
    featured: false,
  },
]

// Optional: work / experience. Set to [] to hide the section.
// Work / roles now live in the timeline above; this section shows achievements.
export const experience = []

// Achievements. Set to [] to hide the section.
export const certifications = [
  {
    rank: '1st Place',
    name: 'AxioML Hackathon 2026',
    project: 'MED-Estation — AI-Powered Pharmacy Intelligence',
    host: 'Pratyusha Engineering College, Tamil Nadu',
    scale: 'Won against 50+ external & 30+ internal teams',
    summary:
      'Built an AI-native pharmacy platform in a two-day national hackathon — demand forecasting, FEFO expiry management, OCR prescription intake, counterfeit-medicine detection, and a pharmacy-to-pharmacy expiry-exchange network. Judged best for real-world healthcare impact and innovation.',
    tags: ['AI / ML', 'HealthTech', 'FastAPI', 'RAG'],
    year: '2026',
  },
  {
    rank: '1st Place · IoT',
    name: 'Visualize Hackathon 2026',
    project: 'Smart ICU Monitoring System',
    host: 'Sethu Institute of Technology, Tamil Nadu',
    scale: 'Top IoT team — from 407 registered, 60 grand finalists',
    summary:
      'A 24-hour build: an AI-assisted ICU monitoring platform with a self-designed analog ECG front-end and multi-sensor vitals (ECG, SpO₂, heart rate, temperature) on ESP32 — streaming to a live multi-patient dashboard with AI anomaly detection and early-warning alerts.',
    tags: ['IoT', 'ESP32', 'AI', 'Biomedical'],
    year: '2026',
  },
  {
    rank: 'Level 2',
    name: 'Smart India Hackathon (SIH)',
    project: 'National-Level Innovation Challenge',
    host: 'Ministry of Education (Innovation Cell) & AICTE',
    scale: "Cleared the institute round of India's largest hackathon",
    summary:
      "Advanced to Level 2 of the Smart India Hackathon — one of the world's largest open-innovation initiatives — by clearing the internal selection round with a problem-focused software solution and team pitch.",
    tags: ['Innovation', 'Software', 'Teamwork'],
    year: '2025',
  },
]
