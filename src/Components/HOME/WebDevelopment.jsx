import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Clock, ChevronRight, Layout, FileCode, Atom, Server, Globe, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import { calculateTotalDuration } from '../../utils/durationCalc';

const webCourses = [
  {
    id: "htmlcss",
    title: "HTML & CSS Mastery",
    level: "Beginner",
    description: "Build beautiful, responsive websites with modern HTML5 and CSS3 techniques.",
    icon: Layout,
    path: "/web-development/html-css",
    color: "from-[#7560C7] to-[#9B8DE3]",
    bgAccent: "bg-[#F3F1FB] text-[#7560C7]",
    borderColor: "border-[#7560C7]/10",
    hoverBorder: "hover:border-[#7560C7]/30",
  },
  {
    id: "javascript",
    title: "JavaScript",
    level: "Intermediate",
    description: "Master JavaScript fundamentals, ES6+ features, and DOM manipulation.",
    icon: FileCode,
    path: "/web-development/javascript",
    color: "from-yellow-400 to-amber-500",
    bgAccent: "bg-amber-50 text-amber-600",
    borderColor: "border-amber-400/10",
    hoverBorder: "hover:border-amber-400/30",
  },
  {
    id: "react",
    title: "React.js Pro",
    level: "Advanced",
    description: "Build interactive UIs with React hooks, context API, and advanced patterns.",
    icon: Atom,
    path: "/web-development/reactjs",
    color: "from-cyan-400 to-blue-500",
    bgAccent: "bg-cyan-50 text-cyan-600",
    borderColor: "border-cyan-400/10",
    hoverBorder: "hover:border-cyan-400/30",
  },
  {
    id: "node",
    title: "Node.js & Express",
    level: "Advanced",
    description: "Create robust backend services with Node.js, Express, and REST APIs.",
    icon: Server,
    path: "/web-development/nodejs",
    color: "from-emerald-400 to-green-500",
    bgAccent: "bg-emerald-50 text-emerald-600",
    borderColor: "border-emerald-400/10",
    hoverBorder: "hover:border-emerald-400/30",
  }
];

const topics = [
  { icon: Globe, label: "HTML & CSS" },
  { icon: FileCode, label: "JavaScript ES6+" },
  { icon: Atom, label: "React.js" },
  { icon: Server, label: "Node.js" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
};

const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 14 } },
};

export default function WebDevelopment() {
  const [stats, setStats] = useState({
    "htmlcss": { lessons: 0, duration: "0 min" },
    "javascript": { lessons: 0, duration: "0 min" },
    "react": { lessons: 0, duration: "0 min" },
    "node": { lessons: 0, duration: "0 min" }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWebStats = async () => {
      try {
        const endpoints = [
          'https://de-code-tech-backend.vercel.app/api/htmlcss/lecture',
          'https://de-code-tech-backend.vercel.app/api/htmlcss/lab',
          'https://de-code-tech-backend.vercel.app/api/javascript/lecture',
          'https://de-code-tech-backend.vercel.app/api/javascript/lab',
          'https://de-code-tech-backend.vercel.app/api/react/lecture',
          'https://de-code-tech-backend.vercel.app/api/react/lab',
          'https://de-code-tech-backend.vercel.app/api/node/lecture',
          'https://de-code-tech-backend.vercel.app/api/node/lab'
        ];

        const results = await Promise.allSettled(endpoints.map(ep => fetch(ep).then(res => res.json())));
        const getData = (index) => results[index].status === 'fulfilled' && results[index].value.data ? results[index].value.data : [];

        const htmlcssLec = getData(0);
        const htmlcssLab = getData(1);
        const jsLec = getData(2);
        const jsLab = getData(3);
        const reactLec = getData(4);
        const reactLab = getData(5);
        const nodeLec = getData(6);
        const nodeLab = getData(7);

        setStats({
          "htmlcss": { lessons: htmlcssLec.length + htmlcssLab.length, duration: calculateTotalDuration([...htmlcssLec, ...htmlcssLab]) },
          "javascript": { lessons: jsLec.length + jsLab.length, duration: calculateTotalDuration([...jsLec, ...jsLab]) },
          "react": { lessons: reactLec.length + reactLab.length, duration: calculateTotalDuration([...reactLec, ...reactLab]) },
          "node": { lessons: nodeLec.length + nodeLab.length, duration: calculateTotalDuration([...nodeLec, ...nodeLab]) }
        });
      } catch (error) {
        console.error("Error fetching Web Development stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWebStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-['Space_Grotesk'] relative overflow-hidden text-slate-900">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(#E2E8F0 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <motion.div className="absolute top-20 right-[10%] text-slate-100 font-mono font-black pointer-events-none select-none text-[120px]" animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}>{"</>"}</motion.div>
      <motion.div className="absolute bottom-40 left-[5%] text-slate-100 font-mono font-black pointer-events-none select-none text-[100px]" animate={{ y: [0, 15, 0], rotate: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 1 }}>{"{ }"}</motion.div>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 sm:px-12 z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="space-y-8">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#7560C7] bg-[#7560C7]/10 border border-[#7560C7]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7560C7] animate-pulse" />
                Web Development
              </span>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#FF9D42]">Web</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7560C7] to-[#9B8DE3]">Dev</span>
            </h1>
            
            <p className="text-slate-600 text-lg md:text-xl max-w-lg leading-relaxed font-medium">
              Learn modern web technologies from frontend design to robust backend architecture — completely free.
            </p>
            
            <motion.div className="flex flex-wrap gap-3 pt-2" variants={containerVariants} initial="hidden" animate="visible">
              {topics.map((t, i) => (
                <motion.div key={i} variants={itemVariants} className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-full text-sm font-semibold text-slate-600 shadow-sm hover:border-[#9B8DE3] hover:text-[#7560C7] hover:bg-[#F8F7FF] transition-all duration-300 cursor-default">
                  <t.icon className="w-4 h-4 text-[#9B8DE3]" /> {t.label}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative flex justify-center lg:justify-end">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-tr from-[#9B8DE3]/20 to-[#FF9D42]/20 rounded-full blur-[80px] pointer-events-none" />
            
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="relative w-full max-w-[440px] bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-100">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="flex-1 mx-4 bg-white border border-slate-200 rounded-md px-3 py-1 text-[11px] text-slate-400 font-mono text-center">localhost:3000</div>
              </div>
              <div className="p-6 space-y-3 font-mono text-sm bg-white">
                <div className="text-slate-400 text-xs mb-4">&lt;!DOCTYPE html&gt;</div>
                <div><span className="text-[#7560C7]">&lt;h1</span><span className="text-slate-500"> class=</span><span className="text-amber-500">"hero"</span><span className="text-[#7560C7]">&gt;</span></div>
                <div className="pl-6 text-slate-800 font-bold text-base">Hello, World! 🌐</div>
                <div><span className="text-[#7560C7]">&lt;/h1&gt;</span></div>
                <div className="mt-4"><span className="text-[#7560C7]">.hero</span><span className="text-slate-500"> {"{"}</span></div>
                <div className="pl-6"><span className="text-amber-500">color</span><span className="text-slate-500">: </span><span className="text-[#7560C7]">#FF7A00</span><span className="text-slate-500">;</span></div>
                <div className="pl-6"><span className="text-amber-500">font-size</span><span className="text-slate-500">: </span><span className="text-[#7560C7]">3rem</span><span className="text-slate-500">;</span></div>
                <div className="text-slate-500">{"}"}</div>
                <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-4 bg-[#7560C7]/40 mt-3 rounded-sm" />
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }} className="absolute -bottom-6 -left-6 bg-white border border-slate-100 rounded-xl px-5 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center gap-3">
              <div className="bg-[#F3F1FB] p-2 rounded-lg"><Code2 className="w-5 h-5 text-[#7560C7]" /></div>
              <span className="text-sm font-bold text-slate-800">4 Premium Courses</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* COURSE CARDS SECTION */}
      <section className="relative py-20 px-6 sm:px-12 z-10 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Choose Your Path</h2>
          <p className="text-slate-600 text-lg">Start with the basics or pick any module that fits your level.</p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8" variants={cardContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          {webCourses.map((course) => (
            <motion.div key={course.id} variants={cardVariants} className="h-full">
              <Link to={course.path} className="group block h-full outline-none">
                <div className={`relative flex flex-col h-full bg-white rounded-2xl border ${course.borderColor} ${course.hoverBorder} p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1.5`}>
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300`}>
                      <course.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${course.bgAccent} px-3 py-1 rounded-full`}>{course.level}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{course.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">{course.description}</p>
                  
                  <div className="flex flex-col gap-3 mb-6 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center text-slate-600 text-xs font-semibold">
                      <BookOpen className="w-4 h-4 mr-2 text-slate-400" />
                      {loading ? <span className="w-8 h-3 bg-slate-200 rounded animate-pulse" /> : `${stats[course.id]?.lessons || 0} Lessons`}
                    </div>
                    <div className="flex items-center text-slate-600 text-xs font-semibold">
                      <Clock className="w-4 h-4 mr-2 text-slate-400" />
                      {loading ? <span className="w-12 h-3 bg-slate-200 rounded animate-pulse" /> : stats[course.id]?.duration || '0 min'}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-slate-800 font-bold text-sm mt-auto">
                    <span>Start Learning</span>
                    <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-slate-900 group-hover:border-slate-900 group-hover:text-white transition-all duration-300">
                      <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }` }} />
    </div>
  );
}
