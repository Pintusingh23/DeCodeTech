import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Clock, ArrowRight, Database, Code, Terminal, Layers, Zap, ChevronRight } from "lucide-react";
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
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    path: "/mysql/lecture",
    color: "from-[#7560C7] to-[#9B8DE3]",
    shadow: "shadow-[#7560C7]/20",
    bgAccent: "bg-[#7560C7]/20 text-[#C8C1F0]",
    borderAccent: "border-[#C8C1F0]/20",
    glowColor: "rgba(117,96,199,0.25)",
  },
  {
    id: "assessment",
    title: "Assessment Lab",
    level: "Lab Work",
    description: "Write complex queries, joins, stored procedures, and optimize database performance.",
    icon: Code,
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original.svg",
    path: "/mysql/assessment",
    color: "from-[#7560C7] to-[#9B8DE3]",
    shadow: "shadow-[#7560C7]/20",
    bgAccent: "bg-[#7560C7]/20 text-[#C8C1F0]",
    borderAccent: "border-[#C8C1F0]/20",
    glowColor: "rgba(117,96,199,0.25)",
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
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 14 },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.2 } },
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
    <div className="min-h-screen bg-[#211D31] font-['Space_Grotesk'] relative overflow-hidden">

      {/* Background Decorations */}
      <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] bg-[#7560C7]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] bg-[#9B8DE3]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#7560C7]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(248,247,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(248,247,255,0.015)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none z-0" />

      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-28 pb-16 px-6 sm:px-12 z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Text Content */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <div className="space-y-2">
              <span className="text-[#9B8DE3] text-xs font-bold uppercase tracking-[0.2em]">
                // DATABASE MASTERY
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#F8F7FF] tracking-tight leading-[1.1]">
                Master{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7560C7] to-[#9B8DE3]">
                  MySQL
                </span>
              </h1>
            </div>

            <p className="text-[#B8B2CC] text-base md:text-lg max-w-lg leading-relaxed">
              From basic queries to advanced database design — build your foundation in relational databases completely free.
            </p>

            {/* Quick topic pills */}
            <motion.div
              className="flex flex-wrap gap-3 pt-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {topics.map((topic, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="flex items-center gap-2 bg-[rgba(255,255,255,0.06)] border border-[#C8C1F0]/20 px-3 py-1.5 rounded-full text-xs font-semibold text-[#F8F7FF] shadow-sm hover:border-[#9B8DE3] hover:text-[#9B8DE3] transition-all duration-300"
                >
                  <topic.icon className="w-3.5 h-3.5" />
                  {topic.label}
                </motion.div>
              ))}
            </motion.div>

          </motion.div>

          {/* Right: SQL Code Visual */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
            className="relative flex justify-center"
          >
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-[#7560C7]/20 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative w-full max-w-md">
              {/* Animated SQL terminal card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="bg-[#29243A]/80 backdrop-blur-xl rounded-2xl border border-[#C8C1F0]/20 shadow-2xl overflow-hidden"
              >
                {/* Terminal header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#211D31]/80 border-b border-[#C8C1F0]/10">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="text-[10px] text-[#B8B2CC] ml-2 font-mono uppercase tracking-wider">mysql_terminal</span>
                </div>

                {/* SQL code block */}
                <div className="p-5 font-mono text-sm leading-relaxed space-y-2">
                  <div>
                    <span className="text-[#9B8DE3]">SELECT</span>
                    <span className="text-[#F8F7FF]"> name, email, role</span>
                  </div>
                  <div>
                    <span className="text-[#9B8DE3]">FROM</span>
                    <span className="text-[#C8C1F0]"> users</span>
                  </div>
                  <div>
                    <span className="text-[#9B8DE3]">JOIN</span>
                    <span className="text-[#C8C1F0]"> departments</span>
                    <span className="text-[#9B8DE3]"> ON</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-[#B8B2CC]">users.dept_id</span>
                    <span className="text-[#C8C1F0]"> = </span>
                    <span className="text-[#B8B2CC]">departments.id</span>
                  </div>
                  <div>
                    <span className="text-[#9B8DE3]">WHERE</span>
                    <span className="text-[#F8F7FF]"> role </span>
                    <span className="text-[#C8C1F0]">= </span>
                    <span className="text-[#9B8DE3]">'engineer'</span>
                  </div>
                  <div>
                    <span className="text-[#9B8DE3]">ORDER BY</span>
                    <span className="text-[#F8F7FF]"> name </span>
                    <span className="text-[#9B8DE3]">ASC</span>
                    <span className="text-[#B8B2CC]">;</span>
                  </div>

                  {/* Blinking cursor */}
                  <motion.div
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-2 h-4 bg-[#9B8DE3] mt-2 rounded-sm"
                  />

                  {/* Result row */}
                  <div className="mt-4 pt-3 border-t border-[#C8C1F0]/10">
                    <div className="text-[10px] text-[#B8B2CC] uppercase tracking-wider mb-2">→ 42 rows returned</div>
                    <div className="flex gap-4 text-[11px]">
                      <span className="text-[#9B8DE3]">✓ Query OK</span>
                      <span className="text-[#B8B2CC]">0.003 sec</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="absolute -bottom-4 -right-4 bg-[rgba(255,255,255,0.06)] backdrop-blur-md border border-[#C8C1F0]/20 rounded-xl px-4 py-2.5 shadow-[0_8px_30px_rgba(117,96,199,0.3)] flex items-center gap-2"
              >
                <Database className="w-4 h-4 text-[#9B8DE3]" />
                <span className="text-xs font-bold text-[#F8F7FF]">MySQL 8.0</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== COURSE CARDS SECTION ===== */}
      <section className="relative pb-24 px-6 sm:px-12 z-10">
        <div className="max-w-6xl mx-auto">

          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-black text-[#F8F7FF] tracking-tight">
              Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7560C7] to-[#9B8DE3]">Path</span>
            </h2>
            <p className="text-[#B8B2CC] text-sm mt-2 max-w-lg">
              Start with structured lectures or jump straight into hands-on assessments.
            </p>
          </motion.div>

          {/* Course Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {mysqlCourses.map((course) => (
              <motion.div key={course.id} variants={itemVariants}>
                <Link
                  to={course.path}
                  className={`group relative block bg-[rgba(255,255,255,0.06)] backdrop-blur-xl rounded-2xl p-8 border ${course.borderAccent} shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:border-[#9B8DE3] hover:shadow-[0_8px_40px_${course.glowColor}] transition-all duration-500 transform hover:-translate-y-2 overflow-hidden`}
                >
                  {/* Gradient accent corner */}
                  <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${course.color} rounded-bl-[100px] opacity-[0.06] group-hover:opacity-[0.15] group-hover:scale-125 transition-all duration-700`} />

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Top row */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center shadow-lg shadow-[#7560C7]/20 group-hover:scale-110 transition-transform duration-300`}>
                          <course.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[#F8F7FF] group-hover:text-[#C8C1F0] transition-colors">
                            {course.title}
                          </h3>
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${course.bgAccent} px-2 py-0.5 rounded-full`}>
                            {course.level}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[#B8B2CC] text-sm leading-relaxed mb-6">
                      {course.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-6 text-[#B8B2CC] text-xs font-semibold mb-6">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-[#9B8DE3]" />
                        {loading ? '...' : stats[course.id]?.lessons || 0} Lessons
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#9B8DE3]" />
                        {loading ? '...' : stats[course.id]?.duration || '0m'}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center text-[#F8F7FF] font-bold text-sm mt-auto group-hover:text-[#9B8DE3] transition-colors">
                      Start Learning
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1.5 transition-transform duration-300" />
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

export default MysqlPage;