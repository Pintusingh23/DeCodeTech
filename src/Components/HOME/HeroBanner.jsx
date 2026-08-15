import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-black rounded-3xl flex flex-col-reverse md:flex-row items-center justify-between p-8 md:p-12 shadow-2xl transition-all duration-500 gap-8 md:gap-12 border border-zinc-800/80">
      
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      {/* Floating Glowing Blur Orbs */}
      <div className="absolute -top-12 -left-12 w-64 h-64 bg-zinc-800 rounded-full blur-[80px] opacity-25 animate-drift-slow pointer-events-none"></div>
      <div className="absolute -bottom-16 right-1/4 w-80 h-80 bg-zinc-900 rounded-full blur-[100px] opacity-30 animate-pulse-slow pointer-events-none"></div>
      
      <div className="relative z-10 max-w-lg space-y-5 text-center md:text-left transition-all duration-300 animate-fade-in">
        <span className="bg-zinc-800/50 backdrop-blur-md text-zinc-300 text-xs font-semibold px-4 py-1.5 rounded-full inline-flex items-center mx-auto md:mx-0 shadow-inner border border-zinc-700/50 hover:scale-105 hover:bg-zinc-800/75 transition-all duration-300">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400"></span>
          </span>
          New Bootcamp Launch
        </span>
        
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] leading-[1.1] uppercase flex flex-col items-center md:items-start gap-1 select-none">
          <span className="relative overflow-hidden block">
            <span className="block animate-slide-up [animation-delay:0.1s] translate-y-full opacity-0">
              Master <span className="text-white/30 font-light ml-2">/</span>
            </span>
          </span>
          <span className="relative overflow-hidden block">
            <span className="block animate-slide-up [animation-delay:0.35s] translate-y-full opacity-0 text-yellow-200">
              Coding <span className="text-white/30 font-light ml-2">/</span>
            </span>
          </span>
          <span className="relative overflow-hidden block">
            <span className="block animate-slide-up [animation-delay:0.6s] translate-y-full opacity-0">
              Skills
            </span>
          </span>
        </h1>
        
        <p className="text-zinc-400 text-sm md:text-base lg:text-lg leading-relaxed font-medium max-w-md drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
          Learn programming through interactive courses, coding challenges, and real projects
        </p>
        
        <button className="inline-flex items-center font-extrabold text-black bg-white hover:bg-zinc-200 hover:scale-105 hover:shadow-2xl hover:shadow-white/10 active:scale-95 px-7 py-3.5 rounded-2xl transition-all duration-300 shadow-md group">
          Start Learning
          <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
        </button>
      </div>
      
      <div className="relative z-10 flex-shrink-0 animate-float">
        {/* DeCode Logo Card */}
        <div className="flex items-center justify-center space-x-3 bg-zinc-900/40 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] border border-zinc-800/80 hover:scale-105 hover:bg-zinc-900/60 transition-all duration-500 group/card">
          <div className="flex items-center space-x-2">
            <span className="text-5xl md:text-6xl font-black text-white drop-shadow-md select-none group-hover/card:rotate-[-10deg] transition-transform duration-300 inline-block">&#123;</span>
            <div className="w-5 h-5 bg-yellow-300 rounded-full animate-pulse shadow-[0_0_12px_#fef08a]"></div>
            <span className="text-5xl md:text-6xl font-black text-white drop-shadow-md select-none group-hover/card:rotate-[10deg] transition-transform duration-300 inline-block">&#125;</span>
          </div>
          <div className="text-5xl md:text-6xl font-black tracking-tight select-none">
            <span className="text-white drop-shadow-md">De</span>
            <span className="text-yellow-200 drop-shadow-md group-hover/card:text-white transition-colors duration-300">Code</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;