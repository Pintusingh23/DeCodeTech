import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Clock, ChevronRight, Database, BarChart3, Search, GitMerge } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import { calculateTotalDuration } from '../../../utils/durationCalc';

const dataMiningCourses = [
  {
    id: "lecture",
    title: "Data Mining Lectures",
    level: "Beginner",
    description: "Learn full data mining concepts, algorithms, and patterns with structured videos.",
    icon: Database,
    path: "/datamining/lecture",
    color: "from-teal-500 to-emerald-500",
    borderAccent: "border-teal-500/10 hover:border-teal-500/30",
    bgAccent: "bg-teal-50 text-teal-600",
  },
  {
    id: "assessment",
    title: "Assessment Lab",
    level: "Lab Work",
    description: "Practical tasks & assessment-based learning using real-world datasets.",
    icon: BarChart3,
    path: "/datamining/assessment",
    color: "from-teal-500 to-emerald-500",
    borderAccent: "border-teal-500/10 hover:border-teal-500/30",
    bgAccent: "bg-teal-50 text-teal-600",
  },
];

const topics = [
  { icon: Search, label: "Pattern Recognition" },
  { icon: GitMerge, label: "Clustering" },
  { icon: BarChart3, label: "Classification" },
  { icon: Database, label: "Association Rules" },
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

export default function Dataminings() {
  const [stats, setStats] = useState({
    lecture: { lessons: 0, duration: '0m' },
    assessment: { lessons: 0, duration: '0m' }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataminingStats = async () => {
      try {
        const [lectureRes, labRes] = await Promise.allSettled([
          fetch('https://de-code-tech-backend.vercel.app/api/datamining/lecture').then(res => res.json()),
          fetch('https://de-code-tech-backend.vercel.app/api/datamining/lab').then(res => res.json())
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
        console.error("Error fetching Datamining stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataminingStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-['Space_Grotesk'] relative overflow-hidden text-slate-900">

      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(#E2E8F0 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <motion.div className="absolute top-32 right-[8%] opacity-30 pointer-events-none" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}>
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
          <circle cx="20" cy="20" r="4" fill="#cbd5e1" />
          <circle cx="80" cy="40" r="6" fill="#cbd5e1" />
          <circle cx="40" cy="80" r="5" fill="#cbd5e1" />
          <path d="M20 20 L80 40 L40 80 Z" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
      </motion.div>
      <motion.div className="absolute bottom-20 left-[10%] opacity-30 pointer-events-none" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1 }}>
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
          <rect x="20" y="20" width="10" height="40" fill="#e2e8f0" />
          <rect x="40" y="40" width="10" height="20" fill="#e2e8f0" />
          <rect x="60" y="10" width="10" height="50" fill="#e2e8f0" />
        </svg>
      </motion.div>

      {/* HERO */}
      <section className="relative pt-32 pb-20 px-6 sm:px-12 z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="space-y-8">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 border border-teal-200">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse" />
                Data Mining
              </span>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500">Data Mining</span>
            </h1>
            
            <p className="text-slate-600 text-lg md:text-xl max-w-lg leading-relaxed font-medium">
              Discover hidden patterns, extract insights, and transform raw data into actionable knowledge. Completely free.
            </p>
            
            <motion.div className="flex flex-wrap gap-3 pt-2" variants={containerVariants} initial="hidden" animate="visible">
              {topics.map((t, i) => (
                <motion.div key={i} variants={itemVariants}
                  className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-full text-sm font-semibold text-slate-600 shadow-sm hover:border-teal-300 hover:text-teal-600 hover:bg-teal-50 transition-all duration-300 cursor-default">
                  <t.icon className="w-4 h-4 text-teal-500" />{t.label}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: data pipeline visual */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative flex justify-center lg:justify-end">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-tr from-teal-500/20 to-emerald-500/20 rounded-full blur-[80px] pointer-events-none" />
            
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="relative w-full max-w-[440px] bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden"
            >
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-100">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="flex-1 mx-4 bg-white border border-slate-200 rounded-md px-3 py-1 text-[11px] text-slate-400 font-mono text-center tracking-wider">data_pipeline.py</div>
              </div>
              <div className="p-6 font-mono text-sm space-y-4 bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                  <span className="text-slate-500 text-xs font-semibold">RAW DATA</span>
                  <span className="text-slate-300">→</span>
                  <span className="text-teal-600 font-bold text-xs">1,247 records</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="text-slate-500 text-xs font-semibold">CLEANING</span>
                  <span className="text-slate-300">→</span>
                  <span className="text-amber-500 font-bold text-xs">1,198 valid</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-slate-500 text-xs font-semibold">CLUSTERING</span>
                  <span className="text-slate-300">→</span>
                  <span className="text-blue-600 font-bold text-xs">4 groups found</span>
                </div>
                <div className="border-t border-slate-100 pt-4 mt-2">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-3">K-Means Result:</div>
                  <div className="flex gap-2">
                    {["#14b8a6", "#f59e0b", "#3b82f6", "#ec4899"].map((c, i) => (
                      <div key={i} className="flex-1 h-8 rounded" style={{ backgroundColor: c, opacity: 0.8 }} />
                    ))}
                  </div>
                  <div className="flex gap-2 mt-2">
                    {["324", "187", "412", "275"].map((n, i) => (
                      <div key={i} className="flex-1 text-center text-[10px] font-semibold text-slate-500">{n}</div>
                    ))}
                  </div>
                </div>
                <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-4 bg-teal-400/50 mt-1 rounded-sm" />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-white border border-slate-100 rounded-xl px-5 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center gap-3"
            >
              <div className="bg-teal-50 p-2 rounded-lg"><BarChart3 className="w-5 h-5 text-teal-600" /></div>
              <span className="text-sm font-bold text-slate-800">K-Means Clustering</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CARDS */}
      <section className="relative py-20 px-6 sm:px-12 z-10 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Choose Your Path</h2>
          <p className="text-slate-600 text-lg">Start with structured lectures or jump straight into hands-on assessments.</p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          variants={cardContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          {dataMiningCourses.map((course) => (
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