import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Clock, ChevronRight, Atom, Zap, Brain, Sparkles, Code, Laptop } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import { calculateTotalDuration } from '../../../utils/durationCalc';

const aimlCourses = [
  {
    id: "lecture",
    title: "AI & ML Lectures",
    level: "Beginner",
    description: "Understand core AI concepts, neural networks, and machine learning algorithms.",
    icon: Brain,
    path: "/aiml/lecture",
    color: "from-violet-500 to-fuchsia-500",
    borderAccent: "border-violet-500/10 hover:border-violet-500/30",
    bgAccent: "bg-violet-50 text-violet-600",
  },
  {
    id: "assessment",
    title: "Assessment Lab",
    level: "Lab Work",
    description: "Build models, train datasets, and solve practical ML problems.",
    icon: Sparkles,
    path: "/aiml/assessment",
    color: "from-violet-500 to-fuchsia-500",
    borderAccent: "border-violet-500/10 hover:border-violet-500/30",
    bgAccent: "bg-violet-50 text-violet-600",
  }
];

const topics = [
  { icon: Atom, label: "Neural Nets" },
  { icon: Zap, label: "Deep Learning" },
  { icon: Code, label: "Model Deployment" },
  { icon: Laptop, label: "Data Pipelines" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 14 } },
};

export default function Aimls() {
  const [stats, setStats] = useState({
    lecture: { lessons: 0, duration: '0m' },
    assessment: { lessons: 0, duration: '0m' }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAimlStats = async () => {
      try {
        const [lectureRes, labRes] = await Promise.allSettled([
          fetch('https://de-code-tech-backend.vercel.app/api/aiml/lecture').then(res => res.json()),
          fetch('https://de-code-tech-backend.vercel.app/api/aiml/lab').then(res => res.json())
        ]);

        const lectureData = lectureRes.status === 'fulfilled' && lectureRes.value.data ? lectureRes.value.data : [];
        const labData = labRes.status === 'fulfilled' && labRes.value.data ? labRes.value.data : [];

        setStats({
          lecture: {
            lessons: lectureData.length,
            duration: calculateTotalDuration(lectureData)
          },
          assessment: {
            lessons: labData.length,
            duration: calculateTotalDuration(labData)
          }
        });
      } catch (error) {
        console.error("Error fetching AIML stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAimlStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-['Space_Grotesk'] relative overflow-hidden text-slate-900">

      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(#E2E8F0 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <motion.div className="absolute top-40 right-[5%] opacity-20 pointer-events-none" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}>
        <svg width="150" height="150" viewBox="0 0 100 100" fill="none">
          <circle cx="20" cy="50" r="5" fill="#cbd5e1" />
          <circle cx="50" cy="20" r="5" fill="#cbd5e1" />
          <circle cx="50" cy="80" r="5" fill="#cbd5e1" />
          <circle cx="80" cy="50" r="5" fill="#cbd5e1" />
          <path d="M20 50 L50 20 L80 50 L50 80 Z" stroke="#cbd5e1" strokeWidth="1" />
          <path d="M50 20 L50 80" stroke="#cbd5e1" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* HERO */}
      <section className="relative pt-32 pb-20 px-6 sm:px-12 z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="space-y-8">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-violet-600 bg-violet-50 border border-violet-200">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-pulse" />
                AI & Machine Learning
              </span>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">AI & ML</span>
            </h1>
            
            <p className="text-slate-600 text-lg md:text-xl max-w-lg leading-relaxed font-medium">
              Dive into neural networks, deep learning, and real-world AI applications — all for free.
            </p>
            
            <motion.div className="flex flex-wrap gap-3 pt-2" variants={containerVariants} initial="hidden" animate="visible">
              {topics.map((t, i) => (
                <motion.div key={i} variants={itemVariants}
                  className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-full text-sm font-semibold text-slate-600 shadow-sm hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50 transition-all duration-300 cursor-default">
                  <t.icon className="w-4 h-4 text-violet-500" />{t.label}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: AI code visual */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative flex justify-center lg:justify-end">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-tr from-violet-500/20 to-fuchsia-500/20 rounded-full blur-[80px] pointer-events-none" />
            
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="relative w-full max-w-[440px] bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-100">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="flex-1 mx-4 bg-white border border-slate-200 rounded-md px-3 py-1 text-[11px] text-slate-400 font-mono text-center tracking-wider">ai_notebook.py</div>
              </div>
              <div className="p-6 font-mono text-sm space-y-3 bg-white">
                <div><span className="text-violet-600 font-medium">import</span> <span className="text-blue-600 font-medium">torch</span></div>
                <div><span className="text-violet-600 font-medium">import</span> <span className="text-blue-600 font-medium">torch.nn</span> <span className="text-violet-600 font-medium">as</span> <span className="text-blue-600 font-medium">nn</span></div>
                <div className="mt-4"><span className="text-violet-600 font-medium">class</span> <span className="text-fuchsia-600 font-semibold">Net</span><span className="text-slate-800">(nn.Module):</span></div>
                <div className="pl-6"><span className="text-violet-600 font-medium">def</span> <span className="text-fuchsia-600 font-semibold">__init__</span><span className="text-slate-800">(self):</span></div>
                <div className="pl-12"><span className="text-violet-600 font-medium">super</span><span className="text-slate-800">().</span><span className="text-fuchsia-600 font-semibold">__init__</span><span className="text-slate-800">()</span></div>
                <div className="pl-12"><span className="text-blue-600 font-medium">self</span><span className="text-slate-800">.</span><span className="text-fuchsia-600 font-semibold">fc</span> <span className="text-slate-800">= </span><span className="text-blue-600 font-medium">nn.Linear</span><span className="text-slate-800">(</span><span className="text-emerald-600">784</span><span className="text-slate-800">, </span><span className="text-emerald-600">10</span><span className="text-slate-800">)</span></div>
                <div className="mt-3"><span className="text-violet-600 font-medium">def</span> <span className="text-fuchsia-600 font-semibold">forward</span><span className="text-slate-800">(self, x):</span></div>
                <div className="pl-6"><span className="text-violet-600 font-medium">return</span> <span className="text-blue-600 font-medium">self</span><span className="text-slate-800">.</span><span className="text-fuchsia-600 font-semibold">fc</span><span className="text-slate-800">(x)</span></div>
                <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-4 bg-violet-400/50 mt-3 rounded-sm" />
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }} className="absolute -bottom-6 -left-6 bg-white border border-slate-100 rounded-xl px-5 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center gap-3">
              <div className="bg-violet-50 p-2 rounded-lg"><Brain className="w-5 h-5 text-violet-600" /></div>
              <span className="text-sm font-bold text-slate-800">PyTorch 2.0</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CARDS */}
      <section className="relative py-20 px-6 sm:px-12 z-10 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Choose Your Path</h2>
          <p className="text-slate-600 text-lg">Start with lectures or dive straight into labs.</p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto" variants={cardContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          {aimlCourses.map((course) => (
            <motion.div key={course.id} variants={cardVariants} className="h-full">
              <Link to={course.path} className="group block h-full outline-none">
                <div className={`relative flex flex-col h-full bg-white rounded-2xl border ${course.borderAccent} p-6 lg:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1.5`}>
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${course.color} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300`}>
                      <course.icon className="w-7 h-7 text-white" />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${course.bgAccent} px-3 py-1.5 rounded-full`}>{course.level}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{course.title}</h3>
                  <p className="text-slate-500 text-base leading-relaxed mb-8 flex-1">{course.description}</p>
                  
                  <div className="flex items-center gap-6 mb-8 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="flex items-center text-slate-600 text-sm font-semibold">
                      <BookOpen className="w-5 h-5 mr-2 text-slate-400" />
                      {loading ? <span className="w-8 h-3 bg-slate-200 rounded animate-pulse" /> : stats[course.id]?.lessons || 0} Lessons
                    </div>
                    <div className="flex items-center text-slate-600 text-sm font-semibold">
                      <Clock className="w-5 h-5 mr-2 text-slate-400" />
                      {loading ? <span className="w-12 h-3 bg-slate-200 rounded animate-pulse" /> : stats[course.id]?.duration || '0m'}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-slate-800 font-bold text-base mt-auto">
                    <span>Start Learning</span>
                    <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-slate-900 group-hover:border-slate-900 group-hover:text-white transition-all duration-300">
                      <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
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