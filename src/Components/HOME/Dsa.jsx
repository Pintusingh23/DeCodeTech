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
    color: 'from-[#7560C7] to-[#9B8DE3]',
    borderAccent: 'border-[#C8C1F0]/20',
    bgAccent: 'bg-[#7560C7]/20 text-[#C8C1F0]',
  },
  {
    id: 'assessment',
    title: 'DSA Assessment',
    level: 'Practice',
    description: 'Hands-on coding environment to practice and implement what you learn in real-time problems.',
    icon: Laptop,
    path: '/dsa/assessment',
    color: 'from-[#7560C7] to-[#9B8DE3]',
    borderAccent: 'border-[#C8C1F0]/20',
    bgAccent: 'bg-[rgba(117,96,199,0.15)] text-[#9B8DE3]',
  },
  {
    id: 'sheet',
    title: 'DSA Sheet',
    level: 'Interview',
    description: 'Curated list of the most important interview questions to help you crack product-based companies.',
    icon: FileText,
    path: '/dsa/sheet',
    color: 'from-[#7560C7] to-[#9B8DE3]',
    borderAccent: 'border-[#C8C1F0]/20',
    bgAccent: 'bg-[rgba(117,96,199,0.15)] text-[#9B8DE3]',
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
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 14 } },
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
          fetch('http://localhost:5001/api/dsa/lecture').then(res => res.json()),
          fetch('http://localhost:5001/api/dsa/lab').then(res => res.json())
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
    <div className="min-h-screen bg-[#211D31] font-['Space_Grotesk'] relative overflow-hidden">

      {/* Background blobs */}
      <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] bg-red-300/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] bg-blue-300/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none z-0" />

      {/* ===== HERO ===== */}
      <section className="relative pt-28 pb-16 px-6 sm:px-12 z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <span className="text-[#9B8DE3] text-xs font-bold uppercase tracking-[0.2em]">// DATA STRUCTURES & ALGORITHMS</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#F8F7FF] tracking-tight leading-[1.1]">
                Master{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-600">
                  DSA
                </span>{" "}
                the Right Way
              </h1>
            </div>
            <p className="text-[#B8B2CC] text-base md:text-lg max-w-lg leading-relaxed">
              The ultimate roadmap to cracking top tech interviews. Learn through lectures, practice in the lab, and conquer the DSA sheet.
            </p>
            <motion.div className="flex flex-wrap gap-3 pt-2" variants={containerVariants} initial="hidden" animate="visible">
              {topics.map((t, i) => (
                <motion.div key={i} variants={itemVariants}
                  className="flex items-center gap-2 bg-[rgba(255,255,255,0.06)] backdrop-blur-xl border border-[#C8C1F0]/20 px-3 py-1.5 rounded-full text-xs font-semibold text-[#B8B2CC] shadow-sm hover:border-red-300 hover:text-[#9B8DE3] transition-all duration-300">
                  <t.icon className="w-3.5 h-3.5" />{t.label}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: algorithm visualization */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-red-400/10 rounded-full blur-[80px] pointer-events-none" />
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative w-full max-w-md bg-[#29243A]/80 rounded-2xl border border-slate-700/60 shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-2 px-4 py-3 bg-[#211D31]/80 border-b border-slate-700/40">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="text-[10px] text-[#B8B2CC] ml-2 font-mono uppercase tracking-wider">dsa_playground</span>
              </div>
              <div className="p-5 font-mono text-sm leading-relaxed space-y-2">
                <div><span className="text-purple-400">function</span><span className="text-yellow-300"> binarySearch</span><span className="text-slate-300">(arr, target) {"{"}</span></div>
                <div className="pl-4"><span className="text-blue-400">let</span><span className="text-slate-300"> left = </span><span className="text-green-400">0</span><span className="text-slate-300">, right = arr.length</span><span className="text-[#B8B2CC]"> - 1</span><span className="text-slate-300">;</span></div>
                <div className="pl-4"><span className="text-purple-400">while</span><span className="text-slate-300"> (left &lt;= right) {"{"}</span></div>
                <div className="pl-8"><span className="text-blue-400">let</span><span className="text-slate-300"> mid = </span><span className="text-yellow-300">Math.floor</span><span className="text-slate-300">((left + right) / </span><span className="text-green-400">2</span><span className="text-slate-300">);</span></div>
                <div className="pl-8"><span className="text-purple-400">if</span><span className="text-slate-300"> (arr[mid] === target) </span><span className="text-purple-400">return</span><span className="text-slate-300"> mid;</span></div>
                <div className="pl-8"><span className="text-[#B8B2CC]">// O(log n) ⚡</span></div>
                <div className="pl-4"><span className="text-slate-300">{"}"}</span></div>
                <div><span className="text-slate-300">{"}"}</span></div>
                <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-4 bg-red-400 mt-2 rounded-sm" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8, type: "spring" }}
              className="absolute -bottom-4 -right-4 bg-[rgba(255,255,255,0.06)] backdrop-blur-xl border border-[#C8C1F0]/20 rounded-xl px-4 py-2.5 shadow-lg flex items-center gap-2"
            >
              <Code className="w-4 h-4 text-[#9B8DE3]" />
              <span className="text-xs font-bold text-[#F8F7FF]">O(log n)</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== COURSE CARDS ===== */}
      <section className="relative pb-24 px-6 sm:px-12 z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-[#F8F7FF] tracking-tight">
              Choose Your <span className="text-[#9B8DE3]">Path</span>
            </h2>
            <p className="text-[#B8B2CC] text-sm mt-2">Start with lectures, practice in the lab, or dive straight into interview questions.</p>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-7"
            variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {cards.map((course) => (
              <motion.div key={course.id} variants={itemVariants}>
                <Link to={course.path}
                  className={`group relative block bg-[rgba(255,255,255,0.06)] backdrop-blur-xl rounded-2xl p-7 border ${course.borderAccent} shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.1)] transition-all duration-500 transform hover:-translate-y-2 overflow-hidden h-full`}
                >
                  <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-br ${course.color} rounded-bl-[100px] opacity-[0.07] group-hover:opacity-[0.14] group-hover:scale-125 transition-all duration-700`} />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-5">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <course.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${course.bgAccent} px-2 py-0.5 rounded-full`}>{course.level}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#F8F7FF] mb-2">{course.title}</h3>
                    <p className="text-[#B8B2CC] text-sm leading-relaxed mb-5 flex-1">{course.description}</p>
                    <div className="flex items-center gap-5 text-[#B8B2CC] text-[11px] font-semibold mb-5">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {loading && course.id !== 'sheet' ? '...' : stats[course.id]?.lessons || 0} Lessons
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {loading && course.id !== 'sheet' ? '...' : stats[course.id]?.duration || '0m'}
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
};

export default Dsa;