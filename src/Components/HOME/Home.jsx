import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { LayoutDashboard, FolderKanban, BookOpen, Target, User, Rocket, Code, Monitor, BrainCircuit, Server, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import CareerGuidance from './CareerGuidance';

const Home = ({ isLoading = false }) => {
  // Stagger variants for framer motion text reveal
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className={`flex min-h-screen bg-[#FFFBF0] text-slate-900 font-['Space_Grotesk'] overflow-hidden transition-opacity duration-1000 ${isLoading ? 'opacity-0 h-0' : 'opacity-100'}`}>

      {/* ==================================================
          LEFT SIDEBAR (DASHBOARD)
          ================================================== */}
      <aside className="hidden lg:flex flex-col fixed top-0 left-0 h-screen w-64 pt-24 pb-6 px-5 bg-white border-r border-slate-200 shadow-[2px_0_10px_rgba(0,0,0,0.02)] z-40 overflow-y-auto">

        {/* Navigation Links */}
        <nav className="space-y-1 mt-4">
          <Link to="/Deshboard" className="flex items-center gap-3 px-4 py-3 bg-purple-50 text-purple-700 rounded-xl font-bold tracking-wide transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link to="/projects" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-semibold tracking-wide transition-colors">
            <FolderKanban className="w-5 h-5" />
            Projects
          </Link>
        </nav>

        {/* Placement Tracks Section */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-2 px-3">
            <Rocket className="w-3.5 h-3.5 text-orange-500" />
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Placement Tracks
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-orange-200 to-transparent"></div>
          </div>

          <nav className="space-y-1">
            {[
              { icon: <Code className="w-4 h-4" />, name: "DSA Track", path: "/Dsa", gradient: "from-violet-500 to-purple-600", bg: "bg-violet-100", text: "text-violet-600" },
              { icon: <Monitor className="w-4 h-4" />, name: "Dev Track", path: "/web-development", gradient: "from-blue-500 to-cyan-500", bg: "bg-blue-100", text: "text-blue-600" },
              { icon: <BrainCircuit className="w-4 h-4" />, name: "AI / ML", path: "/AIML", gradient: "from-pink-500 to-rose-500", bg: "bg-pink-100", text: "text-pink-600" },
              { icon: <Server className="w-4 h-4" />, name: "System Design", path: "/system-design", gradient: "from-emerald-500 to-teal-500", bg: "bg-emerald-100", text: "text-emerald-600" },
              { icon: <Settings className="w-4 h-4" />, name: "DevOps", path: "/devops", gradient: "from-amber-500 to-orange-500", bg: "bg-amber-100", text: "text-amber-600" },
              { icon: <BookOpen className="w-4 h-4" />, name: "Core Subjects", path: "/core-subjects", gradient: "from-indigo-500 to-blue-600", bg: "bg-indigo-100", text: "text-indigo-600" },
            ].map((track, index) => (
              <Link
                key={index}
                to={track.path}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold tracking-wide transition-all duration-200 group"
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${track.bg} transition-all duration-200 group-hover:scale-105`}>
                  <span className={track.text}>{track.icon}</span>
                </div>
                <span className="text-sm">{track.name}</span>
                <svg className="w-3.5 h-3.5 ml-auto text-slate-300 group-hover:text-slate-500 transition-all group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </nav>
        </div>

        {/* Promotional Card */}
        <div className="mt-auto bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-100 p-5 rounded-2xl shadow-sm relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-orange-400/10 blur-xl rounded-full pointer-events-none"></div>

          <h4 className="font-bold text-slate-900 text-sm mb-2 leading-tight">
            deCode Academy
          </h4>
          <p className="text-xs text-slate-600 mb-4 font-medium leading-relaxed">
            Go deeper and learn job-ready skills.
          </p>
          <Link to="/Contact" className="inline-block w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-center text-xs font-bold uppercase tracking-widest rounded-lg shadow-sm transition-colors">
            Learn More
          </Link>
        </div>
      </aside>

      {/* ==================================================
          MAIN CONTENT
          ================================================== */}
      <main className="flex-1 lg:pl-64 w-full relative">
        {/* Background Decorative Ambient Details */}
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-orange-100/50 rounded-full blur-[140px] pointer-events-none z-0"></div>
        <div className="absolute bottom-[20%] right-[5%] w-[500px] h-[500px] bg-yellow-100/40 rounded-full blur-[160px] pointer-events-none z-0"></div>

        {/* 1. HERO SECTION */}
        <section className="relative px-4 sm:px-8 lg:px-12 pt-32 lg:pt-36 pb-6 lg:pb-10">
          <div className="max-w-7xl mx-auto w-full z-10">

            <h1 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight">
              DeCode Academy Bootcamps
            </h1>

            {/* Premium Orange Hero Card */}
            <div className="bg-gradient-to-br from-[#FFAB00] to-[#FF6D00] rounded-[2rem] p-6 md:p-8 lg:px-10 lg:py-10 shadow-[0_15px_40px_rgba(255,145,0,0.2)] relative overflow-hidden flex flex-col lg:flex-row items-center gap-6 lg:gap-10 border border-orange-400/30">

              {/* Subtle decorative elements inside the hero card */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[60px] pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange-400/40 blur-[60px] rounded-full pointer-events-none" />

              {/* Left Hero Typography */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isLoading ? "hidden" : "visible"}
                className="flex flex-col items-start space-y-5 z-10 lg:w-3/5"
              >
                <div className="space-y-2">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight text-white drop-shadow-sm flex flex-wrap items-center gap-x-2.5 gap-y-1 select-none">
                    <motion.span variants={itemVariants} className="inline-block">Learn</motion.span>
                    <motion.span variants={itemVariants} className="inline-block font-light text-white/50">/</motion.span>
                    <motion.span variants={itemVariants} className="inline-block text-yellow-100">Code</motion.span>
                    <motion.span variants={itemVariants} className="inline-block font-light text-white/50">/</motion.span>
                    <motion.span variants={itemVariants} className="inline-block">Build</motion.span>
                  </h2>
                </div>

                <div className="space-y-2">
                  <motion.p
                    variants={itemVariants}
                    className="text-orange-50 text-sm md:text-base max-w-lg leading-snug select-none font-medium"
                  >
                    Learn coding and computer science through practical, easy-to-understand lessons — completely free.
                  </motion.p>
                  <motion.p
                    variants={itemVariants}
                    className="text-white/80 text-[11px] md:text-xs max-w-lg leading-snug select-none font-medium"
                  >
                    Master Web Development, DSA, Python, Data Mining, AI/ML, Computer Architecture and MySQL.
                  </motion.p>
                </div>

                <motion.div variants={itemVariants} className="flex flex-wrap gap-3 items-center pt-1 w-full sm:w-auto">
                  <a
                    href="/python"
                    className="inline-flex items-center justify-center gap-2 bg-[#F02F5E] hover:bg-[#D61F4C] text-white font-bold text-[13px] px-5 py-3 rounded-full shadow-[0_8px_20px_rgba(240,47,94,0.3)] hover:shadow-[0_12px_25px_rgba(240,47,94,0.4)] transition-all transform hover:-translate-y-1 uppercase tracking-widest w-full sm:w-auto"
                  >
                    Start Learning
                    <FaArrowRight className="text-[10px]" />
                  </a>
                  <a
                    href="/Contact"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-[13px] px-5 py-3 rounded-full transition-all uppercase tracking-widest w-full sm:w-auto"
                  >
                    Explore Courses →
                  </a>
                </motion.div>
              </motion.div>

              {/* Right Interactive Visual - Compact Code Editor */}
              <div className="relative z-10 lg:w-2/5 flex items-center justify-center w-full mt-4 lg:mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={isLoading ? { opacity: 0, y: 15 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-full max-w-[280px] lg:max-w-[300px] mx-auto bg-[#1E1E1E]/95 backdrop-blur-md rounded-xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.3)] border border-white/20 transform lg:rotate-2 hover:rotate-0 transition-transform duration-500"
                >
                  {/* Editor Header */}
                  <div className="bg-[#2D2D2D]/90 px-3 py-2 flex items-center gap-1.5 border-b border-white/5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] shadow-inner"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] shadow-inner"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] shadow-inner"></div>
                    <span className="text-[9px] text-white/50 ml-1.5 font-mono font-medium tracking-wider">learn.js</span>
                  </div>
                  {/* Editor Body */}
                  <div className="p-4 font-mono text-[11px] leading-[1.6] text-white/80">
                    <div className="flex hover:bg-white/5 rounded transition-colors px-1">
                      <span className="text-white/30 w-5 shrink-0 select-none">1</span>
                      <span><span className="text-[#F92672]">const</span> <span className="text-[#66D9EF]">masterSkills</span> <span className="text-[#F92672]">=</span> <span className="text-[#E6DB74]">()</span> <span className="text-[#F92672]">=&gt;</span> {'{'}</span>
                    </div>
                    <div className="flex hover:bg-white/5 rounded transition-colors px-1">
                      <span className="text-white/30 w-5 shrink-0 select-none">2</span>
                      <span className="ml-3"><span className="text-[#F92672]">return</span> (</span>
                    </div>
                    <div className="flex hover:bg-white/5 rounded transition-colors px-1">
                      <span className="text-white/30 w-5 shrink-0 select-none">3</span>
                      <span className="ml-6 text-[#A6E22E]">&lt;Developer&gt;</span>
                    </div>
                    <div className="flex hover:bg-white/5 rounded transition-colors px-1">
                      <span className="text-white/30 w-5 shrink-0 select-none">4</span>
                      <span className="ml-9"><span className="text-[#66D9EF]">logic</span>=<span>{'{'}</span><span className="text-[#E6DB74]">true</span><span>{'}'}</span></span>
                    </div>
                    <div className="flex hover:bg-white/5 rounded transition-colors px-1">
                      <span className="text-white/30 w-5 shrink-0 select-none">5</span>
                      <span className="ml-9"><span className="text-[#66D9EF]">magic</span>=<span>{'{'}</span><span className="text-[#E6DB74]">true</span><span>{'}'}</span></span>
                    </div>
                    <div className="flex hover:bg-white/5 rounded transition-colors px-1">
                      <span className="text-white/30 w-5 shrink-0 select-none">6</span>
                      <span className="ml-6 text-[#A6E22E]">&lt;/Developer&gt;</span>
                    </div>
                    <div className="flex hover:bg-white/5 rounded transition-colors px-1">
                      <span className="text-white/30 w-5 shrink-0 select-none">7</span>
                      <span className="ml-3">);</span>
                    </div>
                    <div className="flex hover:bg-white/5 rounded transition-colors px-1">
                      <span className="text-white/30 w-5 shrink-0 select-none">8</span>
                      <span>{'}'};</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

          </div>
        </section>

        {/* 2. DASHBOARD CARDS */}
        <section className="px-4 sm:px-8 lg:px-12 pb-12">
          <div className="max-w-7xl mx-auto w-full z-10 relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Card 1 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">Interactive Learning</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    Learn with hands-on coding exercises and real-world projects
                  </p>
                </div>
                <div className="mt-6">
                  <a href="#" className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">Learn more →</a>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center mb-4">
                    <Target className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">Coding Challenges</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    Practice with LeetCode and Codeforces problems
                  </p>
                </div>
                <div className="mt-6">
                  <button className="text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition-colors">Set target</button>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center mb-4">
                    <User className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">Your goal</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    Grow in my existing role
                  </p>
                </div>
                <div className="mt-6">
                  <a href="#" className="text-sm font-bold text-slate-500 hover:text-slate-700 underline underline-offset-2 transition-colors">Edit</a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. Popular Courses Section */}
        <section className="py-24 px-4 sm:px-8 lg:px-12 bg-[#FAFAFA] relative border-t border-slate-100 overflow-hidden z-10">
          <div className="max-w-7xl mx-auto w-full space-y-12 relative z-10 text-left">

            <div className="flex justify-start -mb-6">
              <h2 className="text-[22px] md:text-2xl font-bold text-[#5c2b2b] leading-none">
                Popular Courses
              </h2>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Card 1: Web Development */}
              <div
                onClick={() => window.location.href = '/web-development'}
                className="group bg-white border border-slate-200 p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col justify-between relative overflow-hidden"
              >
                <div className="space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-3xl shadow-sm select-none group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">📊</div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight mb-2">
                      Web Development
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
                      Learn HTML, CSS, and JavaScript from scratch.
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-400 font-bold uppercase tracking-wider bg-slate-50 py-2 px-3 rounded-lg inline-flex">
                    <span>9 Courses</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">⏱ 17 hours</span>
                  </div>
                </div>
                <div className="pt-8">
                  <span className="inline-flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-blue-600 group-hover:text-blue-700 transition-colors">
                    Explore
                    <FaArrowRight className="text-[12px] group-hover:translate-x-1.5 transition-transform duration-300" />
                  </span>
                </div>
              </div>

              {/* Card 2: DSA */}
              <div
                onClick={() => window.location.href = '/Dsa'}
                className="group bg-white border border-slate-200 p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col justify-between relative overflow-hidden"
              >
                <div className="space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-3xl shadow-sm select-none group-hover:scale-110 group-hover:bg-purple-100 transition-all duration-300">🗃️</div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight mb-2">
                      Data Structures & Algorithms
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
                      Master DSA concepts with practical examples.
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-400 font-bold uppercase tracking-wider bg-slate-50 py-2 px-3 rounded-lg inline-flex">
                    <span>5 Courses</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">⏱ 13 hours</span>
                  </div>
                </div>
                <div className="pt-8">
                  <span className="inline-flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-purple-600 group-hover:text-purple-700 transition-colors">
                    Explore
                    <FaArrowRight className="text-[12px] group-hover:translate-x-1.5 transition-transform duration-300" />
                  </span>
                </div>
              </div>

              {/* Card 3: HTML & CSS Fundamentals */}
              <div
                onClick={() => window.location.href = '/web-development'}
                className="group bg-white border border-slate-200 p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col justify-between relative overflow-hidden"
              >
                <div className="space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-3xl shadow-sm select-none group-hover:scale-110 group-hover:bg-emerald-100 transition-all duration-300">⚙️</div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight mb-2">
                      HTML & CSS Fundamentals
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
                      Build beautiful and responsive websites.
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-400 font-bold uppercase tracking-wider bg-slate-50 py-2 px-3 rounded-lg inline-flex">
                    <span>17 Courses</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">⏱ 90 hours</span>
                  </div>
                </div>
                <div className="pt-8">
                  <span className="inline-flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-emerald-600 group-hover:text-emerald-700 transition-colors">
                    Explore
                    <FaArrowRight className="text-[12px] group-hover:translate-x-1.5 transition-transform duration-300" />
                  </span>
                </div>
              </div>
            </div>

          </div>
        </section>

        <CareerGuidance />

        {/* ==================================================
            CONTACT SECTION (FOOTER)
            ================================================== */}
        <section id="contact" className="py-24 px-6 sm:px-12 border-t border-slate-200 bg-[#FAFAFA] z-10 relative">
          <div className="max-w-7xl mx-auto w-full text-center space-y-8">
            <span className="text-orange-500 text-xs font-bold uppercase tracking-[0.25em] select-none">// collaborate with us</span>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 uppercase tracking-tight">
              Let's create.
            </h2>
            <div>
              <a
                href="mailto:decode82183@gmail.com"
                className="text-xl md:text-3xl font-medium text-slate-500 hover:text-blue-600 transition-colors underline decoration-slate-200 hover:decoration-blue-600 underline-offset-8"
              >
                decode82183@gmail.com
              </a>
            </div>
            <p className="text-slate-400 text-xs font-semibold tracking-wider pt-12">
              © 2026 Decode Tech. All rights reserved.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};
export default Home;