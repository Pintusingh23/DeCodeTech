import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PlayCircle, Laptop, FileText, ChevronRight, Code, GitBranch, Layers, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import { BookOpen, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { calculateTotalDuration } from '../../utils/durationCalc';

const cards = [
  {
    id: 'lecture',
    title: 'DSA Lectures',
    level: 'Beginner',
    description: 'Comprehensive video lectures covering all core Data Structures and Algorithms from basics to advanced.',
    icon: PlayCircle,
    path: '/dsa/lecture',
    color: 'from-blue-500 to-indigo-500',
    borderAccent: 'border-blue-500/10 hover:border-blue-500/30',
    bgAccent: 'bg-blue-50 text-blue-600',
  },
  {
    id: 'assessment',
    title: 'DSA Assessment',
    level: 'Practice',
    description: 'Hands-on coding environment to practice and implement what you learn in real-time problems.',
    icon: Laptop,
    path: '/dsa/assessment',
    color: 'from-blue-500 to-indigo-500',
    borderAccent: 'border-blue-500/10 hover:border-blue-500/30',
    bgAccent: 'bg-blue-50 text-blue-600',
  },
  {
    id: 'sheet',
    title: 'DSA Sheet',
    level: 'Interview',
    description: 'Curated list of the most important interview questions to help you crack product-based companies.',
    icon: FileText,
    path: '/dsa/sheet',
    color: 'from-blue-500 to-indigo-500',
    borderAccent: 'border-blue-500/10 hover:border-blue-500/30',
    bgAccent: 'bg-blue-50 text-blue-600',
  }
];

const topics = [
  { icon: Layers, label: "Arrays & Linked Lists" },
  { icon: GitBranch, label: "Trees & Graphs" },
  { icon: Code, label: "Dynamic Programming" },
  { icon: Cpu, label: "Sorting & Searching" },
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

const Dsa = () => {
  const [stats, setStats] = useState({
    lecture: { lessons: 0, duration: '0m' },
    assessment: { lessons: 0, duration: '0m' },
    sheet: { lessons: 100, duration: '∞' }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDSAStats = async () => {
      try {
        const [lectureRes, labRes] = await Promise.allSettled([
          fetch('https://de-code-tech-backend.vercel.app/api/dsa/lecture').then(res => res.json()),
          fetch('https://de-code-tech-backend.vercel.app/api/dsa/lab').then(res => res.json())
        ]);

        const lectureData = lectureRes.status === 'fulfilled' && lectureRes.value.data ? lectureRes.value.data : [];
        const labData = labRes.status === 'fulfilled' && labRes.value.data ? labRes.value.data : [];

        setStats(prev => ({
          ...prev,
          lecture: {
            lessons: lectureData.length,
            duration: calculateTotalDuration(lectureData)
          },
          assessment: {
            lessons: labData.length,
            duration: calculateTotalDuration(labData)
          }
        }));
      } catch (error) {
        console.error("Error fetching DSA stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDSAStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-['Space_Grotesk'] relative overflow-hidden text-slate-900">

      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(#E2E8F0 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <motion.div className="absolute top-20 right-[10%] text-slate-100 font-mono font-black pointer-events-none select-none text-[120px]" animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}>{"[ ]"}</motion.div>
      <motion.div className="absolute bottom-40 left-[5%] text-slate-100 font-mono font-black pointer-events-none select-none text-[100px]" animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 1 }}>{"{ }"}</motion.div>

      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-20 px-6 sm:px-12 z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="space-y-8">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-200">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                Data Structures & Algorithms
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">DSA</span> the Right Way
            </h1>

            <p className="text-slate-600 text-lg md:text-xl max-w-lg leading-relaxed font-medium">
              The ultimate roadmap to cracking top tech interviews. Learn through lectures, practice in the lab, and conquer the DSA sheet.
            </p>

            <motion.div className="flex flex-wrap gap-3 pt-2" variants={containerVariants} initial="hidden" animate="visible">
              {topics.map((t, i) => (
                <motion.div key={i} variants={itemVariants} className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-full text-sm font-semibold text-slate-600 shadow-sm hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300 cursor-default">
                  <t.icon className="w-4 h-4 text-indigo-500" />{t.label}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: algorithm visualization */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative flex justify-center lg:justify-end">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 rounded-full blur-[80px] pointer-events-none" />

            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="relative w-full max-w-[440px] bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-100">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="flex-1 mx-4 bg-white border border-slate-200 rounded-md px-3 py-1 text-[11px] text-slate-400 font-mono text-center tracking-wider">dsa_playground.js</div>
              </div>
              <div className="p-6 font-mono text-sm leading-relaxed space-y-3 bg-white">
                <div><span className="text-indigo-600 font-medium">function</span><span className="text-blue-600 font-medium"> binarySearch</span><span className="text-slate-800">(arr, target) {"{"}</span></div>
                <div className="pl-6"><span className="text-indigo-600 font-medium">let</span><span className="text-slate-800"> left = </span><span className="text-emerald-600">0</span><span className="text-slate-800">, right = arr.length</span><span className="text-slate-500"> - 1</span><span className="text-slate-800">;</span></div>
                <div className="pl-6"><span className="text-indigo-600 font-medium">while</span><span className="text-slate-800"> (left &lt;= right) {"{"}</span></div>
                <div className="pl-12"><span className="text-indigo-600 font-medium">let</span><span className="text-slate-800"> mid = </span><span className="text-blue-600">Math.floor</span><span className="text-slate-800">((left + right) / </span><span className="text-emerald-600">2</span><span className="text-slate-800">);</span></div>
                <div className="pl-12"><span className="text-indigo-600 font-medium">if</span><span className="text-slate-800"> (arr[mid] === target) </span><span className="text-indigo-600 font-medium">return</span><span className="text-slate-800"> mid;</span></div>
                <div className="pl-12"><span className="text-slate-400">// O(log n) ⚡</span></div>
                <div className="pl-6"><span className="text-slate-800">{"}"}</span></div>
                <div><span className="text-slate-800">{"}"}</span></div>
                <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-4 bg-indigo-400/50 mt-3 rounded-sm" />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }} className="absolute -bottom-6 -left-6 bg-white border border-slate-100 rounded-xl px-5 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center gap-3">
              <div className="bg-indigo-50 p-2 rounded-lg"><Code className="w-5 h-5 text-indigo-600" /></div>
              <span className="text-sm font-bold text-slate-800">O(log n)</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== COURSE CARDS ===== */}
      <section className="relative py-20 px-6 sm:px-12 z-10 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Choose Your Path</h2>
          <p className="text-slate-600 text-lg">Start with lectures, practice in the lab, or dive straight into interview questions.</p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8" variants={cardContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          {cards.map((course) => (
            <motion.div key={course.id} variants={cardVariants} className="h-full">
              <Link to={course.path} className="group block h-full outline-none">
                <div className={`relative flex flex-col h-full bg-white rounded-2xl border ${course.borderAccent} p-6 lg:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1.5`}>

                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300`}>
                      <course.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${course.bgAccent} px-3 py-1 rounded-full`}>{course.level}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3">{course.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">{course.description}</p>

                  <div className="flex items-center gap-6 mb-8 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="flex items-center text-slate-600 text-xs font-semibold">
                      <BookOpen className="w-4 h-4 mr-2 text-slate-400" />
                      {loading && course.id !== 'sheet' ? <span className="w-6 h-3 bg-slate-200 rounded animate-pulse" /> : stats[course.id]?.lessons || 0} Lessons
                    </div>
                    <div className="flex items-center text-slate-600 text-xs font-semibold">
                      <Clock className="w-4 h-4 mr-2 text-slate-400" />
                      {loading && course.id !== 'sheet' ? <span className="w-8 h-3 bg-slate-200 rounded animate-pulse" /> : stats[course.id]?.duration || '0m'}
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
};

export default Dsa;