import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import CircularBrand from './CircularBrand';
import CareerGuidance from './CareerGuidance';

const Home = ({ isLoading = false }) => {
  // Stagger variants for framer motion text reveal
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // Card staggered animation settings
  const cardContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div className={`min-h-screen bg-black text-white font-['Space_Grotesk'] overflow-hidden transition-opacity duration-1000 ${isLoading ? 'opacity-0 h-0' : 'opacity-100'}`}>

      {/* Background Decorative Ambient Details */}
      <div className="absolute top-[20%] left-[5%] w-[400px] h-[400px] bg-zinc-800/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[5%] w-[500px] h-[500px] bg-zinc-900/20 rounded-full blur-[160px] pointer-events-none"></div>

      {/* ==================================================
          1. HERO SECTION
          ================================================== */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 pt-24 pb-12 lg:pt-32">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left Hero Typography */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isLoading ? "hidden" : "visible"}
            className="flex flex-col items-start space-y-8 z-10"
          >
            <div className="space-y-4">
              <span className="text-zinc-500 text-xs md:text-sm font-semibold tracking-[0.25em] uppercase select-none">
                // 100% FREE TECH EDUCATION
              </span>

              <h2 className="text-[32px] sm:text-[46px] lg:text-[54px] font-black leading-tight tracking-[0.16em] uppercase flex flex-wrap items-center gap-x-4 gap-y-2 select-none">
                <motion.span variants={itemVariants} className="inline-block">
                  Learn <span className="text-zinc-500 font-light ml-2">/</span>
                </motion.span>
                <motion.span variants={itemVariants} className="inline-block text-zinc-300">
                  Code <span className="text-zinc-500 font-light ml-2">/</span>
                </motion.span>
                <motion.span variants={itemVariants} className="inline-block">
                  Build
                </motion.span>
              </h2>
            </div>

            <div className="space-y-3">
              <motion.p
                variants={itemVariants}
                className="text-zinc-400 text-base md:text-lg max-w-lg leading-relaxed select-none"
              >
                Learn coding and computer science through practical, easy-to-understand lessons — completely free.
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="text-zinc-500 text-sm max-w-lg leading-relaxed select-none font-medium"
              >
                Master Web Development, DSA, Python, Data Mining, AI/ML, Computer Architecture and MySQL.
              </motion.p>
            </div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-6 items-center">
              <a
                href="/python"
                className="inline-flex items-center gap-3 font-semibold text-zinc-100 hover:text-white group border-b border-white/20 pb-1.5 transition-all duration-300 hover:border-white text-sm tracking-widest uppercase"
              >
                Start Learning
                <FaArrowRight className="text-xs group-hover:translate-x-1.5 transition-transform duration-300" />
              </a>
              <a
                href="/Contact"
                className="inline-flex items-center gap-3 font-semibold text-zinc-400 hover:text-white group border-b border-transparent pb-1.5 transition-all duration-300 text-sm tracking-widest uppercase"
              >
                Explore Courses →
              </a>
            </motion.div>
          </motion.div>

          {/* Right Interactive Visual */}
          <div className="relative flex items-center justify-center lg:justify-end h-[400px] lg:h-[600px]">
            {/* Ambient Background Radial Lighting */}
            <div className="absolute w-[350px] h-[350px] bg-white/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

            {/* Orbit Lines Group */}
            <div className="absolute w-[380px] h-[380px] md:w-[480px] md:h-[480px] rounded-full border border-white/5 animate-[spin_25s_linear_infinite] pointer-events-none z-10 flex items-center justify-center">
              {/* Particle 1 */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.8)] animate-pulse"></div>
            </div>

            <div className="absolute w-[440px] h-[440px] md:w-[560px] md:h-[560px] rounded-full border border-white/3 animate-[spin_40s_linear_infinite_reverse] pointer-events-none z-10 flex items-center justify-center">
              {/* Particle 2 */}
              <div className="absolute bottom-0 right-1/4 w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
            </div>

            {/* Interactive Decode Tech Circular Typography Visual */}
            <motion.div
              initial={{ x: -250, scale: 0.9, opacity: 0 }}
              animate={isLoading ? { x: -250, scale: 0.9, opacity: 0 } : { x: 0, scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 50, damping: 14, delay: 0.4 }}
              className="relative z-10 lg:ml-auto"
            >
              <CircularBrand />
            </motion.div>
          </div>

        </div>
      </section>

      {/* ==================================================
          2. LEARN. PRACTICE. GET BETTER. SECTION (LIGHT BACKGROUND DESIGN)
          ================================================== */}
     

      {/* ==================================================
          Popular Courses Section (LIGHT BACKGROUND DESIGN)
          ================================================== */}
      <section className="py-20 px-6 sm:px-12 bg-[#0B1220] relative border-t border-zinc-800 overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(11,18,32,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(11,18,32,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />
        

        <div className="max-w-7xl mx-auto w-full space-y-12 relative z-10 text-left">
          
          <div className="space-y-3">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white flex items-center gap-3">
              Popular Courses <span className="text-2xl">📊</span>
            </h2>
            <p className="text-zinc-500 text-sm md:text-base max-w-xl leading-relaxed">
              Explore our most requested learning tracks covering web programming and algorithms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Web Development (Sky Blue Accent) */}
            <div 
              onClick={() => window.location.href = '/web-development'}
              className="group bg-[#111A2C] border border-slate-800 p-6 md:p-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 hover:border-sky-400/50 hover:shadow-[0_10px_40px_rgba(56,189,248,0.12)] cursor-pointer flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-400/5 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-150" />
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-3xl shadow-sm select-none group-hover:scale-110 transition-transform duration-300">📊</div>
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  Web Development
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  Learn HTML, CSS, and JavaScript from scratch.
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-400 font-bold pt-2 uppercase tracking-wider">
                  <span>9 Courses</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">⏱ 17 hours</span>
                </div>
              </div>
              <div className="pt-8">
                <span className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-sky-500 group-hover:text-sky-600 transition-colors">
                  Explore
                  <FaArrowRight className="text-[10px] group-hover:translate-x-1.5 transition-transform duration-300" />
                </span>
              </div>
            </div>

            {/* Card 2: DSA (Yellow/Amber Accent) */}
            <div 
              onClick={() => window.location.href = '/Dsa'}
              className="group bg-[#111A2C] border border-slate-800 p-6 md:p-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 hover:border-amber-400/50 hover:shadow-[0_10px_40px_rgba(251,191,36,0.12)] cursor-pointer flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/5 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-150" />
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-3xl shadow-sm select-none group-hover:scale-110 transition-transform duration-300">🗃️</div>
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  Data Structures & Algorithms
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  Master DSA concepts with practical examples.
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-400 font-bold pt-2 uppercase tracking-wider">
                  <span>5 Courses</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">⏱ 13 hours</span>
                </div>
              </div>
              <div className="pt-8">
                <span className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-amber-500 group-hover:text-amber-600 transition-colors">
                  Explore
                  <FaArrowRight className="text-[10px] group-hover:translate-x-1.5 transition-transform duration-300" />
                </span>
              </div>
            </div>

            {/* Card 3: HTML & CSS Fundamentals (Cyan Accent) */}
            <div 
              onClick={() => window.location.href = '/web-development'}
              className="group bg-[#111A2C] border border-slate-800 p-6 md:p-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 hover:border-cyan-400/50 hover:shadow-[0_10px_40px_rgba(34,211,238,0.12)] cursor-pointer flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/5 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-150" />
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-3xl shadow-sm select-none group-hover:scale-110 transition-transform duration-300">⚙️</div>
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  HTML & CSS Fundamentals
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  Build beautiful and responsive websites.
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-400 font-bold pt-2 uppercase tracking-wider">
                  <span>17 Courses</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">⏱ 90 hours</span>
                </div>
              </div>
              <div className="pt-8">
                <span className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-cyan-500 group-hover:text-cyan-600 transition-colors">
                  Explore
                  <FaArrowRight className="text-[10px] group-hover:translate-x-1.5 transition-transform duration-300" />
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>
      <CareerGuidance />

      {/* ==================================================
          5. CONTACT SECTION
          ================================================== */}
      <section id="contact" className="py-24 px-6 sm:px-12 border-t border-zinc-900 bg-zinc-950/40">
        <div className="max-w-7xl mx-auto w-full text-center space-y-8">
          <span className="text-zinc-500 text-xs font-semibold uppercase tracking-[0.25em] select-none">// collaborate with us</span>
          <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tight">
            Let's create.
          </h2>
          <div>
            <a
              href="mailto:decode82183@gmail.com"
              className="text-xl md:text-3xl font-light text-zinc-300 hover:text-white transition-colors underline decoration-white/20 hover:decoration-white underline-offset-8"
            >
              decode82183@gmail.com
            </a>
          </div>
          <p className="text-zinc-600 text-xs tracking-wider pt-12">
            © 2026 Decode Tech. All rights reserved.
          </p>
        </div>
      </section>

      {/* Embedded Animations CSS */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
      `}</style>
    </div>
  );
};

export default Home;