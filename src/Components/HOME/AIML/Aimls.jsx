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
    color: "from-[#7560C7] to-[#9B8DE3]",
    borderAccent: "border-[#C8C1F0]/20",
    bgAccent: "bg-[#7560C7]/20 text-[#C8C1F0]",
    glowColor: "rgba(117,96,199,0.25)"
  },
  {
    id: "assessment",
    title: "Assessment Lab",
    level: "Lab Work",
    description: "Build models, train datasets, and solve practical ML problems.",
    icon: Sparkles,
    path: "/aiml/assessment",
    color: "from-[#7560C7] to-[#9B8DE3]",
    borderAccent: "border-[#C8C1F0]/20",
    bgAccent: "bg-[rgba(117,96,199,0.15)] text-[#9B8DE3]",
    glowColor: "rgba(117,96,199,0.25)"
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
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.3 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 14 } }
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
    <div className="min-h-screen bg-[#211D31] font-['Space_Grotesk'] relative overflow-hidden">

      {/* Background blobs */}
      <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] bg-violet-300/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] bg-fuchsia-300/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none z-0" />

      {/* HERO */}
      <section className="relative pt-28 pb-16 px-6 sm:px-12 z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="space-y-6">
            <div className="space-y-2">
              <span className="text-[#9B8DE3] text-xs font-bold uppercase tracking-[0.2em]">// AI & MACHINE LEARNING</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#F8F7FF]">
                Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7560C7] to-[#9B8DE3]">AI & ML</span>
              </h1>
            </div>
            <p className="text-[#B8B2CC] max-w-lg">
              Dive into neural networks, deep learning, and real-world AI applications — all for free.
            </p>
            <motion.div className="flex flex-wrap gap-3" variants={containerVariants} initial="hidden" animate="visible">
              {topics.map((t, i) => (
                <motion.div key={i} variants={itemVariants}
                  className="flex items-center gap-2 bg-[rgba(255,255,255,0.06)] backdrop-blur-xl border border-[#C8C1F0]/20 px-3 py-1.5 rounded-full text-xs font-semibold text-[#B8B2CC] shadow-sm hover:border-violet-300 hover:text-[#9B8DE3] transition-all duration-300">
                  <t.icon className="w-3.5 h-3.5" />{t.label}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: AI code visual */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative flex justify-center">
            <div className="absolute w-[320px] h-[320px] bg-violet-400/10 rounded-full blur-[80px] pointer-events-none" />
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="relative w-full max-w-md bg-[#29243A]/80 rounded-2xl border border-slate-700/60 shadow-2xl overflow-hidden">
              <div className="flex items-center px-4 py-3 bg-[#211D31]/80 border-b border-slate-700/40">
                <div className="w-3 h-3 rounded-full bg-red-400 mr-2" />
                <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2" />
                <div className="w-3 h-3 rounded-full bg-green-400 mr-2" />
                <span className="text-xs text-[#B8B2CC] font-mono uppercase tracking-wider">ai_notebook</span>
              </div>
              <div className="p-5 font-mono text-sm space-y-2">
                <div><span className="text-purple-400">import</span> <span className="text-blue-400">torch</span></div>
                <div><span className="text-purple-400">import</span> <span className="text-blue-400">nn</span></div>
                <div className="mt-2"><span className="text-purple-400">class</span> <span className="text-yellow-300">Net</span><span className="text-slate-300">(nn.Module):</span></div>
                <div className="pl-4"><span className="text-purple-400">def</span> <span className="text-yellow-300">__init__</span><span className="text-slate-300">(self):</span></div>
                <div className="pl-8"><span className="text-purple-400">super</span><span className="text-slate-300">().</span><span className="text-blue-400">__init__</span><span className="text-slate-300">();</span></div>
                <div className="pl-8"><span className="text-blue-400">self</span><span className="text-slate-300">.</span><span className="text-yellow-300">fc</span> <span className="text-slate-300">= </span><span className="text-blue-400">nn.Linear</span><span className="text-slate-300">(784, 10)</span></div>
                <div className="mt-2"><span className="text-purple-400">def</span> <span className="text-yellow-300">forward</span><span className="text-slate-300">(self, x):</span></div>
                <div className="pl-4"><span className="text-blue-400">return</span> <span className="text-blue-400">self</span><span class="text-slate-300">.</span><span class="text-yellow-300">fc</span><span class="text-slate-300">(x)</span></div>
                <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-4 bg-purple-400 mt-2 rounded-sm" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8, type: "spring" }} className="absolute -bottom-4 -right-4 bg-[rgba(255,255,255,0.06)] backdrop-blur-xl border border-[#C8C1F0]/20 rounded-xl px-4 py-2.5 shadow-lg flex items-center gap-2">
              <Brain className="w-4 h-4 text-[#9B8DE3]" />
              <span className="text-xs font-bold text-[#F8F7FF]">PyTorch 2.0</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CARDS */}
      <section className="relative pb-24 px-6 sm:px-12 z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-[#F8F7FF]">
              Choose Your <span className="text-[#9B8DE3]">Path</span>
            </h2>
            <p className="text-[#B8B2CC] text-sm mt-2">Start with lectures or dive straight into labs.</p>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {aimlCourses.map((course) => (
              <motion.div key={course.id} variants={itemVariants}>
                <Link to={course.path}
                  className={`group relative block bg-[rgba(255,255,255,0.06)] backdrop-blur-xl rounded-2xl p-8 border ${course.borderAccent} shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.1)] transition-all duration-500 transform hover:-translate-y-2 overflow-hidden`}
                >
                  <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${course.color} rounded-bl-[100px] opacity-[0.07] group-hover:opacity-[0.14] group-hover:scale-125 transition-all duration-700`} />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <course.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${course.bgAccent} px-2 py-0.5 rounded-full`}>{course.level}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#F8F7FF] mb-2">{course.title}</h3>
                    <p className="text-[#B8B2CC] text-sm mb-5 flex-1">{course.description}</p>
                    <div className="flex items-center gap-6 text-[#B8B2CC] text-xs font-semibold mb-5">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        {loading ? '...' : stats[course.id]?.lessons || 0} Lessons
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {loading ? '...' : stats[course.id]?.duration || '0m'}
                      </div>
                    </div>
                    <div className="flex items-center text-[#F8F7FF] font-bold text-sm mt-auto group-hover:text-[#9B8DE3] transition-colors">
                      Start Learning <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}