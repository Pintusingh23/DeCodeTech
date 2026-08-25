import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Clock, ChevronRight, Database, Code, Terminal, Layers, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import { calculateTotalDuration } from '../../utils/durationCalc';

const mysqlCourses = [
  {
    id: "lecture",
    title: "MySQL Lectures",
    level: "Beginner",
    description: "Master Relational Database Management Systems, SQL queries, and database design.",
    icon: Database,
    path: "/mysql/lecture",
    color: "from-blue-500 to-orange-400",
    borderAccent: "border-blue-500/10 hover:border-blue-500/30",
    bgAccent: "bg-blue-50 text-blue-600",
  },
  {
    id: "assessment",
    title: "Assessment Lab",
    level: "Lab Work",
    description: "Write complex queries, joins, stored procedures, and optimize database performance.",
    icon: Code,
    path: "/mysql/assessment",
    color: "from-blue-500 to-orange-400",
    borderAccent: "border-blue-500/10 hover:border-blue-500/30",
    bgAccent: "bg-blue-50 text-blue-600",
  },
];

const topics = [
  { icon: Terminal, label: "SELECT, INSERT, UPDATE" },
  { icon: Layers, label: "JOINs & Subqueries" },
  { icon: Database, label: "Database Design" },
  { icon: Zap, label: "Query Optimization" },
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

const MysqlPage = () => {
  const [stats, setStats] = useState({
    lecture: { lessons: 0, duration: '0m' },
    assessment: { lessons: 0, duration: '0m' }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMysqlStats = async () => {
      try {
        const [lectureRes, labRes] = await Promise.allSettled([
          fetch('https://de-code-tech-backend.vercel.app/api/mysql/lecture').then(res => res.json()),
          fetch('https://de-code-tech-backend.vercel.app/api/mysql/lab').then(res => res.json())
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
        console.error("Error fetching MySQL stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMysqlStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-['Space_Grotesk'] relative overflow-hidden text-slate-900">

      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(#E2E8F0 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <motion.div className="absolute top-24 right-[8%] opacity-20 pointer-events-none" animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}>
        <svg width="200" height="150" viewBox="0 0 100 100" fill="none" stroke="#cbd5e1" strokeWidth="1">
          <rect x="10" y="10" width="80" height="20" rx="2" />
          <rect x="10" y="40" width="80" height="20" rx="2" />
          <rect x="10" y="70" width="80" height="20" rx="2" />
          <line x1="30" y1="10" x2="30" y2="30" />
          <line x1="30" y1="40" x2="30" y2="60" />
          <line x1="30" y1="70" x2="30" y2="90" />
        </svg>
      </motion.div>

      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-32 pb-20 px-6 sm:px-12 z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text Content */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="space-y-8">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-200">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                Database Mastery
              </span>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-orange-400">MySQL</span>
            </h1>
            
            <p className="text-slate-600 text-lg md:text-xl max-w-lg leading-relaxed font-medium">
              From basic queries to advanced database design — build your foundation in relational databases completely free.
            </p>
            
            <motion.div className="flex flex-wrap gap-3 pt-2" variants={containerVariants} initial="hidden" animate="visible">
              {topics.map((topic, idx) => (
                <motion.div key={idx} variants={itemVariants}
                  className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-full text-sm font-semibold text-slate-600 shadow-sm hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 cursor-default">
                  <topic.icon className="w-4 h-4 text-blue-500" />{topic.label}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: SQL Code Visual */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative flex justify-center lg:justify-end">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-tr from-blue-400/20 to-orange-400/20 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative w-full max-w-[440px]">
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-100">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <div className="flex-1 mx-4 bg-white border border-slate-200 rounded-md px-3 py-1 text-[11px] text-slate-400 font-mono text-center tracking-wider">mysql_terminal</div>
                </div>

                <div className="p-6 font-mono text-sm leading-relaxed space-y-2 bg-white">
                  <div><span className="text-blue-600 font-bold">SELECT</span><span className="text-slate-800"> name, email, role</span></div>
                  <div><span className="text-blue-600 font-bold">FROM</span><span className="text-slate-800"> users</span></div>
                  <div><span className="text-blue-600 font-bold">JOIN</span><span className="text-slate-800"> departments </span><span className="text-blue-600 font-bold">ON</span></div>
                  <div className="pl-6"><span className="text-slate-600">users.dept_id</span><span className="text-emerald-600"> = </span><span className="text-slate-600">departments.id</span></div>
                  <div><span className="text-blue-600 font-bold">WHERE</span><span className="text-slate-800"> role </span><span className="text-emerald-600">= </span><span className="text-orange-500">'engineer'</span></div>
                  <div><span className="text-blue-600 font-bold">ORDER BY</span><span className="text-slate-800"> name </span><span className="text-blue-600 font-bold">ASC</span><span className="text-slate-800">;</span></div>

                  <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-4 bg-blue-500/50 mt-3 rounded-sm" />

                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">→ 42 rows returned</div>
                    <div className="flex gap-4 text-xs font-semibold">
                      <span className="text-emerald-600">✓ Query OK</span>
                      <span className="text-slate-400">0.003 sec</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }} className="absolute -bottom-6 -left-6 bg-white border border-slate-100 rounded-xl px-5 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center gap-3">
                <div className="bg-blue-50 p-2 rounded-lg"><Database className="w-5 h-5 text-blue-600" /></div>
                <span className="text-sm font-bold text-slate-800">MySQL 8.0</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== COURSE CARDS SECTION ===== */}
      <section className="relative py-20 px-6 sm:px-12 z-10 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Choose Your Path</h2>
          <p className="text-slate-600 text-lg">Start with structured lectures or jump straight into hands-on assessments.</p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto" variants={cardContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          {mysqlCourses.map((course) => (
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
};

export default MysqlPage;